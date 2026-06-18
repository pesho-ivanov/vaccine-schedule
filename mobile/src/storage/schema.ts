export interface Migration {
  id: number;
  name: string;
  sql: string;
}

export const MIGRATIONS: Migration[] = [
  {
    id: 1,
    name: 'initial_local_first_schema',
    sql: `
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS child_profiles (
        id TEXT PRIMARY KEY,
        nickname TEXT,
        birth_date TEXT NOT NULL,
        sex TEXT,
        schedule_country TEXT NOT NULL DEFAULT 'BG',
        incomplete_history INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS schedule_metadata (
        country_code TEXT PRIMARY KEY,
        jurisdiction_name_en TEXT NOT NULL,
        jurisdiction_name_bg TEXT NOT NULL,
        schedule_version TEXT NOT NULL,
        effective_date TEXT NOT NULL,
        imported_date TEXT NOT NULL,
        source_json TEXT NOT NULL,
        active INTEGER NOT NULL DEFAULT 1,
        imported_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS schedule_sources (
        schedule_country TEXT NOT NULL,
        id TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        role TEXT NOT NULL,
        accessed_on TEXT NOT NULL,
        effective_date TEXT,
        PRIMARY KEY (schedule_country, id)
      );

      CREATE TABLE IF NOT EXISTS schedule_milestones (
        schedule_country TEXT NOT NULL,
        id TEXT NOT NULL,
        label_en TEXT NOT NULL,
        label_bg TEXT NOT NULL,
        kind TEXT NOT NULL,
        age_months REAL NOT NULL,
        open_ended INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (schedule_country, id)
      );

      CREATE TABLE IF NOT EXISTS vaccine_antigens (
        schedule_country TEXT NOT NULL,
        id TEXT NOT NULL,
        label_en TEXT NOT NULL,
        label_bg TEXT NOT NULL,
        short_en TEXT,
        short_bg TEXT,
        record_aliases_json TEXT NOT NULL,
        PRIMARY KEY (schedule_country, id)
      );

      CREATE TABLE IF NOT EXISTS schedule_doses (
        schedule_country TEXT NOT NULL,
        id TEXT NOT NULL,
        antigen_id TEXT NOT NULL,
        milestone_id TEXT NOT NULL,
        status_category TEXT NOT NULL,
        display_text TEXT NOT NULL,
        dose_number INTEGER NOT NULL,
        through_milestone_id TEXT,
        note TEXT,
        source_ids_json TEXT NOT NULL,
        flags_json TEXT NOT NULL,
        PRIMARY KEY (schedule_country, id)
      );

      CREATE TABLE IF NOT EXISTS vaccine_products (
        schedule_country TEXT NOT NULL,
        id TEXT NOT NULL,
        name TEXT NOT NULL,
        covered_antigen_ids_json TEXT NOT NULL,
        source_ids_json TEXT NOT NULL,
        notes TEXT,
        PRIMARY KEY (schedule_country, id)
      );

      CREATE TABLE IF NOT EXISTS administration_events (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL,
        given_on TEXT NOT NULL,
        product_id TEXT,
        product_name TEXT,
        covered_antigen_ids_json TEXT NOT NULL DEFAULT '[]',
        scheduled_dose_ids_json TEXT NOT NULL DEFAULT '[]',
        notes TEXT,
        batch_number TEXT,
        provider TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (child_id) REFERENCES child_profiles(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS reminders (
        id TEXT PRIMARY KEY,
        child_id TEXT NOT NULL,
        schedule_dose_id TEXT NOT NULL,
        reminder_date TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        notification_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (child_id) REFERENCES child_profiles(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_profiles_schedule_country
        ON child_profiles(schedule_country);
      CREATE INDEX IF NOT EXISTS idx_events_child_date
        ON administration_events(child_id, given_on);
      CREATE INDEX IF NOT EXISTS idx_reminders_child_date
        ON reminders(child_id, reminder_date);
      CREATE INDEX IF NOT EXISTS idx_doses_country_milestone
        ON schedule_doses(schedule_country, milestone_id);
    `,
  },
];
