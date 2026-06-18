import type {
  CountrySchedule,
  LanguageCode,
  ScheduleDose,
  ScheduleMilestone,
  VaccineAntigen,
} from './schedule';

export interface TimelineMilestone {
  milestone: ScheduleMilestone;
  mandatory: ScheduleDose[];
  recommended: ScheduleDose[];
}

export interface ScheduleCounts {
  childMilestones: number;
  mandatoryDoses: number;
  recommendedDoses: number;
  products: number;
  sources: number;
}

export function childMilestones(
  schedule: CountrySchedule,
): ScheduleMilestone[] {
  return schedule.milestones.filter(
    (milestone) =>
      milestone.kind !== 'pregnancy' &&
      milestone.kind !== 'adult' &&
      milestone.age_months <= schedule.mvp_age_coverage.throughAgeYears * 12,
  );
}

export function childDoses(schedule: CountrySchedule): ScheduleDose[] {
  const allowedMilestones = new Set(
    childMilestones(schedule).map((milestone) => milestone.id),
  );
  return schedule.doses.filter((dose) =>
    allowedMilestones.has(dose.milestone_id),
  );
}

export function scheduleCounts(schedule: CountrySchedule): ScheduleCounts {
  const doses = childDoses(schedule);
  return {
    childMilestones: childMilestones(schedule).length,
    mandatoryDoses: doses.filter((dose) => dose.status_category === 'mandatory')
      .length,
    recommendedDoses: doses.filter(
      (dose) => dose.status_category === 'recommended',
    ).length,
    products: schedule.products.length,
    sources: schedule.source_references.length,
  };
}

export function timelineMilestones(
  schedule: CountrySchedule,
): TimelineMilestone[] {
  const doses = childDoses(schedule);
  return childMilestones(schedule)
    .map((milestone) => {
      const milestoneDoses = doses.filter(
        (dose) => dose.milestone_id === milestone.id,
      );
      return {
        milestone,
        mandatory: milestoneDoses.filter(
          (dose) => dose.status_category === 'mandatory',
        ),
        recommended: milestoneDoses.filter(
          (dose) => dose.status_category === 'recommended',
        ),
      };
    })
    .filter((item) => item.mandatory.length > 0 || item.recommended.length > 0);
}

export function antigenNamesById(
  schedule: CountrySchedule,
  language: LanguageCode,
) {
  return schedule.antigens.reduce<Record<string, string>>((names, antigen) => {
    names[antigen.id] = antigenLabel(antigen, language);
    return names;
  }, {});
}

export function antigenLabel(
  antigen: VaccineAntigen,
  language: LanguageCode,
): string {
  if (antigen.short?.[language]) {
    return `${antigen.label[language]} (${antigen.short[language]})`;
  }
  return antigen.label[language];
}

export function doseLabel(
  dose: ScheduleDose,
  antigensById: Record<string, string>,
): string {
  const antigen = antigensById[dose.antigen_id] ?? dose.antigen_id;
  return `${antigen}, dose ${dose.dose_number}`;
}
