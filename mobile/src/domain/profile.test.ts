import { BUNDLED_SCHEDULE } from '../data/bundledSchedule';
import {
  addCalendarMonthsIso,
  childAgeLabel,
  isOlderChildForBackfill,
  nextMilestoneStatus,
  validateProfileDraft,
  type ChildProfileDraft,
} from './profile';

function draft(overrides: Partial<ChildProfileDraft>): ChildProfileDraft {
  return {
    birthDate: '2026-06-18',
    incompleteHistory: false,
    nickname: '',
    scheduleCountry: 'BG',
    sex: 'not_set',
    ...overrides,
  };
}

describe('profile onboarding helpers', () => {
  it('validates impossible birth dates', () => {
    expect(
      validateProfileDraft(draft({ birthDate: '' }), '2026-06-18'),
    ).toEqual(['birth_date_required']);
    expect(
      validateProfileDraft(draft({ birthDate: '2026-02-31' }), '2026-06-18'),
    ).toEqual(['birth_date_format']);
    expect(
      validateProfileDraft(draft({ birthDate: '2026-06-19' }), '2026-06-18'),
    ).toEqual(['birth_date_future']);
    expect(
      validateProfileDraft(draft({ birthDate: '2008-06-17' }), '2026-06-18'),
    ).toEqual(['birth_date_too_old', 'history_choice_required']);
  });

  it('requires incomplete-history choice for older children', () => {
    expect(isOlderChildForBackfill('2026-04-18', '2026-06-18')).toBe(true);
    expect(
      validateProfileDraft(draft({ birthDate: '2026-04-18' }), '2026-06-18'),
    ).toEqual(['history_choice_required']);
    expect(
      validateProfileDraft(
        draft({ birthDate: '2026-04-18', incompleteHistory: true }),
        '2026-06-18',
      ),
    ).toEqual([]);
  });

  it('uses calendar month math for profile-derived schedule status', () => {
    expect(addCalendarMonthsIso('2024-01-31', 1)).toBe('2024-02-29');
    expect(addCalendarMonthsIso('2025-01-31', 1)).toBe('2025-02-28');

    const status = nextMilestoneStatus(
      { birthDate: '2026-03-21' },
      BUNDLED_SCHEDULE,
      'en',
      '2026-05-22',
    );

    expect(status?.ageLabel).toBe('3m');
    expect(status?.dueDate).toBe('2026-06-21');
    expect(status?.mandatoryCount).toBeGreaterThan(0);
  });

  it('formats child age without exact timestamps', () => {
    expect(childAgeLabel('2026-06-01', 'en', '2026-06-18')).toBe('2 weeks');
    expect(childAgeLabel('2026-03-18', 'en', '2026-06-18')).toBe('3 months');
    expect(childAgeLabel('2024-06-18', 'en', '2026-09-18')).toBe(
      '2 years 3 months',
    );
  });
});
