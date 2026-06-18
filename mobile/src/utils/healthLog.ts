export type HealthEvent =
  | 'app_boot'
  | 'database_initialized'
  | 'schedule_import_current'
  | 'schedule_import_created'
  | 'schedule_import_updated'
  | 'database_error'
  | 'app_error';

export interface HealthLogEntry {
  event: HealthEvent;
  at: string;
  detail?: string;
}

const entries: HealthLogEntry[] = [];

export function logAppHealth(event: HealthEvent, detail?: string): void {
  const entry = {
    event,
    detail,
    at: new Date().toISOString(),
  };
  entries.push(entry);
  console.info(`[health] ${entry.event}`, detail ?? '');
}

export function latestHealthEntry(): HealthLogEntry | undefined {
  return entries[entries.length - 1];
}
