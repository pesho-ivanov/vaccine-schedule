export type LanguageCode = 'en' | 'bg';

export type LocalizedText = Record<LanguageCode, string>;

export type ScheduleGroup = 'mandatory' | 'recommended';

export type MilestoneKind = 'pregnancy' | 'birth' | 'month' | 'year' | 'adult';

export interface SourceReference {
  id: string;
  title: string;
  url: string;
  role: string;
  accessed_on: string;
  effective_date: string | null;
}

export interface ScheduleMilestone {
  id: string;
  label: LocalizedText;
  kind: MilestoneKind;
  age_months: number;
  open_ended: boolean;
}

export interface VaccineAntigen {
  id: string;
  label: LocalizedText;
  short: LocalizedText | null;
  record_aliases: string[];
}

export interface ScheduleDose {
  id: string;
  antigen_id: string;
  milestone_id: string;
  status_category: ScheduleGroup;
  display_text: string;
  dose_number: number;
  source_ids: string[];
  through_milestone_id: string | null;
  note: string | null;
  flags: string[];
}

export interface VaccineProduct {
  id: string;
  name: string;
  covered_antigen_ids: string[];
  source_ids: string[];
  notes: string | null;
}

export interface CountrySchedule {
  country_code: string;
  jurisdiction_name: LocalizedText;
  schedule_version: string;
  effective_date: string;
  imported_date: string;
  mvp_age_coverage: {
    from: string;
    throughAgeYears: number;
    defaultHiddenMilestoneKinds: MilestoneKind[];
  };
  source_references: SourceReference[];
  milestones: ScheduleMilestone[];
  antigens: VaccineAntigen[];
  doses: ScheduleDose[];
  products: VaccineProduct[];
}
