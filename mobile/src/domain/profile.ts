import type { CountrySchedule, LanguageCode } from './schedule';
import { timelineMilestones, type TimelineMilestone } from './timeline';

export const DISCLAIMER_VERSION = 'tracker-disclaimer-2026-06-18';

export type ChildSex = 'female' | 'male' | 'not_set';

export type ProfileValidationError =
  | 'birth_date_required'
  | 'birth_date_format'
  | 'birth_date_future'
  | 'birth_date_too_old'
  | 'history_choice_required';

export interface ChildProfileLike {
  birthDate: string;
  incompleteHistory?: boolean;
  nickname?: string | null;
}

export interface ChildProfileDraft {
  birthDate: string;
  incompleteHistory: boolean;
  nickname: string;
  scheduleCountry: string;
  sex: ChildSex;
}

export interface NextMilestoneStatus {
  ageLabel: string;
  dueDate: string;
  mandatoryCount: number;
  milestone: TimelineMilestone;
  recommendedCount: number;
}

interface DateParts {
  day: number;
  month: number;
  year: number;
}

export function todayIso(): string {
  const today = new Date();
  return [
    today.getFullYear(),
    pad2(today.getMonth() + 1),
    pad2(today.getDate()),
  ].join('-');
}

export function normalizeNickname(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function validateProfileDraft(
  draft: ChildProfileDraft,
  asOf: string = todayIso(),
): ProfileValidationError[] {
  const errors: ProfileValidationError[] = [];
  if (!draft.birthDate.trim()) {
    return ['birth_date_required'];
  }
  if (!parseIsoDateParts(draft.birthDate)) {
    return ['birth_date_format'];
  }
  if (compareIsoDates(draft.birthDate, asOf) > 0) {
    errors.push('birth_date_future');
  }
  if (compareIsoDates(draft.birthDate, addCalendarMonthsIso(asOf, -216)) < 0) {
    errors.push('birth_date_too_old');
  }
  if (
    isOlderChildForBackfill(draft.birthDate, asOf) &&
    !draft.incompleteHistory
  ) {
    errors.push('history_choice_required');
  }
  return errors;
}

export function isOlderChildForBackfill(
  birthDate: string,
  asOf: string = todayIso(),
): boolean {
  const ageMonths = ageInCalendarMonths(birthDate, asOf);
  return ageMonths !== null && ageMonths >= 2;
}

export function childAgeLabel(
  birthDate: string,
  language: LanguageCode,
  asOf: string = todayIso(),
): string {
  const birth = parseIsoDateParts(birthDate);
  const today = parseIsoDateParts(asOf);
  if (!birth || !today) {
    return '-';
  }

  const days = daysBetweenIso(birthDate, asOf);
  if (days < 42) {
    const weeks = Math.max(0, Math.floor(days / 7));
    return language === 'bg' ? `${weeks} седм.` : `${weeks} weeks`;
  }

  const months = ageInCalendarMonths(birthDate, asOf) ?? 0;
  if (months < 24) {
    return language === 'bg' ? `${months} месеца` : `${months} months`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) {
    return language === 'bg' ? `${years} г.` : `${years} years`;
  }
  return language === 'bg'
    ? `${years} г. ${remainingMonths} м.`
    : `${years} years ${remainingMonths} months`;
}

export function nextMilestoneStatus(
  profile: ChildProfileLike,
  schedule: CountrySchedule,
  language: LanguageCode,
  asOf: string = todayIso(),
): NextMilestoneStatus | null {
  if (!parseIsoDateParts(profile.birthDate)) {
    return null;
  }

  const milestones = timelineMilestones(schedule)
    .map((milestone) => ({
      milestone,
      dueDate: addCalendarMonthsIso(
        profile.birthDate,
        milestone.milestone.age_months,
      ),
    }))
    .filter((item) => compareIsoDates(item.dueDate, asOf) >= 0)
    .sort((left, right) => compareIsoDates(left.dueDate, right.dueDate));

  const next = milestones[0];
  if (!next) {
    return null;
  }

  return {
    ageLabel: next.milestone.milestone.label[language],
    dueDate: next.dueDate,
    mandatoryCount: next.milestone.mandatory.length,
    milestone: next.milestone,
    recommendedCount: next.milestone.recommended.length,
  };
}

export function addCalendarMonthsIso(start: string, months: number): string {
  const parts = parseIsoDateParts(start);
  if (!parts) {
    return start;
  }

  const monthIndex = parts.month - 1 + months;
  const year = parts.year + Math.floor(monthIndex / 12);
  const month = modulo(monthIndex, 12) + 1;
  const day = Math.min(parts.day, daysInMonth(year, month));
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function compareIsoDates(left: string, right: string): number {
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

function ageInCalendarMonths(birthDate: string, asOf: string): number | null {
  const birth = parseIsoDateParts(birthDate);
  const today = parseIsoDateParts(asOf);
  if (!birth || !today || compareIsoDates(birthDate, asOf) > 0) {
    return null;
  }

  let months = (today.year - birth.year) * 12 + (today.month - birth.month);
  if (today.day < birth.day) {
    months -= 1;
  }
  return Math.max(0, months);
}

function daysBetweenIso(start: string, end: string): number {
  const startDate = new Date(`${start}T00:00:00.000Z`);
  const endDate = new Date(`${end}T00:00:00.000Z`);
  return Math.max(
    0,
    Math.floor((endDate.getTime() - startDate.getTime()) / 86_400_000),
  );
}

function parseIsoDateParts(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    return null;
  }
  return { day, month, year };
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function modulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}
