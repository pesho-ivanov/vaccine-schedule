import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

import { BUNDLED_SCHEDULE } from '../data/bundledSchedule';
import type { CountrySchedule, LanguageCode } from '../domain/schedule';
import { DEFAULT_LANGUAGE } from '../i18n/strings';
import { logAppHealth } from '../utils/healthLog';
import { MIGRATIONS } from './schema';

export interface ScheduleImportResult {
  status: 'current' | 'created' | 'updated';
  version: string;
}

export interface DatabaseSnapshot {
  scheduleVersion: string | null;
  effectiveDate: string | null;
  importedDate: string | null;
  childProfiles: number;
  scheduleDoses: number;
  products: number;
  administrationEvents: number;
  reminders: number;
  language: LanguageCode;
  analyticsEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface TrackerDatabaseState {
  db: SQLiteDatabase;
  importResult: ScheduleImportResult;
  snapshot: DatabaseSnapshot;
}

interface VersionRow {
  schedule_version: string;
}

interface CountRow {
  count: number;
}

interface SettingRow {
  value: string;
}

const DATABASE_NAME = 'vaccination-tracker.db';

export async function initializeTrackerDatabase(): Promise<TrackerDatabaseState> {
  const db = await openDatabaseAsync(DATABASE_NAME);
  await runMigrations(db);
  await seedDefaultSettings(db);
  const importResult = await importScheduleIfNeeded(db, BUNDLED_SCHEDULE);
  const snapshot = await getDatabaseSnapshot(db);
  logAppHealth('database_initialized', importResult.version);
  return { db, importResult, snapshot };
}

async function runMigrations(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL
    );
  `);

  const appliedRows = await db.getAllAsync<{ id: number }>(
    'SELECT id FROM schema_migrations',
  );
  const applied = new Set(appliedRows.map((row) => row.id));

  for (const migration of MIGRATIONS) {
    if (applied.has(migration.id)) {
      continue;
    }

    await db.withTransactionAsync(async () => {
      await db.execAsync(migration.sql);
      await db.runAsync(
        'INSERT INTO schema_migrations (id, name, applied_at) VALUES (?, ?, ?)',
        migration.id,
        migration.name,
        nowIso(),
      );
    });
  }
}

async function seedDefaultSettings(db: SQLiteDatabase): Promise<void> {
  const defaults: Record<string, string> = {
    active_child_id: '',
    analytics_enabled: 'false',
    language: DEFAULT_LANGUAGE,
    local_only_mode: 'true',
    notifications_enabled: 'false',
  };

  for (const [key, value] of Object.entries(defaults)) {
    await db.runAsync(
      `INSERT INTO settings (key, value, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(key) DO NOTHING`,
      key,
      value,
      nowIso(),
    );
  }
}

export async function saveSetting(
  db: SQLiteDatabase,
  key: string,
  value: string,
): Promise<void> {
  await db.runAsync(
    `INSERT INTO settings (key, value, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    key,
    value,
    nowIso(),
  );
}

export async function importScheduleIfNeeded(
  db: SQLiteDatabase,
  schedule: CountrySchedule,
): Promise<ScheduleImportResult> {
  const existing = await db.getFirstAsync<VersionRow>(
    'SELECT schedule_version FROM schedule_metadata WHERE country_code = ?',
    schedule.country_code,
  );

  if (existing?.schedule_version === schedule.schedule_version) {
    logAppHealth('schedule_import_current', schedule.schedule_version);
    return { status: 'current', version: schedule.schedule_version };
  }

  const status: ScheduleImportResult['status'] = existing
    ? 'updated'
    : 'created';

  await db.withTransactionAsync(async () => {
    for (const table of [
      'schedule_sources',
      'schedule_milestones',
      'vaccine_antigens',
      'schedule_doses',
      'vaccine_products',
    ]) {
      await db.runAsync(
        `DELETE FROM ${table} WHERE schedule_country = ?`,
        schedule.country_code,
      );
    }

    await db.runAsync(
      `INSERT INTO schedule_metadata (
        country_code,
        jurisdiction_name_en,
        jurisdiction_name_bg,
        schedule_version,
        effective_date,
        imported_date,
        source_json,
        active,
        imported_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
      ON CONFLICT(country_code) DO UPDATE SET
        jurisdiction_name_en = excluded.jurisdiction_name_en,
        jurisdiction_name_bg = excluded.jurisdiction_name_bg,
        schedule_version = excluded.schedule_version,
        effective_date = excluded.effective_date,
        imported_date = excluded.imported_date,
        source_json = excluded.source_json,
        active = 1,
        imported_at = excluded.imported_at`,
      schedule.country_code,
      schedule.jurisdiction_name.en,
      schedule.jurisdiction_name.bg,
      schedule.schedule_version,
      schedule.effective_date,
      schedule.imported_date,
      JSON.stringify(schedule.source_references),
      nowIso(),
    );

    for (const source of schedule.source_references) {
      await db.runAsync(
        `INSERT INTO schedule_sources (
          schedule_country,
          id,
          title,
          url,
          role,
          accessed_on,
          effective_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        schedule.country_code,
        source.id,
        source.title,
        source.url,
        source.role,
        source.accessed_on,
        source.effective_date,
      );
    }

    for (const milestone of schedule.milestones) {
      await db.runAsync(
        `INSERT INTO schedule_milestones (
          schedule_country,
          id,
          label_en,
          label_bg,
          kind,
          age_months,
          open_ended
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        schedule.country_code,
        milestone.id,
        milestone.label.en,
        milestone.label.bg,
        milestone.kind,
        milestone.age_months,
        milestone.open_ended ? 1 : 0,
      );
    }

    for (const antigen of schedule.antigens) {
      await db.runAsync(
        `INSERT INTO vaccine_antigens (
          schedule_country,
          id,
          label_en,
          label_bg,
          short_en,
          short_bg,
          record_aliases_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        schedule.country_code,
        antigen.id,
        antigen.label.en,
        antigen.label.bg,
        antigen.short?.en ?? null,
        antigen.short?.bg ?? null,
        JSON.stringify(antigen.record_aliases),
      );
    }

    for (const dose of schedule.doses) {
      await db.runAsync(
        `INSERT INTO schedule_doses (
          schedule_country,
          id,
          antigen_id,
          milestone_id,
          status_category,
          display_text,
          dose_number,
          through_milestone_id,
          note,
          source_ids_json,
          flags_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        schedule.country_code,
        dose.id,
        dose.antigen_id,
        dose.milestone_id,
        dose.status_category,
        dose.display_text,
        dose.dose_number,
        dose.through_milestone_id,
        dose.note,
        JSON.stringify(dose.source_ids),
        JSON.stringify(dose.flags),
      );
    }

    for (const product of schedule.products) {
      await db.runAsync(
        `INSERT INTO vaccine_products (
          schedule_country,
          id,
          name,
          covered_antigen_ids_json,
          source_ids_json,
          notes
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        schedule.country_code,
        product.id,
        product.name,
        JSON.stringify(product.covered_antigen_ids),
        JSON.stringify(product.source_ids),
        product.notes,
      );
    }
  });

  logAppHealth(
    status === 'created'
      ? 'schedule_import_created'
      : 'schedule_import_updated',
    schedule.schedule_version,
  );
  return { status, version: schedule.schedule_version };
}

export async function getDatabaseSnapshot(
  db: SQLiteDatabase,
): Promise<DatabaseSnapshot> {
  const metadata = await db.getFirstAsync<{
    schedule_version: string;
    effective_date: string;
    imported_date: string;
  }>(
    `SELECT schedule_version, effective_date, imported_date
     FROM schedule_metadata
     WHERE active = 1
     ORDER BY imported_at DESC
     LIMIT 1`,
  );

  const language = await getSetting(db, 'language');
  const analyticsEnabled = await getSetting(db, 'analytics_enabled');
  const notificationsEnabled = await getSetting(db, 'notifications_enabled');

  return {
    scheduleVersion: metadata?.schedule_version ?? null,
    effectiveDate: metadata?.effective_date ?? null,
    importedDate: metadata?.imported_date ?? null,
    childProfiles: await countRows(db, 'child_profiles'),
    scheduleDoses: await countRows(db, 'schedule_doses'),
    products: await countRows(db, 'vaccine_products'),
    administrationEvents: await countRows(db, 'administration_events'),
    reminders: await countRows(db, 'reminders'),
    language: parseLanguage(language),
    analyticsEnabled: analyticsEnabled === 'true',
    notificationsEnabled: notificationsEnabled === 'true',
  };
}

async function getSetting(
  db: SQLiteDatabase,
  key: string,
): Promise<string | null> {
  const row = await db.getFirstAsync<SettingRow>(
    'SELECT value FROM settings WHERE key = ?',
    key,
  );
  return row?.value ?? null;
}

async function countRows(db: SQLiteDatabase, table: string): Promise<number> {
  const row = await db.getFirstAsync<CountRow>(
    `SELECT COUNT(*) AS count FROM ${table}`,
  );
  return row?.count ?? 0;
}

function parseLanguage(value: string | null): LanguageCode {
  return value === 'en' || value === 'bg' ? value : DEFAULT_LANGUAGE;
}

function nowIso(): string {
  return new Date().toISOString();
}
