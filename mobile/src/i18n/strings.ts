import type { LanguageCode } from '../domain/schedule';

export const DEFAULT_LANGUAGE: LanguageCode = 'bg';

const STRINGS = {
  en: {
    appTitle: 'Vaccination Tracker',
    appSubtitle: 'Bulgaria child schedule',
    today: 'Today',
    timeline: 'Timeline',
    record: 'Record',
    profile: 'Profile',
    localReady: 'Local schedule is ready offline',
    noProfileTitle: 'No child profile yet',
    noProfileBody:
      'Child setup starts in the next phase. The local database and schedule import are ready.',
    sourceVersion: 'Schedule version',
    effectiveDate: 'Effective date',
    importedDate: 'Imported date',
    mandatory: 'Mandatory',
    recommended: 'Recommended',
    products: 'Products',
    reminders: 'Reminders',
    sources: 'Sources',
    milestone: 'Milestone',
    noRecordsTitle: 'No vaccine records yet',
    noRecordsBody:
      'The local event table is ready for administration records, batch numbers, provider notes, and reminders.',
    privacyTitle: 'Privacy defaults',
    privacyBody:
      'No account, no server sync, and analytics disabled by default.',
    language: 'Language',
    healthOk: 'App health log active',
    loading: 'Opening local database',
    retry: 'Retry',
    databaseError: 'Local database could not be opened.',
    disclaimer:
      "This app helps you track vaccination records and reminders using published schedule data. It is not medical advice, not a diagnosis tool, and not an official medical record. Always confirm vaccine timing, contraindications, catch-up vaccination, optional vaccines, and non-standard situations with your child's pediatrician or GP.",
    installStatusCurrent: 'Bundled schedule already imported.',
    installStatusCreated: 'Bundled schedule imported.',
    installStatusUpdated:
      'Bundled schedule updated without deleting child records.',
  },
  bg: {
    appTitle: 'Имунизационен тракер',
    appSubtitle: 'Детски календар за България',
    today: 'Днес',
    timeline: 'Календар',
    record: 'Запис',
    profile: 'Профил',
    localReady: 'Локалният календар е готов офлайн',
    noProfileTitle: 'Все още няма детски профил',
    noProfileBody:
      'Създаването на детски профил започва в следващата фаза. Локалната база и импортът на календара са готови.',
    sourceVersion: 'Версия на календара',
    effectiveDate: 'В сила от',
    importedDate: 'Импортиран на',
    mandatory: 'Задължителни',
    recommended: 'Препоръчителни',
    products: 'Продукти',
    reminders: 'Напомняния',
    sources: 'Източници',
    milestone: 'Възраст',
    noRecordsTitle: 'Все още няма имунизационни записи',
    noRecordsBody:
      'Локалната таблица за събития е готова за записи, партиди, лекарски бележки и напомняния.',
    privacyTitle: 'Поверителност',
    privacyBody:
      'Без акаунт, без сървърна синхронизация и без включена аналитика по подразбиране.',
    language: 'Език',
    healthOk: 'Здравният лог на приложението е активен',
    loading: 'Отваряне на локалната база',
    retry: 'Опитай пак',
    databaseError: 'Локалната база не можа да бъде отворена.',
    disclaimer:
      'Това приложение помага да проследявате имунизационни записи и напомняния според публикувани календарни данни. То не е медицински съвет, не е инструмент за диагноза и не е официален медицински документ. Винаги потвърждавайте срокове, противопоказания, наваксващи имунизации, препоръчителни ваксини и нестандартни случаи с педиатъра или личния лекар на детето.',
    installStatusCurrent: 'Вграденият календар вече е импортиран.',
    installStatusCreated: 'Вграденият календар е импортиран.',
    installStatusUpdated:
      'Вграденият календар е обновен без изтриване на детски записи.',
  },
} as const;

export type StringKey = keyof typeof STRINGS.en;

export function t(language: LanguageCode, key: StringKey): string {
  return STRINGS[language][key];
}
