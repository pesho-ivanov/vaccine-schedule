window.HIS_SHEETS = {
  "schema_version": 1,
  "source": {
    "artifact": "HIS-nomenclatures-2026.06.29.xlsx",
    "url": "https://his.bg/upload/628/%D0%9D%D0%97%D0%98%D0%A1+%D0%9D%D0%BE%D0%BC%D0%B5%D0%BD%D0%BA%D0%BB%D0%B0%D1%82%D1%83%D1%80%D0%B8+-+%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F+v1.5.27+%281%29.xlsx",
    "page_url": "https://his.bg/bg/dev/nomenclatures",
    "his_version": "v1.5.27",
    "nomenclatures_date": "29.06.2026"
  },
  "source_links": {
    "ecdc_calendar": "https://vaccine-schedule.ecdc.europa.eu/Scheduler/ByCountry?SelectedCountryId=35&IncludeChildAgeGroup=true&IncludeChildAgeGroup=false&IncludeAdultAgeGroup=false",
    "lex_calendar": "https://lex.bg/laws/ldoc/2135504228",
    "pregnancy_vaccine": "https://plusmen.bg",
    "his_bg": "https://his.bg/bg/dev/nomenclatures"
  },
  "source_versions": {
    "his_bg": "v1.5.27"
  },
  "change_notes": [
    {
      "version": "1.5.27",
      "file": "data/his/change-notes/v1.5.27.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - спиране на кодове 19, 20, 21, 22, 65, 75, 76",
          "change_en": "Nomenclature CL038 - discontinuation of codes 19, 20, 21, 22, 65, 75, 76",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL150 - промяна в стойността на връзката с МКБ код по CL011на \"M30.1\" за запис с ключ: 1330000271",
          "change_en": "Nomenclature CL150 - change in the value of the relation with ICD code under CL011 of \"M30.1\" for record with key: 1330000271",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL136 - промяна в Description, Display value BG, Display value EN за записи с ключове: 3, 4",
          "change_en": "Nomenclature CL136 - change in Description, Display value BG, Display value EN for records with keys: 3, 4",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.26",
      "file": "data/his/change-notes/v1.5.26.csv",
      "changes": [
        {
          "change": "Създадена номенклатура CL151 за Статус на заявка за достъп до пациентско досие през НЗИС",
          "change_en": "Created nomenclature CL151 for status of request for access until patient record through NHIS",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - промяна в Min age за код 71",
          "change_en": "Nomenclature CL038 - change in Min age for code 71",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL096 - премахнат дублиран запис с код 416 - Процедури за изследване на фаринкс / Procedures for examination of pharynx",
          "change_en": "Nomenclature CL096 - removed duplicate record with code 416 - Procedures for examination of pharynx / Procedures for examination of pharynx",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - премахната стойност за Max age при V17 тъй като дублира данните за Recurring и интервал",
          "change_en": "Nomenclature CL132 - removed value for Max age for V17 because duplicates data for Recurring and interval",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL096 - промяна в етикетите на български език на кодове: 223. 225. 226. 228. 229",
          "change_en": "Nomenclature CL096 - change in labels of Bulgarian language of codes: 223. 225. 226. 228. 229",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL999 - добавени стойности за български език за всички кодове",
          "change_en": "Nomenclature CL999 - added values for Bulgarian language for all codes",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL998 - добавяне на нов код W100",
          "change_en": "Nomenclature CL998 - addition of new code W100",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL150 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 1190800256, 1190900257, 1191200258, 1191400259, 1191800260, 1743800305",
          "change_en": "Nomenclature CL150 - change in the value of Description, Display value BG and Display value EN of rows with keys: 1190800256, 1190900257, 1191200258, 1191400259, 1191800260, 1743800305",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL011 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключ: B76, B76.0, B82, B82.9, C08.9, C14.0, C17.0, C17.3, C18.0, C18.1, C25.4, C38.0, C38.4, C40.1, C40.2, C40.3, C41.0, C41.2, C41.3, C41.4, C44.0, C44.1, C44.2, C44.3, C44.4, C44.5, C44.6, C44.7, C48.0, C53.0, C53.1, C53.9, C54.1, C57.9, C62.0, C63.0, C63.2, C63.9, C68.0, C69.0, C69.1, C69.2, C69.3, C69.4, C69.5, C69.9, C72.0, C72.9, C75.0, C75.1, C75.2, C75.3, C75.5, D00.1, D00.2, D01.0, D01.1, D01.2, D01.3, D01.5, D02.0, D02.1, D04.2, D04.3, D04.4, D04.5, D04.7, D04.9, D06.0, D06.1, D06.9, D07.0, D07.1, D07.4, D07.5, D09.0, D10.9, D11.9, D12.0, D12.1, D12.7, D12.8, D12.9, D13.0, D13.1, D13.2, D13.7, D14.1, D14.2, D15.0, D15.1, D15.2, D16.1, D16.2, D16.3, D16.4, D16.6, D16.7, D16.8, D20.0, D20.1, D23.0, D23.1, D23.2, D23.3, D23.4, D23.5, D23.6, D23.7, D23.9, D28.0, D28.9, D29.0, D29.1, D29.2, D29.3, D29.4, D29.7, D29.9, D30.0, D30.1, D30.2, D30.3, D30.4, D30.7, D31.0, D31.1, D31.2, D31.3, D31.4, D31.5, D31.9, D33.0, D33.1, D33.2, D33.3, D33.4, D33.7, D35.0, D35.1, D35.2, D35.3, D35.4, D35.5, D35.6, D35.8, D35.9, D36.1, D36.7, D37.1, D37.3, D37.4, D37.5, D37.6, D38.0, D38.2, D38.3, D38.4, D40.0, D40.1, D40.7, D41.0, D41.1, D41.2, D41.3, D41.4, D41.7, D43.0, D43.1, D43.2, D43.3, D43.4, D43.7, D43.9, D44.1, D44.2, D44.3, D44.4, D44.5, D44.6, D44.7, D44.8, D44.9, D48.2, D48.3, D48.4, D48.7, E56, E56.8, I24, I24.8, M24.9, M24.90, M24.91, M24.92, M24.93, M24.94, M24.95, M24.96, M24.97, M24.98, M24.99, M25.9, M25.90, M25.91, M25.92, M25.93, M25.94, M25.95, M25.96, M25.97, M25.98, M25.99, N82.1, N82.8, P03, P03.8, P61.3, P62.3, Q43.0, Q53, R09.0, S26.0, S26.00, S27.40, S27.50, S77, S77.2, T36.0, T36.3, T36.4, T36.7, T36.9, T37.1, T38.2, T38.4, T38.5, T38.6, T39.0, T39.4, T41.5, T42.0, T42.1, T42.4, T43.0, T43.2, T43.6, T43.9, T44.0, T44.2, T45.0, T45.2, T45.5, T45.7, T46.5, T46.6, T47.5, T48.4, T48.6, T49.1, T71, T75.2, T98, T98.1, V19.5, V19.50, V19.51, V19.52, V19.53, V19.54, V19.58, V19.59, V29.0, V29.00, V29.01, V29.02, V29.03, V29.04, V29.08, V29.09, V29.1, V29.10, V29.11, V29.12, V29.13, V29.14, V29.18, V29.19, V29.5, V29.50, V29.51, V29.52, V29.53, V29.54, V29.58, V29.59, V39.0, V39.00, V39.01, V39.02, V39.03, V39.04, V39.08, V39.09, V39.1, V39.10, V39.11, V39.12, V39.13, V39.14, V39.18, V39.19, V39.4, V39.40, V39.41, V39.42, V39.43, V39.44, V39.48, V39.49, V39.5, V39.50, V39.51, V39.52, V39.53, V39.54, V39.58, V39.59, V49.0, V49.00, V49.01, V49.02, V49.03, V49.04, V49.08, V49.09, V49.4, V49.40, V49.41, V49.42, V49.43, V49.44, V49.48, V49.49, V49.5, V49.50, V49.51, V49.52, V49.53, V49.54, V49.58, V49.59, V59.0, V59.00, V59.01, V59.02, V59.03, V59.04, V59.08, V59.09, V59.1, V59.10, V59.11, V59.12, V59.13, V59.14, V59.18, V59.19, V59.4, V59.40, V59.41, V59.42, V59.43, V59.44, V59.48, V59.49, V59.5, V59.50, V59.51, V59.52, V59.53, V59.54, V59.58, V59.59, V69.4, V69.40, V69.41, V69.42, V69.43, V69.44, V69.48, V69.49, V69.5, V69.50, V69.51, V69.52, V69.53, V69.54, V69.58, V69.59, V79.0, V79.00, V79.01, V79.02, V79.03, V79.04, V79.08, V79.09, V79.1, V79.10, V79.11, V79.12, V79.13, V79.14, V79.18, V79.19, V79.4, V79.40, V79.41, V79.42, V79.43, V79.44, V79.48, V79.49, V79.5, V79.50, V79.51, V79.52, V79.53, V79.54, V79.58, V79.59, W42, W43, Y11.33, Y11.34, Y11.53, Y11.54, Y40.0, Y40.3, Y40.4, Y40.7, Y40.9, Y41.1, Y42.2, Y42.4, Y42.5, Y42.6, Y43.0, Y44.2, Y44.3, Y45.1, Y45.4, Y46.2, Y46.4, Y47.1, Y48.5, Y49.0, Y49.2, Y49.7, Y49.9, Y51.0, Y51.2, Y51.4, Y51.5, Y51.6, Y51.7, Y52.5, Y52.6, Y53.5, Y55.4, Y55.6, Y56.1, Y57.7, Y60.0, Y60.1, Y60.2, Y60.3, Y60.4, Y60.5, Y60.6, Y60.8, Y60.9, Y61.0, Y61.1, Y61.2, Y61.3, Y61.4, Y61.5, Y61.6, Y61.8, Y61.9, Y62.0, Y62.1, Y62.2, Y62.3, Y62.4, Y62.5, Y62.6, Y62.8, Y62.9, Z58.0",
          "change_en": "Nomenclature CL011 - change in the value of Description, Display value BG and Display value EN of rows with key: B76, B76.0, B82, B82.9, C08.9, C14.0, C17.0, C17.3, C18.0, C18.1, C25.4, C38.0, C38.4, C40.1, C40.2, C40.3, C41.0, C41.2, C41.3, C41.4, C44.0, C44.1, C44.2, C44.3, C44.4, C44.5, C44.6, C44.7, C48.0, C53.0, C53.1, C53.9, C54.1, C57.9, C62.0, C63.0, C63.2, C63.9, C68.0, C69.0, C69.1, C69.2, C69.3, C69.4, C69.5, C69.9, C72.0, C72.9, C75.0, C75.1, C75.2, C75.3, C75.5, D00.1, D00.2, D01.0, D01.1, D01.2, D01.3, D01.5, D02.0, D02.1, D04.2, D04.3, D04.4, D04.5, D04.7, D04.9, D06.0, D06.1, D06.9, D07.0, D07.1, D07.4, D07.5, D09.0, D10.9, D11.9, D12.0, D12.1, D12.7, D12.8, D12.9, D13.0, D13.1, D13.2, D13.7, D14.1, D14.2, D15.0, D15.1, D15.2, D16.1, D16.2, D16.3, D16.4, D16.6, D16.7, D16.8, D20.0, D20.1, D23.0, D23.1, D23.2, D23.3, D23.4, D23.5, D23.6, D23.7, D23.9, D28.0, D28.9, D29.0, D29.1, D29.2, D29.3, D29.4, D29.7, D29.9, D30.0, D30.1, D30.2, D30.3, D30.4, D30.7, D31.0, D31.1, D31.2, D31.3, D31.4, D31.5, D31.9, D33.0, D33.1, D33.2, D33.3, D33.4, D33.7, D35.0, D35.1, D35.2, D35.3, D35.4, D35.5, D35.6, D35.8, D35.9, D36.1, D36.7, D37.1, D37.3, D37.4, D37.5, D37.6, D38.0, D38.2, D38.3, D38.4, D40.0, D40.1, D40.7, D41.0, D41.1, D41.2, D41.3, D41.4, D41.7, D43.0, D43.1, D43.2, D43.3, D43.4, D43.7, D43.9, D44.1, D44.2, D44.3, D44.4, D44.5, D44.6, D44.7, D44.8, D44.9, D48.2, D48.3, D48.4, D48.7, E56, E56.8, I24, I24.8, M24.9, M24.90, M24.91, M24.92, M24.93, M24.94, M24.95, M24.96, M24.97, M24.98, M24.99, M25.9, M25.90, M25.91, M25.92, M25.93, M25.94, M25.95, M25.96, M25.97, M25.98, M25.99, N82.1, N82.8, P03, P03.8, P61.3, P62.3, Q43.0, Q53, R09.0, S26.0, S26.00, S27.40, S27.50, S77, S77.2, T36.0, T36.3, T36.4, T36.7, T36.9, T37.1, T38.2, T38.4, T38.5, T38.6, T39.0, T39.4, T41.5, T42.0, T42.1, T42.4, T43.0, T43.2, T43.6, T43.9, T44.0, T44.2, T45.0, T45.2, T45.5, T45.7, T46.5, T46.6, T47.5, T48.4, T48.6, T49.1, T71, T75.2, T98, T98.1, V19.5, V19.50, V19.51, V19.52, V19.53, V19.54, V19.58, V19.59, V29.0, V29.00, V29.01, V29.02, V29.03, V29.04, V29.08, V29.09, V29.1, V29.10, V29.11, V29.12, V29.13, V29.14, V29.18, V29.19, V29.5, V29.50, V29.51, V29.52, V29.53, V29.54, V29.58, V29.59, V39.0, V39.00, V39.01, V39.02, V39.03, V39.04, V39.08, V39.09, V39.1, V39.10, V39.11, V39.12, V39.13, V39.14, V39.18, V39.19, V39.4, V39.40, V39.41, V39.42, V39.43, V39.44, V39.48, V39.49, V39.5, V39.50, V39.51, V39.52, V39.53, V39.54, V39.58, V39.59, V49.0, V49.00, V49.01, V49.02, V49.03, V49.04, V49.08, V49.09, V49.4, V49.40, V49.41, V49.42, V49.43, V49.44, V49.48, V49.49, V49.5, V49.50, V49.51, V49.52, V49.53, V49.54, V49.58, V49.59, V59.0, V59.00, V59.01, V59.02, V59.03, V59.04, V59.08, V59.09, V59.1, V59.10, V59.11, V59.12, V59.13, V59.14, V59.18, V59.19, V59.4, V59.40, V59.41, V59.42, V59.43, V59.44, V59.48, V59.49, V59.5, V59.50, V59.51, V59.52, V59.53, V59.54, V59.58, V59.59, V69.4, V69.40, V69.41, V69.42, V69.43, V69.44, V69.48, V69.49, V69.5, V69.50, V69.51, V69.52, V69.53, V69.54, V69.58, V69.59, V79.0, V79.00, V79.01, V79.02, V79.03, V79.04, V79.08, V79.09, V79.1, V79.10, V79.11, V79.12, V79.13, V79.14, V79.18, V79.19, V79.4, V79.40, V79.41, V79.42, V79.43, V79.44, V79.48, V79.49, V79.5, V79.50, V79.51, V79.52, V79.53, V79.54, V79.58, V79.59, W42, W43, Y11.33, Y11.34, Y11.53, Y11.54, Y40.0, Y40.3, Y40.4, Y40.7, Y40.9, Y41.1, Y42.2, Y42.4, Y42.5, Y42.6, Y43.0, Y44.2, Y44.3, Y45.1, Y45.4, Y46.2, Y46.4, Y47.1, Y48.5, Y49.0, Y49.2, Y49.7, Y49.9, Y51.0, Y51.2, Y51.4, Y51.5, Y51.6, Y51.7, Y52.5, Y52.6, Y53.5, Y55.4, Y55.6, Y56.1, Y57.7, Y60.0, Y60.1, Y60.2, Y60.3, Y60.4, Y60.5, Y60.6, Y60.8, Y60.9, Y61.0, Y61.1, Y61.2, Y61.3, Y61.4, Y61.5, Y61.6, Y61.8, Y61.9, Y62.0, Y62.1, Y62.2, Y62.3, Y62.4, Y62.5, Y62.6, Y62.8, Y62.9, Z58.0",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL025 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 376, 435, 461, 1051, 1693, 1821",
          "change_en": "Nomenclature CL025 - change in the value of Description, Display value BG and Display value EN of rows with keys: 376, 435, 461, 1051, 1693, 1821",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL085 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 391, 392",
          "change_en": "Nomenclature CL085 - change in the value of Description, Display value BG and Display value EN of rows with keys: 391, 392",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL150 - промяна в стойността на Description, Display value BG на редове с ключ: 1190900257",
          "change_en": "Nomenclature CL150 - change in the value of Description, Display value BG of rows with key: 1190900257",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - премахната стойност за Max age при: V12, V13, V14, V15, V16 тъй като в момента излиза, че тези ваксини са приложими както в годината, в която навършва възрастта, така и в следващата година",
          "change_en": "Nomenclature CL132 - removed value for Max age for: V12, V13, V14, V15, V16 because in currently appears, that these vaccines are applicable both in year, in which turns age, so and in next year",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL132 - промяна в стойността на Description и Age при ред с ключ: A7M (променя се от 50 на 45 години)",
          "change_en": "Nomenclature CL132 - change in the value of Description and Age for row with key: A7M (changes from 50 of 45 years)",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - добавяне на нови кодове A8M45, A8M70 за мамография",
          "change_en": "Nomenclature CL132 - addition of new codes A8M45, A8M70 for mammography",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - премахнати кодове: A8M50, A8M52, A8M54, A8M56, A8M58, A8M60, A8M62, A8M64, A8M66, A8M68",
          "change_en": "Nomenclature CL132 - removed codes: A8M50, A8M52, A8M54, A8M56, A8M58, A8M60, A8M62, A8M64, A8M66, A8M68",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.25",
      "file": "data/his/change-notes/v1.5.25.csv",
      "changes": [
        {
          "change": "Номенклатира CL998 - добавено съобщение за предупреждение W001 за липсваща партида от ваксина",
          "change_en": "Nomenclature CL998 - added message for warning W001 for missing batch from vaccine",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатира CL998 - добавено съобщение за предупреждение W002 за недостатъчно количество",
          "change_en": "Nomenclature CL998 - added message for warning W002 for insufficient quantity",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL150 - промяна в стойността на CL011 за рядко заболяване на ред с ключ 0511000089 - МКБ кодът е коригиран от E11 на E11.9",
          "change_en": "Nomenclature CL150 - change in the value of CL011 for rare disease of row with key 0511000089 - ICD the code is corrected from E11 of E11.9",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.24",
      "file": "data/his/change-notes/v1.5.24.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - добавен код 103 за варицела 1-ви прием",
          "change_en": "Nomenclature CL038 - added code 103 for varicella first dose",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - добавен код 104 за варицела 2-ри прием",
          "change_en": "Nomenclature CL038 - added code 104 for varicella second dose",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - добавен код 105 за коклюш при бременни",
          "change_en": "Nomenclature CL038 - added code 105 for pertussis for pregnant women",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - добавен код 106 за РСВ при бременни",
          "change_en": "Nomenclature CL038 - added code 106 for RSV for pregnant women",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.23",
      "file": "data/his/change-notes/v1.5.23.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - добавен код 102 за трета доза по новите правила за HPV",
          "change_en": "Nomenclature CL038 - added code 102 for third dose by new rules for HPV",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - промяна в правилата за кодове 100 и 101 във връзка с новата HPV програма",
          "change_en": "Nomenclature CL038 - change in rules for codes 100 and 101 in relation to new HPV program",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.22",
      "file": "data/his/change-notes/v1.5.22.csv",
      "changes": [
        {
          "change": "Номенклатура CL107 - промяна в стойностите на Description и Language EN за keys: C,Co,Cm,Cd,Cb,Cl,Cc,R,Rc",
          "change_en": "Nomenclature CL107 - change in values of Description and Language EN for keys: C,Co,Cm,Cd,Cb,Cl,Cc,R,Rc",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL107 - добавени нови кодове: NC,NCo,NCm,NCd,NCb,NCl,NCc,N,Res,DR,DRo,DRm,DRd,DRb,DRl,DRc",
          "change_en": "Nomenclature CL107 - added new codes: NC,NCo,NCm,NCd,NCb,NCl,NCc,N,Res,DR,DRo,DRm,DRd,DRb,DRl,DRc",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL107 - промяна в стойността на meta.Incompatible other codes from CL107 за keys: H,P,О,Oo,Om,Od,Ob,Ol,Oc,E,B,X,F.I,Re,T",
          "change_en": "Nomenclature CL107 - change in the value of meta.Incompatible other codes from CL107 for keys: H,P,O,Oo,Om,Od,Ob,Ol,Oc,E,B,X,F.I,Re,T",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL107 - промяна в ключа на записи при които ключът е бил изписан на кирилица - заменя се с еквивалент на латиница при стойности с keys: Е, О, К, Т",
          "change_en": "Nomenclature CL107 - change in key of records for which the key was written of Cyrillic - replaces with equivalent of Latin for values with keys: is, O, K, T",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL022 - добавени нови кодове: 65-226, 98-012, 98-013, 98-014",
          "change_en": "Nomenclature CL022 - added new codes: 65-226, 98-012, 98-013, 98-014",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL022 - добавени нови Meta data колони за стойности за: LOINC и SNOMED",
          "change_en": "Nomenclature CL022 - added new Meta data columns for values for: LOINC and SNOMED",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL022 - добавени стойности за meta.LOINC за ключове: 03-002, 03-00C, 03-011",
          "change_en": "Nomenclature CL022 - added values for meta.LOINC for keys: 03-002, 03-00C, 03-011",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL024 - добавени нови кодове: 02-00A-03, 02-00A-04, 02-00A-05, 65-226-01, 65-226-02,65-226-03, 65-226-04, 65-226-05, 65-226-06, 65-226-07, 65-226-08, 65-226-09,65-226-10,  98-012-01, 98-012-02, 98-012-03, 98-012-04, 98-012-05, 98-012-06, 98-012-07, 98-012-08, 98-012-09, 98-012-0A, 98-014-01, 98-013-01, 98-013-02, 98-013-03, 98-013-04, 98-013-05, 98-013-06, 98-013-07, 98-013-08, 98-013-09, 98-013-0A, 98-013-0B, 98-013-0C, 98-013-0D, 98-013-0E, 98-013-0F, 98-013-10, 98-013-11, 98-013-12, 98-013-13, 98-013-14, 98-013-15, 98-013-16, 98-013-17",
          "change_en": "Nomenclature CL024 - added new codes: 02-00A-03, 02-00A-04, 02-00A-05, 65-226-01, 65-226-02,65-226-03, 65-226-04, 65-226-05, 65-226-06, 65-226-07, 65-226-08, 65-226-09,65-226-10, 98-012-01, 98-012-02, 98-012-03, 98-012-04, 98-012-05, 98-012-06, 98-012-07, 98-012-08, 98-012-09, 98-012-0A, 98-014-01, 98-013-01, 98-013-02, 98-013-03, 98-013-04, 98-013-05, 98-013-06, 98-013-07, 98-013-08, 98-013-09, 98-013-0A, 98-013-0B, 98-013-0C, 98-013-0D, 98-013-0E, 98-013-0F, 98-013-10, 98-013-11, 98-013-12, 98-013-13, 98-013-14, 98-013-15, 98-013-16, 98-013-17",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL024 - добавени нови Meta data колони за стойности за: SNOMED",
          "change_en": "Nomenclature CL024 - added new Meta data columns for values for: SNOMED",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL028 - добавени нови Meta data колони за стойности за: Description EN, Label BG, Label EN, а колоната Description се променя на Description BG",
          "change_en": "Nomenclature CL028 - added new Meta data columns for values for: Description EN, Label BG, Label EN, and the column Description changes of Description BG",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL094 за Разделение на възрастови групи",
          "change_en": "Created nomenclature CL094 for Division of age groups",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL032 - добавени нови кодове: 4, 5",
          "change_en": "Nomenclature CL032 - added new codes: 4, 5",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL032 - добавени нови Meta data колони за стойности за: LOINC и SNOMED",
          "change_en": "Nomenclature CL032 - added new Meta data columns for values for: LOINC and SNOMED",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL032 - добавени нови Meta data колони за стойности за: Description EN, Label BG, Label EN, а колоната Description се променя на Description BG",
          "change_en": "Nomenclature CL032 - added new Meta data columns for values for: Description EN, Label BG, Label EN, and the column Description changes of Description BG",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL032 - добавени стойности за всички нови Meta data за ключове: 1, 2, 3",
          "change_en": "Nomenclature CL032 - added values for all new Meta data for keys: 1, 2, 3",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - промяна в стойностите на Display Value BG и Display Value EN за кодове: 84, 85, 86 поради допусната техническа грешка в изписването на поредност на дозите",
          "change_en": "Nomenclature CL038 - change in values of Display Value BG and Display Value EN for codes: 84, 85, 86 due to a technical error in spelling of sequence of doses",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.21",
      "file": "data/his/change-notes/v1.5.21.csv",
      "changes": [
        {
          "change": "Създадена номенклатура CL148 във връзка с регистър на Заразните болести",
          "change_en": "Created nomenclature CL148 in relation to registry of Infectious Diseases",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL011 - добавяне на нови заболявания с кодове: J09, U04, U04.9",
          "change_en": "Nomenclature CL011 - addition of new diseases with codes: J09, U04, U04.9",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL011 - добавяне на колона към Meta data с информация за това дали конкретния МКБ код е за заразно заболяване - Contagious (релация към CL148)",
          "change_en": "Nomenclature CL011 - addition of column to Meta data with information about this whether the specific ICD code is for infectious disease - Contagious (relation to CL148)",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL149 за категоризация на случаите на заразни заболявания",
          "change_en": "Created nomenclature CL149 for categorization of cases of infectious diseases",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - добавяне на колони към Meta data с информация за имена при мигрирани данни от НЗОК - колони Display transfered data BG и Display transfered data EN",
          "change_en": "Nomenclature CL038 - addition of columns to Meta data with information about names for migrated data from NHIF - columns Display transfered data BG and Display transfered data EN",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - добавяне на колона към Meta data с информация за групата на имунизационните програми - Program Group, която преди беше представена като отделни редове и липсваше в данните по отделните кодове",
          "change_en": "Nomenclature CL038 - addition of column to Meta data with information about group of immunization programs - Program Group, which was previously presented as separate rows and was missing in data by individual codes",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL018 - добавяне на код 10 за здравен експерт от МОН",
          "change_en": "Nomenclature CL018 - addition of code 10 for health expert from Ministry of Education and Science",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL018 - добавяне на код 11 за инспектор от ИАМН",
          "change_en": "Nomenclature CL018 - addition of code 11 for inspector from Medical Supervision Executive Agency",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL150 за редки заболявания по Orhpanet",
          "change_en": "Created nomenclature CL150 for rare diseases by Orhpanet",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL078 - добавяне на колони към Meta data с информация за описание при редки заболявания - Orpha diseases label BG и Orpha diseases label EN",
          "change_en": "Nomenclature CL078 - addition of columns to Meta data with information about description for rare diseases - Orpha diseases label BG and Orpha diseases label EN",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL084 - корекция в наименованието на номенклатурата",
          "change_en": "Nomenclature CL084 - Correction in the name of the nomenclature",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL086 - корекция в наименованието на номенклатурата",
          "change_en": "Nomenclature CL086 - Correction in the name of the nomenclature",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.20",
      "file": "data/his/change-notes/v1.5.20.csv",
      "changes": [
        {
          "change": "Номенклатура CL037 - добавена ваксина с код 46255 - Bexsero",
          "change_en": "Nomenclature CL037 - added vaccine with code 46255 - Bexsero",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - промяна в данните за код 73 и 74 за следните данни: Dose number (брой дози); Min age; Rules; CL037 Mapping (2025)",
          "change_en": "Nomenclature CL038 - change in data for code 73 and 74 for the following data: Dose number (number doses); Min age; Rules; CL037 Mapping (2025)",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL001 - премахване на записи с код 3 и 4",
          "change_en": "Nomenclature CL001 - removal of records with code 3 and 4",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL147",
          "change_en": "Created nomenclature CL147",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL037 - спиране на кодове: 16568, 15497, 17327 поради смяна на продуктите за противогрипни ваксини",
          "change_en": "Nomenclature CL037 - discontinuation of codes: 16568, 15497, 17327 due to a change of products for influenza vaccines",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL037 - добавени ваксини с кодове: 66739 (Vaxigrip), 66737 (Vaxigrip)",
          "change_en": "Nomenclature CL037 - added vaccines with codes: 66739 (Vaxigrip), 66737 (Vaxigrip)",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - промяна на кодове за връзка към CL037 - сменят се стойностите за код 99 и 72",
          "change_en": "Nomenclature CL038 - change of codes for relation to CL037 - change values for code 99 and 72",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.19",
      "file": "data/his/change-notes/v1.5.19.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - спиране на кодове 77, 78, 79 и 80 във връзка със стартиране на новата HPV програма и въвеждането на кодове 100 и 101",
          "change_en": "Nomenclature CL038 - discontinuation of codes 77, 78, 79 and 80 in relation with launch of new HPV program and introduction of codes 100 and 101",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL037 - спиране на код 1542 за ваксина Pentaxim поради изтичане на срок на годност на последни закупени партиди до 30.06.2025. Ваксината се заменя от Infanrix-IPV+HIB",
          "change_en": "Nomenclature CL037 - discontinuation of code 1542 for vaccine Pentaxim due to expiration of term of validity of last purchased batches until 30.06.2025. the vaccine replaces from Infanrix-IPV+HIB",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - премахната е връзка към CL037 за кодове 28, 29, 30 и 31 за ваксина 1542 поради спиране на ваксина Pentaxim",
          "change_en": "Nomenclature CL038 - removed is relation to CL037 for codes 28, 29, 30 and 31 for vaccine 1542 due to discontinuation of vaccine Pentaxim",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.18",
      "file": "data/his/change-notes/v1.5.18.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - премахната е връзка към CL037 за кодове 48 и 49, като е премахната възможността за прилагане на код 16979 (Preventar 13) за пневмококови имунизации",
          "change_en": "Nomenclature CL038 - removed is relation to CL037 for codes 48 and 49, as is removed the possibility for administration of code 16979 (Preventar 13) for pneumococcal immunizations",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 28, 29, 30, 44, 61, 62, 63, 64, 70, 74, 98",
          "change_en": "Nomenclature CL038 - change of values for Min age and Max age for codes: 28, 29, 30, 44, 61, 62, 63, 64, 70, 74, 98",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - премахнато правило от rules за код 52 по отношение на минимален интервал между дозите",
          "change_en": "Nomenclature CL038 - Removed rule from rules for code 52 regarding minimum interval between doses",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - промяна в Dose number за код 59, 73, 74, 91, 92, 98",
          "change_en": "Nomenclature CL038 - change in Dose number for code 59, 73, 74, 91, 92, 98",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - при код 81 е премахната връзката към CL037 за код 16074 (Gardasil)",
          "change_en": "Nomenclature CL038 - for code 81 is removed the relation to CL037 for code 16074 (Gardasil)",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL037 - възстановен е код 1234 за ваксина Priorix",
          "change_en": "Nomenclature CL037 - restored is code 1234 for vaccine Priorix",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - при код 45 е добавена връзката към CL037 за код 1234 (Priorix) за регистиране на случаи по медицински проучвания за ваксината",
          "change_en": "Nomenclature CL038 - for code 45 is added the relation to CL037 for code 1234 (Priorix) for registration of cases by Medical studies for the vaccine",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL022 - промяна в Description и Display Value EN за кодове: 04-030; 00-02C във връзка с промени в приложение № 10 „Изисквания на НЗОК за сключване на договор с лечебни заведения за оказване на СИМП“",
          "change_en": "Nomenclature CL022 - change in Description and Display Value EN for codes: 04-030; 00-02C in relation to changes in appendix № 10 „Requirements of NHIF for concluding of contract with medical institutions for provision of SIMP“",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL022 - добавени нови кодове: 02-029; 0B-04E; 03-029",
          "change_en": "Nomenclature CL022 - added new codes: 02-029; 0B-04E; 03-029",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL022 - за код 02-024 са добавени стойности за NHIF code и NHIF Package",
          "change_en": "Nomenclature CL022 - for code 02-024 were added values for NHIF code and NHIF Package",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL024 - добавени нови кодове: 02-029-00; 0B-04E-00; 03-029-00",
          "change_en": "Nomenclature CL024 - added new codes: 02-029-00; 0B-04E-00; 03-029-00",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - всички възрасти в Min age и Max age, които са в седмици, са преобразувани в дни. Това включва Min age при кодове: 28, 29, 30 и 70",
          "change_en": "Nomenclature CL038 - all ages in Min age and Max age, that are in weeks, were converted in days. this includes Min age for codes: 28, 29, 30 and 70",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.17",
      "file": "data/his/change-notes/v1.5.17.csv",
      "changes": [
        {
          "change": "Номенклатура CL037 - добавена стойност за Target desease за код 64095",
          "change_en": "Nomenclature CL037 - added value for Target desease for code 64095",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL021 - променен Description и Language EN за код 14 (добавено пояснение, че е Скрийнинг по национална програма)",
          "change_en": "Nomenclature CL021 - changed Description and Language EN for code 14 (added clarification, that is Screening by national program)",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL047 - променен Description и Language EN за код 12 (добавено пояснение, че е Скрийнинг по национална програма)",
          "change_en": "Nomenclature CL047 - changed Description and Language EN for code 12 (added clarification, that is Screening by national program)",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 7, 8, 9, 27, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 46, 99. Промените са при всички възрасти над 12г. при които минималната възраст е в годината, в която пациентът навършва възрастта. Увеличен е периодът, така че да не сработват контроли при лица, които са гранично родени в началото и края на календарна година.",
          "change_en": "Nomenclature CL038 - change of values for Min age and Max age for codes: 7, 8, 9, 27, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 46, 99. Changes are for all ages over 12 years. for which minimum age is in year, in which the patient turns age. Increased is period, so that to not controls trigger for persons, that are born near the boundary in beginning and end of calendar year.",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.16",
      "file": "data/his/change-notes/v1.5.16.csv",
      "changes": [
        {
          "change": "Номенклатура CL132 - промяна на стойност за Max age при преглед A2M20, A2M25 и A8M68 - намаляват се с 1 година, тъй като се горната възрастова граница е до годината, в която се навършва възрастта и се удължават събитията",
          "change_en": "Nomenclature CL132 - change of value for Max age for examination A2M20, A2M25 and A8M68 - decrease with 1 year, because upper age limit is until year, in which turns age and extend the events",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"03-028\" в номенклатура CL022",
          "change_en": "Added code \"03-028\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"03-028-00\" в номенклатура CL024",
          "change_en": "Added code \"03-028-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени кодове 9, 10, 11 в номенклатура CL002",
          "change_en": "Added codes 9, 10, 11 in nomenclature CL002",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код 4 в номенклатура CL055",
          "change_en": "Added code 4 in nomenclature CL055",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени кодове 100, 101 в номенклатура CL038 за новите правила за HPV",
          "change_en": "Added codes 100, 101 in nomenclature CL038 for new rules for HPV",
          "regarding_vaccines": true
        },
        {
          "change": "Промяна на descr и min age при код 81 в номенклатура CL038",
          "change_en": "Change of descr and min age for code 81 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Създадена номенклатура CL146",
          "change_en": "Created nomenclature CL146",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.15",
      "file": "data/his/change-notes/v1.5.15.csv",
      "changes": [
        {
          "change": "Номенклатура CL132 - промяна на стойност за Event trigger при прегледи J17 и A1 на \"от/до навършване на възрастта\" с цел да няма застъпване на събития при преходни вързрасти",
          "change_en": "Nomenclature CL132 - change of value for Event trigger for examinations J17 and A1 of \"from/until turning of age\" to to no overlap of events for transitional ages",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 16, 17, 18, 43, 44, 48, 49, 73, 82, 83, 84, 85, 86. Всички възрасти, които са записани в седмици (weeks) са преобразувани в дни, за да може да се считат до дни включително (примерно 20 weeks = 20 * 7 + 6 дни за до края на 20-тата седмица = 146)",
          "change_en": "Nomenclature CL038 - change of values for Min age and Max age for codes: 16, 17, 18, 43, 44, 48, 49, 73, 82, 83, 84, 85, 86. all ages, that are written in weeks (weeks) were converted in days, for to may to count until days inclusive (e.g. 20 weeks = 20 * 7 + 6 days for until end of 20th week = 146)",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL037 - за код 3339 (Infanrix-IPV+HIB) е променена стойността на number of doses от 3 на 4",
          "change_en": "Nomenclature CL037 - for code 3339 (Infanrix-IPV+HIB) is changed the value of number of doses from 3 of 4",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.14",
      "file": "data/his/change-notes/v1.5.14.csv",
      "changes": [
        {
          "change": "Номенклатура CL132 - добавена стойност за Max age при преглед A5M, за да няма застъпване с дейностите по A10M",
          "change_en": "Nomenclature CL132 - added value for Max age for examination A5M, so there is no overlap with activities by A10M",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL018 - добавен код 9 за медицинска експертиза",
          "change_en": "Nomenclature CL018 - added code 9 for medical expertise",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.13",
      "file": "data/his/change-notes/v1.5.13.csv",
      "changes": [
        {
          "change": "Номенклатура CL038 - добавена нова ваксина по CL037 - 57335 за кодове: 48, 49 и 51",
          "change_en": "Nomenclature CL038 - added new vaccine by CL037 - 57335 for codes: 48, 49 and 51",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL044 - добавени са всички ЕКАТТЕ записи към публичната номенклатура. Включени са към номенклатурата всички селищни образувания",
          "change_en": "Nomenclature CL044 - added are all EKATTE records to public nomenclature. Included are to the nomenclature all settlement formations",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL007 - премахнати грешно дублирани записи за Т4 и Т5",
          "change_en": "Nomenclature CL007 - removed incorrectly duplicated records for T4 and T5",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL134 - добавена колона Ask once със стойност тип boolean, с която се посочва дали даден въпрос да се задава повторно, ако веднъж вече е получил отговор, различен от NULL или отрицателен отговор",
          "change_en": "Nomenclature CL134 - added column Ask once with value type boolean, with which indicates whether given question to asked again, if once already is received response, different from NULL or negative response",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL114 - добавен нов лекарствен продукт с код 28724 - Fentanyl Kalceks",
          "change_en": "Nomenclature CL114 - added new medicinal product with code 28724 - Fentanyl Kalceks",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL139 - добавен код 07.99, който да се използва в случай, че битово-санитарните условия са добри",
          "change_en": "Nomenclature CL139 - added code 07.99, which to uses in case, that household sanitary conditions are good",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL037 - добавена стойност за vaccine group за код 57335",
          "change_en": "Nomenclature CL037 - added value for vaccine group for code 57335",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL018 - добавен код 8 за фелдшери във връзка с отделянето им от БАПЗГ",
          "change_en": "Nomenclature CL018 - added code 8 for physician assistants in relation to their separation from BAPH",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.12",
      "file": "data/his/change-notes/v1.5.12.csv",
      "changes": [
        {
          "change": "Номенклатура CL139 - промяна в код 07.01 и добавени стойности за кодове от 07.02 до 07.11 - възможни отговори за битово-санитарни условия",
          "change_en": "Nomenclature CL139 - change in code 07.01 and added values for codes from 07.02 until 07.11 - possible answers for household sanitary conditions",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL134 - промяна на Note за код 04.03",
          "change_en": "Nomenclature CL134 - change of Note for code 04.03",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - добавена стойност за Max age при преглед A6M, за да няма застъпване с дейностите по A10M",
          "change_en": "Nomenclature CL132 - added value for Max age for examination A6M, so there is no overlap with activities by A10M",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.11",
      "file": "data/his/change-notes/v1.5.11.csv",
      "changes": [
        {
          "change": "Номенклатура CL144 - промяна на стойности в колона Units при кодове: 65-226-02, 65-226-08, 98-012-01, 98-012-02, 98-012-04",
          "change_en": "Nomenclature CL144 - change of values in column Units for codes: 65-226-02, 65-226-08, 98-012-01, 98-012-02, 98-012-04",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - промяна на стойности в колона Max age при код V1",
          "change_en": "Nomenclature CL132 - change of values in column Max age for code V1",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - добавени стойности в колони Min interval from common index и Max interval from common index указващи минимален и максимален интервал между дози от една и съща група ваксини (групата се хваща по ключа в колона Common index) за кодове: V3, V7, V9",
          "change_en": "Nomenclature CL132 - added values in columns Min interval from common index and Max interval from common index indicating minimum and maximum interval between doses from one and same group vaccines (group captures by key in column Common index) for codes: V3, V7, V9",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL038 - добавени нови колони в Meta data със следните наименования: Display value BG и Display value EN, които да се използват при визуализация на данни за поствени ваксини от съответната група",
          "change_en": "Nomenclature CL038 - added new columns in Meta data with the following names: Display value BG and Display value EN, that to are used for visualization of data for administered vaccines from corresponding group",
          "regarding_vaccines": true
        },
        {
          "change": "Номенклатура CL132 - промени стойности на Description, Display value Bg и Display value En за код A1M",
          "change_en": "Nomenclature CL132 - changes values of Description, Display value Bg and Display value En for code A1M",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL132 - добаве код J1M, включващ изследванията на урина от всички профилактични прегледи от група J*",
          "change_en": "Nomenclature CL132 - added code J1M, including tests of urine from all preventive examinations from group J*",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.10",
      "file": "data/his/change-notes/v1.5.10.csv",
      "changes": [
        {
          "change": "Добавен запис с код 9 в CL069",
          "change_en": "Added record with code 9 in CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализирани данни в CL107 - променени стойности за Language En за кодове: Co, Cm, Cd, Cb, Cl, Cc",
          "change_en": "Updated data in CL107 - changed values for Language En for codes: Co, Cm, Cd, Cb, Cl, Cc",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени записи в CL037 с кодове: 58090, 64095, 64907",
          "change_en": "Added records in CL037 with codes: 58090, 64095, 64907",
          "regarding_vaccines": true
        },
        {
          "change": "Направени промени в CL038 в колона CL037 Mapping (2024) при кодове: 00, 16, 17, 18, 28, 29, 30, 31, 61, 62, 63, 64, 68, 69",
          "change_en": "Made changes in CL038 in column CL037 Mapping (2024) for codes: 00, 16, 17, 18, 28, 29, 30, 31, 61, 62, 63, 64, 68, 69",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирано заглавие на номенклатура CL0144 на CL144",
          "change_en": "Corrected title of nomenclature CL0144 of CL144",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.9",
      "file": "data/his/change-notes/v1.5.9.csv",
      "changes": [
        {
          "change": "Номенклатура CL144 - премахната стойност в колона Units при код 99-004-01",
          "change_en": "Nomenclature CL144 - removed value in column Units for code 99-004-01",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код S2 в номенклатура CL132",
          "change_en": "Removed code S2 in nomenclature CL132",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код S3 в номенклатура CL132",
          "change_en": "Added code S3 in nomenclature CL132",
          "regarding_vaccines": false
        },
        {
          "change": "Добавенa стойност за MH code за код \"57335\" в номенклатура CL037",
          "change_en": "Added value for MH code for code \"57335\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Възстановяване на код 57335 в номенклатура CL037",
          "change_en": "Restoration of code 57335 in nomenclature CL037",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.8",
      "file": "data/his/change-notes/v1.5.8.csv",
      "changes": [
        {
          "change": "Добавен код \"01.05\" в номенклатура CL139",
          "change_en": "Added code \"01.05\" in nomenclature CL139",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"75-175\" от номенклатура CL142",
          "change_en": "Removed code \"75-175\" from nomenclature CL142",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL142 е реструктприрана да съдържа само дейности от дългосрочната грижа (т.е. без дейности от CL050)",
          "change_en": "Nomenclature CL142 is restructured to contains only activities from long-term care (i.e. without activities from CL050)",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"76-168\" от номенклатура CL142",
          "change_en": "Removed code \"76-168\" from nomenclature CL142",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната колона Specialty (CL006) в номенклатура CL142 - преминава в PR001",
          "change_en": "Removed column Specialty (CL006) in nomenclature CL142 - moves in PR001",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL144",
          "change_en": "Created nomenclature CL144",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL145",
          "change_en": "Created nomenclature CL145",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена колона Organization BG / Organization EN в номенклатура CL018",
          "change_en": "Added column Organization BG / Organization EN in nomenclature CL018",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.7",
      "file": "data/his/change-notes/v1.5.7.csv",
      "changes": [
        {
          "change": "Коригирани текстове в CL110",
          "change_en": "Corrected texts in CL110",
          "regarding_vaccines": false
        },
        {
          "change": "Променена номенклатура CL112 в съответствие с новата наредба за зъболекарските дейности. Старите кодове остават валидни до 1.12.2024",
          "change_en": "Changed nomenclature CL112 in accordance with new regulation for dental activities. old codes remain valid until 1.12.2024",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.6",
      "file": "data/his/change-notes/v1.5.6.csv",
      "changes": [
        {
          "change": "Добавен нов ред \"00-030\" в номенклатура CL022",
          "change_en": "Added new row \"00-030\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"00-030-00\" в номенклатура CL024",
          "change_en": "Added new row \"00-030-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Към CL088 e добавена колона F с \"CL50 Mapping\" с връзка към номенклатура CL050",
          "change_en": "To CL088 e added column F with \"CL50 Mapping\" with relation to nomenclature CL050",
          "regarding_vaccines": false
        },
        {
          "change": "Към CL088 е добавени стойности за CL028 Mapping за записи: 75-175-01; 76-168-01",
          "change_en": "To CL088 is added values for CL028 Mapping for records: 75-175-01; 76-168-01",
          "regarding_vaccines": false
        },
        {
          "change": "Към CL088 е добавени колона за CL032 Mapping за излседванията, при които CL028 е по номенклатура",
          "change_en": "To CL088 is added column for CL032 Mapping for tests, for which CL028 is by nomenclature",
          "regarding_vaccines": false
        },
        {
          "change": "Към CL088 е добавени стойности за CL032 Mapping за записи: 75-175-01",
          "change_en": "To CL088 is added values for CL032 Mapping for records: 75-175-01",
          "regarding_vaccines": false
        },
        {
          "change": "Променена номенклатура CL110 в съответствие с новата наредба за зъболекарските дейности. Старите кодове остават валидни до 1.12.2024",
          "change_en": "Changed nomenclature CL110 in accordance with new regulation for dental activities. old codes remain valid until 1.12.2024",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.5",
      "file": "data/his/change-notes/v1.5.5.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL143",
          "change_en": "Added nomenclature CL143",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"1\" в номенклатура CL143",
          "change_en": "Added new code \"1\" in nomenclature CL143",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"12\" в номенклатура CL047",
          "change_en": "Added new code \"12\" in nomenclature CL047",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"14\" в номенклатура CL021",
          "change_en": "Added new code \"14\" in nomenclature CL021",
          "regarding_vaccines": false
        },
        {
          "change": "Код \"8\" в номенклатура CL069 става неактивен след 30.09.2024",
          "change_en": "Code \"8\" in nomenclature CL069 becomes inactive after 30.09.2024",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.4",
      "file": "data/his/change-notes/v1.5.4.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL142",
          "change_en": "Added nomenclature CL142",
          "regarding_vaccines": false
        },
        {
          "change": "Възстановена номенклатура CL050 спрямо версия 1.5.2 на спецификацията",
          "change_en": "Restored nomenclature CL050 compared with version 1.5.2 of specification",
          "regarding_vaccines": false
        },
        {
          "change": "Корекция в nhif_code в номенклатура CL142 за кодове: 11-025, 29-019, 64-120, 60-103",
          "change_en": "Correction in nhif_code in nomenclature CL142 for codes: 11-025, 29-019, 64-120, 60-103",
          "regarding_vaccines": false
        },
        {
          "change": "Възстановяване на деактивирани кодове в CL037 - 1754 и 3339",
          "change_en": "Restoration of deactivated codes in CL037 - 1754 and 3339",
          "regarding_vaccines": true
        },
        {
          "change": "В номенклатура CL038 - добавяне на код 1754 в Meta Data - CL037 за кодове: 16, 17, 18",
          "change_en": "In nomenclature CL038 - addition of code 1754 in Meta Data - CL037 for codes: 16, 17, 18",
          "regarding_vaccines": true
        },
        {
          "change": "В номенклатура CL038 - добавяне на код 3339 в Meta Data - CL037 за кодове: 28, 29, 30, 31",
          "change_en": "In nomenclature CL038 - addition of code 3339 in Meta Data - CL037 for codes: 28, 29, 30, 31",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.5.3",
      "file": "data/his/change-notes/v1.5.3.csv",
      "changes": [
        {
          "change": "Добавен нови кодове: \"D-09-004\" и \"D-09-005\" в номенклатура CL110",
          "change_en": "Added new codes: \"D-09-004\" and \"D-09-005\" in nomenclature CL110",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализация на Meta Data - \"ACHI Code\" за кодове: 0C-015, 0C-124 и 0C-165 в номенклатура CL022",
          "change_en": "Update of Meta Data - \"ACHI Code\" for codes: 0C-015, 0C-124 and 0C-165 in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на поле в колона \"C\" ред 17 от номенклатура CL132",
          "change_en": "Corrected field name in column \"C\" row 17 from nomenclature CL132",
          "regarding_vaccines": false
        },
        {
          "change": "Възстановяване на записи от версия 1.2.7 в номенклатура CL050, в това число на кодове: 02-002, 09-019, 10-022, 09-023, 11-025, 14-032, 17-041, 19-043, 19-044, 24-003, 20-006, 20-007, 29-011, 27-016, 29-019, 31-023, 36-037, 36-038, 36-040, 35-041, 47-046, 58-087, 56-088, 60-103, 60-104, 64-119, 64-120, 65-122, 65-135, 65-136, 67-143, 68-146, 68-148, 68-149, 69-150, 69-152, 70-161, 67-189, 71-193, 65-229, 73-231, 73-232, 69-296, 74-305, 74-306, 70-343, 71-350, 71-352, 69-378, 71-384, 71-385, 67-386, 80-389, 79-390, 77-392, 77-396, 77-398, 77-399, 77-401, 77-402, 77-403, 77-404, 59-095, 71-157, 71-388, 71-195, 73-287, 73-288, 73-289, 73-290, 73-291, 70-344, 70-345, 71-346, 71-347, 71-348, 71-349, 73-355, 70-359, 71-383, 71-190, 74-303, 74-304, 28-010, 33-020, 67-387, 71-353",
          "change_en": "Restoration of records from version 1.2.7 in nomenclature CL050, in this number of codes: 02-002, 09-019, 10-022, 09-023, 11-025, 14-032, 17-041, 19-043, 19-044, 24-003, 20-006, 20-007, 29-011, 27-016, 29-019, 31-023, 36-037, 36-038, 36-040, 35-041, 47-046, 58-087, 56-088, 60-103, 60-104, 64-119, 64-120, 65-122, 65-135, 65-136, 67-143, 68-146, 68-148, 68-149, 69-150, 69-152, 70-161, 67-189, 71-193, 65-229, 73-231, 73-232, 69-296, 74-305, 74-306, 70-343, 71-350, 71-352, 69-378, 71-384, 71-385, 67-386, 80-389, 79-390, 77-392, 77-396, 77-398, 77-399, 77-401, 77-402, 77-403, 77-404, 59-095, 71-157, 71-388, 71-195, 73-287, 73-288, 73-289, 73-290, 73-291, 70-344, 70-345, 71-346, 71-347, 71-348, 71-349, 73-355, 70-359, 71-383, 71-190, 74-303, 74-304, 28-010, 33-020, 67-387, 71-353",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализиране на Description, Display value BG и Display value EN в номенклатура CL132 при всички налични записи",
          "change_en": "Updating of Description, Display value BG and Display value EN in nomenclature CL132 for all available records",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализиране на age и max age при всички ваксини в номенклатура CL132 в това число на кодове: V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16, V17",
          "change_en": "Updating of age and max age for all vaccines in nomenclature CL132 in this number of codes: V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16, V17",
          "regarding_vaccines": true
        },
        {
          "change": "Изравняване на данните за age и max age с цел записите да са валидни в рамките на календарната година на навършване на възрастта в номенклатура CL132 за кодове: J7, J7M, J8, J9, J10, J10M, J11, J12, J13, J13M, J14, J15, J16, J16M, J17, A30, A31, A32, A33, A34, A35, A36, A37, A38, A39",
          "change_en": "Alignment of data for age and max age to records to are valid in within of calendar year of turning of age in nomenclature CL132 for codes: J7, J7M, J8, J9, J10, J10M, J11, J12, J13, J13M, J14, J15, J16, J16M, J17, A30, A31, A32, A33, A34, A35, A36, A37, A38, A39",
          "regarding_vaccines": false
        },
        {
          "change": "Корекция на данните за max age с цел избягване на застъпване със следващ преглед в номенклатура CL132 в това число на кодове: A2M30, A4M30, A4M32, A4M34, A2M35, A4M36, A4M38, A2M40, A3M40, A4M40, A4M42, A4M44, A3M45, A2M45, A4M46, A4M48, A3M50, A2M50, A8M50, A8M52, A8M54, A3M55, A2M55, A8M56, A8M58, A8M60, A2M60, A8M62, A8M64, A8M66",
          "change_en": "Correction of data for max age to avoidance of overlap with next examination in nomenclature CL132 in this number of codes: A2M30, A4M30, A4M32, A4M34, A2M35, A4M36, A4M38, A2M40, A3M40, A4M40, A4M42, A4M44, A3M45, A2M45, A4M46, A4M48, A3M50, A2M50, A8M50, A8M52, A8M54, A3M55, A2M55, A8M56, A8M58, A8M60, A2M60, A8M62, A8M64, A8M66",
          "regarding_vaccines": false
        },
        {
          "change": "Корекция на данни за Display value EN в номенклатура CL132 за кодове: V3, V5, V6, V11, V12, V15",
          "change_en": "Correction of data for Display value EN in nomenclature CL132 for codes: V3, V5, V6, V11, V12, V15",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код 75-390-01 в номенклатура CL088",
          "change_en": "Added code 75-390-01 in nomenclature CL088",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.2",
      "file": "data/his/change-notes/v1.5.2.csv",
      "changes": [
        {
          "change": "Добавен нов код \"01.04\" в номенклатура CL139",
          "change_en": "Added new code \"01.04\" in nomenclature CL139",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.1",
      "file": "data/his/change-notes/v1.5.1.csv",
      "changes": [
        {
          "change": "Добавен нов код \"5\" в номенклатура CL137",
          "change_en": "Added new code \"5\" in nomenclature CL137",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL141",
          "change_en": "Created nomenclature CL141",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови кодове B, C, A, S, V, M, N, T, HC в номенклатура CL102",
          "change_en": "Added new codes B, C, A, S, V, M, N, T, HC in nomenclature CL102",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.5.0",
      "file": "data/his/change-notes/v1.5.0.csv",
      "changes": [
        {
          "change": "Добавен нов код \"8\" в номенклатура CL069",
          "change_en": "Added new code \"8\" in nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"4\" в номенклатура CL028",
          "change_en": "Added new code \"4\" in nomenclature CL028",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"5\" в номенклатура CL028",
          "change_en": "Added new code \"5\" in nomenclature CL028",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"58717\" в номенклатура CL114",
          "change_en": "Added new code \"58717\" in nomenclature CL114",
          "regarding_vaccines": false
        },
        {
          "change": "Реконструирана номенклатура CL050",
          "change_en": "Reconstructed nomenclature CL050",
          "regarding_vaccines": false
        },
        {
          "change": "Реконструирана номенклатура CL088",
          "change_en": "Reconstructed nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL126",
          "change_en": "Created nomenclature CL126",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL127",
          "change_en": "Created nomenclature CL127",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL128",
          "change_en": "Created nomenclature CL128",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL130",
          "change_en": "Created nomenclature CL130",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL131",
          "change_en": "Created nomenclature CL131",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL132",
          "change_en": "Created nomenclature CL132",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL133",
          "change_en": "Created nomenclature CL133",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL134",
          "change_en": "Created nomenclature CL134",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL136",
          "change_en": "Created nomenclature CL136",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL137",
          "change_en": "Created nomenclature CL137",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL138",
          "change_en": "Created nomenclature CL138",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL139",
          "change_en": "Created nomenclature CL139",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на поле в колона \"Е\" ред 9 от номенклатура CL088",
          "change_en": "Corrected field name in column \"is\" row 9 from nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL140",
          "change_en": "Created nomenclature CL140",
          "regarding_vaccines": false
        },
        {
          "change": "Деактивиране на следните кодове в CL037: 1234, 4084, 16291, 16744, 2683, 16962, 16058, 1754, 3339, 61121, 57335 считано от 17.04.2024",
          "change_en": "Deactivation of the following codes in CL037: 1234, 4084, 16291, 16744, 2683, 16962, 16058, 1754, 3339, 61121, 57335 effective from 17.04.2024",
          "regarding_vaccines": true
        },
        {
          "change": "Актуализиране на записи с Key: 16, 17, 18, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 51, 00 на колона F в номенклатура CL038",
          "change_en": "Updating of records with Key: 16, 17, 18, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 51, 00 of column F in nomenclature CL038",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.4.13",
      "file": "data/his/change-notes/v1.4.13.csv",
      "changes": [
        {
          "change": "Коригирано наименование на ред 6 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 6 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 7 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 7 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 8 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 8 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 9 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 9 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 10 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 10 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 11 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 11 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 12 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 12 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 16 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 16 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 17 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 17 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 18 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 18 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 19 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 19 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 20 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 20 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 21 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 21 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 22 колона B  в номенклатура CL107",
          "change_en": "Corrected row name 22 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код P187.1 в номенклатура CL062",
          "change_en": "Added new code P187.1 in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код P187.2 в номенклатура CL062",
          "change_en": "Added new code P187.2 in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код P262.1 в номенклатура CL062",
          "change_en": "Added new code P262.1 in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код P262.2 в номенклатура CL062",
          "change_en": "Added new code P262.2 in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код P265.3 в номенклатура CL062",
          "change_en": "Added new code P265.3 in nomenclature CL062",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.12",
      "file": "data/his/change-notes/v1.4.12.csv",
      "changes": [
        {
          "change": "Добавен нов код 152 в номенклатура CL087",
          "change_en": "Added new code 152 in nomenclature CL087",
          "regarding_vaccines": false
        },
        {
          "change": "Промяна в наименованието на код 141",
          "change_en": "Change in the name of code 141",
          "regarding_vaccines": false
        },
        {
          "change": "Промяна в наименованието на код 142",
          "change_en": "Change in the name of code 142",
          "regarding_vaccines": false
        },
        {
          "change": "Заличени 8 броя кодове в номенклатура CL087",
          "change_en": "Deleted 8 number of codes in nomenclature CL087",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"K\" на ред 32 колона F в номенклатура CL107",
          "change_en": "Removed code \"K\" of row 32 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"F\" на ред 24 колона F в номенклатура CL107",
          "change_en": "Removed code \"F\" of row 24 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"Е\" на ред 38 колона F в номенклатура CL107",
          "change_en": "Removed code \"is\" of row 38 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"S\" на ред 23 колона F в номенклатура CL107",
          "change_en": "Removed code \"S\" of row 23 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"D\" на ред 23 колона F в номенклатура CL107",
          "change_en": "Removed code \"D\" of row 23 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"Е\" на ред 34 колона F в номенклатура CL107",
          "change_en": "Removed code \"is\" of row 34 column F in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригиранo наименование на ред 6 колона B в номенклатура CL107",
          "change_en": "Corrected name of row 6 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригиранo наименование на ред 16 колона B  в номенклатура CL107",
          "change_en": "Corrected name of row 16 column B in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Промяна в наименованието при код 70 и код 71 в номенклатура CL038",
          "change_en": "Change in the name for code 70 and code 71 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Създадена номенклатура CL135",
          "change_en": "Created nomenclature CL135",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано наименование на ред 6 колона C  в номенклатура CL107",
          "change_en": "Corrected row name 6 column C in nomenclature CL107",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.11",
      "file": "data/his/change-notes/v1.4.11.csv",
      "changes": [
        {
          "change": "Добавена нова колона \"CL037 Mapping (2024)\" към номенклатура CL038 - разликите спрямо 2023 са маркирани в жълто",
          "change_en": "Added new column \"CL037 Mapping (2024)\" to nomenclature CL038 - differences compared with 2023 are marked in yellow",
          "regarding_vaccines": true
        },
        {
          "change": "Код 71 е преместен към Национални програми, преименуван е и е променен броят на дозите в номенклатура CL038",
          "change_en": "Code 71 is moved to National programs, renamed is and is changed number of doses in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Код 70 е преименуван и е с променен брой на дозите в номенклатура CL038",
          "change_en": "Code 70 is renamed and is with changed number of doses in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис -1001 в номенклатура CL037",
          "change_en": "Terminated record -1001 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис -1002 в номенклатура CL037",
          "change_en": "Terminated record -1002 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис -1003 в номенклатура CL037",
          "change_en": "Terminated record -1003 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис -1004 в номенклатура CL037",
          "change_en": "Terminated record -1004 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис -1006 в номенклатура CL037",
          "change_en": "Terminated record -1006 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис 1541 в номенклатура CL037",
          "change_en": "Terminated record 1541 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис 4184 в номенклатура CL037",
          "change_en": "Terminated record 4184 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис 1653 в номенклатура CL037",
          "change_en": "Terminated record 1653 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис 7401 в номенклатура CL037",
          "change_en": "Terminated record 7401 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Прекратен запис 3932 в номенклатура CL037",
          "change_en": "Terminated record 3932 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 15210 в номенклатура CL037",
          "change_en": "Added code 15210 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 57335 в номенклатура CL037",
          "change_en": "Added code 57335 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 61121 в номенклатура CL037",
          "change_en": "Added code 61121 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирано \"Medicament details\" на запис 15497 в номенклатура CL037",
          "change_en": "Corrected \"Medicament details\" of record 15497 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирано \"Medicament details\", \"Number of doses\", \"Days to Next Dose\" на запис 16146 в номенклатура CL037",
          "change_en": "Corrected \"Medicament details\", \"Number of doses\", \"Days to Next Dose\" of record 16146 in nomenclature CL037",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.4.10",
      "file": "data/his/change-notes/v1.4.10.csv",
      "changes": [
        {
          "change": "Създадена номенклатура CL125",
          "change_en": "Created nomenclature CL125",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.9",
      "file": "data/his/change-notes/v1.4.9.csv",
      "changes": [
        {
          "change": "Добавен код 15497 в номенклатура CL037",
          "change_en": "Added code 15497 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 15497 в колона \"CL037 Mapping\" за ред 72 на номенклатура CL038",
          "change_en": "Added code 15497 in column \"CL037 Mapping\" for row 72 of nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред в номенклатура CL002 за статус 8 на е-рецепта",
          "change_en": "Added new row in nomenclature CL002 for status 8 of e-prescription",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL003 за статус 9 на е-направление",
          "change_en": "Added new row in nomenclature CL003 for status 9 of is-referral",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL003 за статус 10 на е-направление",
          "change_en": "Added new row in nomenclature CL003 for status 10 of is-referral",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона към Meta Data в номенклатура CL006 - колона Clinical speciality",
          "change_en": "Added new column to Meta Data in nomenclature CL006 - column Clinical speciality",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL123",
          "change_en": "Created nomenclature CL123",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL124",
          "change_en": "Created nomenclature CL124",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.8",
      "file": "data/his/change-notes/v1.4.8.csv",
      "changes": [
        {
          "change": "Добавени кодове 545, 546, 547, 548, 549, 550 в номенклатура CL010",
          "change_en": "Added codes 545, 546, 547, 548, 549, 550 in nomenclature CL010",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.7",
      "file": "data/his/change-notes/v1.4.7.csv",
      "changes": [
        {
          "change": "Добавен код 6 в номенклатура CL018",
          "change_en": "Added code 6 in nomenclature CL018",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код 7 в номенклатура CL018 (ще влезе в сила след финализиране на интеграцията с регистъра на съсловната организация)",
          "change_en": "Added code 7 in nomenclature CL018 (will enter in force after finalization of integration with registry of professional organization)",
          "regarding_vaccines": false
        },
        {
          "change": "Кодове EC, BC, TE, TB, TG, F са деактивирани в номенклатура CL016 считано от 20.10.2023",
          "change_en": "Codes EC, BC, TE, TB, TG, F are deactivated in nomenclature CL016 effective from 20.10.2023",
          "regarding_vaccines": false
        },
        {
          "change": "Номенкалтура CL009 е напълно актуализирана (за разлика от регулярните incremental updates) - моля синхронизирайте я във вашите софтуери",
          "change_en": "Nomenclature CL009 is fully updated (for difference from regular incremental updates) - please synchronize it in your software",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.6",
      "file": "data/his/change-notes/v1.4.6.csv",
      "changes": [
        {
          "change": "Добавен код 48571  в колона \"Е\" в Key 77 в номенклатура CL038",
          "change_en": "Added code 48571 in column \"is\" in Key 77 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 48571  в колона \"Е\" в Key 78 в номенклатура CL038",
          "change_en": "Added code 48571 in column \"is\" in Key 78 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 48571  в колона \"Е\" в Key 79 в номенклатура CL038",
          "change_en": "Added code 48571 in column \"is\" in Key 79 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 48571  в колона \"Е\" в Key 80 в номенклатура CL038",
          "change_en": "Added code 48571 in column \"is\" in Key 80 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код 48571  в колона \"Е\" в Key 81 в номенклатура CL038",
          "change_en": "Added code 48571 in column \"is\" in Key 81 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код \" P123.1 \" в номенклатура CL062",
          "change_en": "Added code \" P123.1 \" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P123.2\" в номенклатура CL062",
          "change_en": "Added code \"P123.2\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P123.3\" в номенклатура CL062",
          "change_en": "Added code \"P123.3\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \" P123.4\" в номенклатура CL062",
          "change_en": "Added code \" P123.4\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P248.1\" в номенклатура CL062",
          "change_en": "Added code \"P248.1\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P248.2\" в номенклатура CL062",
          "change_en": "Added code \"P248.2\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P260.1\" в номенклатура CL062",
          "change_en": "Added code \"P260.1\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P260.2\" в номенклатура CL062",
          "change_en": "Added code \"P260.2\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P263.1\" в номенклатура CL062",
          "change_en": "Added code \"P263.1\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P263.2\" в номенклатура CL062",
          "change_en": "Added code \"P263.2\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P265.1\" в номенклатура CL062",
          "change_en": "Added code \"P265.1\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"P265.2\" в номенклатура CL062",
          "change_en": "Added code \"P265.2\" in nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W001\" става \"Е001\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W001\" becomes \"E001\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W002\" става \"Е002\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W002\" becomes \"E002\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W003\" става \"Е003\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W003\" becomes \"E003\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W004\" става \"Е004\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W004\" becomes \"E004\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W005\" става \"Е005\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W005\" becomes \"E005\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W006\" става \"Е006\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W006\" becomes \"E006\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W007\" става \"Е007\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W007\" becomes \"E007\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W008\" става \"Е008\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W008\" becomes \"E008\"",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W009\" става \"Е009\"",
          "change_en": "Corrected value in column \"Key\" in nomenclature CL998 from \"W009\" becomes \"E009\"",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код 16146 в номенклатура CL037",
          "change_en": "Added code 16146 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Мапинг към код 16146 в колона \"Е\" ред 94 в номенклатура CL038",
          "change_en": "Mapping to code 16146 in column \"is\" row 94 in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавени кодове \"00-02A\" до \"00-02D\", \"04-02D\", \"04-02E\", \"04-02F\", \"04-030\" в номенклатура CL022",
          "change_en": "Added codes \"00-02A\" until \"00-02D\", \"04-02D\", \"04-02E\", \"04-02F\", \"04-030\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени кодове \"00-02A-00\" до \"00-02D-00\", \"04-02D-00\", \"04-02E-00\", \"04-02F-00\", \"04-030-00\" до \"04-030-17\" в номенклатура CL024",
          "change_en": "Added codes \"00-02A-00\" until \"00-02D-00\", \"04-02D-00\", \"04-02E-00\", \"04-02F-00\", \"04-030-00\" until \"04-030-17\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Код \"00-00D\" в номенклатура CL022 става невалиден след 09.10.2023 - използвайте прецизираните кодове \"00-02B\", \"00-02C\" вместо това",
          "change_en": "Code \"00-00D\" in nomenclature CL022 becomes invalid after 09.10.2023 - use refined codes \"00-02B\", \"00-02C\" instead of this",
          "regarding_vaccines": false
        },
        {
          "change": "Код \"00-00D-00\" в номенклатура CL024 става невалиден след 09.10.2023",
          "change_en": "Code \"00-00D-00\" in nomenclature CL024 becomes invalid after 09.10.2023",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано описанието на \"00-00C\", \"04-014\" в номенклатура CL022",
          "change_en": "Corrected the description of \"00-00C\", \"04-014\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани описание и стойности за измерване на \"00-00C-00\" в номенклатура CL024",
          "change_en": "Corrected description and values for measurement of \"00-00C-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригиран изцяло код \"04-014-00\" в номенклатура CL024",
          "change_en": "Corrected completely code \"04-014-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"3\" в номенклатура CL032",
          "change_en": "Added code \"3\" in nomenclature CL032",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени кодове \"11\" до \"14\" в номенклатура CL030",
          "change_en": "Added codes \"11\" until \"14\" in nomenclature CL030",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL120",
          "change_en": "Created nomenclature CL120",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL121",
          "change_en": "Created nomenclature CL121",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL122 (незавършена – да не се използва!)",
          "change_en": "Created nomenclature CL122 (unfinished – to not uses!)",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.5",
      "file": "data/his/change-notes/v1.4.5.csv",
      "changes": [
        {
          "change": "Създадена номенклатура CL118",
          "change_en": "Created nomenclature CL118",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано описанието на ред \"81\" в номенклатура CL038",
          "change_en": "Corrected the description of row \"81\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен ред \"48571\" в номенклатура CL037",
          "change_en": "Added row \"48571\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Редове \"7401\", \"-1001\", \"-1002\", \"-1003\", \"-1004\" в номенклатура CL037 стават невалидни след 15.09.2023",
          "change_en": "Rows \"7401\", \"-1001\", \"-1002\", \"-1003\", \"-1004\" in nomenclature CL037 become invalid after 15.09.2023",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен ред \"NA\" в номенклатура CL045",
          "change_en": "Added row \"NA\" in nomenclature CL045",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.4",
      "file": "data/his/change-notes/v1.4.4.csv",
      "changes": [
        {
          "change": "Добавен код \"T8\" в номенклатура CL007",
          "change_en": "Added code \"T8\" in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"T9\" в номенклатура CL007",
          "change_en": "Added code \"T9\" in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в CL038,  Key 77,78",
          "change_en": "Corrected several values in CL038, Key 77,78",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код \"81\" в CL038 ( даваща опция да се добавят и лица извън посочената от имунизация възраст)",
          "change_en": "Added code \"81\" in CL038 ( giving option to add and persons outside the specified from immunization age)",
          "regarding_vaccines": true
        },
        {
          "change": "Създадена номенклатура CL116",
          "change_en": "Created nomenclature CL116",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL117",
          "change_en": "Created nomenclature CL117",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.3",
      "file": "data/his/change-notes/v1.4.3.csv",
      "changes": [
        {
          "change": "Променено името на номенклатура CL032",
          "change_en": "Changed the name of nomenclature CL032",
          "regarding_vaccines": false
        },
        {
          "change": "Променено името на номенклатура CL012",
          "change_en": "Changed the name of nomenclature CL012",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени колони за мета данни \"Definition\" и \"Definition EN\" в номенклатура CL012",
          "change_en": "Added columns for meta data \"Definition\" and \"Definition EN\" in nomenclature CL012",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнат код \"50\" от номенклатура CL038",
          "change_en": "Removed code \"50\" from nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Променени стойности в колони \"Description\" и \"Dose Number\" за код \"51\" в номенклатура CL038",
          "change_en": "Changed values in columns \"Description\" and \"Dose Number\" for code \"51\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен код \"Kb\" в номенклатура CL107",
          "change_en": "Added code \"Kb\" in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в колона \"Description\" в номенклатура CL107",
          "change_en": "Corrected several values in column \"Description\" in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в колона \"Language EN\" в номенклатура CL107",
          "change_en": "Corrected several values in column \"Language EN\" in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в колона \"Incompatible other codes from CL107\" в номенклатура CL107",
          "change_en": "Corrected several values in column \"Incompatible other codes from CL107\" in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в колона \"Language EN\" в номенклатура CL111",
          "change_en": "Corrected several values in column \"Language EN\" in nomenclature CL111",
          "regarding_vaccines": false
        },
        {
          "change": "Променено името на номенклатура CL098",
          "change_en": "Changed the name of nomenclature CL098",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код \"7\" в номенклатура CL069",
          "change_en": "Added code \"7\" in nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени редове \"11-001\" до \"6E-005\" в номенклатура CL022",
          "change_en": "Added rows \"11-001\" until \"6E-005\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени редове \"11-001-00\" до \"6E-005-00\" в номенклатура CL024 (подлежат на разширяване и конкретизиране)",
          "change_en": "Added rows \"11-001-00\" until \"6E-005-00\" in nomenclature CL024 (are subject of expansion and specification)",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани стойностите в колона \"Incompatible other codes from CL107\" в номенклатура CL107",
          "change_en": "Corrected values in column \"Incompatible other codes from CL107\" in nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL114",
          "change_en": "Created nomenclature CL114",
          "regarding_vaccines": false
        },
        {
          "change": "Създадена номенклатура CL115",
          "change_en": "Created nomenclature CL115",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.2",
      "file": "data/his/change-notes/v1.4.2.csv",
      "changes": [
        {
          "change": "Променена изцяло номенклатура CL110 с нови кодове и различни редове",
          "change_en": "Completely changed nomenclature CL110 with new codes and different rows",
          "regarding_vaccines": false
        },
        {
          "change": "Променена изцяло номенклатура CL112 с нови кодове и различни редове",
          "change_en": "Completely changed nomenclature CL112 with new codes and different rows",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани няколко стойности в колона Description в номенклатура CL107",
          "change_en": "Corrected several values in column Description in nomenclature CL107",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.1",
      "file": "data/his/change-notes/v1.4.1.csv",
      "changes": [
        {
          "change": "Коригирана номенклатура CL106 като са премахнати свръхбройните зъби",
          "change_en": "Corrected nomenclature CL106 as are removed supernumerary teeth",
          "regarding_vaccines": false
        },
        {
          "change": "CL037 - Ваксини - добавена колона N - MH Code",
          "change_en": "CL037 - vaccines - added column N - MH Code",
          "regarding_vaccines": true
        },
        {
          "change": "Променена изцяло номенклатура CL107 с нови кодове и различни редове",
          "change_en": "Completely changed nomenclature CL107 with new codes and different rows",
          "regarding_vaccines": false
        },
        {
          "change": "Променена изцяло номенклатура CL111 с нови кодове и различни редове",
          "change_en": "Completely changed nomenclature CL111 with new codes and different rows",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.4.0",
      "file": "data/his/change-notes/v1.4.0.csv",
      "changes": [
        {
          "change": "Добавяне на код -1006 в номенклатура CL037",
          "change_en": "Added code -1006 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклaтура CL103",
          "change_en": "Added nomenclature CL103",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL104",
          "change_en": "Added nomenclature CL104",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL105",
          "change_en": "Added nomenclature CL105",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL106",
          "change_en": "Added nomenclature CL106",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL107",
          "change_en": "Added nomenclature CL107",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL108",
          "change_en": "Added nomenclature CL108",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL109",
          "change_en": "Added nomenclature CL109",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL110",
          "change_en": "Added nomenclature CL110",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL111",
          "change_en": "Added nomenclature CL111",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL112",
          "change_en": "Added nomenclature CL112",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL113",
          "change_en": "Added nomenclature CL113",
          "regarding_vaccines": false
        },
        {
          "change": "Добавяне на нов код \"D\" в номенклатура CL102",
          "change_en": "Addition of new code \"D\" in nomenclature CL102",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.13",
      "file": "data/his/change-notes/v1.3.13.csv",
      "changes": [
        {
          "change": "Добавен код 2 в номенклатура CL052",
          "change_en": "Added code 2 in nomenclature CL052",
          "regarding_vaccines": false
        },
        {
          "change": "Добавяне на код -1005 в номенклатура CL037",
          "change_en": "Added code -1005 in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирана колона \"Description\" за редове 3 и 4 в номенклатура CL047",
          "change_en": "Corrected column \"Description\" for rows 3 and 4 in nomenclature CL047",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени колони за мета данни в номенклатура CL011",
          "change_en": "Added columns for meta data in nomenclature CL011",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"T6\" и \"T7\" в номенклатура CL007",
          "change_en": "Added new rows \"T6\" and \"T7\" in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на Български в номенклатура CL046",
          "change_en": "Added translations for Bulgarian in nomenclature CL046",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на Английски в номенклатура CL045",
          "change_en": "Added translations for English in nomenclature CL045",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.12",
      "file": "data/his/change-notes/v1.3.12.csv",
      "changes": [
        {
          "change": "Добавена вид ваксина",
          "change_en": "Added type of vaccine",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.3.11",
      "file": "data/his/change-notes/v1.3.11.csv",
      "changes": [
        {
          "change": "Добавен код \"1137\" в номенклатура CL006",
          "change_en": "Added code \"1137\" in nomenclature CL006",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL997",
          "change_en": "Added nomenclature CL997",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL011 с МКБ кодове M70 с пети знак",
          "change_en": "Supplemented nomenclature CL011 with ICD codes M70 with fifth character",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"00-027\", \"00-028\", \"00-029\", \"09-007\", \"00-001\" в номенклатура CL022",
          "change_en": "Populated column \"NHIF Code\" and column \"NHIF Package\" for rows \"00-027\", \"00-028\", \"00-029\", \"09-007\", \"00-001\" in nomenclature CL022",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.10",
      "file": "data/his/change-notes/v1.3.10.csv",
      "changes": [
        {
          "change": "Добавен код \"6\" в номенклатура CL069",
          "change_en": "Added code \"6\" in nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL101",
          "change_en": "Added nomenclature CL101",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.9",
      "file": "data/his/change-notes/v1.3.9.csv",
      "changes": [
        {
          "change": "Коригирани редове \"<\" и \">\" на \"LT\" и \"GT\" съответно в номенклатура CL097",
          "change_en": "Corrected rows \"<\" and \">\" of \"LT\" and \"GT\" respectively in nomenclature CL097",
          "regarding_vaccines": false
        },
        {
          "change": "Променени са стойностите на редове \"391\", \"392\" в номенклатура CL085",
          "change_en": "Changed the values of rows \"391\", \"392\" in nomenclature CL085",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.8",
      "file": "data/his/change-notes/v1.3.8.csv",
      "changes": [
        {
          "change": "Коригирана колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"05-00F\", \"05-00D\" в номенклатура CL022",
          "change_en": "Corrected column \"NHIF Code\" and column \"NHIF Package\" for rows \"05-00F\", \"05-00D\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Променен код \"0\" на \"6\" в номенклатура CL004",
          "change_en": "Changed code \"0\" of \"6\" in nomenclature CL004",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.7",
      "file": "data/his/change-notes/v1.3.7.csv",
      "changes": [
        {
          "change": "Коригирана колона \"CL022 Mapping\" за редове \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\", \"0F-11D-00\", \"0F-120-00\" в номенклатура CL024",
          "change_en": "Corrected column \"CL022 Mapping\" for rows \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\", \"0F-11D-00\", \"0F-120-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригиран код Q90.3 на Q90.9 в номенклатура CL011",
          "change_en": "Corrected code Q90.3 of Q90.9 in nomenclature CL011",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен код M94.2 в номенклатура CL011",
          "change_en": "Added code M94.2 in nomenclature CL011",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL097",
          "change_en": "Added nomenclature CL097",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL098",
          "change_en": "Added nomenclature CL098",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL099",
          "change_en": "Added nomenclature CL099",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"00-027\", \"00-028\", \"00-029\" в номенклатура CL022",
          "change_en": "Added new rows \"00-027\", \"00-028\", \"00-029\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"00-027-00\", \"00-028-00\", \"00-029-00\" в номенклатура CL024",
          "change_en": "Added new rows \"00-027-00\", \"00-028-00\", \"00-029-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Промемен ред \"8\" на номенклатура CL060",
          "change_en": "Changed row \"8\" of nomenclature CL060",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"9\" в номенклатура CL060",
          "change_en": "Added new row \"9\" in nomenclature CL060",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"0\" в номенклатура CL004",
          "change_en": "Added new row \"0\" in nomenclature CL004",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL100",
          "change_en": "Added nomenclature CL100",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.6",
      "file": "data/his/change-notes/v1.3.6.csv",
      "changes": [
        {
          "change": "Добавени нови редове \"02-001-05\", \"02-001-06\", \"02-001-07\", \"02-001-08\", \"02-001-09\", \"04-01A-01\", \"0C-124-00\", \"04-009-01\", \"04-00A-01\", \"04-00B-01\", \"04-00C-01\", \"04-00D-01\", \"04-015-01\", \"04-015-02\", \"04-015-03\", \"04-015-04\", \"04-015-05\", \"0C-015-00\", \"0C-165-00\", \"04-021-01\", \"04-022-01\", \"04-000-01\", \"04-000-02\", \"04-000-03\", \"04-000-04\", \"04-000-05\", \"01-002-F0\", \"04-021-F0\", \"04-022-F0\" в номенклатура CL024",
          "change_en": "Added new rows \"02-001-05\", \"02-001-06\", \"02-001-07\", \"02-001-08\", \"02-001-09\", \"04-01A-01\", \"0C-124-00\", \"04-009-01\", \"04-00A-01\", \"04-00B-01\", \"04-00C-01\", \"04-00D-01\", \"04-015-01\", \"04-015-02\", \"04-015-03\", \"04-015-04\", \"04-015-05\", \"0C-015-00\", \"0C-165-00\", \"04-021-01\", \"04-022-01\", \"04-000-01\", \"04-000-02\", \"04-000-03\", \"04-000-04\", \"04-000-05\", \"01-002-F0\", \"04-021-F0\", \"04-022-F0\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани изцяло редове \"04-01A-00\", \"0C-121-00\", \"04-015-00\", \"04-009-00\", \"04-00A-00\", \"04-00B-00\", \"04-00C-00\", \"04-00D-00\", \"04-021-00\", \"04-022-00\", \"04-000-00\" в номенклатура CL024",
          "change_en": "Corrected completely rows \"04-01A-00\", \"0C-121-00\", \"04-015-00\", \"04-009-00\", \"04-00A-00\", \"04-00B-00\", \"04-00C-00\", \"04-00D-00\", \"04-021-00\", \"04-022-00\", \"04-000-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"0C-124\", \"0F-130\", \"0F-131\", \"0F-132\", \"0F-133\", \"0F-134\", \"0F-135\", \"0F-136\", \"0F-137\", \"0F-138\", \"0F-139\", \"0F-13A\", \"0C-015\", \"0C-165\" в номенклатура CL022",
          "change_en": "Added new rows \"0C-124\", \"0F-130\", \"0F-131\", \"0F-132\", \"0F-133\", \"0F-134\", \"0F-135\", \"0F-136\", \"0F-137\", \"0F-138\", \"0F-139\", \"0F-13A\", \"0C-015\", \"0C-165\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"Description\" за редове \"0C-121\", \"04-01A\" в номенклатура CL022",
          "change_en": "Corrected column \"Description\" for rows \"0C-121\", \"04-01A\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"0C-121\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\", \"0C-100\", \"0C-101\", \"0C-102\", \"0C-103\", \"0C-110\", \"0C-111\" в номенклатура CL022",
          "change_en": "Corrected column \"NHIF Code\" and column \"NHIF Package\" for rows \"0C-121\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\", \"0C-100\", \"0C-101\", \"0C-102\", \"0C-103\", \"0C-110\", \"0C-111\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"CL022 Mapping\" за редове \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\" в номенклатура CL024",
          "change_en": "Corrected column \"CL022 Mapping\" for rows \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\" in nomenclature CL024",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.5",
      "file": "data/his/change-notes/v1.3.5.csv",
      "changes": [
        {
          "change": "Комбинирани номенклатури CL021 и CL094 в нова версия на номенклатура CL021",
          "change_en": "Combined nomenclatures CL021 and CL094 in new version of nomenclature CL021",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната номенклатура CL094",
          "change_en": "Removed nomenclature CL094",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена колона \"NHIF Code\" за редове \"0C-121\" в номенклатура CL022",
          "change_en": "Supplemented column \"NHIF Code\" for rows \"0C-121\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"Description\" за редове \"0C-121\" в номенклатура CL022",
          "change_en": "Corrected column \"Description\" for rows \"0C-121\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани изцяло редове \"0C-121-00\", \"01-000-00\", \"01-000-01\", \"01-000-02\", \"01-000-03\", \"01-000-04\", \"01-000-05\", \"01-000-06\", \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-000-0B\", \"01-000-0C\", \"01-001-00\", \"01-001-01\", \"01-001-02\", \"01-001-03\", \"01-001-04\", \"01-001-05\", \"01-001-06\", \"01-001-07\", \"01-001-08\", \"01-00F-00\", \"01-002-00\", \"02-001-00\", \"07-000-00\", \"01-00C-00\", \"01-007-01\", \"0B-040-01\", \"02-007-00\", \"02-002-01\" в номенклатура CL024",
          "change_en": "Corrected completely rows \"0C-121-00\", \"01-000-00\", \"01-000-01\", \"01-000-02\", \"01-000-03\", \"01-000-04\", \"01-000-05\", \"01-000-06\", \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-000-0B\", \"01-000-0C\", \"01-001-00\", \"01-001-01\", \"01-001-02\", \"01-001-03\", \"01-001-04\", \"01-001-05\", \"01-001-06\", \"01-001-07\", \"01-001-08\", \"01-00F-00\", \"01-002-00\", \"02-001-00\", \"07-000-00\", \"01-00C-00\", \"01-007-01\", \"0B-040-01\", \"02-007-00\", \"02-002-01\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"01-000-0C\", \"01-001-09\", \"01-001-0A\", \"01-001-0B\", \"01-001-0C\", \"01-001-0D\", \"01-001-0E\", \"01-001-0F\", \"01-001-10\", \"01-001-11\", \"01-001-12\", \"01-001-13\", \"01-001-14\", \"01-001-15\", \"01-000-0E\", \"01-000-0F\", \"01-000-10\", \"01-000-11\", \"01-000-12\", \"01-000-13\", \"01-000-14\", \"01-000-15\", \"01-000-16\", \"01-000-17\", \"01-000-18\", \"01-000-19\", \"01-000-1A\", \"01-000-1B\", \"01-000-1C\", \"01-000-1D\", \"01-000-1E\", \"01-000-1F\", \"01-000-20\", \"01-000-21\", \"01-000-22\", \"01-000-23\", \"01-00F-01\", \"01-00F-02\", \"01-00F-03\", \"01-00F-04\", \"01-00F-05\", \"01-00F-06\", \"01-00F-07\", \"01-00F-08\", \"01-001-F0\", \"01-002-01\", \"01-002-02\", \"01-002-03\", \"01-002-04\", \"01-002-05\", \"01-002-06\", \"01-002-07\", \"01-002-08\", \"01-002-09\", \"01-002-0A\", \"01-002-0B\", \"01-002-0C\", \"01-002-0D\", \"01-002-0E\", \"01-002-0F\", \"01-002-10\", \"01-002-11\", \"01-002-12\", \"01-002-13\", \"01-002-14\", \"01-002-15\", \"01-002-16\", \"02-001-01\", \"02-001-02\", \"02-001-03\", \"02-001-04\", \"07-000-01\", \"07-000-02\", \"01-00C-01\", \"01-00C-02\", \"01-00C-03\", \"01-00C-04\", \"01-00C-05\", \"01-00C-06\", \"01-007-01\", \"0B-040-01\" в номенклатура CL024",
          "change_en": "Added new rows \"01-000-0C\", \"01-001-09\", \"01-001-0A\", \"01-001-0B\", \"01-001-0C\", \"01-001-0D\", \"01-001-0E\", \"01-001-0F\", \"01-001-10\", \"01-001-11\", \"01-001-12\", \"01-001-13\", \"01-001-14\", \"01-001-15\", \"01-000-0E\", \"01-000-0F\", \"01-000-10\", \"01-000-11\", \"01-000-12\", \"01-000-13\", \"01-000-14\", \"01-000-15\", \"01-000-16\", \"01-000-17\", \"01-000-18\", \"01-000-19\", \"01-000-1A\", \"01-000-1B\", \"01-000-1C\", \"01-000-1D\", \"01-000-1E\", \"01-000-1F\", \"01-000-20\", \"01-000-21\", \"01-000-22\", \"01-000-23\", \"01-00F-01\", \"01-00F-02\", \"01-00F-03\", \"01-00F-04\", \"01-00F-05\", \"01-00F-06\", \"01-00F-07\", \"01-00F-08\", \"01-001-F0\", \"01-002-01\", \"01-002-02\", \"01-002-03\", \"01-002-04\", \"01-002-05\", \"01-002-06\", \"01-002-07\", \"01-002-08\", \"01-002-09\", \"01-002-0A\", \"01-002-0B\", \"01-002-0C\", \"01-002-0D\", \"01-002-0E\", \"01-002-0F\", \"01-002-10\", \"01-002-11\", \"01-002-12\", \"01-002-13\", \"01-002-14\", \"01-002-15\", \"01-002-16\", \"02-001-01\", \"02-001-02\", \"02-001-03\", \"02-001-04\", \"07-000-01\", \"07-000-02\", \"01-00C-01\", \"01-00C-02\", \"01-00C-03\", \"01-00C-04\", \"01-00C-05\", \"01-00C-06\", \"01-007-01\", \"0B-040-01\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Код \"01-00D-00\" променен на \"01-000-0D\" в номенклатура CL024",
          "change_en": "Code \"01-00D-00\" changed of \"01-000-0D\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"2\" в номенклатура CL032",
          "change_en": "Added new rows \"2\" in nomenclature CL032",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\" в номенклатура CL030",
          "change_en": "Added new rows \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\" in nomenclature CL030",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.4",
      "file": "data/his/change-notes/v1.3.4.csv",
      "changes": [
        {
          "change": "Добавена номенклaтура CL095",
          "change_en": "Added nomenclature CL095",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL096",
          "change_en": "Added nomenclature CL096",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена обратно колона \"NHIF Package\" в номенклатура CL022 (стойности само за дейности, заплащани от НЗОК)",
          "change_en": "Added back column \"NHIF Package\" in nomenclature CL022 (values only for activities, paid from NHIF)",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"01-000-0B\" в номенклатура CL024",
          "change_en": "Added new row \"01-000-0B\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена колона \"CL028 Mapping\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024",
          "change_en": "Populated column \"CL028 Mapping\" for rows \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена колона \"CL032 Mapping\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024",
          "change_en": "Populated column \"CL032 Mapping\" for rows \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена колона \"UCUM\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"02-005-00\", \"02-007-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024",
          "change_en": "Populated column \"UCUM\" for rows \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"02-005-00\", \"02-007-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"Description\" за редове \"01-001-01\", \"02-00C-00\", \"02-00D-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"09-00B-00\", \"03-014-00\" в номенклатура CL024",
          "change_en": "Corrected column \"Description\" for rows \"01-001-01\", \"02-00C-00\", \"02-00D-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"09-00B-00\", \"03-014-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"01-010-01\" в номенклатура CL024",
          "change_en": "Added new row \"01-010-01\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"Description\" за редове \"02-00D\", \"02-015\", \"02-016\", \"02-017\", \"02-018\", \"02-019\", \"02-01A\", \"02-01B\", \"02-023\", \"09-00B\", \"03-014\" в номенклатура CL022",
          "change_en": "Corrected column \"Description\" for rows \"02-00D\", \"02-015\", \"02-016\", \"02-017\", \"02-018\", \"02-019\", \"02-01A\", \"02-01B\", \"02-023\", \"09-00B\", \"03-014\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"CL028 Mapping\" за редове \"02-010-00\" в номенклатура CL024",
          "change_en": "Corrected column \"CL028 Mapping\" for rows \"02-010-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"CL032 Mapping\" за редове \"02-010-00\" в номенклатура CL024",
          "change_en": "Corrected column \"CL032 Mapping\" for rows \"02-010-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана колона \"UCUM\" за редове \"02-010-00\", \"08-001-00\", \"03-024-00\", \"03-025-00\", \"03-009-00\" в номенклатура CL024",
          "change_en": "Corrected column \"UCUM\" for rows \"02-010-00\", \"08-001-00\", \"03-024-00\", \"03-025-00\", \"03-009-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"03-023-01\" в номенклатура CL024",
          "change_en": "Added new row \"03-023-01\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"08-018\" в номенклатура CL022",
          "change_en": "Added new row \"08-018\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"08-018-00\" в номенклатура CL024",
          "change_en": "Added new row \"08-018-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнени стойности в колони \"NHIF Code\" и \"NHIF Package\" за редове \"00-00E\", \"09-00C\", \"06-013\", \"06-011\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\" в номенклатура CL022",
          "change_en": "Populated values in columns \"NHIF Code\" and \"NHIF Package\" for rows \"00-00E\", \"09-00C\", \"06-013\", \"06-011\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена колона \"NHIF Code\" за редове \"0F-120\", \"0F-11D\" в номенклатура CL022",
          "change_en": "Supplemented column \"NHIF Code\" for rows \"0F-120\", \"0F-11D\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена колона \"NHIF Package\" за редове \"04-010\" в номенклатура CL022",
          "change_en": "Supplemented column \"NHIF Package\" for rows \"04-010\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"0F-11E\" в номенклатура CL022",
          "change_en": "Added new row \"0F-11E\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"0F-121\" в номенклатура CL022",
          "change_en": "Added new row \"0F-121\" in nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена колона \"CL022 Mapping\" за редове \"0F-11D-00\", \"0F-120-00\" в номенклатура CL024",
          "change_en": "Supplemented column \"CL022 Mapping\" for rows \"0F-11D-00\", \"0F-120-00\" in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"R8\" в номенклатура CL014",
          "change_en": "Added new row \"R8\" in nomenclature CL014",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.3",
      "file": "data/his/change-notes/v1.3.3.csv",
      "changes": [
        {
          "change": "Изцяло преработена номенкалтура CL022",
          "change_en": "Completely reworked nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенкалтура CL024",
          "change_en": "Completely reworked nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"CL032 Mapping\" в номенклатура CL088",
          "change_en": "Added new column \"CL032 Mapping\" in nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"2-00001\" в номенклатура CL050",
          "change_en": "Added new row \"2-00001\" in nomenclature CL050",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"2-00001-1\" в номенклатура CL088",
          "change_en": "Added new row \"2-00001-1\" in nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"2-00001-2\" в номенклатура CL088",
          "change_en": "Added new row \"2-00001-2\" in nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани стойностите в \"Description\" за редове от \"33\" до \"41\" в номенклатура CL038",
          "change_en": "Corrected values in \"Description\" for rows from \"33\" until \"41\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Променен код на ред \"5\" на \"6\" в номенклатра CL061",
          "change_en": "Changed code of row \"5\" of \"6\" in nomenclature CL061",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов код \"5\" в номенклатура CL061",
          "change_en": "Added new code \"5\" in nomenclature CL061",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани данните в \"Dose Number\" за редове \"04\", \"06\", \"07\" и \"09\" в номенклатура CL038",
          "change_en": "Corrected the data in \"Dose Number\" for rows \"04\", \"06\", \"07\" and \"09\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклaтура CL090",
          "change_en": "Added nomenclature CL090",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL091",
          "change_en": "Added nomenclature CL091",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL092",
          "change_en": "Added nomenclature CL092",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL093",
          "change_en": "Added nomenclature CL093",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"Usage Instructions\" в номенклатура CL014",
          "change_en": "Added new column \"Usage Instructions\" in nomenclature CL014",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната номенклатура CL036",
          "change_en": "Removed nomenclature CL036",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL094",
          "change_en": "Added nomenclature CL094",
          "regarding_vaccines": false
        },
        {
          "change": "Променено описанието \"Description\" и \"Language EN\" на ред \"1\" в номенклатура CL069",
          "change_en": "Changed the description \"Description\" and \"Language EN\" of row \"1\" in nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен ред \"5\" в номенклатура CL069",
          "change_en": "Added row \"5\" in nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклaтура CL998",
          "change_en": "Added nomenclature CL998",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.2",
      "file": "data/his/change-notes/v1.3.2.csv",
      "changes": [
        {
          "change": "Добавена номенклaтура CL089",
          "change_en": "Added nomenclature CL089",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"R6\" в номенклатура CL014",
          "change_en": "Added new row \"R6\" in nomenclature CL014",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"NHIF Document\" в номенклатура CL014",
          "change_en": "Added new column \"NHIF Document\" in nomenclature CL014",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"NHIF Document\" в номенклатура CL007",
          "change_en": "Added new column \"NHIF Document\" in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани всички \"Description\" данни в номенклатура CL007",
          "change_en": "Corrected all \"Description\" data in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани всички \"EN Translation\" данни в номенклатура CL007",
          "change_en": "Corrected all \"EN Translation\" data in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани данните в \"Dose Number\" в номенклатура CL038",
          "change_en": "Corrected the data in \"Dose Number\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирани данните в \"Number of Doses\" в номенклатура CL037",
          "change_en": "Corrected the data in \"Number of Doses\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Попълнена номенклатура CL062",
          "change_en": "Populated nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена номенклатура CL063",
          "change_en": "Populated nomenclature CL063",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред \"R7\" в номенклатура CL014",
          "change_en": "Added new row \"R7\" in nomenclature CL014",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.3.1",
      "file": "data/his/change-notes/v1.3.1.csv",
      "changes": [
        {
          "change": "Добавен нов ред в номенклатура CL014 за направление R5",
          "change_en": "Added new row in nomenclature CL014 for referral R5",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенклатура CL052",
          "change_en": "Completely reworked nomenclature CL052",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенклатура CL051",
          "change_en": "Completely reworked nomenclature CL051",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани мапинги между CL038 и CL037",
          "change_en": "Corrected mappings between CL038 and CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Коригирани номера на разрешителни за всички ваксини в CL037",
          "change_en": "Corrected permit numbers for all vaccines in CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Всички лекарствени продукти в CL037 маркирани като активни (след проверка в НСЦРЛП)",
          "change_en": "All medicinal products in CL037 marked as active (after verification in NCPRMP)",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред \"7401\" в номенклатура CL037",
          "change_en": "Added new row \"7401\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред \"15358\" в номенклатура CL037",
          "change_en": "Added new row \"15358\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред \"8556\" в номенклатура CL037",
          "change_en": "Added new row \"8556\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред \"16887\" в номенклатура CL037",
          "change_en": "Added new row \"16887\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавени нови мапинги към CL037 в номенклатура CL038 (спрямо новите редове)",
          "change_en": "Added new mappings to CL037 in nomenclature CL038 (compared with the new rows)",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.3.0",
      "file": "data/his/change-notes/v1.3.0.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL083",
          "change_en": "Added nomenclature CL083",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани имената на номенклатури CL012, CL022, CL024, CL025",
          "change_en": "Corrected names of nomenclatures CL012, CL022, CL024, CL025",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенкалтура CL022",
          "change_en": "Completely reworked nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенкалтура CL024",
          "change_en": "Completely reworked nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната номенклатура CL068",
          "change_en": "Removed nomenclature CL068",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL084",
          "change_en": "Added nomenclature CL084",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL085",
          "change_en": "Added nomenclature CL085",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL086",
          "change_en": "Added nomenclature CL086",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL087",
          "change_en": "Added nomenclature CL087",
          "regarding_vaccines": false
        },
        {
          "change": "Изцяло преработена номенклатура CL037",
          "change_en": "Completely reworked nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Актуализирана номенклатура CL038",
          "change_en": "Updated nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена колона \"Vaccine Group\" в номенклатура CL037",
          "change_en": "Added column \"Vaccine Group\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена колона \"Dose Number\" в номенклатура CL038",
          "change_en": "Added column \"Dose Number\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклатура CL088",
          "change_en": "Added nomenclature CL088",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена колона \"Offset Allowed\" в номенклатура CL034",
          "change_en": "Added column \"Offset Allowed\" in nomenclature CL034",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани описания \"Description\" на всички редове в номенклатура CL013",
          "change_en": "Corrected descriptions \"Description\" of all rows in nomenclature CL013",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани описания \"Description\" на всички редове в номенклатура CL034",
          "change_en": "Corrected descriptions \"Description\" of all rows in nomenclature CL034",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена колона \"Medicament Details\" в номенклатура CL037",
          "change_en": "Added column \"Medicament Details\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Премахната колона \"Language EN\" в номенклатура CL038",
          "change_en": "Removed column \"Language EN\" in nomenclature CL038",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.2.8",
      "file": "data/his/change-notes/v1.2.8.csv",
      "changes": [
        {
          "change": "Попълнена номенлатура CL050 с данни от НЗОК",
          "change_en": "Populated nomenclature CL050 with data from NHIF",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена колона \"Type\" в номенклатура CL050",
          "change_en": "Added column \"Type\" in nomenclature CL050",
          "regarding_vaccines": false
        },
        {
          "change": "Предефинирана номенклатуа CL049 с изцяло нови редове и по FHIR стандарт",
          "change_en": "Redefined nomenclature CL049 with completely new rows and by FHIR standard",
          "regarding_vaccines": false
        },
        {
          "change": "Комбинирани номенклатури CL047 с CL048 в нова номенклатура CL047; номенклатура CL048 е изтрита",
          "change_en": "Combined nomenclatures CL047 with CL048 in new nomenclature CL047; nomenclature CL048 is deleted",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.7",
      "file": "data/his/change-notes/v1.2.7.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL082",
          "change_en": "Added nomenclature CL082",
          "regarding_vaccines": true
        },
        {
          "change": "Премахната колона \"CL038 Mapping\" от номенклатура CL037",
          "change_en": "Removed column \"CL038 Mapping\" from nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена колона \"CL037 Mapping\" в номенклатура CL038",
          "change_en": "Added column \"CL037 Mapping\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена колона \"CL082 Mapping\" в номенклатура CL038",
          "change_en": "Added column \"CL082 Mapping\" in nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Актуализирана номенклатура CL037",
          "change_en": "Updated nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Актуализирана номенклатура CL038",
          "change_en": "Updated nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Променено описанието (и значението) на редове 05 и 06 в номенклатура CL049",
          "change_en": "Changed the description (and meaning) of rows 05 and 06 in nomenclature CL049",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.6",
      "file": "data/his/change-notes/v1.2.6.csv",
      "changes": [
        {
          "change": "Добавени нови колони \"Quantity\", \"Divisible\", \"Narcotic\", \"Target Disease\", \"Prescription Type\" в номенклатура CL026",
          "change_en": "Added new columns \"Quantity\", \"Divisible\", \"Narcotic\", \"Target Disease\", \"Prescription Type\" in nomenclature CL026",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL026 е сведена до няколко примерни реда; данните за тази номенклатура се синхронизират автоматично от НЗОК",
          "change_en": "Nomenclature CL026 is reduced until several sample rows; data for this nomenclature synchronize automatically from NHIF",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени 2 реда с кодове Т4 и Т5 в номенклатура CL007",
          "change_en": "Added 2 rows with codes T4 and T5 in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани описанията на всички редове в номенклатура CL007",
          "change_en": "Corrected descriptions of all rows in nomenclature CL007",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL009 е сведена до няколко примерни реда; данните за тази номенклатура се синхронизират автоматично от НСЦРЛП",
          "change_en": "Nomenclature CL009 is reduced until several sample rows; data for this nomenclature synchronize automatically from NCPRMP",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL002 за статус 6 на е-рецепта",
          "change_en": "Added new row in nomenclature CL002 for status 6 of e-prescription",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL014 за направление R4",
          "change_en": "Added new row in nomenclature CL014 for referral R4",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL003 за статус 8 на е-направление",
          "change_en": "Added new row in nomenclature CL003 for status 8 of is-referral",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL059",
          "change_en": "Added nomenclature CL059",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL060",
          "change_en": "Added nomenclature CL060",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL061",
          "change_en": "Added nomenclature CL061",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL062",
          "change_en": "Added nomenclature CL062",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL063",
          "change_en": "Added nomenclature CL063",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL064",
          "change_en": "Added nomenclature CL064",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL065",
          "change_en": "Added nomenclature CL065",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL066",
          "change_en": "Added nomenclature CL066",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL067",
          "change_en": "Added nomenclature CL067",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL068",
          "change_en": "Added nomenclature CL068",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL069",
          "change_en": "Added nomenclature CL069",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL070",
          "change_en": "Added nomenclature CL070",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL071",
          "change_en": "Added nomenclature CL071",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL072",
          "change_en": "Added nomenclature CL072",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL073",
          "change_en": "Added nomenclature CL073",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL074",
          "change_en": "Added nomenclature CL074",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL075",
          "change_en": "Added nomenclature CL075",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL076",
          "change_en": "Added nomenclature CL076",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL077",
          "change_en": "Added nomenclature CL077",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL078",
          "change_en": "Added nomenclature CL078",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL079",
          "change_en": "Added nomenclature CL079",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL080",
          "change_en": "Added nomenclature CL080",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL081",
          "change_en": "Added nomenclature CL081",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред в номенклатура CL002 за статус 7 на е-рецепта",
          "change_en": "Added new row in nomenclature CL002 for status 7 of e-prescription",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.5",
      "file": "data/his/change-notes/v1.2.5.csv",
      "changes": [
        {
          "change": "Добавен нов ред с код \"25\" в номенклатура CL024",
          "change_en": "Added new row with code \"25\" in nomenclature CL024",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.4",
      "file": "data/his/change-notes/v1.2.4.csv",
      "changes": [
        {
          "change": "Добавена нова колона \"Permit Owner ID\" в мета-данните за номенклатура CL037 със стойности за 4-те COVID ваксини",
          "change_en": "Added new column \"Permit Owner ID\" in meta-data for nomenclature CL037 with values for 4- COVID vaccines",
          "regarding_vaccines": true
        },
        {
          "change": "Променено името на колона \"Permit Owner Name\" в мета-данните за номенклатура CL037 и коригирани стойности за 4-те COVID ваксини",
          "change_en": "Changed the name of column \"Permit Owner Name\" in meta-data for nomenclature CL037 and corrected values for 4- COVID vaccines",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена нова колона \"SNOMED\" в мета-данните за номенклатура CL030 със стойности за първите два резултата",
          "change_en": "Added new column \"SNOMED\" in meta-data for nomenclature CL030 with values for the first two result",
          "regarding_vaccines": false
        },
        {
          "change": "Коригиран ред в CL005 - LB Ливан Lebanon",
          "change_en": "Corrected row in CL005 - LB Lebanon Lebanon",
          "regarding_vaccines": false
        },
        {
          "change": "Ред BU в CL005 e направен неактивен",
          "change_en": "Row BU in CL005 e made inactive",
          "regarding_vaccines": false
        },
        {
          "change": "Променено името на колона \"NSCRLP Code\" на \"CL009 Mapping\" в номенклатура CL026",
          "change_en": "Changed the name of column \"NSCRLP Code\" of \"CL009 Mapping\" in nomenclature CL026",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"CL010 Mapping\" в номенклатура CL026",
          "change_en": "Added new column \"CL010 Mapping\" in nomenclature CL026",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано описание на ред BQ в номенклатура CL005",
          "change_en": "Corrected description of row BQ in nomenclature CL005",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано описание на ред GB в номенклатура CL005",
          "change_en": "Corrected description of row GB in nomenclature CL005",
          "regarding_vaccines": false
        },
        {
          "change": "Сменено името на CL056 на \"Медицински инструменти\"",
          "change_en": "Changed the name of CL056 of \"Medical instruments\"",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL057",
          "change_en": "Added nomenclature CL057",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL058",
          "change_en": "Added nomenclature CL058",
          "regarding_vaccines": false
        },
        {
          "change": "Променени редовете по номенклатура CL056 спрямо последните данни от ЕК за DGC. Добавени мета колони \"CL057 Mapping\" и \"CL058 Mapping\"",
          "change_en": "Changed rows by nomenclature CL056 according to the latest data from EC for DGC. added meta columns \"CL057 Mapping\" and \"CL058 Mapping\"",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред с код \"VNT001\" в номенклатура CL022",
          "change_en": "Added new row with code \"VNT001\" in nomenclature CL022",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.3",
      "file": "data/his/change-notes/v1.2.3.csv",
      "changes": [
        {
          "change": "Добавени нови редове в CL010",
          "change_en": "Added new rows in CL010",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове в CL035",
          "change_en": "Added new rows in CL035",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL026 обновена с данни от НЗОК към 16.05.2021 - отменените стойности се показват в червено и са с валидност до тази дата",
          "change_en": "Nomenclature CL026 updated with data from NHIF to 16.05.2021 - canceled values shown in red and are with validity until this date",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL009 обновена с данни от НСЦРЛП към 02.05.2021 - отменените стойности се показват в червено и са с валидност до тази дата",
          "change_en": "Nomenclature CL009 updated with data from NCPRMP to 02.05.2021 - canceled values shown in red and are with validity until this date",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.2",
      "file": "data/his/change-notes/v1.2.2.csv",
      "changes": [
        {
          "change": "Номенклатура CL026 обновена с данни от НЗОК към 16.04.2021 - отменените стойности се показват в червено и са с валидност до тази дата",
          "change_en": "Nomenclature CL026 updated with data from NHIF to 16.04.2021 - canceled values shown in red and are with validity until this date",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.1",
      "file": "data/his/change-notes/v1.2.1.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL055",
          "change_en": "Added nomenclature CL055",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL026 разширена със стойности, които бяха премахнати с ъпдейта от 16.03.2021 - тези редове показват правилно валидност до тази дата и са в червено",
          "change_en": "Nomenclature CL026 expanded with values, that were removed with update from 16.03.2021 - these rows correctly show validity until this date and are in red",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL009 обновена с данни от НСЦРЛП към 02.04.2021 - отменените стойности се показват в червено и са с валидност до тази дата",
          "change_en": "Nomenclature CL009 updated with data from NCPRMP to 02.04.2021 - canceled values shown in red and are with validity until this date",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.2.0",
      "file": "data/his/change-notes/v1.2.0.csv",
      "changes": [
        {
          "change": "Номенклатура CL022 обновена с данни от НЗОК към 01.03.2021",
          "change_en": "Nomenclature CL022 updated with data from NHIF to 01.03.2021",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирано описание на поле \"senderId\" в съобщение C001",
          "change_en": "Corrected description of field \"senderId\" in message C001",
          "regarding_vaccines": false
        },
        {
          "change": "Табове \"Съобщения\", \"С001\", \"С002, \"С003\", \"С004\", \"С099\" са преместени в нов файл с име \"НЗИС Общи Медицински Услуги - API Спецификация\"",
          "change_en": "Tabs \"Messages\", \"C001\", \"C002, \"C003\", \"C004\", \"C099\" were moved in new file with name \"NHIS General Medical Services - API Specification\"",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL056 с тестове за COVID налични в България",
          "change_en": "Supplemented nomenclature CL056 with tests for COVID available in Bulgaria",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL011 с новите кодове за COVID",
          "change_en": "Supplemented nomenclature CL011 with new codes for COVID",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена нова колона \"Mapping to CL038\" в мета-данните за номенклатура CL037",
          "change_en": "Added new column \"Mapping to CL038\" in meta-data for nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Променено името на ваксина \"COVID-19 Vaccine AstraZeneca\" на \"Vaxzevria\" в номенклатура CL037",
          "change_en": "Changed the name of vaccine \"COVID-19 Vaccine AstraZeneca\" of \"Vaxzevria\" in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавен нов ред за ваксина \"COVID-19 Vaccine Janssen\" в номенклатура CL037",
          "change_en": "Added new row for vaccine \"COVID-19 Vaccine Janssen\" in nomenclature CL037",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.1.2",
      "file": "data/his/change-notes/v1.1.2.csv",
      "changes": [
        {
          "change": "Номенклатура CL026 обновена с данни от НЗОК към 16.03.2021",
          "change_en": "Nomenclature CL026 updated with data from NHIF to 16.03.2021",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана номенклатура CL022 (имаше невалидни пакети по НЗОК)",
          "change_en": "Corrected nomenclature CL022 (had invalid packages by NHIF)",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.1.1",
      "file": "data/his/change-notes/v1.1.1.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL051",
          "change_en": "Added nomenclature CL051",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL052",
          "change_en": "Added nomenclature CL052",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL053",
          "change_en": "Added nomenclature CL053",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL054",
          "change_en": "Added nomenclature CL054",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL056",
          "change_en": "Added nomenclature CL056",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL022 с нови редове",
          "change_en": "Supplemented nomenclature CL022 with new rows",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната номенклатура CL031",
          "change_en": "Removed nomenclature CL031",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.1.0",
      "file": "data/his/change-notes/v1.1.0.csv",
      "changes": [
        {
          "change": "Добавени нови редове в номенклатура CL042",
          "change_en": "Added new rows in nomenclature CL042",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове в номенклатура CL037",
          "change_en": "Added new rows in nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклатура CL050",
          "change_en": "Added nomenclature CL050",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени нови редове в номенклатура CL014",
          "change_en": "Added new rows in nomenclature CL014",
          "regarding_vaccines": false
        },
        {
          "change": "Промемен формата на всички номенклатурни таблици така, че да отговарят по структура на резултата от заявка C001",
          "change_en": "Changed format of all nomenclature tables so, that to match by structure of result from request C001",
          "regarding_vaccines": false
        },
        {
          "change": "Поле \"senderISName\" е направено задължително в съобщение C001",
          "change_en": "Field \"senderISName\" is made mandatory in message C001",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнато правило RL008 от съобщение C001 (нерелевантно)",
          "change_en": "Removed rule RL008 from message C001 (irrelevant)",
          "regarding_vaccines": false
        },
        {
          "change": "Премахнато условие CD014 от съобщения C001 и C002 (нерелевантно)",
          "change_en": "Removed condition CD014 from Messages C001 and C002 (irrelevant)",
          "regarding_vaccines": false
        },
        {
          "change": "Добавено съобщение C003",
          "change_en": "Added message C003",
          "regarding_vaccines": false
        },
        {
          "change": "Добавено съобщение C004",
          "change_en": "Added message C004",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.14",
      "file": "data/his/change-notes/v1.0.14.csv",
      "changes": [
        {
          "change": "Допълнена номенклатура CL037 с ваксина \"COVID-19 Vaccine AstraZeneca\"",
          "change_en": "Supplemented nomenclature CL037 with vaccine \"COVID-19 Vaccine AstraZeneca\"",
          "regarding_vaccines": true
        },
        {
          "change": "Добавени нови редове в номенклатура CL045",
          "change_en": "Added new rows in nomenclature CL045",
          "regarding_vaccines": false
        },
        {
          "change": "Номенклатура CL031 е маркирана за премахване",
          "change_en": "Nomenclature CL031 is marked for removal",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL047",
          "change_en": "Added nomenclature CL047",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL048",
          "change_en": "Added nomenclature CL048",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL049",
          "change_en": "Added nomenclature CL049",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.13",
      "file": "data/his/change-notes/v1.0.13.csv",
      "changes": [
        {
          "change": "Добавена колона Attribute към всички съобщения - по дефаулт стойността е \"value\", отразяваща текущата ситуация",
          "change_en": "Added column Attribute to all Messages - by default the value is \"value\", reflecting current situation",
          "regarding_vaccines": false
        },
        {
          "change": "Променено името на поле \"nomenclature.entry.value\" на \"nomenclature.entry.description\" в съобщение C002",
          "change_en": "Changed the name of field \"nomenclature.entry.value\" of \"nomenclature.entry.description\" in message C002",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена опционална група \"nomenclature.entry.meta\" в съобщение C002",
          "change_en": "Added optional group \"nomenclature.entry.meta\" in message C002",
          "regarding_vaccines": false
        },
        {
          "change": "Добавенo задължително поле \"nomenclature.entry.meta.name\" в съобщение C002",
          "change_en": "Added mandatory field \"nomenclature.entry.meta.name\" in message C002",
          "regarding_vaccines": false
        },
        {
          "change": "Добавенo задължително поле \"nomenclature.entry.meta.value\" в съобщение C002",
          "change_en": "Added mandatory field \"nomenclature.entry.meta.value\" in message C002",
          "regarding_vaccines": false
        },
        {
          "change": "Добавено опционално поле \"senderISName\" в хедъра на съобщение C001",
          "change_en": "Added optional field \"senderISName\" in header of message C001",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен нов ред към номенклатура CL043",
          "change_en": "Added new row to nomenclature CL043",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени мета колони към номенклатура CL037 - Days to Next Dose, Permit Owner, Target Disease",
          "change_en": "Added meta columns to nomenclature CL037 - Days to Next Dose, Permit Owner, Target Disease",
          "regarding_vaccines": true
        },
        {
          "change": "Допълнена номенклатура CL037 с ваксина \"COVID-19 Vaccine Moderna\"",
          "change_en": "Supplemented nomenclature CL037 with vaccine \"COVID-19 Vaccine Moderna\"",
          "regarding_vaccines": true
        }
      ]
    },
    {
      "version": "1.0.12",
      "file": "data/his/change-notes/v1.0.12.csv",
      "changes": [
        {
          "change": "Коригиран мапинг към CL022 на ред 10 в номенклатура CL024",
          "change_en": "Corrected mapping to CL022 of row 10 in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL036",
          "change_en": "Added nomenclature CL036",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL035",
          "change_en": "Added nomenclature CL035",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL037",
          "change_en": "Added nomenclature CL037",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклатура CL038",
          "change_en": "Added nomenclature CL038",
          "regarding_vaccines": true
        },
        {
          "change": "Добавена номенклатура CL039",
          "change_en": "Added nomenclature CL039",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL040",
          "change_en": "Added nomenclature CL040",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL041",
          "change_en": "Added nomenclature CL041",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL042",
          "change_en": "Added nomenclature CL042",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL043",
          "change_en": "Added nomenclature CL043",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL044",
          "change_en": "Added nomenclature CL044",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL045",
          "change_en": "Added nomenclature CL045",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL046",
          "change_en": "Added nomenclature CL046",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.11",
      "file": "data/his/change-notes/v1.0.11.csv",
      "changes": [
        {
          "change": "Добавени редове 21 - 24 към номенклатура CL024",
          "change_en": "Added rows 21 - 24 to nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен мапинг към CL022 в номенклатура CL024",
          "change_en": "Added mapping to CL022 in nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена колона за НЗОК пакет в номенклатура CL022",
          "change_en": "Added column for NHIF package in nomenclature CL022",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.10",
      "file": "data/his/change-notes/v1.0.10.csv",
      "changes": [
        {
          "change": "Отключени съобщенията за извличане на номенклатури",
          "change_en": "Unlocked messages for retrieval of nomenclatures",
          "regarding_vaccines": false
        },
        {
          "change": "Добавено е поле updateDate в съобщение C001",
          "change_en": "Added is field updateDate in message C001",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.9",
      "file": "data/his/change-notes/v1.0.9.csv",
      "changes": [
        {
          "change": "Добавена номенклатура CL034",
          "change_en": "Added nomenclature CL034",
          "regarding_vaccines": false
        },
        {
          "change": "Обновена номенклатура CL024 с добавени тестове за МДД 1.40",
          "change_en": "Updated nomenclature CL024 with added tests for MDD 1.40",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.8",
      "file": "data/his/change-notes/v1.0.8.csv",
      "changes": [
        {
          "change": "Добавени преводи и инструкции за употреба в CL016",
          "change_en": "Added translations and instructions for use in CL016",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи CL027",
          "change_en": "Added translations CL027",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL005 с информацията предоставена от НСИ",
          "change_en": "Supplemented nomenclature CL005 with the information provided by NSI",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL029 с информацията предоставена от НСИ",
          "change_en": "Supplemented nomenclature CL029 with the information provided by NSI",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL020 (добавени стойности за секунда и мнинута) на база  Fhir и НСИ",
          "change_en": "Supplemented nomenclature CL020 (added values for second and minute) of base Fhir and NSI",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализиран код на МДД 01.38 - С-реактивен протеин",
          "change_en": "Updated code of MDD 01.38 - with-reactive protein",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени държави в CL005",
          "change_en": "Added countries in CL005",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена номенклатура CL009",
          "change_en": "Populated nomenclature CL009",
          "regarding_vaccines": false
        },
        {
          "change": "Попълнена номенклатура CL026",
          "change_en": "Populated nomenclature CL026",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.7",
      "file": "data/his/change-notes/v1.0.7.csv",
      "changes": [
        {
          "change": "Коригирани ключовете на номенклатура CL007 на латиница",
          "change_en": "Corrected keys of nomenclature CL007 of Latin",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана номенклатура CL022 на база анекс между НЗОК и БЛС",
          "change_en": "Corrected nomenclature CL022 of base annex between NHIF and BMA",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL005",
          "change_en": "Added translations for CL005",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL015",
          "change_en": "Added translations for CL015",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL017",
          "change_en": "Added translations for CL017",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL022",
          "change_en": "Added translations for CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL024",
          "change_en": "Added translations for CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени преводи на CL029",
          "change_en": "Added translations for CL029",
          "regarding_vaccines": false
        },
        {
          "change": "Ключовете на номенклатура CL031 са променени да представляват валидни мерни единици по UCUM, тъй като те по своето естество са уникални",
          "change_en": "Keys of nomenclature CL031 are changed to represent valid units of measure by UCUM, because by their nature are unique",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.6",
      "file": "data/his/change-notes/v1.0.6.csv",
      "changes": [
        {
          "change": "Добавени 3 липсващи мапинга към НЗОК за кодове 3088, 2079 и 2081 в номенклатура CL006",
          "change_en": "Added 3 missing mapping to NHIF for codes 3088, 2079 and 2081 in nomenclature CL006",
          "regarding_vaccines": false
        },
        {
          "change": "Допълнена номенклатура CL006 с информацията последно изпратена от МЗ; добавена колона \"Роля в Здравеопазването\", тъй като много от кодовете имат сходни имена",
          "change_en": "Supplemented nomenclature CL006 with information last sent from Ministry of Health; added column \"Role in Healthcare\", because many from the codes have similar names",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени стойности на английски за номенклатурa CL021",
          "change_en": "Added values of English for nomenclature CL021",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени стойности на бългaрски за номенклатура CL012",
          "change_en": "Added values of Bulgarian for nomenclature CL012",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени всички редове от номенклатура CL011. Това значително увеличава размера на файла!",
          "change_en": "Added all rows from nomenclature CL011. this significantly increases the size of file!",
          "regarding_vaccines": false
        },
        {
          "change": "Добавени 2 липсващи стойности към номенклатура CL010 и премахната една дуплицирана стойност",
          "change_en": "Added 2 missing values to nomenclature CL010 and removed one duplicate value",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.5",
      "file": "data/his/change-notes/v1.0.5.csv",
      "changes": [
        {
          "change": "Коригирани мапинги към НЗОК кодове в номенклатура CL006 спрямо последна информация от МЗ",
          "change_en": "Corrected mappings to NHIF codes in nomenclature CL006 compared with latest information from Ministry of Health",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирана номенклатура CL010 спрямо последна информация от МЗ. Това променя индексите от предходната версия!",
          "change_en": "Corrected nomenclature CL010 compared with latest information from Ministry of Health. this changes indexes from previous version!",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.4",
      "file": "data/his/change-notes/v1.0.4.csv",
      "changes": [
        {
          "change": "Премахнати стойности 3127, 3129, 3130, 3133, 3134 и 3136 от номенклатура CL006",
          "change_en": "Removed values 3127, 3129, 3130, 3133, 3134 and 3136 from nomenclature CL006",
          "regarding_vaccines": false
        },
        {
          "change": "Коригирани едноцифрени мапинги към НЗОК код в номенклатура CL006",
          "change_en": "Corrected single-digit mappings to NHIF code in nomenclature CL006",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен ред в номенклатура CL003: 6, Processing",
          "change_en": "Added row in nomenclature CL003: 6, Processing",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен ред в номенклатура CL003: 7, Partially Executed",
          "change_en": "Added row in nomenclature CL003: 7, Partially Executed",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализирана номенклатура CL022",
          "change_en": "Updated nomenclature CL022",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализирана номенклатура CL024",
          "change_en": "Updated nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Финализирана номенклатура CL031",
          "change_en": "Finalized nomenclature CL031",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена номенклатура CL033",
          "change_en": "Added nomenclature CL033",
          "regarding_vaccines": false
        },
        {
          "change": "Премахната FHIR референция за номенклатура CL013",
          "change_en": "Removed FHIR reference for nomenclature CL013",
          "regarding_vaccines": false
        }
      ]
    },
    {
      "version": "1.0.3",
      "file": "data/his/change-notes/v1.0.3.csv",
      "changes": [
        {
          "change": "Коригирани имената на таблиците за всяка номенклатура с цел по-ясно заначение на всяка колона.",
          "change_en": "Corrected the table names for each nomenclature to make each column meaning clearer.",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализирана номенклатура CL013 спрямо последните данни от МЗ",
          "change_en": "Updated nomenclature CL013 according to the latest data from Ministry of Health",
          "regarding_vaccines": false
        },
        {
          "change": "Сменен статуса на номенклатура CL013 на ФИНАЛИЗИРАНА",
          "change_en": "Changed status of nomenclature CL013 to FINALIZED",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен ред в номенклатура CL003: 5, Fetched",
          "change_en": "Added row in nomenclature CL003: 5, Fetched",
          "regarding_vaccines": false
        },
        {
          "change": "Добавен мапинг към НЗОК за номенклатура CL006",
          "change_en": "Added mapping to NHIF for nomenclature CL006",
          "regarding_vaccines": false
        },
        {
          "change": "Актуализирана номенклатура CL010 спрямо последните данни от МЗ",
          "change_en": "Updated nomenclature CL010 according to the latest data from Ministry of Health",
          "regarding_vaccines": false
        },
        {
          "change": "Сменен статуса на номенклатура CL014 на ФИНАЛИЗИРАНА",
          "change_en": "Changed status of nomenclature CL014 to FINALIZED",
          "regarding_vaccines": false
        },
        {
          "change": "Сменено името на номенклатура CL024",
          "change_en": "Changed the name of nomenclature CL024",
          "regarding_vaccines": false
        },
        {
          "change": "Добавена референция към FHIR за номенклатура CL027",
          "change_en": "Added reference to FHIR for nomenclature CL027",
          "regarding_vaccines": false
        }
      ]
    }
  ],
  "product_links": {
    "-1000": {
      "product": "Comirnaty",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/comirnaty",
      "who": "https://extranet.who.int/prequal/vaccines/p/comirnatyr",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/comirnaty"
    },
    "-1001": {
      "product": "Moderna",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/spikevax",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/spikevax"
    },
    "-1002": {
      "product": "Vaxzevria",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/vaxzevria",
      "who": "",
      "fda": ""
    },
    "-1003": {
      "product": "Janssen",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/jcovden",
      "who": "",
      "fda": ""
    },
    "-1004": {
      "product": "Valneva",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/covid-19-vaccine-inactivated-adjuvanted-valneva",
      "who": "",
      "fda": ""
    },
    "-1005": {
      "product": "Comirnaty Kids",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/comirnaty",
      "who": "https://extranet.who.int/prequal/vaccines/p/comirnatyr",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/comirnaty"
    },
    "-1006": {
      "product": "Vidprevtyn",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/vidprevtyn-beta",
      "who": "",
      "fda": ""
    },
    "99999": {
      "product": "UNKNOWN",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "17": {
      "product": "BCG",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/bcg-vaccine",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/bcg-vaccine"
    },
    "15138": {
      "product": "PPD",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "16058": {
      "product": "Infanrix Hexa",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/infanrix-hexa",
      "who": "",
      "fda": ""
    },
    "1754": {
      "product": "Infanrix Hexa",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/infanrix-hexa",
      "who": "",
      "fda": ""
    },
    "3537": {
      "product": "Hexacima",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/hexacima",
      "who": "https://extranet.who.int/prequal/vaccines/p/hexaxim",
      "fda": ""
    },
    "3339": {
      "product": "Infanrix-IPV+HIB",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "1542": {
      "product": "Pentaxim",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "1541": {
      "product": "Pentaxim",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "15420": {
      "product": "Tetraxim",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "61121": {
      "product": "Tetraxim",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "127": {
      "product": "Boostrix",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/boostrix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/boostrix"
    },
    "16962": {
      "product": "Adacel",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/adacel",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/adacel"
    },
    "64": {
      "product": "Tetadif",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/tetadif",
      "fda": ""
    },
    "1344": {
      "product": "Tetatox",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/tetatox",
      "fda": ""
    },
    "2998": {
      "product": "Engerix B",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/engerix-b",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/engerix-b"
    },
    "1730": {
      "product": "Engerix B",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/engerix-b",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/engerix-b"
    },
    "2517": {
      "product": "M-M-RVAXPRO",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/m-m-rvaxpro",
      "who": "",
      "fda": ""
    },
    "1234": {
      "product": "Priorix",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/priorix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/priorix"
    },
    "4084": {
      "product": "Priorix",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/priorix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/priorix"
    },
    "4184": {
      "product": "Priorix",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/priorix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/priorix"
    },
    "2958": {
      "product": "Synflorix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/synflorix",
      "who": "https://extranet.who.int/prequal/vaccines/p/synflorix",
      "fda": ""
    },
    "16291": {
      "product": "Synflorix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/synflorix",
      "who": "https://extranet.who.int/prequal/vaccines/p/synflorix",
      "fda": ""
    },
    "1653": {
      "product": "Prevenar 13",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/prevenar-13",
      "who": "https://extranet.who.int/prequal/vaccines/p/prevenar-13",
      "fda": ""
    },
    "16979": {
      "product": "Prevenar 13",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/prevenar-13",
      "who": "https://extranet.who.int/prequal/vaccines/p/prevenar-13",
      "fda": ""
    },
    "16651": {
      "product": "Verorab",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/verorab",
      "fda": ""
    },
    "4133": {
      "product": "Anti-CHF",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "129": {
      "product": "Twinrix adult",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/twinrix-adult",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/twinrix"
    },
    "1925": {
      "product": "Havrix 720",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/havrix-720-junior",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/havrix"
    },
    "7401": {
      "product": "Havrix 1440",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/havrix-1440-adult",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/havrix"
    },
    "16568": {
      "product": "VaxigripTetra",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/vaxigriptetra",
      "fda": ""
    },
    "15497": {
      "product": "VaxigripTetra",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/vaxigriptetra",
      "fda": ""
    },
    "16744": {
      "product": "Influvac Tetra",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/influvacr-tetra",
      "fda": ""
    },
    "16146": {
      "product": "Influvac Tetra",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/influvacr-tetra",
      "fda": ""
    },
    "17327": {
      "product": "Fluenz Tetra",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/fluenz-tetra",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/flumist-quadrivalent"
    },
    "66739": {
      "product": "Vaxigrip",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/vaxigrip",
      "fda": ""
    },
    "66737": {
      "product": "Vaxigrip",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/vaxigrip",
      "fda": ""
    },
    "2683": {
      "product": "Cervarix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/cervarix",
      "who": "https://extranet.who.int/prequal/vaccines/p/cervarix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/cervarix"
    },
    "16074": {
      "product": "Gardasil",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/gardasil",
      "who": "https://extranet.who.int/prequal/vaccines/p/gardasiltm",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/gardasil"
    },
    "48571": {
      "product": "Gardasil 9",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/gardasil-9",
      "who": "https://extranet.who.int/prequal/vaccines/p/gardasil-9",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/gardasil-9"
    },
    "4144": {
      "product": "Antitetanus serum",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "2565": {
      "product": "RotaTeq",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/rotateq",
      "who": "https://extranet.who.int/prequal/vaccines/p/rotateq",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/rotateq"
    },
    "17091": {
      "product": "Rotarix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/rotarix",
      "who": "https://extranet.who.int/prequal/vaccines/p/rotarix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/rotarix"
    },
    "3932": {
      "product": "Rotarix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/rotarix",
      "who": "https://extranet.who.int/prequal/vaccines/p/rotarix",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/rotarix"
    },
    "15358": {
      "product": "Stamaril",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/stamaril",
      "fda": ""
    },
    "8556": {
      "product": "Nimenrix",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/nimenrix",
      "who": "https://extranet.who.int/prequal/vaccines/p/nimenrix",
      "fda": ""
    },
    "16887": {
      "product": "Varivax",
      "ema": "",
      "who": "https://extranet.who.int/prequal/vaccines/p/varivax",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/varivax-refrigerated-and-frozen-formulations"
    },
    "15210": {
      "product": "Antidiphtheria serum",
      "ema": "",
      "who": "",
      "fda": ""
    },
    "57335": {
      "product": "Vaxneuvance",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/vaxneuvance",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/vaxneuvance"
    },
    "58090": {
      "product": "Prevenar 20",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/prevenar-20",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/prevnar-20"
    },
    "64095": {
      "product": "Abrysvo",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/abrysvo",
      "who": "https://extranet.who.int/prequal/vaccines/p/abrysvo",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/abrysvo"
    },
    "64907": {
      "product": "Fluenz",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/fluenz-0",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/flumist"
    },
    "46255": {
      "product": "Bexsero",
      "ema": "https://www.ema.europa.eu/en/medicines/human/EPAR/bexsero",
      "who": "",
      "fda": "https://www.fda.gov/vaccines-blood-biologics/vaccines/bexsero"
    }
  },
  "sheets": [
    {
      "name": "CL037",
      "label": "HIS products",
      "source": {
        "name": "his.bg",
        "url": "https://his.bg/upload/628/%D0%9D%D0%97%D0%98%D0%A1+%D0%9D%D0%BE%D0%BC%D0%B5%D0%BD%D0%BA%D0%BB%D0%B0%D1%82%D1%83%D1%80%D0%B8+-+%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F+v1.5.27+%281%29.xlsx",
        "version": "v1.5.27",
        "date": "29.06.2026",
        "sheet_name": "CL037",
        "sheet_description": "Код на ваксина"
      },
      "column_count": 19,
      "rows": [
        {
          "index": 1,
          "cells": {
            "1": "CL037 - Код на ваксина"
          }
        },
        {
          "index": 3,
          "cells": {
            "1": "Entity",
            "6": "Meta Data",
            "18": "System Data"
          }
        },
        {
          "index": 4,
          "cells": {
            "1": "Key",
            "2": "Description BG",
            "3": "Description EN",
            "4": "Display value BG",
            "5": "Display value EN",
            "6": "Medicament Details",
            "7": "ATC",
            "8": "INN",
            "9": "Target Disease",
            "10": "Vaccine Group",
            "11": "Dose Quantity (ml)",
            "12": "Number of Doses",
            "13": "Days to Next Dose",
            "14": "Permit Number",
            "15": "Permit Owner ID",
            "16": "Permit Owner Name",
            "17": "MH code",
            "18": "Since",
            "19": "Valid Until"
          },
          "styles": {
            "13": "red"
          }
        },
        {
          "index": 5,
          "cells": {
            "1": "-1000",
            "2": "Comirnaty",
            "3": "Comirnaty",
            "4": "Comirnaty",
            "5": "Comirnaty",
            "6": "Comirnaty",
            "7": "J07BX03",
            "8": "COVID-19 mRNA vaccine (nucleoside-modified)",
            "9": "U07.1",
            "10": "1",
            "11": "0.3",
            "12": "2",
            "13": "90",
            "14": "EU/1/20/1528",
            "15": "ORG-100030215",
            "16": "Biontech Manufacturing GmbH",
            "17": "1036",
            "18": "v1.0.0"
          }
        },
        {
          "index": 6,
          "cells": {
            "1": "-1001",
            "2": "COVID-19 Vaccine Moderna",
            "3": "COVID-19 Vaccine Moderna",
            "4": "Moderna",
            "5": "Moderna",
            "6": "COVID-19 Vaccine Moderna",
            "7": "J07BX03",
            "8": "COVID-19 mRNA vaccine (nucleoside-modified)",
            "9": "U07.1",
            "10": "1",
            "11": "0.5",
            "12": "2",
            "13": "28",
            "14": "EU/1/20/1507",
            "15": "ORG-100031184",
            "16": "Moderna Biotech Spain S.L.",
            "17": "1037",
            "18": "v1.0.0",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "15": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 7,
          "cells": {
            "1": "-1002",
            "2": "Vaxzevria",
            "3": "Vaxzevria",
            "4": "Vaxzevria",
            "5": "Vaxzevria",
            "6": "Vaxzevria - AstraZeneca",
            "7": "J07BX03",
            "8": "COVID-19 Vaccine (ChAdOx1-S [recombinant])",
            "9": "U07.1",
            "10": "1",
            "11": "0.5",
            "12": "2",
            "13": "70",
            "14": "EU/1/21/1529",
            "15": "ORG-100001699",
            "16": "AstraZeneca AB",
            "17": "1038",
            "18": "v1.0.0",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "15": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 8,
          "cells": {
            "1": "-1003",
            "2": "COVID-19 Vaccine Janssen",
            "3": "COVID-19 Vaccine Janssen",
            "4": "Janssen",
            "5": "Janssen",
            "6": "COVID-19 Vaccine Janssen",
            "7": "J07BX03",
            "8": "COVID-19 vaccine (Ad26.COV2-S [recombinant)",
            "9": "U07.1",
            "10": "1",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "EU/1/20/1525",
            "15": "ORG-100001417",
            "16": "Janssen-Cilag International",
            "17": "1040",
            "18": "v1.2.0",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "15": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 9,
          "cells": {
            "1": "-1004",
            "2": "COVID-19 vaccine Valneva",
            "3": "COVID-19 vaccine Valneva",
            "4": "Valneva",
            "5": "Valneva",
            "6": "COVID-19 vaccine Valneva",
            "7": "J07BX03",
            "8": "COVID-19 Vaccine Valneva",
            "9": "U07.1",
            "10": "1",
            "11": "0.5",
            "12": "2",
            "13": "28",
            "14": "EU/1/21/1624",
            "15": "ORG-100036422",
            "16": "Valneva France",
            "17": "1046",
            "18": "v1.3.12",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "15": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 10,
          "cells": {
            "1": "-1005",
            "2": "Comirnaty Kids",
            "3": "Comirnaty Kids",
            "4": "Comirnaty Kids",
            "5": "Comirnaty Kids",
            "6": "Comirnaty - Kids",
            "7": "J07BX03",
            "8": "COVID-19 mRNA vaccine (nucleoside-modified)",
            "9": "U07.1",
            "10": "1",
            "11": "0.2",
            "12": "3",
            "13": "2nd: 21; 3rd: 56",
            "14": "EU/1/20/1528",
            "15": "ORG-100030215",
            "16": "Biontech Manufacturing GmbH",
            "17": "1047",
            "18": "v1.3.13"
          }
        },
        {
          "index": 11,
          "cells": {
            "1": "-1006",
            "2": "Vidprevtyn",
            "3": "Vidprevtyn",
            "4": "Vidprevtyn",
            "5": "Vidprevtyn",
            "6": "VidPrevtyn Beta",
            "7": "J07BX03",
            "8": "COVID-19 Vaccine (recombinant, adjuvanted)",
            "9": "U07.1",
            "10": "1",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "EU/1/21/1580",
            "15": "ORG-100000788",
            "16": "Sanofi Pasteur",
            "17": "1048",
            "18": "v1.4.0",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "15": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 12,
          "cells": {
            "1": "99999",
            "2": "Неизвестна ваксина",
            "3": "Unknown vaccine",
            "4": "НЕИЗВЕСТНА",
            "5": "UNKNOWN",
            "6": "Unknown vaccine product",
            "7": "--",
            "8": "Unknown vaccine product",
            "9": "---",
            "10": "1",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "---",
            "16": "---",
            "18": "v1.5.21"
          }
        },
        {
          "index": 13,
          "cells": {
            "1": "17",
            "2": "BCG vaccine, freeze-dried",
            "3": "BCG vaccine, freeze-dried",
            "4": "БЦЖ",
            "5": "BCG",
            "6": "Powder and solvent for suspension for injection, 0.05 mg/dose, -, Pack: 20 ampoules (1 ampoule/10 doses)",
            "7": "J07AN01",
            "8": "Mycobacterium bovis BCG",
            "9": "Z23.2",
            "10": "2",
            "11": "0.1",
            "12": "1-5",
            "13": "1",
            "14": "20010843",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "1007",
            "18": "v1.2.7"
          }
        },
        {
          "index": 14,
          "cells": {
            "1": "15138",
            "2": "PPD Tuberculin Mammalian",
            "3": "PPD Tuberculin Mammalian",
            "4": "ППД",
            "5": "PPD",
            "6": "Solution for injection, 5 TU/0.1 ml/1 dose, -, Pack: 10 vials x 1 ml (10 дози)",
            "7": "V04CF01",
            "8": "Tuberculini purified Protein Derivative for human use",
            "9": "Z23.2",
            "10": "2",
            "11": "0.1",
            "12": "1-5",
            "13": "90",
            "14": "20000719",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "1006",
            "18": "v1.2.7"
          }
        },
        {
          "index": 15,
          "cells": {
            "1": "16058",
            "2": "Infanrix Hexa",
            "3": "Infanrix Hexa",
            "4": "Infanrix Hexa",
            "5": "Infanrix Hexa",
            "6": "Powder and suspension for suspension for injection, 0.5, ml, Pack: 1 vial + 1 pre-filled syringe without needle",
            "7": "J07CA09",
            "8": "Diphtheria-hemophilus influenzae B-pertussis-poliomyelitis-tetanus-hepatitis B",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/00/152/001",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.2.7",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 16,
          "cells": {
            "1": "1754",
            "2": "Infanrix Hexa",
            "3": "Infanrix Hexa",
            "4": "Infanrix Hexa",
            "5": "Infanrix Hexa",
            "6": "Powder and suspension for suspension for injection, suspension: 0.5 ml, -, Pack: 1 vial + 1 pre- filled syringe + 2 needles",
            "7": "J07CA09",
            "8": "Diphtheria-hemophilus influenzae B-pertussis-poliomyelitis-tetanus-hepatitis B",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/00/152/005",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "17": "1031",
            "18": "v1.5.4"
          }
        },
        {
          "index": 17,
          "cells": {
            "1": "3537",
            "2": "Hexacima",
            "3": "Hexacima",
            "4": "Hexacima",
            "5": "Hexacima",
            "6": "Suspension for injection, 0,5 ml, -, Pack: 1 pre-filled syringe + 2 needles",
            "7": "J07CA09",
            "8": "Diphtheria-hemophilus influenzae B-pertussis-poliomyelitis-tetanus-hepatitis B",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/13/828/006",
            "16": "Sanofi Pasteur S.A., Франция",
            "17": "1032",
            "18": "v1.2.7"
          }
        },
        {
          "index": 18,
          "cells": {
            "1": "3339",
            "2": "Infanrix-IPV+HIB",
            "3": "Infanrix-IPV+HIB",
            "4": "Infanrix-IPV+HIB",
            "5": "Infanrix-IPV+HIB",
            "6": "Powder and suspension for suspension for injection, -, -, Pack: 1 vial + 1 pre-filled syringe 0.5 ml + 2 needles",
            "7": "J07CA06",
            "8": "Diphtheria-hemophilus influenzae B-pertussis-poliomyelitis-tetanus",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "4",
            "13": "30",
            "14": "20090475",
            "16": "ГлаксоСмитКлайн ЕООД, България",
            "17": "1034",
            "18": "v1.5.4"
          }
        },
        {
          "index": 19,
          "cells": {
            "1": "1542",
            "2": "Pentaxim",
            "3": "Pentaxim",
            "4": "Pentaxim",
            "5": "Pentaxim",
            "6": "Powder and solvent for suspension for injection, 0.5, ml, Pack: 1 vial powder, 1 pre-filled syringe 0.5ml for susp., 2 needles",
            "7": "J07CA06",
            "8": "Diphtheria-pertussis-poliomyelitis-tetanus",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "4",
            "13": "30",
            "14": "20050449",
            "16": "Sanofi Pasteur S.A., Франция",
            "17": "1030",
            "18": "v1.2.7",
            "19": "18.08.2025"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 20,
          "cells": {
            "1": "1541",
            "2": "Pentaxim",
            "3": "Pentaxim",
            "4": "Pentaxim",
            "5": "Pentaxim",
            "6": "Powder and solvent for suspension for injection, 0,5, ml, Pack: 1 vial powder, 1 pre-filled syringe 0.5ml for susp.",
            "7": "J07CA06",
            "8": "Diphtheria-pertussis-poliomyelitis-tetanus",
            "9": "Z27.8",
            "10": "3",
            "11": "0.5",
            "12": "4",
            "13": "30",
            "14": "20050449",
            "16": "Sanofi Pasteur S.A., Франция",
            "18": "v1.2.7",
            "19": "01.01.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 21,
          "cells": {
            "1": "15420",
            "2": "Tetraxim",
            "3": "Tetraxim",
            "4": "Tetraxim",
            "5": "Tetraxim",
            "6": "Suspension for injection, 0.5, ml, Pack: 10 pre-filled syringe 0,5 ml with 2 separate needles",
            "7": "J07CA02",
            "8": "Diphtheria-pertussis-poliomyelitis-tetanus",
            "9": "Z27.3",
            "10": "3",
            "11": "0.5",
            "12": "4",
            "13": "30",
            "14": "20060041",
            "16": "Sanofi Pasteur S.A., Франция",
            "17": "1008",
            "18": "v1.2.7"
          }
        },
        {
          "index": 22,
          "cells": {
            "1": "61121",
            "2": "Tetraxim",
            "3": "Tetraxim",
            "4": "Tetraxim",
            "5": "Tetraxim",
            "6": "Suspension for injection, 0.5, ml, Pack: 10 pre-filled syringe 0,5 ml with 1 separate needle",
            "7": "J07CA02",
            "8": "Diphtheria-pertussis-poliomyelitis-tetanus",
            "9": "Z27.3",
            "10": "3",
            "11": "0.5",
            "12": "4",
            "13": "30",
            "14": "20060041",
            "16": "Sanofi Pasteur S.A., Франция",
            "17": "1008",
            "18": "v1.4.11",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "17": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 23,
          "cells": {
            "1": "127",
            "2": "Boostrix",
            "3": "Boostrix",
            "4": "Boostrix",
            "5": "Boostrix",
            "6": "Suspension for injection, 1 dose (0,5 ml), -, Pack: 1 pre-filled syringe 0.5 ml + 2 needles",
            "7": "J07AJ52",
            "8": "Pertussis, purified antigen, combinations with toxoids",
            "9": "Z27.1",
            "10": "10",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20020682",
            "16": "ГлаксоСмитКлайн ЕООД, България",
            "17": "1035",
            "18": "v1.2.7"
          }
        },
        {
          "index": 24,
          "cells": {
            "1": "16962",
            "2": "Adacel",
            "3": "Adacel",
            "4": "Adacel",
            "5": "Adacel",
            "6": "Suspension for injection, 0,5, ml, Pack: pre- filled syringe without needle x 10",
            "7": "J07AJ52",
            "8": "Pertussis, purified antigen, combinations with toxoids",
            "9": "Z27.1",
            "10": "10",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20160287",
            "16": "Sanofi Pasteur, Франция",
            "18": "v1.2.7",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 25,
          "cells": {
            "1": "64",
            "2": "TETADIF",
            "3": "TETADIF",
            "4": "Tetadif",
            "5": "Tetadif",
            "6": "Suspension for injection, 0.5 ml (1 dose), -, Pack: 10 ampoules",
            "7": "J07AM51",
            "8": "Tetanus toxoid, combinations with diphtheria toxoid",
            "9": "Z27.8",
            "11": "0.5",
            "12": "10",
            "13": "30",
            "14": "20011159",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "1002",
            "18": "v1.2.7"
          }
        },
        {
          "index": 26,
          "cells": {
            "1": "1344",
            "2": "TETATOX",
            "3": "TETATOX",
            "4": "Tetatox",
            "5": "Tetatox",
            "6": "Suspension for injection, 0.5 ml (1 dose), -, Pack: 10 ampoules",
            "7": "J07AM01",
            "8": "Tetanus toxoid",
            "9": "Z23.5",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20010491",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "18": "v1.3.0"
          }
        },
        {
          "index": 27,
          "cells": {
            "1": "2998",
            "2": "Engerix B",
            "3": "Engerix B",
            "4": "Engerix B",
            "5": "Engerix B",
            "6": "Suspension for injection, 10 mcg/0.5 ml, -, Pack: 1 pre-filled syringe",
            "7": "J07BC01",
            "8": "Hepatitis B, purified antigen",
            "9": "Z24.6",
            "10": "4",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "20000246",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "17": "1015",
            "18": "v1.2.7"
          }
        },
        {
          "index": 28,
          "cells": {
            "1": "1730",
            "2": "Engerix B",
            "3": "Engerix B",
            "4": "Engerix B",
            "5": "Engerix B",
            "6": "Suspension for injection, 20 mcg/1.0 ml, -, Pack: 1 pre-filled syringe",
            "7": "J07BC01",
            "8": "Hepatitis B, purified antigen",
            "9": "Z24.6",
            "10": "4",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "20000247",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.2.7"
          }
        },
        {
          "index": 29,
          "cells": {
            "1": "2517",
            "2": "M-M-RVAXPRO",
            "3": "M-M-RVAXPRO",
            "4": "M-M-RVAXPRO",
            "5": "M-M-RVAXPRO",
            "6": "Powder and solvent for suspension for injection, 0,5 ml, -, Pack: 1 vial + 1 pre-filled syringe + 2 needles",
            "7": "J07BD52",
            "8": "Measles, mumps and rubella vaccine (live)",
            "9": "Z27.4",
            "10": "5",
            "11": "0.5",
            "12": "1;2",
            "13": "---;30",
            "14": "EU/1/06/337/011",
            "16": "MSD VACCINS, Lyon, Франция",
            "17": "1016",
            "18": "v1.2.7"
          }
        },
        {
          "index": 30,
          "cells": {
            "1": "1234",
            "2": "Priorix",
            "3": "Priorix",
            "4": "Priorix",
            "5": "Priorix",
            "6": "Powder and solvent for suspension for injection, 1 dose 0.5 ml, -, Pack: 1 vial with powder + 1 pre-filled syr. 0,5 ml solv + 2 separate needles",
            "7": "J07BD52",
            "8": "Measles, mumps and rubella vaccine (live)",
            "9": "Z27.4",
            "10": "5",
            "11": "0.5",
            "12": "2",
            "13": "30",
            "14": "9800351",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "17": "1016A",
            "18": "v1.2.7"
          }
        },
        {
          "index": 31,
          "cells": {
            "1": "4084",
            "2": "Priorix",
            "3": "Priorix",
            "4": "Priorix",
            "5": "Priorix",
            "6": "Powder and solvent for suspension for injection, 1 dose 0.5 ml, -, Pack: 1 vial with powder + 1 ampoule with solvent",
            "7": "J07BD52",
            "8": "Measles, mumps and rubella vaccine (live)",
            "9": "Z27.4",
            "10": "5",
            "11": "0.5",
            "12": "2",
            "13": "30",
            "14": "9800351",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.2.7",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 32,
          "cells": {
            "1": "4184",
            "2": "Priorix",
            "3": "Priorix",
            "4": "Priorix",
            "5": "Priorix",
            "6": "Powder and solvent for suspension for injection, 1 dose 0.5 ml, -, Pack: 100 vial with powder + 100 ampoule with solvent",
            "7": "J07BD52",
            "8": "Measles, mumps and rubella vaccine (live)",
            "9": "Z27.4",
            "10": "5",
            "11": "0.5",
            "12": "2",
            "13": "30",
            "14": "9800351",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.2.7",
            "19": "01.01.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 33,
          "cells": {
            "1": "2958",
            "2": "SYNFLORIX",
            "3": "SYNFLORIX",
            "4": "Synflorix",
            "5": "Synflorix",
            "6": "Suspension for injection, 0.5 ml, -, Pack: 1 pre-filled syringe + 1 needle",
            "7": "J07AL52",
            "8": "Pneumococcal polysaccharide conjugate vaccine  (adsorbed)",
            "9": "Z23.8",
            "10": "6",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/09/508/003",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "17": "1009",
            "18": "v1.2.7"
          }
        },
        {
          "index": 34,
          "cells": {
            "1": "16291",
            "2": "SYNFLORIX",
            "3": "SYNFLORIX",
            "4": "Synflorix",
            "5": "Synflorix",
            "6": "Suspension for injection, 0.5, ml, Pack: 1 prefilled syringe + 2 needles",
            "7": "J07AL52",
            "8": "Pneumococcal polysaccharide conjugate vaccine  (adsorbed)",
            "9": "Z23.8",
            "10": "6",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/09/508/005",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.2.7",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 35,
          "cells": {
            "1": "1653",
            "2": "Prevenar 13",
            "3": "Prevenar 13",
            "4": "Prevenar 13",
            "5": "Prevenar 13",
            "6": "Suspension for injection, 0.5, ml, Pack: 10 pre-filled syringes",
            "7": "J07AL02",
            "8": "Pneumococcal polysaccharide conjugate vaccine  (13-valent, adsorbed)",
            "9": "Z23.8",
            "10": "6",
            "11": "0.5",
            "12": "1;3",
            "13": "---;30",
            "14": "ЕU/1/09/590/003",
            "16": "Pfizer Europe MA EEIG, Белгия",
            "18": "v1.3.0",
            "19": "01.01.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 36,
          "cells": {
            "1": "16979",
            "2": "Prevenar 13",
            "3": "Prevenar 13",
            "4": "Prevenar 13",
            "5": "Prevenar 13",
            "6": "Suspension for injection, 0.5, ml, Pack: 1 pre-filled syringe with separate needle",
            "7": "J07AL02",
            "8": "Pneumococcal polysaccharide conjugate vaccine  (13-valent, adsorbed)",
            "9": "Z23.8",
            "10": "6",
            "11": "0.5",
            "12": "1;3",
            "13": "---;30",
            "14": "EU/1/09/590/002",
            "16": "Pfizer Europe MA EEIG, Белгия",
            "18": "v1.3.0"
          }
        },
        {
          "index": 37,
          "cells": {
            "1": "16651",
            "2": "VERORAB",
            "3": "VERORAB",
            "4": "Verorab",
            "5": "Verorab",
            "6": "Powder and solvent for suspension for injection, 2,5 IU/0,5 ml, ml, Pack: 1 vial (1 dose) + 1 pre-filled syringe solvent 0.5 ml",
            "7": "J07BG01",
            "8": "Rabies vaccine for human use prepared in cell cultures (inactivated)",
            "9": "Z24.2",
            "11": "0.5",
            "12": "5",
            "13": "3",
            "14": "20010453",
            "16": "Sanofi Pasteur S.A., Франция",
            "17": "1011",
            "18": "v1.3.0"
          }
        },
        {
          "index": 38,
          "cells": {
            "1": "4133",
            "2": "Anti-CHF VACCINE",
            "3": "Anti-CHF VACCINE",
            "4": "Anti-CHF",
            "5": "Anti-CHF",
            "6": "Suspension for injection, ampoule 1 ml (1 dose), -, Pack: 1 ampoule",
            "7": "J07BX00",
            "8": "Crimean Haemorrhagic fever vaccine; inactivated",
            "9": "Z25.8",
            "11": "1.0",
            "12": "5",
            "13": "30",
            "14": "20010452",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "1013",
            "18": "v1.3.0"
          }
        },
        {
          "index": 39,
          "cells": {
            "1": "129",
            "2": "TWINRIX ADULT",
            "3": "TWINRIX ADULT",
            "4": "Twinrix adult",
            "5": "Twinrix adult",
            "6": "Suspension for injection, 1, ml, Pack: 1 pre-filled syringe + 1 needle",
            "7": "J07BC20",
            "8": "Hepatitis A (inactivated), hepatitis B (rDNA) (HAB) vaccine (adsorbed)",
            "9": "Z24.6;Z27.8",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/96/020/007",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.0"
          }
        },
        {
          "index": 40,
          "cells": {
            "1": "1925",
            "2": "Havrix 720",
            "3": "Havrix 720",
            "4": "Havrix 720",
            "5": "Havrix 720",
            "6": "Suspension for injection, 0.5 ml (Junior monodose), -, Pack: 1 pre-filled syringe",
            "7": "J07BC02",
            "8": "Hepatitis A, inactivated, whole virus",
            "9": "Z24.6",
            "11": "0.5",
            "12": "2",
            "13": "180",
            "14": "9800108",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.0"
          }
        },
        {
          "index": 41,
          "cells": {
            "1": "7401",
            "2": "Havrix 1440",
            "3": "Havrix 1440",
            "4": "Havrix 1440",
            "5": "Havrix 1440",
            "6": "Suspension for injection, (Adult dose), -, Pack: 1 vial",
            "7": "J07BC 2",
            "8": "Hepatitis A, inactivated, whole virus",
            "9": "Z24.6",
            "11": "0.5",
            "12": "2",
            "13": "180",
            "14": "9800109",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.1",
            "19": "15.09.2023"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 42,
          "cells": {
            "1": "16568",
            "2": "VaxigripTetra",
            "3": "VaxigripTetra",
            "4": "VaxigripTetra",
            "5": "VaxigripTetra",
            "6": "Suspension for injection, 15 mcg/0.5 ml, -, Pack: 10 pre-filled syringe with attached needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20160310",
            "16": "Sanofi Pasteur S.A., Франция",
            "18": "v1.3.0",
            "19": "30.09.2025"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 43,
          "cells": {
            "1": "15497",
            "2": "VaxigripTetra",
            "3": "VaxigripTetra",
            "4": "VaxigripTetra",
            "5": "VaxigripTetra",
            "6": "Suspension for injection, 15 mcg/0.5 ml, 1 pre-filled syringe with attached needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20160310",
            "16": "Sanofi Pasteur S.A.",
            "18": "v1.4.9",
            "19": "30.09.2025"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 44,
          "cells": {
            "1": "16744",
            "2": "Influvac Tetra",
            "3": "Influvac Tetra",
            "4": "Influvac Tetra",
            "5": "Influvac Tetra",
            "6": "Suspension for injection, 15 mcg/0.5 ml, -, Pack: 10 pre-filled syringe with attached needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1;2",
            "13": "---;28",
            "14": "20170285",
            "16": "Майлан ЕООД, България",
            "18": "v1.3.0",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 45,
          "cells": {
            "1": "16146",
            "2": "Influvac Tetra",
            "3": "Influvac Tetra",
            "4": "Influvac Tetra",
            "5": "Influvac Tetra",
            "6": "Suspension for injection, 0,5 ml, 1 pre-filled syringe with needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1;2",
            "13": "---;28",
            "14": "20170285",
            "16": "Майлан ЕООД, България",
            "18": "v1.4.7"
          }
        },
        {
          "index": 46,
          "cells": {
            "1": "17327",
            "2": "Fluenz Tetra",
            "3": "Fluenz Tetra",
            "4": "Fluenz Tetra",
            "5": "Fluenz Tetra",
            "6": "Nasal spray, suspension, 0.2, ml, Pack: 1 sprayer (glass) in a tri-fold carton",
            "7": "J07BB03",
            "8": "Influenza, live attenuated",
            "9": "Z25.1",
            "10": "9",
            "11": "0.2",
            "12": "1;2",
            "13": "---;28",
            "14": "EU/1/13/887/003",
            "16": "AstraZeneca AB, Швеция",
            "18": "v1.3.0",
            "19": "30.09.2025"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 47,
          "cells": {
            "1": "66739",
            "2": "Vaxigrip",
            "3": "Vaxigrip",
            "4": "Vaxigrip",
            "5": "Vaxigrip",
            "6": "Suspension for injection in pre-filled syringe, 0.5 ml (dose), Pack: 10 Pre-filled syringe with attached needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20160310",
            "16": "Sanofi Pasteur S.A., Франция",
            "18": "v1.5.21"
          }
        },
        {
          "index": 48,
          "cells": {
            "1": "66737",
            "2": "Vaxigrip",
            "3": "Vaxigrip",
            "4": "Vaxigrip",
            "5": "Vaxigrip",
            "6": "Suspension for injection in pre-filled syringe, 0.5 ml (dose), 1 Pre-filled syringe with attached needle",
            "7": "J07BB02",
            "8": "Influenza, inactivated, split virus or surface antigen",
            "9": "Z25.1",
            "10": "9",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20160310",
            "16": "Sanofi Pasteur S.A.",
            "18": "v1.5.21"
          }
        },
        {
          "index": 49,
          "cells": {
            "1": "2683",
            "2": "Cervarix",
            "3": "Cervarix",
            "4": "Cervarix",
            "5": "Cervarix",
            "6": "Suspension for injection, 1 dose (0,5 ml), -, Pack: 1 pre-filled syringe + 2 needles",
            "7": "J07BM02",
            "8": "Papillomavirus (human types 16, 18)",
            "9": "Z25.8",
            "10": "8",
            "11": "0.5",
            "12": "3",
            "13": "30",
            "14": "EU/1/07/419/005",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.0",
            "19": "17.04.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 50,
          "cells": {
            "1": "16074",
            "2": "Gardasil",
            "3": "Gardasil",
            "4": "Gardasil",
            "5": "Gardasil",
            "6": "Suspension for injection, 0.5, ml, Pack: 1 pre-filled syringe + 2 needles",
            "7": "J07BM01",
            "8": "Papillomavirus (human types 6, 11, 16, 18)",
            "9": "Z25.8",
            "10": "8",
            "11": "0.5",
            "12": "2;3",
            "13": "60;180",
            "14": "EU/1/06/357/007",
            "16": "MSD VACCINS, Lyon, Франция",
            "18": "v1.3.0"
          }
        },
        {
          "index": 51,
          "cells": {
            "1": "48571",
            "2": "Gardasil 9",
            "3": "Gardasil 9",
            "4": "Gardasil 9",
            "5": "Gardasil 9",
            "6": "Suspension for injection, 0.5, ml, Pack: 1 pre-filled syringe + 2 needles",
            "7": "J07BM03",
            "8": "Papillomavirus (human types 6, 11, 16, 18, 31, 33, 45, 52, 58)",
            "9": "Z25.8",
            "10": "11",
            "11": "0.5",
            "12": "2;3",
            "13": "30",
            "16": "Merck Sharp & Dohme B.V., Нидерландия",
            "18": "v1.4.5"
          }
        },
        {
          "index": 52,
          "cells": {
            "1": "4144",
            "2": "Антитетанус серум",
            "3": "Antitetanus serum Bul Bio",
            "4": "Антитетанус серум",
            "5": "Antitetanus serum",
            "6": "Solution for injection, 1500 IU/1 dose, IU, Pack: 1 ampoule",
            "7": "J06AA02",
            "8": "Tetanus antitoxin",
            "9": "A36.x;Z23.6",
            "11": "10.0",
            "12": "2",
            "13": "---",
            "14": "20020007",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "1020",
            "18": "v1.3.0"
          }
        },
        {
          "index": 53,
          "cells": {
            "1": "2565",
            "2": "RotaTeq",
            "3": "RotaTeq",
            "4": "RotaTeq",
            "5": "RotaTeq",
            "6": "Oral solution, 2 ml, -, Pack: 1 tube",
            "7": "J07BH02",
            "8": "Rota virus, live attenuated",
            "9": "Z25.8",
            "11": "2.0",
            "12": "3",
            "13": "28",
            "14": "EU/1/06/348/001",
            "16": "MSD VACCINS, Lyon, Франция",
            "18": "v1.3.0"
          }
        },
        {
          "index": 54,
          "cells": {
            "1": "17091",
            "2": "ROTARIX",
            "3": "ROTARIX",
            "4": "Rotarix",
            "5": "Rotarix",
            "6": "Oral suspension, 1,5, ml, Pack: 1 squeezable tube",
            "7": "J07BH01",
            "8": "Rota virus, live attenuated",
            "9": "Z25.8",
            "10": "7",
            "11": "1.5",
            "12": "2",
            "13": "28",
            "14": "EU/1/05/330/009",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.0"
          }
        },
        {
          "index": 55,
          "cells": {
            "1": "3932",
            "2": "ROTARIX",
            "3": "ROTARIX",
            "4": "Rotarix",
            "5": "Rotarix",
            "6": "Oral suspension, 1.5, ml, Pack: 1 pre-filled oral applicator (glass)",
            "7": "J07BH01",
            "8": "Rota virus, live attenuated",
            "9": "Z25.8",
            "10": "7",
            "11": "1.5",
            "12": "2",
            "13": "28",
            "14": "EU/1/05/330/005",
            "16": "GlaxoSmithKline Biologicals S.A., Белгия",
            "18": "v1.3.0",
            "19": "01.01.2024"
          },
          "styles": {
            "1": "red",
            "2": "red",
            "3": "red",
            "4": "red",
            "5": "red",
            "6": "red",
            "7": "red",
            "8": "red",
            "9": "red",
            "10": "red",
            "11": "red",
            "12": "red",
            "13": "red",
            "14": "red",
            "16": "red",
            "18": "red",
            "19": "red"
          }
        },
        {
          "index": 56,
          "cells": {
            "1": "15358",
            "2": "STAMARIL",
            "3": "STAMARIL",
            "4": "Stamaril",
            "5": "Stamaril",
            "6": "Powder and solvent for suspension for injection, Yellow fever virus 17 D-204 strain (live attenuated) not less than 1000 IU produced in specified pathogen-free chick embryos, -, Pack: 1 vial 1 dose + solvent in pre-filled syringe 0,5 ml with attached needle x 1",
            "7": "J07BL 1",
            "8": "Yellow fever vaccine (live)",
            "9": "Z24.3",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "20000831",
            "16": "Sanofi Pasteur S.A., Франция",
            "18": "v1.3.1"
          }
        },
        {
          "index": 57,
          "cells": {
            "1": "8556",
            "2": "Nimenrix",
            "3": "Nimenrix",
            "4": "Nimenrix",
            "5": "Nimenrix",
            "6": "Powder and solvent for solution for injection, 5 mcg/5 mcg/5 mcg/5 mcg/44 mcg, 1 dose = 0,5 ml, -, Pack: 1 vial + prefilled syringle + 2 needles",
            "7": "J07AH08",
            "8": "Meningococcal group A, C, W-135 and Y conjugate vaccine",
            "9": "A39.x",
            "11": "0.5",
            "12": "2",
            "13": "60",
            "14": "EU/1/12/767/003",
            "16": "Pfizer Europe MA EEIG, Белгия",
            "18": "v1.3.1"
          }
        },
        {
          "index": 58,
          "cells": {
            "1": "16887",
            "2": "Varivax",
            "3": "Varivax",
            "4": "Varivax",
            "5": "Varivax",
            "6": "Powder and solvent for suspension for injection, 0.5, ml, Pack: 1 vial powder + pre-filled syringe solvent with plunger stopper and tip cap with 2 separate needles in the blister",
            "7": "J07BK 1",
            "8": "Varicella, live  attenuated",
            "9": "B01.x",
            "11": "0.5",
            "12": "2",
            "13": "30",
            "14": "20190187",
            "16": "Merck Sharp & Dohme B.V., Нидерландия",
            "18": "v1.3.1"
          }
        },
        {
          "index": 59,
          "cells": {
            "1": "15210",
            "2": "Антидифтериен серум",
            "3": "Antidiphtheria serum",
            "4": "Антидифтериен серум",
            "5": "Antidiphtheria serum",
            "6": "Solution for injection, 5000 IU, :1 Ampoule, colourless glass class I",
            "7": "J06AA01",
            "8": "diphtheria antitoxin",
            "9": "A36.x",
            "11": "10",
            "12": "1",
            "13": "---",
            "14": "20020930",
            "16": "БУЛ БИО-НЦЗПБ ЕООД, България",
            "17": "883",
            "18": "v1.4.11"
          }
        },
        {
          "index": 60,
          "cells": {
            "1": "57335",
            "2": "Vaxneuvance",
            "3": "Vaxneuvance",
            "4": "Vaxneuvance",
            "5": "Vaxneuvance",
            "6": "Suspension for injection, 0.5 ml/dose, 1 pre-filled syringe + 2 separate needles",
            "7": "J07AL02",
            "8": "Pneumococcus, purified polysaccharides antigen conjugated (15-valent, adsorbed)",
            "9": "Z23.8",
            "10": "6",
            "11": "0.5",
            "12": "3;4",
            "13": "30",
            "14": "EU/1/21/1591/005",
            "16": "Merck Sharp & Dohme B.V.",
            "17": "1028",
            "18": "v.1.5.9"
          }
        },
        {
          "index": 61,
          "cells": {
            "1": "58090",
            "2": "Prevenar 20",
            "3": "Prevenar 20",
            "4": "Prevenar 20",
            "5": "Prevenar 20",
            "6": "Suspension for injection, 0.5 ml (dose), 1 pre-filled syringe + 1 needle",
            "7": "J07AL02",
            "8": "Pneumococcus, purified polysaccharides antigen conjugated (20-valent, adsorbed)",
            "9": "Z23.8",
            "11": "0.5",
            "12": "1;4",
            "13": "---;28",
            "14": "EU/1/21/1612/002",
            "16": "Pfizer Europe MA EEIG",
            "18": "v.1.5.10"
          }
        },
        {
          "index": 62,
          "cells": {
            "1": "64095",
            "2": "Abrysvo",
            "3": "Abrysvo",
            "4": "Abrysvo",
            "5": "Abrysvo",
            "6": "Powder and solvent for solution for injection, 0,5 ml 1 vial, 1 vial adaptor, 1 pre-filled syringe, 1 needle",
            "7": "J07BX05",
            "8": "Respiratory syncytial virus vaccine (bivalent, recombinant)",
            "9": "Z25.8",
            "11": "0.5",
            "12": "1",
            "13": "---",
            "14": "EU/1/23/1752/001",
            "16": "Pfizer Europe MA EEIG",
            "18": "v.1.5.10"
          }
        },
        {
          "index": 63,
          "cells": {
            "1": "64907",
            "2": "Fluenz",
            "3": "Fluenz",
            "4": "Fluenz",
            "5": "Fluenz",
            "6": "Nasal spray, suspension, 0.2, ml, Pack: 1 sprayer",
            "7": "J07BB03",
            "8": "Influenza vaccine (live attenuated, nasal)",
            "9": "Z25.1",
            "11": "0.2",
            "12": "1;2",
            "13": "---;28",
            "14": "EU/1/24/1816/001",
            "16": "AstraZeneca AB",
            "18": "v.1.5.10"
          }
        },
        {
          "index": 64,
          "cells": {
            "1": "46255",
            "2": "Bexsero",
            "3": "Bexsero",
            "4": "Bexsero",
            "5": "Bexsero",
            "6": "Suspension for injection, 1 Pre-filled syringe with needles",
            "7": "J07AH09",
            "8": "Meningococcal group B vaccine (recombinant, adsorbed)",
            "9": "A39.x",
            "11": "0.5",
            "12": "2;3;4",
            "13": "30",
            "14": "EU/1/12/812/001",
            "16": "GSK Vaccines S.r.l.",
            "18": "v.1.5.20"
          }
        }
      ]
    },
    {
      "name": "CL038",
      "label": "HIS schedule",
      "source": {
        "name": "his.bg",
        "url": "https://his.bg/upload/628/%D0%9D%D0%97%D0%98%D0%A1+%D0%9D%D0%BE%D0%BC%D0%B5%D0%BD%D0%BA%D0%BB%D0%B0%D1%82%D1%83%D1%80%D0%B8+-+%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F+v1.5.27+%281%29.xlsx",
        "version": "v1.5.27",
        "date": "29.06.2026",
        "sheet_name": "CL038",
        "sheet_description": "Планова имунизация или реимунизация (имунизационни програми)"
      },
      "column_count": 19,
      "rows": [
        {
          "index": 1,
          "cells": {
            "1": "CL038 - Планова имунизация или реимунизация (имунизационни програми)"
          }
        },
        {
          "index": 3,
          "cells": {
            "1": "Entity",
            "8": "Meta Data",
            "18": "System Data"
          }
        },
        {
          "index": 4,
          "cells": {
            "1": "Key",
            "2": "Description BG",
            "3": "Description EN",
            "4": "Display value BG",
            "5": "Display value EN",
            "6": "Display transfered data BG",
            "7": "Display transfered data EN",
            "8": "Program Group",
            "9": "Dose Number",
            "10": "CL082 Mapping",
            "11": "Min age",
            "12": "Max age**",
            "13": "Rules",
            "14": "Vaccine additional info",
            "15": "CL037 Mapping (2023)",
            "16": "CL037 Mapping (2024)",
            "17": "CL037 Mapping (2025)",
            "18": "Since",
            "19": "Valid Until"
          }
        },
        {
          "index": 5,
          "cells": {
            "1": "01",
            "2": "Туберкулоза - имунизирани новородени",
            "3": "Tuberculosis - immunised newborns",
            "4": "Имунизиран/а срещу туберкулоза",
            "5": "Immunized against tuberculosis",
            "6": "Имунизиран/а срещу туберкулоза",
            "7": "Immunized against tuberculosis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "0",
            "12": "2 months",
            "15": "17",
            "16": "17",
            "17": "17",
            "18": "v1.0.0"
          }
        },
        {
          "index": 6,
          "cells": {
            "1": "02",
            "2": "Туберкулоза - проверени за белег на 7-10 месечна възраст",
            "3": "Tuberculosis - scar checked at 7–10 months of age",
            "4": "Проверка Манту на 7-10 месечна възраст",
            "5": "Mantoux test at 7-10 months of age",
            "6": "Проверка Манту на 7-10 месечна възраст",
            "7": "Mantoux test at 7-10 months of age",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "7 month",
            "12": "11 months",
            "13": "(01 != null || outside NZIS)",
            "14": "yes / no",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 7,
          "cells": {
            "1": "03",
            "2": "Туберкулоза - установени деца без белег от тези по код 02 или от проверените за белег на 7-10 месечна възраст",
            "3": "Tuberculosis - children without BCG scar among those under code 02 or checked for scar at 7–10 months of age",
            "4": "Липса на белег от БЦЖ ваксинация",
            "5": "Lack of BCG vaccination mark",
            "6": "Липса на белег от БЦЖ ваксинация",
            "7": "Lack of BCG vaccination mark",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "7 month",
            "12": "11 months",
            "13": "(01 != null || outside NZIS) && (02 == no)",
            "14": "auto count all 02 == no",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 8,
          "cells": {
            "1": "04",
            "2": "Туберкулоза - установени деца без белег от тези по код 02 или от проверените за белег на 7-10 месечна възраст, проверени с Манту",
            "3": "Tuberculosis - children without BCG scar (from code 02 or scar-checked at 7–10 months), tested with Mantoux",
            "4": "Отчетена проба на Манту на 7-10 месечна възраст",
            "5": "Reported Mantoux test at 7-10 months of age",
            "6": "Отчетена проба на Манту на 7-10 месечна възраст",
            "7": "Reported Mantoux test at 7-10 months of age",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1-2",
            "10": "1",
            "11": "7 month",
            "12": "11 months",
            "13": "(03 != null || outside NZIS)",
            "14": "negative (5mm <=) / positive (5mm >)",
            "15": "15138",
            "16": "15138",
            "17": "15138",
            "18": "v1.0.0"
          }
        },
        {
          "index": 9,
          "cells": {
            "1": "05",
            "2": "Туберкулоза - установени деца без белег от тези по код 02 или от проверените за белег на 7-10 месечна възраст, проверени с Манту - отрицателни",
            "3": "Tuberculosis - children without BCG scar (from code 02 or scar-checked at 7–10 months), Mantoux test negative",
            "4": "Отрицателна проба на Манту на 7-10 месечна възраст",
            "5": "Negative Mantoux test at 7-10 months of age",
            "6": "Отрицателна проба на Манту на 7-10 месечна възраст",
            "7": "Negative Mantoux test at 7-10 months of age",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "7 month",
            "12": "11 months",
            "13": "(04 == negative)",
            "14": "auto count all 04 == negative",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 10,
          "cells": {
            "1": "06",
            "2": "Туберкулоза - установени деца без белег от тези по код 02 или от проверените за белег на 7-10 месечна възраст, проверени с Манту - имунизирани",
            "3": "Tuberculosis - children without BCG scar (from code 02 or scar-checked at 7–10 months), Mantoux tested and immunised",
            "4": "Имунизиран/а срещу туберкулоза",
            "5": "Immunized against tuberculosis",
            "6": "Имунизиран/а срещу туберкулоза",
            "7": "Immunized against tuberculosis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2-3",
            "10": "1",
            "11": "7 month",
            "12": "11 months",
            "13": "(04 == negative && 05 != null)",
            "15": "17",
            "16": "17",
            "17": "17",
            "18": "v1.0.0"
          }
        },
        {
          "index": 11,
          "cells": {
            "1": "07",
            "2": "Туберкулоза - проверени с Манту на 7 години",
            "3": "Tuberculosis - Mantoux tested at 7 years of age",
            "4": "Проверка Манту на 7 годишна възраст",
            "5": "Mantoux test at 7 years",
            "6": "Проверка Манту на 7 годишна възраст",
            "7": "Mantoux test at 7 years",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1-4",
            "10": "1",
            "11": "6 years",
            "12": "8 years",
            "14": "negative (5mm <=) / positive (5mm >)",
            "15": "15138",
            "16": "15138",
            "17": "15138",
            "18": "v1.0.0"
          }
        },
        {
          "index": 12,
          "cells": {
            "1": "08",
            "2": "Туберкулоза - проверени с Манту на 7 години - отрицателни",
            "3": "Tuberculosis - Mantoux tested at 7 years of age - negative",
            "4": "Отчетена проба на Манту на 7 годишна възраст",
            "5": "Reported Mantoux test at 7 years",
            "6": "Отчетена проба на Манту на 7 годишна възраст",
            "7": "Reported Mantoux test at 7 years",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "6 years",
            "12": "8 years",
            "13": "07 == negative",
            "14": "auto count all 07 == negative",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 13,
          "cells": {
            "1": "09",
            "2": "Туберкулоза - проверени с Манту на 7 години - реимунизирани",
            "3": "Tuberculosis - Mantoux tested at 7 years of age - re-immunised",
            "4": "Имунизиран/а срещу туберкулоза",
            "5": "Immunized against tuberculosis",
            "6": "Имунизиран/а срещу туберкулоза",
            "7": "Immunized against tuberculosis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2-5",
            "10": "1",
            "11": "6 years",
            "12": "8 years",
            "13": "(07 == negative && 08 != null)",
            "15": "17",
            "16": "17",
            "17": "17",
            "18": "v1.0.0"
          }
        },
        {
          "index": 14,
          "cells": {
            "1": "10",
            "2": "Туберкулоза - проверени за белег Манту на 11 години",
            "3": "Tuberculosis - checked for BCG/Mantoux scar at 11 years of age",
            "4": "Проверка Манту на 11 годишна възраст",
            "5": "Mantoux test at 11 years",
            "6": "Проверка Манту на 11 годишна възраст",
            "7": "Mantoux test at 11 years",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "10 years",
            "12": "13 years",
            "14": "yes negative (5mm <=) / yes positive (5mm >) / no",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v.1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 15,
          "cells": {
            "1": "12",
            "2": "Туберкулоза - проверени с Манту на 11 години - реимунизирани",
            "3": "Tuberculosis - Mantoux tested at 11 years of age - re-immunised",
            "4": "Имунизиран/а срещу туберкулоза",
            "5": "Immunized against tuberculosis",
            "6": "Имунизиран/а срещу туберкулоза",
            "7": "Immunized against tuberculosis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2-3",
            "10": "1",
            "11": "10 years",
            "12": "13 years",
            "15": "17",
            "16": "17",
            "17": "17",
            "18": "v.1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 16,
          "cells": {
            "1": "13",
            "2": "Туберкулоза - проверени за белег Манту на 17 години",
            "3": "Tuberculosis - checked for BCG/Mantoux scar at 17 years of age",
            "4": "Проверка Манту на 17 годишна възраст",
            "5": "Mantoux test at 17 years",
            "6": "Проверка Манту на 17 годишна възраст",
            "7": "Mantoux test at 17 years",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "---",
            "10": "1",
            "11": "16 years",
            "12": "19 years",
            "14": "yes negative (5mm <=) / yes positive (5mm >) / no",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v.1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 17,
          "cells": {
            "1": "15",
            "2": "Туберкулоза - проверени с Манту на 17 години - реимунизирани",
            "3": "Tuberculosis - Mantoux tested at 17 years of age - re-immunised",
            "4": "Имунизиран/а срещу туберкулоза",
            "5": "Immunized against tuberculosis",
            "6": "Имунизиран/а срещу туберкулоза",
            "7": "Immunized against tuberculosis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2-3",
            "10": "1",
            "11": "16 years",
            "12": "19 years",
            "15": "17",
            "16": "17",
            "17": "17",
            "18": "v.1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 18,
          "cells": {
            "1": "16",
            "2": "Шесткомпонентна ваксина ДТКаХепБПиХИБ - получили първи прием",
            "3": "Hexavalent vaccine DTaP-HepB-IPV-Hib - first dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б - I прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B - 1st dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "42 days",
            "12": "132 days",
            "15": "16058;1754;3537",
            "16": "3537;1754",
            "17": "3537;1754",
            "18": "v1.0.0"
          }
        },
        {
          "index": 19,
          "cells": {
            "1": "17",
            "2": "Шесткомпонентна ваксина ДТКаХепБПиХИБ - получили втори прием",
            "3": "Hexavalent vaccine DTaP-HepB-IPV-Hib - second dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б - II прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B - 2nd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "70 days",
            "12": "160 days",
            "13": "(16 != null || outside NZIS)",
            "15": "16058;1754;3537",
            "16": "3537;1754",
            "17": "3537;1754",
            "18": "v1.0.0"
          }
        },
        {
          "index": 20,
          "cells": {
            "1": "18",
            "2": "Шесткомпонентна ваксина ДТКаХепБПиХИБ - получили трети прием",
            "3": "Hexavalent vaccine DTaP-HepB-IPV-Hib - third dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б - III прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B - 3rd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х. инфлуенце, хепатит Б",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae, hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "98 days",
            "12": "188 days",
            "13": "(17 != null || outside NZIS)",
            "15": "16058;1754;3537",
            "16": "3537;1754",
            "17": "3537;1754",
            "18": "v1.0.0"
          }
        },
        {
          "index": 21,
          "cells": {
            "1": "19",
            "2": "Хемофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - получили първи прием",
            "3": "Haemophilus influenzae type B (Hib) conjugate vaccine - first dose received",
            "4": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - I прием",
            "5": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine - 1st dose",
            "6": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина",
            "7": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 22,
          "cells": {
            "1": "20",
            "2": "Хемофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - получили втори прием",
            "3": "Haemophilus influenzae type B (Hib) conjugate vaccine - second dose received",
            "4": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - II прием",
            "5": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine - 2nd dose",
            "6": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина",
            "7": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 23,
          "cells": {
            "1": "21",
            "2": "Хемофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - получили трети прием",
            "3": "Haemophilus influenzae type B (Hib) conjugate vaccine - third dose received",
            "4": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - III прием",
            "5": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine - 3rd dose",
            "6": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина",
            "7": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 24,
          "cells": {
            "1": "22",
            "2": "Хемофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - реимунизирани (четвърти прием)",
            "3": "Haemophilus influenzae type B (Hib) conjugate vaccine - re-immunised (fourth dose)",
            "4": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина - IV прием",
            "5": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine - 4th dose",
            "6": "Имунизиран/а срещу хамофилус инфлуенце тип Б инфекции (ХИБ) с конюгирана ваксина",
            "7": "Immunized against Haemophilus influenzae type B infections (HIB) with conjugate vaccine",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "4",
            "10": "1",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 25,
          "cells": {
            "1": "23",
            "2": "Четирикомпонентна ваксина ДТКаПи - получили първи прием",
            "3": "Tetravalent vaccine DTaP-IPV - first dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит - I прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis - 1st dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "2 years",
            "12": "6 years",
            "13": "(16 == null && 28 == null)",
            "15": "15420",
            "16": "15420",
            "17": "15420",
            "18": "v1.0.0"
          }
        },
        {
          "index": 26,
          "cells": {
            "1": "24",
            "2": "Четирикомпонентна ваксина ДТКаПи - получили втори прием",
            "3": "Tetravalent vaccine DTaP-IPV - second dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит - II прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis - 2nd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "2 years",
            "12": "6 years",
            "13": "(16 != null || 23 != null || 28 != null || outside NZIS) && (17 == null && 29 == null)",
            "15": "15420",
            "16": "15420",
            "17": "15420",
            "18": "v1.0.0"
          }
        },
        {
          "index": 27,
          "cells": {
            "1": "25",
            "2": "Четирикомпонентна ваксина ДТКаПи - получили трети прием",
            "3": "Tetravalent vaccine DTaP-IPV - third dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит - III прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis - 3rd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "2 years",
            "12": "6 years",
            "13": "(17 != null || 24 != null || 29 != null || outside NZIS) && (18 == null && 30 == null)",
            "15": "15420",
            "16": "15420",
            "17": "15420",
            "18": "v1.0.0"
          }
        },
        {
          "index": 28,
          "cells": {
            "1": "26",
            "2": "Четирикомпонентна ваксина ДТКаПи - реимунизирани (четвърти прием)",
            "3": "Tetravalent vaccine DTaP-IPV - re-immunised (fourth dose)",
            "4": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis",
            "6": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "4",
            "10": "1",
            "11": "16 months",
            "12": "6 years",
            "13": "((18 != null && 1 year) || (25 != null && 1 year) || (30 != null && 1 year) || outside NZIS) && 31 == null",
            "15": "15420",
            "16": "15420",
            "17": "15420",
            "18": "v1.0.0"
          }
        },
        {
          "index": 29,
          "cells": {
            "1": "27",
            "2": "Четирикомпонентна ваксина ДТКаПи - реимунизирани на 6 години (пети прием)",
            "3": "Tetravalent vaccine DTaP-IPV - re-immunised at 6 years of age (fifth dose)",
            "4": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "5": "Immunized against diphtheria, tetanus, pertussis, pertussis, poliomyelitis",
            "6": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит",
            "7": "Immunized against diphtheria, tetanus, pertussis, pertussis, poliomyelitis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "5",
            "10": "1",
            "11": "5 years",
            "12": "7 years",
            "13": "((26 != null && 4 years) || (31 != null && 4 years) || outside NZIS)",
            "15": "15420",
            "16": "15420",
            "17": "15420",
            "18": "v1.0.0"
          }
        },
        {
          "index": 30,
          "cells": {
            "1": "28",
            "2": "Петкомпонентна ваксина ДТКаПиХИБ - получили първи прием",
            "3": "Pentavalent vaccine DTaP-IPV-Hib - first dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце - I прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenza - 1st dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "42 days",
            "12": "3 years",
            "13": "(16 == null && 23 == null)",
            "15": "3339;1542;1541",
            "16": "3339",
            "17": "3339",
            "18": "v1.0.0"
          }
        },
        {
          "index": 31,
          "cells": {
            "1": "29",
            "2": "Петкомпонентна ваксина ДТКаПиХИБ - получили втори прием",
            "3": "Pentavalent vaccine DTaP-IPV-Hib - second dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце - II прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenza - 2nd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "70 days",
            "12": "3 years",
            "13": "(16 != null || 23 != null || 28 != null || outside NZIS) && (17 == null && 24 == null)",
            "15": "3339;1542;1541",
            "16": "3339",
            "17": "3339",
            "18": "v1.0.0"
          }
        },
        {
          "index": 32,
          "cells": {
            "1": "30",
            "2": "Петкомпонентна ваксина ДТКаПиХИБ - получили трети прием",
            "3": "Pentavalent vaccine DTaP-IPV-Hib - third dose received",
            "4": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце - II прием",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenza - 2nd dose",
            "6": "Имунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "98 days",
            "12": "3 years",
            "13": "(17 != null || 24 != null || 29 != null || outside NZIS) && (18 == null && 25 == null)",
            "15": "3339;1542;1541",
            "16": "3339",
            "17": "3339",
            "18": "v1.0.0"
          }
        },
        {
          "index": 33,
          "cells": {
            "1": "31",
            "2": "Петкомпонентна ваксина ДТКаПиХИБ - реимунизирани (четвърти прием)",
            "3": "Pentavalent vaccine DTaP-IPV-Hib - re-immunised (fourth dose)",
            "4": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце",
            "5": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenza",
            "6": "Реимунизиран/а срещу дифтерия, тетанус, коклюш, полиомиелит, Х.инфлуенце",
            "7": "Immunized against diphtheria, tetanus, pertussis, poliomyelitis, H. influenzae",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "4",
            "10": "1",
            "11": "16 months",
            "12": "19 months",
            "13": "((18 != null && 1 year) || (25 != null && 1 year) || (30 != null && 1 year) || outside NZIS) && 26 == null",
            "15": "3339;1542;1541",
            "16": "3339",
            "17": "3339",
            "18": "v1.0.0"
          }
        },
        {
          "index": 34,
          "cells": {
            "1": "33",
            "2": "Тдка - реимунизирани с Тдка на 12 години",
            "3": "Tdap - re-immunised with Tdap at 12 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус, коклюш",
            "5": "Immunized against diphtheria, tetanus, pertussis, pertussis",
            "6": "Реимунизиран/а срещу дифтерия, тетанус, коклюш",
            "7": "Immunized against diphtheria, tetanus, pertussis, pertussis",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "11 years",
            "12": "13 years",
            "15": "16962;127",
            "16": "127",
            "17": "127",
            "18": "v1.0.0"
          }
        },
        {
          "index": 35,
          "cells": {
            "1": "34",
            "2": "Тд - реимунизирани с Тд на 17 години",
            "3": "Td - re-immunised with Td at 17 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "16 years",
            "12": "18 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 36,
          "cells": {
            "1": "35",
            "2": "Тд - реимунизирани с Тд на 25 години",
            "3": "Td - re-immunised with Td at 25 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "24 years",
            "12": "26 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 37,
          "cells": {
            "1": "36",
            "2": "Тд - реимунизирани с Тд на 35 години",
            "3": "Td - re-immunised with Td at 35 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "4",
            "10": "1",
            "11": "34 years",
            "12": "36 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 38,
          "cells": {
            "1": "37",
            "2": "Тд - реимунизирани с Тд на 45 години",
            "3": "Td - re-immunised with Td at 45 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "5",
            "10": "1",
            "11": "44 years",
            "12": "46 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 39,
          "cells": {
            "1": "38",
            "2": "Тд - реимунизирани с Тд на 55 години",
            "3": "Td - re-immunised with Td at 55 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "6",
            "10": "1",
            "11": "54 years",
            "12": "56 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 40,
          "cells": {
            "1": "39",
            "2": "Тд - реимунизирани с Тд на 65 години",
            "3": "Td - re-immunised with Td at 65 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "7",
            "10": "1",
            "11": "64 years",
            "12": "66 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 41,
          "cells": {
            "1": "40",
            "2": "Тд - реимунизирани с Тд на 75 години",
            "3": "Td - re-immunised with Td at 75 years of age",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "8",
            "10": "1",
            "11": "74 years",
            "12": "76 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 42,
          "cells": {
            "1": "41",
            "2": "Тд - реимунизирани с Тд на 85 години и над 85 години",
            "3": "Td - re-immunised with Td at 85 years and over",
            "4": "Реимунизиран/а срещу дифтерия, тетанус",
            "5": "Immunized against diphtheria, tetanus",
            "6": "Реимунизиран/а срещу дифтерия, тетанус",
            "7": "Immunized against diphtheria, tetanus",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "9+",
            "10": "1",
            "11": "84 years",
            "15": "64",
            "16": "64",
            "17": "64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 43,
          "cells": {
            "1": "42",
            "2": "Хепатит Б - имунизирани новородени - получили първи прием",
            "3": "Hepatitis B - immunised newborns - first dose received",
            "4": "Имунизиран/а срещу хепатит Б",
            "5": "Immunized against hepatitis B",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "0",
            "12": "2 months",
            "15": "2998;1730",
            "16": "2998",
            "17": "2998",
            "18": "v1.0.0"
          }
        },
        {
          "index": 44,
          "cells": {
            "1": "43",
            "2": "Хепатит Б - имунизирани новородени - получили втори прием",
            "3": "Hepatitis B - immunised newborns - second dose received",
            "4": "Имунизиран/а срещу хепатит Б -II прием",
            "5": "Immunized against hepatitis B -2nd dose",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "28 days",
            "12": "16 years",
            "13": "(16 == null && 42 != null) || (16 != null && 42 == null) || outside NZIS",
            "15": "2998;1730",
            "16": "2998",
            "17": "2998",
            "18": "v1.0.0"
          }
        },
        {
          "index": 45,
          "cells": {
            "1": "44",
            "2": "Хепатит Б - имунизирани новородени - получили трети прием",
            "3": "Hepatitis B - immunised newborns - third dose received",
            "4": "Имунизиран/а срещу хепатит Б - III прием",
            "5": "Immunized against hepatitis B - 3rd dose",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "98 days",
            "12": "16 years",
            "13": "(17 == null && 43 != null) || (17 != null && 43 == null) || outside NZIS",
            "15": "2998;1730",
            "16": "2998",
            "17": "2998",
            "18": "v1.0.0"
          }
        },
        {
          "index": 46,
          "cells": {
            "1": "45",
            "2": "Комбинирана морбили, паротит и рубеола ваксина - имунизирани на 13 месеца",
            "3": "Combined measles, mumps and rubella (MMR) vaccine - immunised at 13 months of age",
            "4": "Имунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "5": "Immunized against measles, mumps and rubella",
            "6": "Имунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "7": "Immunized against measles, mumps and rubella",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "13 months",
            "12": "16 months",
            "15": "2517;1234;4084;4184",
            "16": "2517;1234",
            "17": "2517;1234",
            "18": "v1.0.0"
          }
        },
        {
          "index": 47,
          "cells": {
            "1": "46",
            "2": "Комбинирана морбили, паротит и рубеола ваксина - реимунизирани на 12 години",
            "3": "Combined measles, mumps and rubella (MMR) vaccine - re-immunised at 12 years of age",
            "4": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "5": "Immunized against measles, mumps and rubella",
            "6": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "7": "Immunized against measles, mumps and rubella",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "11 years",
            "12": "13 years",
            "13": "(45 != null || outside NZIS)",
            "15": "2517;1234;4084;4184",
            "16": "2517",
            "17": "2517",
            "18": "v1.0.0"
          }
        },
        {
          "index": 48,
          "cells": {
            "1": "47",
            "2": "Комбинирана морбили, паротит и рубеола ваксина - реимунизирани на други възрасти",
            "3": "Combined measles, mumps and rubella (MMR) vaccine - re-immunised at other ages",
            "4": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "5": "Immunized against measles, mumps and rubella",
            "6": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "7": "Immunized against measles, mumps and rubella",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1+",
            "10": "1",
            "11": "18 years",
            "15": "2517;1234;4084;4184",
            "16": "2517",
            "17": "2517",
            "18": "v1.0.0"
          }
        },
        {
          "index": 49,
          "cells": {
            "1": "48",
            "2": "Пневмококови инфекции с конюгирана ваксина - получили първи прием",
            "3": "Pneumococcal infections - conjugate vaccine - first dose received",
            "4": "Имунизиран/а срещу пневмококови инфекции - I прием",
            "5": "Immunized against pneumococcal infections - 1st dose",
            "6": "Имунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "42 days",
            "12": "132 days",
            "15": "2958;16291;1653;16979",
            "16": "2958;57335",
            "17": "2958;57335",
            "18": "v1.0.0"
          }
        },
        {
          "index": 50,
          "cells": {
            "1": "49",
            "2": "Пневмококови инфекции с конюгирана ваксина - получили втори прием",
            "3": "Pneumococcal infections - conjugate vaccine - second dose received",
            "4": "Имунизиран/а срещу пневмококови инфекции - II прием",
            "5": "Immunized against pneumococcal infections - 2nd dose",
            "6": "Имунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "98 days",
            "12": "188 days",
            "13": "(48 != null || outside NZIS)",
            "15": "2958;16291;1653;16979",
            "16": "2958;57335",
            "17": "2958;57335",
            "18": "v1.0.0"
          }
        },
        {
          "index": 51,
          "cells": {
            "1": "50",
            "2": "Пневмококови инфекции с конюгирана ваксина - получили трети прием",
            "3": "Pneumococcal infections - conjugate vaccine - third dose received",
            "4": "Имунизиран/а срещу пневмококови инфекции - III прием",
            "5": "Immunized against pneumococcal infections - 3rd dose",
            "6": "Имунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3",
            "10": "1",
            "11": "12 months",
            "12": "15 months",
            "13": "(49 != null || outside NZIS)",
            "15": "2958;16291;1653;16979",
            "16": "2958;57335",
            "17": "2958;57335",
            "18": "v1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 52,
          "cells": {
            "1": "51",
            "2": "Пневмококови инфекции с конюгирана ваксина - реимунизирани",
            "3": "Pneumococcal infections - conjugate vaccine - re-immunised",
            "4": "Реимунизиран/а срещу пневмококови инфекции",
            "5": "Immunized against pneumococcal infections",
            "6": "Реимунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "3+",
            "10": "1",
            "11": "12 months",
            "12": "15 months",
            "13": "(49 != null || outside NZIS)",
            "15": "2958;16291;1653;16979",
            "16": "2958;16979;57335",
            "17": "2958;16979;57335",
            "18": "v1.0.0"
          }
        },
        {
          "index": 53,
          "cells": {
            "1": "52",
            "2": "Бяс - имунизирани ухапани лица",
            "3": "Rabies - immunised bitten persons",
            "4": "Имунизиран/а срещу бяс",
            "5": "Immunized against rabies",
            "6": "Имунизиран/а срещу бяс",
            "7": "Immunized against rabies",
            "8": "Целеви имунизации и реимунизации",
            "9": "1+",
            "10": "2",
            "15": "16651",
            "16": "16651",
            "17": "16651",
            "18": "v1.0.0"
          }
        },
        {
          "index": 54,
          "cells": {
            "1": "53",
            "2": "Бяс - имунизирани профилактично",
            "3": "Rabies - prophylactically immunised",
            "4": "Имунизиран/а срещу бяс",
            "5": "Immunized against rabies",
            "6": "Имунизиран/а срещу бяс",
            "7": "Immunized against rabies",
            "8": "Целеви имунизации и реимунизации",
            "9": "1",
            "10": "2",
            "15": "16651",
            "16": "16651",
            "17": "16651",
            "18": "v1.0.0"
          }
        },
        {
          "index": 55,
          "cells": {
            "1": "54",
            "2": "Бяс - реимунизирани профилактично",
            "3": "Rabies - prophylactically re-immunised",
            "4": "Реимунизиран срещу бяс",
            "5": "Immunized against rabies",
            "6": "Реимунизиран срещу бяс",
            "7": "Immunized against rabies",
            "8": "Целеви имунизации и реимунизации",
            "9": "2+",
            "10": "2",
            "15": "16651",
            "16": "16651",
            "17": "16651",
            "18": "v1.0.0"
          }
        },
        {
          "index": 56,
          "cells": {
            "1": "55",
            "2": "Кримска-Конго хеморагична треска - имунизирани",
            "3": "Crimean-Congo haemorrhagic fever - immunised",
            "4": "Имунизиран/а срещу Кримска-Конго хеморагична треска",
            "5": "Immunized against Crimean-Congo hemorrhagic fever",
            "6": "Имунизиран/а срещу Кримска-Конго хеморагична треска",
            "7": "Immunized against Crimean-Congo hemorrhagic fever",
            "8": "Целеви имунизации и реимунизации",
            "9": "1",
            "10": "2",
            "11": "16 years",
            "15": "4133",
            "16": "4133",
            "17": "4133",
            "18": "v1.0.0"
          }
        },
        {
          "index": 57,
          "cells": {
            "1": "56",
            "2": "Кримска-Конго хеморагична треска - реимунизирани",
            "3": "Crimean-Congo haemorrhagic fever - re-immunised",
            "4": "Ремунизиран/а срещу Кримска-Конго хеморагична треска",
            "5": "Immunized against Crimean-Congo hemorrhagic fever",
            "6": "Ремунизиран/а срещу Кримска-Конго хеморагична треска",
            "7": "Immunized against Crimean-Congo hemorrhagic fever",
            "8": "Целеви имунизации и реимунизации",
            "9": "2+",
            "10": "2",
            "11": "16 years",
            "15": "4133",
            "16": "4133",
            "17": "4133",
            "18": "v1.0.0"
          }
        },
        {
          "index": 58,
          "cells": {
            "1": "00",
            "2": "Други",
            "3": "Other",
            "4": "Други ваксини извън задължителните планови и целеви имунизации",
            "5": "Other vaccines outside the mandatory scheduled and targeted immunizations",
            "6": "Други ваксини извън задължителните планови и целеви имунизации",
            "7": "Other vaccines outside the mandatory scheduled and targeted immunizations",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "---",
            "10": "3",
            "15": "-100x;16962;127;64;16651;4133;129",
            "16": "-100x;16962;127;64;16651;4133;129; 64095",
            "17": "-100x;16962;127;64;16651;4133;129;64095",
            "18": "v1.0.0"
          }
        },
        {
          "index": 59,
          "cells": {
            "1": "57",
            "2": "Коремен тиф - имунизирани",
            "3": "Typhoid fever - immunised",
            "4": "Имунизиран/а срещу коремен тиф",
            "5": "Immunized against typhoid fever",
            "6": "Имунизиран/а срещу коремен тиф",
            "7": "Immunized against typhoid fever",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 60,
          "cells": {
            "1": "58",
            "2": "Коремен тиф - реимунизирани",
            "3": "Typhoid fever - re-immunised",
            "4": "Реимунизиран/а срещу коремен тиф",
            "5": "Immunized against typhoid fever",
            "6": "Реимунизиран/а срещу коремен тиф",
            "7": "Immunized against typhoid fever",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0"
          }
        },
        {
          "index": 61,
          "cells": {
            "1": "59",
            "2": "Жълта треска - имунизирани",
            "3": "Yellow fever - immunised",
            "4": "Имунизиран/а срещу жълта треска",
            "5": "Immunized against yellow fever",
            "6": "Имунизиран/а срещу жълта треска",
            "7": "Immunized against yellow fever",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1+",
            "10": "3",
            "11": "6 months",
            "15": "15358",
            "16": "15358",
            "17": "15358",
            "18": "v1.0.0"
          }
        },
        {
          "index": 62,
          "cells": {
            "1": "60",
            "2": "Жълта треска - реимунизирани",
            "3": "Yellow fever - re-immunised",
            "4": "Реимунизиран/а срещу жълта треска",
            "5": "Immunized against yellow fever",
            "6": "Реимунизиран/а срещу жълта треска",
            "7": "Immunized against yellow fever",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1+",
            "10": "3",
            "11": "6 months",
            "15": "15358",
            "16": "15358",
            "17": "15358",
            "18": "v1.5.21",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 63,
          "cells": {
            "1": "61",
            "2": "Хепатит Б - получили първи прием",
            "3": "Hepatitis B - first dose received",
            "4": "Имунизиран/а срещу хепатит Б - I прием",
            "5": "Immunized against hepatitis B - 1st dose",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "11": "16 years",
            "15": "2998;1730",
            "16": "1730",
            "17": "1730",
            "18": "v1.0.0"
          }
        },
        {
          "index": 64,
          "cells": {
            "1": "62",
            "2": "Хепатит Б - получили втори прием",
            "3": "Hepatitis B - second dose received",
            "4": "Имунизиран/а срещу хепатит Б - II прием",
            "5": "Immunized against hepatitis B - 2nd dose",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2",
            "10": "3",
            "11": "16 years",
            "13": "(61 != null && 7 days || outside NZIS)",
            "15": "2998;1730",
            "16": "1730",
            "17": "1730",
            "18": "v1.0.0"
          }
        },
        {
          "index": 65,
          "cells": {
            "1": "63",
            "2": "Хепатит Б - получили трети прием",
            "3": "Hepatitis B - third dose received",
            "4": "Имунизиран/а срещу хепатит Б - III прием",
            "5": "Immunized against hepatitis B - 3rd dose",
            "6": "Имунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "3",
            "10": "3",
            "11": "16 years",
            "13": "(62 != null && 14 days || outside NZIS)",
            "15": "2998;1730",
            "16": "1730",
            "17": "1730",
            "18": "v1.0.0"
          }
        },
        {
          "index": 66,
          "cells": {
            "1": "64",
            "2": "Хепатит Б - реимунизирани",
            "3": "Hepatitis B - re-immunised",
            "4": "Реимунизиран/а срещу хепатит Б",
            "5": "Immunized against hepatitis B",
            "6": "Реимунизиран/а срещу хепатит Б",
            "7": "Immunized against hepatitis B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "4+",
            "10": "3",
            "11": "16 years",
            "13": "(63 != null && 10 months || outside NZIS)",
            "15": "2998;1730",
            "16": "1730",
            "17": "1730",
            "18": "v1.0.0"
          }
        },
        {
          "index": 67,
          "cells": {
            "1": "65",
            "2": "Полиомиелит - реимунизирани",
            "3": "Poliomyelitis - re-immunised",
            "4": "Реимунизиран/а срещу Полиомиелит",
            "5": "Immunized against poliomyelitis",
            "6": "Реимунизиран/а срещу Полиомиелит",
            "7": "Immunized against poliomyelitis",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 68,
          "cells": {
            "1": "66",
            "2": "Морбили, паротит и рубеола - имунизирани",
            "3": "Measles, mumps and rubella - immunised",
            "4": "Имунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "5": "Immunized against measles, mumps and rubella",
            "6": "Имунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "7": "Immunized against measles, mumps and rubella",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "11": "18 years",
            "15": "2517;1234;4084;4184",
            "16": "2517",
            "17": "2517",
            "18": "v1.0.0"
          }
        },
        {
          "index": 69,
          "cells": {
            "1": "67",
            "2": "Морбили, паротит и рубеола - реимунизирани",
            "3": "Measles, mumps and rubella - re-immunised",
            "4": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "5": "Immunized against measles, mumps and rubella",
            "6": "Реимунизиран/а срещу морбили, епидемичен паротит и рубеола",
            "7": "Immunized against measles, mumps and rubella",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "11": "18 years",
            "13": "(66 != null && 1 months || outside NZIS)",
            "15": "2517;1234;4084;4184",
            "16": "2517",
            "17": "2517",
            "18": "v1.0.0"
          }
        },
        {
          "index": 70,
          "cells": {
            "1": "68",
            "2": "Хепатит А - имунизирани",
            "3": "Hepatitis A - immunised",
            "4": "Имунизиран/а срещу хепатит А",
            "5": "Immunized against hepatitis A",
            "6": "Имунизиран/а срещу хепатит А",
            "7": "Immunized against hepatitis A",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "15": "1925;7401",
            "16": "1925",
            "17": "1925",
            "18": "v1.0.0"
          }
        },
        {
          "index": 71,
          "cells": {
            "1": "69",
            "2": "Хепатит А - реимунизирани",
            "3": "Hepatitis A - re-immunised",
            "4": "Реимунизиран/а срещу хепатит А",
            "5": "Immunized against hepatitis A",
            "6": "Реимунизиран/а срещу хепатит А",
            "7": "Immunized against hepatitis A",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "15": "1925;7401",
            "16": "1925",
            "17": "1925",
            "18": "v1.0.0"
          }
        },
        {
          "index": 72,
          "cells": {
            "1": "70",
            "2": "Пневмококови инфекции",
            "3": "Pneumococcal infections",
            "4": "Имунизиран/а срещу пневмококови инфекции",
            "5": "Immunized against pneumococcal infections",
            "6": "Имунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "11": "42 days",
            "15": "1653;16979",
            "16": "16979; 58090",
            "17": "16979; 58090",
            "18": "v1.0.0"
          }
        },
        {
          "index": 73,
          "cells": {
            "1": "72",
            "2": "Грип - имунизирани",
            "3": "Influenza - immunised",
            "4": "Имунизиран/а срещу грип",
            "5": "Immunized against influenza",
            "6": "Имунизиран/а срещу грип",
            "7": "Immunized against influenza",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "11": "6 months",
            "15": "16568;17327;16744;15497",
            "16": "17327;16146; 15497; 64907",
            "17": "66737;64907;16146",
            "18": "v1.0.0"
          }
        },
        {
          "index": 74,
          "cells": {
            "1": "73",
            "2": "Менингококови инфекции - имунизирани",
            "3": "Meningococcal infections - immunised",
            "4": "Имунизиран/а срещу менингококови инфекции",
            "5": "Immunized against meningococcal infections",
            "6": "Имунизиран/а срещу менингококови инфекции",
            "7": "Immunized against meningococcal infections",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1+",
            "10": "3",
            "11": "42 days",
            "15": "8556",
            "16": "8556",
            "17": "8556;46255",
            "18": "v1.0.0"
          }
        },
        {
          "index": 75,
          "cells": {
            "1": "74",
            "2": "Менингококови инфекции - реимунизирани",
            "3": "Meningococcal infections - re-immunised",
            "4": "Реимунизиран/а срещу менингококови инфекции",
            "5": "Immunized against meningococcal infections",
            "6": "Реимунизиран/а срещу менингококови инфекции",
            "7": "Immunized against meningococcal infections",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "11": "72 days",
            "13": "(73 != null && 1 months || outside NZIS)",
            "15": "8556",
            "16": "8556",
            "17": "8556;46255",
            "18": "v1.0.0"
          }
        },
        {
          "index": 76,
          "cells": {
            "1": "75",
            "2": "Хемофилус инфлуенце тип Б - имунизирани",
            "3": "Haemophilus influenzae type B - immunised",
            "4": "Имунизиран/а срещу хамофилус инфлуенце тип Б",
            "5": "Immunized against Haemophilus influenzae type B",
            "6": "Имунизиран/а срещу хамофилус инфлуенце тип Б",
            "7": "Immunized against Haemophilus influenzae type B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1",
            "10": "3",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 77,
          "cells": {
            "1": "76",
            "2": "Хемофилус инфлуенце тип Б - реимунизирани",
            "3": "Haemophilus influenzae type B - re-immunised",
            "4": "Реимунизиран/а срещу хамофилус инфлуенце тип Б",
            "5": "Immunized against Haemophilus influenzae type B",
            "6": "Реимунизиран/а срещу хамофилус инфлуенце тип Б",
            "7": "Immunized against Haemophilus influenzae type B",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "2+",
            "10": "3",
            "15": "---",
            "16": "---",
            "17": "---",
            "18": "v1.0.0",
            "19": "v.1.5.27"
          },
          "row_style": "red"
        },
        {
          "index": 78,
          "cells": {
            "1": "81",
            "2": "Човешки папиломен вирус - имунизирани извън националната програма",
            "3": "Human papillomavirus (HPV) - immunised outside the national programme",
            "4": "Имунизиран/а срещу човешки папилома вирус",
            "5": "Immunized against human papillomavirus",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1+",
            "10": "3",
            "11": "9 years",
            "15": "2683;16074;48571",
            "16": "48571",
            "17": "48571",
            "18": "v1.0.0"
          }
        },
        {
          "index": 79,
          "cells": {
            "1": "98",
            "2": "Варицела - имунизирани",
            "3": "Varicella (chickenpox) - immunised",
            "4": "Имунизиран/а срещу варицела",
            "5": "Immunized against chickenpox",
            "6": "Имунизиран/а срещу варицела",
            "7": "Immunized against chickenpox",
            "8": "Препоръчителни имунизации и реимунизации",
            "9": "1+",
            "10": "3",
            "11": "9 months",
            "15": "16887",
            "16": "16887",
            "17": "16887",
            "18": "v1.0.0"
          }
        },
        {
          "index": 80,
          "cells": {
            "1": "87",
            "2": "Тетанус при нараняване - имунизации и реимунизации",
            "3": "Tetanus post-injury - immunisations and re-immunisations",
            "4": "Имунизиран/а срещу тетанус",
            "5": "Immunized against tetanus",
            "6": "Имунизиран/а срещу тетанус",
            "7": "Immunized against tetanus",
            "8": "Серуми и ваксини при нараняване",
            "9": "1+",
            "10": "4",
            "15": "1344;64",
            "16": "1344;64",
            "17": "1344;64",
            "18": "v1.0.0"
          }
        },
        {
          "index": 81,
          "cells": {
            "1": "91",
            "2": "Специфични серуми - против тетанус",
            "3": "Specific sera - anti-tetanus",
            "4": "Имунизиран/а срещу тетанус",
            "5": "Immunized against tetanus",
            "6": "Имунизиран/а срещу тетанус",
            "7": "Immunized against tetanus",
            "8": "Серуми и ваксини при нараняване",
            "9": "1+",
            "10": "4",
            "15": "4144",
            "16": "4144",
            "17": "4144",
            "18": "v1.0.0"
          }
        },
        {
          "index": 82,
          "cells": {
            "1": "92",
            "2": "Специфични серуми - против дифтерия",
            "3": "Specific sera - anti-diphtheria",
            "4": "Имунизиран/а срещу дифтерия",
            "5": "Immunized against diphtheria",
            "6": "Имунизиран/а срещу дифтерия",
            "7": "Immunized against diphtheria",
            "8": "Серуми и ваксини при нараняване",
            "9": "1+",
            "10": "4",
            "15": "---",
            "16": "15210",
            "17": "15210",
            "18": "v1.0.0"
          }
        },
        {
          "index": 83,
          "cells": {
            "1": "71",
            "2": "Пневмококови инфекции - имунизирани по национална програма",
            "3": "Pneumococcal infections - immunised under the national programme",
            "4": "Имунизиран/а срещу пневмококови инфекции",
            "5": "Immunized against pneumococcal infections",
            "6": "Имунизиран/а срещу пневмококови инфекции",
            "7": "Immunized against pneumococcal infections",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "3",
            "11": "64 years",
            "15": "1653;16979",
            "16": "16979;58090",
            "17": "16979;58090",
            "18": "v1.0.0"
          }
        },
        {
          "index": 84,
          "cells": {
            "1": "77",
            "2": "Човешки папиломен вирус - имунизирани на 11 и 12 години - получили първи прием",
            "3": "Human papillomavirus (HPV) - immunised at 11 and 12 years - first dose received",
            "4": "Имунизиран/а срещу човешки папилома вирус - I прием",
            "5": "Immunized against human papillomavirus - 1st dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "11 years",
            "12": "12 years",
            "15": "16074;48571",
            "16": "16074;48571",
            "17": "16074;48571",
            "18": "v1.0.0",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 85,
          "cells": {
            "1": "78",
            "2": "Човешки папиломен вирус - имунизирани на 11 и 12 години - получили втори прием",
            "3": "Human papillomavirus (HPV) - immunised at 11 and 12 years - second dose received",
            "4": "Имунизиран/а срещу човешки папилома вирус - II прием",
            "5": "Immunized against human papillomavirus - 2nd dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "2",
            "10": "5",
            "11": "11 years",
            "12": "12 years",
            "15": "16074;48571",
            "16": "16074;48571",
            "17": "16074;48571",
            "18": "v1.0.0",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 86,
          "cells": {
            "1": "79",
            "2": "Човешки папиломен вирус - имунизирани на 13 години - получили първи прием",
            "3": "Human papillomavirus (HPV) - immunised at 13 years - first dose received",
            "4": "Имунизиран/а срещу човешки папилома вирус - I прием",
            "5": "Immunized against human papillomavirus - 1st dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "13 years",
            "12": "13 years",
            "15": "16074;48571",
            "16": "16074;48571",
            "17": "16074;48571",
            "18": "v1.0.0",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 87,
          "cells": {
            "1": "80",
            "2": "Човешки папиломен вирус - имунизирани на 13 години - получили втори прием",
            "3": "Human papillomavirus (HPV) - immunised at 13 years - second dose received",
            "4": "Имунизиран/а срещу човешки папилома вирус - II прием",
            "5": "Immunized against human papillomavirus - 2nd dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "2",
            "10": "5",
            "11": "13 years",
            "12": "13 years",
            "15": "16074;48571",
            "16": "16074;48571",
            "17": "16074;48571",
            "18": "v1.3.0",
            "19": "v1.5.19"
          },
          "row_style": "red"
        },
        {
          "index": 88,
          "cells": {
            "1": "82",
            "2": "Ротавирусни инфекции - имунизация с двудозова схема - получили първи прием",
            "3": "Rotavirus infections - two-dose immunisation schedule - first dose received",
            "4": "Имунизиран/а срещу ротавирусни инфекции - I прием",
            "5": "Immunized against rotavirus infections - 1st dose",
            "6": "Имунизиран/а срещу ротавирусни инфекции",
            "7": "Immunized against rotavirus infections",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "42 days",
            "12": "146 days",
            "15": "17091;3932",
            "16": "17091",
            "17": "17091",
            "18": "v1.3.0"
          }
        },
        {
          "index": 89,
          "cells": {
            "1": "83",
            "2": "Ротавирусни инфекции - имунизация с двудозова схема - получили втори прием",
            "3": "Rotavirus infections - two-dose immunisation schedule - second dose received",
            "4": "Имунизиран/а срещу ротавирусни инфекции - II прием",
            "5": "Immunized against rotavirus infections - 2nd dose",
            "6": "Имунизиран/а срещу ротавирусни инфекции",
            "7": "Immunized against rotavirus infections",
            "8": "Имунизации по национални програми",
            "9": "2",
            "10": "5",
            "11": "70 days",
            "12": "174 days",
            "13": "(82 != null || outside NZIS)",
            "15": "17091;3932",
            "16": "17091",
            "17": "17091",
            "18": "v1.3.0"
          }
        },
        {
          "index": 90,
          "cells": {
            "1": "84",
            "2": "Ротавирусни инфекции - имунизация с тридозова схема - получили първи прием",
            "3": "Rotavirus infections - three-dose immunisation schedule - first dose received",
            "4": "Имунизиран/а срещу ротавирусни инфекции - I прием",
            "5": "Immunized against rotavirus infections - 1st dose",
            "6": "Имунизиран/а срещу ротавирусни инфекции",
            "7": "Immunized against rotavirus infections",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "42 days",
            "12": "90 days",
            "15": "2565",
            "16": "2565",
            "17": "2565",
            "18": "v1.3.0"
          }
        },
        {
          "index": 91,
          "cells": {
            "1": "85",
            "2": "Ротавирусни инфекции - имунизация с тридозова схема - получили втори прием",
            "3": "Rotavirus infections - three-dose immunisation schedule - second dose received",
            "4": "Имунизиран/а срещу ротавирусни инфекции - II прием",
            "5": "Immunized against rotavirus infections - 2nd dose",
            "6": "Имунизиран/а срещу ротавирусни инфекции",
            "7": "Immunized against rotavirus infections",
            "8": "Имунизации по национални програми",
            "9": "2",
            "10": "5",
            "11": "70 days",
            "12": "202 days",
            "13": "(84 != null || outside NZIS)",
            "15": "2565",
            "16": "2565",
            "17": "2565",
            "18": "v1.3.0"
          }
        },
        {
          "index": 92,
          "cells": {
            "1": "86",
            "2": "Ротавирусни инфекции - имунизация с тридозова схема - получили трети прием",
            "3": "Rotavirus infections - three-dose immunisation schedule - third dose received",
            "4": "Имунизиран/а срещу ротавирусни инфекции - III прием",
            "5": "Immunized against rotavirus infections - 3rd dose",
            "6": "Имунизиран/а срещу ротавирусни инфекции",
            "7": "Immunized against rotavirus infections",
            "8": "Имунизации по национални програми",
            "9": "3",
            "10": "5",
            "11": "98 days",
            "12": "230 days",
            "13": "(85 != null || outside NZIS)",
            "15": "2565",
            "16": "2565",
            "17": "2565",
            "18": "v1.3.0"
          }
        },
        {
          "index": 93,
          "cells": {
            "1": "99",
            "2": "Грип - по национална програма",
            "3": "Influenza - under the national programme",
            "4": "Имунизиран/а срещу грип",
            "5": "Immunized against influenza",
            "6": "Имунизиран/а срещу грип",
            "7": "Immunized against influenza",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "64 years",
            "15": "16568;16146",
            "16": "16568;16146",
            "17": "66739;16146",
            "18": "v1.3.0"
          }
        },
        {
          "index": 94,
          "cells": {
            "1": "100",
            "2": "Човешки папиломен вирус - първи прием",
            "3": "Human papillomavirus (HPV) - first dose",
            "4": "Имунизиран/а срещу човешки папилома вирус - I прием",
            "5": "Immunized against human papillomavirus - 1st dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "1",
            "10": "5",
            "11": "10 years",
            "12": "18 years",
            "14": "Максимална възраст:\nM < 14 Y || F < 18 Y",
            "15": "48571",
            "16": "48571",
            "17": "48571",
            "18": "v1.5.17"
          }
        },
        {
          "index": 95,
          "cells": {
            "1": "101",
            "2": "Човешки папиломен вирус - втори прием",
            "3": "Human papillomavirus (HPV) - second dose",
            "4": "Имунизиран/а срещу човешки папилома вирус - II прием",
            "5": "Immunized against human papillomavirus - 2nd dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "2",
            "10": "5",
            "11": "10 years",
            "12": "18.5 years",
            "13": "((100 != null && > 28 days && < 180 days) || outside NZIS)",
            "14": "Максимална възраст:\nM < 15 Y || F < 18.5 Y",
            "15": "48571",
            "16": "48571",
            "17": "48571",
            "18": "v1.5.17"
          }
        },
        {
          "index": 96,
          "cells": {
            "1": "102",
            "2": "Човешки папиломен вирус - трети прием",
            "3": "Human papillomavirus (HPV) - third dose",
            "4": "Имунизиран/а срещу човешки папилома вирус - III прием",
            "5": "Immunized against human papillomavirus - 3rd dose",
            "6": "Имунизиран/а срещу човешки папилома вирус",
            "7": "Immunized against human papillomavirus",
            "8": "Имунизации по национални програми",
            "9": "3",
            "10": "5",
            "11": "15 years",
            "12": "19 years",
            "13": "((101 != null && > 90 days && < 180 days) || outside NZIS)",
            "14": "Максимална възраст:\nF < 19 Y",
            "15": "48571",
            "16": "48571",
            "17": "48571",
            "18": "v1.5.22"
          }
        },
        {
          "index": 97,
          "cells": {
            "1": "103",
            "2": "Варицела - имунизирани на 12 – 15-месечна възраст",
            "3": "Varicella (chickenpox) - immunized at 12 - 15 months",
            "4": "Имунизиран/а срещу варицела на 12-15 месеца",
            "5": "Immunized against chickenpox at 12-15 months",
            "6": "Имунизиран/а срещу варицела на 12-15 месеца",
            "7": "Immunized against chickenpox at 12-15 months",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "1",
            "10": "1",
            "11": "12 months",
            "12": "18 months",
            "18": "v1.5.24"
          }
        },
        {
          "index": 98,
          "cells": {
            "1": "104",
            "2": "Варицела - реимунизирани на 4-годишна възраст",
            "3": "Varicella (chickenpox) - reimmunized at 4 years",
            "4": "Реимунизиран/а срещу варицела на 4 г.",
            "5": "Immunized against chickenpox at 4 years",
            "6": "Реимунизиран/а срещу варицела на 4 г.",
            "7": "Immunized against chickenpox at 4 years",
            "8": "Задължителни планови имунизации и реимунизации",
            "9": "2",
            "10": "1",
            "11": "4 years",
            "12": "6 years",
            "13": "(103 != null)",
            "18": "v1.5.24"
          }
        },
        {
          "index": 99,
          "cells": {
            "1": "105",
            "2": "Коклюш при бременни в периода от 27 – 36 г.с.",
            "3": "Pertussis during pregnancy in the period between 27 and 36 weeks",
            "4": "Имунизиран/а срещу коклюш при бременност (27-36 г.с.)",
            "5": "Immunized against pertussis during pregnancy (27-36 weeks)",
            "6": "Имунизиран/а срещу коклюш при бременност (27-36 г.с.)",
            "7": "Immunized against pertussis during pregnancy (27-36 weeks)",
            "8": "Целеви имунизации и реимунизации",
            "9": "1",
            "10": "2",
            "13": "(CL001 == 2 && pregnancy == true)",
            "14": "Само при жени по време на бременност",
            "15": "127",
            "16": "127",
            "17": "127",
            "18": "v1.5.24"
          }
        },
        {
          "index": 100,
          "cells": {
            "1": "106",
            "2": "Респираторно-синцитиален вирус при бременни в периода от 24 – 36 г.с.",
            "3": "Respiratory syncytial virus during pregnancy in the period between 24 and 36 weeks",
            "4": "Имунизиран/а срещу Респираторно-синцитиален вирус при бременност (24-36 г.с.)",
            "5": "Immunized against Respiratory Syncytial Virus during pregnancy (24-36 weeks)",
            "6": "Имунизиран/а срещу Респираторно-синцитиален вирус при бременност (24-36 г.с.)",
            "7": "Immunized against Respiratory Syncytial Virus during pregnancy (24-36 weeks)",
            "8": "Целеви имунизации и реимунизации",
            "9": "1",
            "10": "2",
            "11": "18 years",
            "13": "(CL001 == 2 && pregnancy == true)",
            "14": "Само при жени по време на бременност",
            "18": "v1.5.24"
          }
        },
        {
          "index": 104,
          "cells": {
            "2": "* при посочена възраст над 7 години се взима предвид годината, в която лицето навършва възрастта"
          }
        },
        {
          "index": 105,
          "cells": {
            "2": "** игнорира се при посочен специален случай (по медицински причини)"
          }
        }
      ]
    },
    {
      "name": "Change Notes",
      "label": "HIS Change notes",
      "source": {
        "name": "his.bg",
        "url": "https://his.bg/upload/628/%D0%9D%D0%97%D0%98%D0%A1+%D0%9D%D0%BE%D0%BC%D0%B5%D0%BD%D0%BA%D0%BB%D0%B0%D1%82%D1%83%D1%80%D0%B8+-+%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F+v1.5.27+%281%29.xlsx",
        "version": "v1.5.27",
        "date": "29.06.2026",
        "sheet_name": "Change Notes",
        "sheet_description": "Version change notes"
      },
      "column_count": 1,
      "rows": [
        {
          "index": 1,
          "cells": {
            "1": "Версия / промени"
          }
        },
        {
          "index": 2,
          "cells": {
            "1": "Версия 1.0.3"
          }
        },
        {
          "index": 3,
          "cells": {
            "1": "Коригирани имената на таблиците за всяка номенклатура с цел по-ясно заначение на всяка колона."
          }
        },
        {
          "index": 4,
          "cells": {
            "1": "Актуализирана номенклатура CL013 спрямо последните данни от МЗ"
          }
        },
        {
          "index": 5,
          "cells": {
            "1": "Сменен статуса на номенклатура CL013 на ФИНАЛИЗИРАНА"
          }
        },
        {
          "index": 6,
          "cells": {
            "1": "Добавен ред в номенклатура CL003: 5, Fetched"
          }
        },
        {
          "index": 7,
          "cells": {
            "1": "Добавен мапинг към НЗОК за номенклатура CL006"
          }
        },
        {
          "index": 8,
          "cells": {
            "1": "Актуализирана номенклатура CL010 спрямо последните данни от МЗ"
          }
        },
        {
          "index": 9,
          "cells": {
            "1": "Сменен статуса на номенклатура CL014 на ФИНАЛИЗИРАНА"
          }
        },
        {
          "index": 10,
          "cells": {
            "1": "Сменено името на номенклатура CL024"
          }
        },
        {
          "index": 11,
          "cells": {
            "1": "Добавена референция към FHIR за номенклатура CL027"
          }
        },
        {
          "index": 12,
          "cells": {
            "1": "Версия 1.0.4"
          }
        },
        {
          "index": 13,
          "cells": {
            "1": "Премахнати стойности 3127, 3129, 3130, 3133, 3134 и 3136 от номенклатура CL006"
          }
        },
        {
          "index": 14,
          "cells": {
            "1": "Коригирани едноцифрени мапинги към НЗОК код в номенклатура CL006"
          }
        },
        {
          "index": 15,
          "cells": {
            "1": "Добавен ред в номенклатура CL003: 6, Processing"
          }
        },
        {
          "index": 16,
          "cells": {
            "1": "Добавен ред в номенклатура CL003: 7, Partially Executed"
          }
        },
        {
          "index": 17,
          "cells": {
            "1": "Актуализирана номенклатура CL022"
          }
        },
        {
          "index": 18,
          "cells": {
            "1": "Актуализирана номенклатура CL024"
          }
        },
        {
          "index": 19,
          "cells": {
            "1": "Финализирана номенклатура CL031"
          }
        },
        {
          "index": 20,
          "cells": {
            "1": "Добавена номенклатура CL033"
          }
        },
        {
          "index": 21,
          "cells": {
            "1": "Премахната FHIR референция за номенклатура CL013"
          }
        },
        {
          "index": 22,
          "cells": {
            "1": "Версия 1.0.5"
          }
        },
        {
          "index": 23,
          "cells": {
            "1": "Коригирани мапинги към НЗОК кодове в номенклатура CL006 спрямо последна информация от МЗ"
          }
        },
        {
          "index": 24,
          "cells": {
            "1": "Коригирана номенклатура CL010 спрямо последна информация от МЗ. Това променя индексите от предходната версия!"
          }
        },
        {
          "index": 25,
          "cells": {
            "1": "Версия 1.0.6"
          }
        },
        {
          "index": 26,
          "cells": {
            "1": "Добавени 3 липсващи мапинга към НЗОК за кодове 3088, 2079 и 2081 в номенклатура CL006"
          }
        },
        {
          "index": 27,
          "cells": {
            "1": "Допълнена номенклатура CL006 с информацията последно изпратена от МЗ; добавена колона \"Роля в Здравеопазването\", тъй като много от кодовете имат сходни имена"
          }
        },
        {
          "index": 28,
          "cells": {
            "1": "Добавени стойности на английски за номенклатурa CL021"
          }
        },
        {
          "index": 29,
          "cells": {
            "1": "Добавени стойности на бългaрски за номенклатура CL012"
          }
        },
        {
          "index": 30,
          "cells": {
            "1": "Добавени всички редове от номенклатура CL011. Това значително увеличава размера на файла!"
          }
        },
        {
          "index": 31,
          "cells": {
            "1": "Добавени 2 липсващи стойности към номенклатура CL010 и премахната една дуплицирана стойност"
          }
        },
        {
          "index": 32,
          "cells": {
            "1": "Версия 1.0.7"
          }
        },
        {
          "index": 33,
          "cells": {
            "1": "Коригирани ключовете на номенклатура CL007 на латиница"
          }
        },
        {
          "index": 34,
          "cells": {
            "1": "Коригирана номенклатура CL022 на база анекс между НЗОК и БЛС"
          }
        },
        {
          "index": 35,
          "cells": {
            "1": "Добавени преводи на CL005"
          }
        },
        {
          "index": 36,
          "cells": {
            "1": "Добавени преводи на CL015"
          }
        },
        {
          "index": 37,
          "cells": {
            "1": "Добавени преводи на CL017"
          }
        },
        {
          "index": 38,
          "cells": {
            "1": "Добавени преводи на CL022"
          }
        },
        {
          "index": 39,
          "cells": {
            "1": "Добавени преводи на CL024"
          }
        },
        {
          "index": 40,
          "cells": {
            "1": "Добавени преводи на CL029"
          }
        },
        {
          "index": 41,
          "cells": {
            "1": "Ключовете на номенклатура CL031 са променени да представляват валидни мерни единици по UCUM, тъй като те по своето естество са уникални"
          }
        },
        {
          "index": 42,
          "cells": {
            "1": "Версия 1.0.8"
          }
        },
        {
          "index": 43,
          "cells": {
            "1": "Добавени преводи и инструкции за употреба в CL016"
          }
        },
        {
          "index": 44,
          "cells": {
            "1": "Добавени преводи CL027"
          }
        },
        {
          "index": 45,
          "cells": {
            "1": "Допълнена номенклатура CL005 с информацията предоставена от НСИ"
          }
        },
        {
          "index": 46,
          "cells": {
            "1": "Допълнена номенклатура CL029 с информацията предоставена от НСИ"
          }
        },
        {
          "index": 47,
          "cells": {
            "1": "Допълнена номенклатура CL020 (добавени стойности за секунда и мнинута) на база  Fhir и НСИ"
          }
        },
        {
          "index": 48,
          "cells": {
            "1": "Актуализиран код на МДД 01.38 - С-реактивен протеин"
          }
        },
        {
          "index": 49,
          "cells": {
            "1": "Добавени държави в CL005"
          }
        },
        {
          "index": 50,
          "cells": {
            "1": "Попълнена номенклатура CL009"
          }
        },
        {
          "index": 51,
          "cells": {
            "1": "Попълнена номенклатура CL026"
          }
        },
        {
          "index": 52,
          "cells": {
            "1": "Версия 1.0.9"
          }
        },
        {
          "index": 53,
          "cells": {
            "1": "Добавена номенклатура CL034"
          }
        },
        {
          "index": 54,
          "cells": {
            "1": "Обновена номенклатура CL024 с добавени тестове за МДД 1.40"
          }
        },
        {
          "index": 55,
          "cells": {
            "1": "Версия 1.0.10"
          }
        },
        {
          "index": 56,
          "cells": {
            "1": "Отключени съобщенията за извличане на номенклатури"
          }
        },
        {
          "index": 57,
          "cells": {
            "1": "Добавено е поле updateDate в съобщение C001"
          }
        },
        {
          "index": 58,
          "cells": {
            "1": "Версия 1.0.11"
          }
        },
        {
          "index": 59,
          "cells": {
            "1": "Добавени редове 21 - 24 към номенклатура CL024"
          }
        },
        {
          "index": 60,
          "cells": {
            "1": "Добавен мапинг към CL022 в номенклатура CL024"
          }
        },
        {
          "index": 61,
          "cells": {
            "1": "Добавена колона за НЗОК пакет в номенклатура CL022"
          }
        },
        {
          "index": 62,
          "cells": {
            "1": "Версия 1.0.12"
          }
        },
        {
          "index": 63,
          "cells": {
            "1": "Коригиран мапинг към CL022 на ред 10 в номенклатура CL024"
          }
        },
        {
          "index": 64,
          "cells": {
            "1": "Добавена номенклатура CL036"
          }
        },
        {
          "index": 65,
          "cells": {
            "1": "Добавена номенклатура CL035"
          }
        },
        {
          "index": 66,
          "cells": {
            "1": "Добавена номенклатура CL037"
          }
        },
        {
          "index": 67,
          "cells": {
            "1": "Добавена номенклатура CL038"
          }
        },
        {
          "index": 68,
          "cells": {
            "1": "Добавена номенклатура CL039"
          }
        },
        {
          "index": 69,
          "cells": {
            "1": "Добавена номенклатура CL040"
          }
        },
        {
          "index": 70,
          "cells": {
            "1": "Добавена номенклатура CL041"
          }
        },
        {
          "index": 71,
          "cells": {
            "1": "Добавена номенклатура CL042"
          }
        },
        {
          "index": 72,
          "cells": {
            "1": "Добавена номенклатура CL043"
          }
        },
        {
          "index": 73,
          "cells": {
            "1": "Добавена номенклатура CL044"
          }
        },
        {
          "index": 74,
          "cells": {
            "1": "Добавена номенклатура CL045"
          }
        },
        {
          "index": 75,
          "cells": {
            "1": "Добавена номенклатура CL046"
          }
        },
        {
          "index": 76,
          "cells": {
            "1": "Версия 1.0.13"
          }
        },
        {
          "index": 77,
          "cells": {
            "1": "Добавена колона Attribute към всички съобщения - по дефаулт стойността е \"value\", отразяваща текущата ситуация"
          }
        },
        {
          "index": 78,
          "cells": {
            "1": "Променено името на поле \"nomenclature.entry.value\" на \"nomenclature.entry.description\" в съобщение C002"
          }
        },
        {
          "index": 79,
          "cells": {
            "1": "Добавена опционална група \"nomenclature.entry.meta\" в съобщение C002"
          }
        },
        {
          "index": 80,
          "cells": {
            "1": "Добавенo задължително поле \"nomenclature.entry.meta.name\" в съобщение C002"
          }
        },
        {
          "index": 81,
          "cells": {
            "1": "Добавенo задължително поле \"nomenclature.entry.meta.value\" в съобщение C002"
          }
        },
        {
          "index": 82,
          "cells": {
            "1": "Добавено опционално поле \"senderISName\" в хедъра на съобщение C001"
          }
        },
        {
          "index": 83,
          "cells": {
            "1": "Добавен нов ред към номенклатура CL043"
          }
        },
        {
          "index": 84,
          "cells": {
            "1": "Добавени мета колони към номенклатура CL037 - Days to Next Dose, Permit Owner, Target Disease"
          }
        },
        {
          "index": 85,
          "cells": {
            "1": "Допълнена номенклатура CL037 с ваксина \"COVID-19 Vaccine Moderna\""
          }
        },
        {
          "index": 86,
          "cells": {
            "1": "Версия 1.0.14"
          }
        },
        {
          "index": 87,
          "cells": {
            "1": "Допълнена номенклатура CL037 с ваксина \"COVID-19 Vaccine AstraZeneca\""
          }
        },
        {
          "index": 88,
          "cells": {
            "1": "Добавени нови редове в номенклатура CL045"
          }
        },
        {
          "index": 89,
          "cells": {
            "1": "Номенклатура CL031 е маркирана за премахване"
          }
        },
        {
          "index": 90,
          "cells": {
            "1": "Добавена номенклатура CL047"
          }
        },
        {
          "index": 91,
          "cells": {
            "1": "Добавена номенклатура CL048"
          }
        },
        {
          "index": 92,
          "cells": {
            "1": "Добавена номенклатура CL049"
          }
        },
        {
          "index": 93,
          "cells": {
            "1": "Версия 1.1.0"
          }
        },
        {
          "index": 94,
          "cells": {
            "1": "Добавени нови редове в номенклатура CL042"
          }
        },
        {
          "index": 95,
          "cells": {
            "1": "Добавени нови редове в номенклатура CL037"
          }
        },
        {
          "index": 96,
          "cells": {
            "1": "Добавена номенклатура CL050"
          }
        },
        {
          "index": 97,
          "cells": {
            "1": "Добавени нови редове в номенклатура CL014"
          }
        },
        {
          "index": 98,
          "cells": {
            "1": "Промемен формата на всички номенклатурни таблици така, че да отговарят по структура на резултата от заявка C001"
          }
        },
        {
          "index": 99,
          "cells": {
            "1": "Поле \"senderISName\" е направено задължително в съобщение C001"
          }
        },
        {
          "index": 100,
          "cells": {
            "1": "Премахнато правило RL008 от съобщение C001 (нерелевантно)"
          }
        },
        {
          "index": 101,
          "cells": {
            "1": "Премахнато условие CD014 от съобщения C001 и C002 (нерелевантно)"
          }
        },
        {
          "index": 102,
          "cells": {
            "1": "Добавено съобщение C003"
          }
        },
        {
          "index": 103,
          "cells": {
            "1": "Добавено съобщение C004"
          }
        },
        {
          "index": 104,
          "cells": {
            "1": "Версия 1.1.1"
          }
        },
        {
          "index": 105,
          "cells": {
            "1": "Добавена номенклатура CL051"
          }
        },
        {
          "index": 106,
          "cells": {
            "1": "Добавена номенклатура CL052"
          }
        },
        {
          "index": 107,
          "cells": {
            "1": "Добавена номенклатура CL053"
          }
        },
        {
          "index": 108,
          "cells": {
            "1": "Добавена номенклатура CL054"
          }
        },
        {
          "index": 109,
          "cells": {
            "1": "Добавена номенклатура CL056"
          }
        },
        {
          "index": 110,
          "cells": {
            "1": "Допълнена номенклатура CL022 с нови редове"
          }
        },
        {
          "index": 111,
          "cells": {
            "1": "Премахната номенклатура CL031"
          }
        },
        {
          "index": 112,
          "cells": {
            "1": "Версия 1.1.2"
          }
        },
        {
          "index": 113,
          "cells": {
            "1": "Номенклатура CL026 обновена с данни от НЗОК към 16.03.2021"
          }
        },
        {
          "index": 114,
          "cells": {
            "1": "Коригирана номенклатура CL022 (имаше невалидни пакети по НЗОК)"
          }
        },
        {
          "index": 115,
          "cells": {
            "1": "Версия 1.2.0"
          }
        },
        {
          "index": 116,
          "cells": {
            "1": "Номенклатура CL022 обновена с данни от НЗОК към 01.03.2021"
          }
        },
        {
          "index": 117,
          "cells": {
            "1": "Коригирано описание на поле \"senderId\" в съобщение C001"
          }
        },
        {
          "index": 118,
          "cells": {
            "1": "Табове \"Съобщения\", \"С001\", \"С002, \"С003\", \"С004\", \"С099\" са преместени в нов файл с име \"НЗИС Общи Медицински Услуги - API Спецификация\""
          }
        },
        {
          "index": 119,
          "cells": {
            "1": "Допълнена номенклатура CL056 с тестове за COVID налични в България"
          }
        },
        {
          "index": 120,
          "cells": {
            "1": "Допълнена номенклатура CL011 с новите кодове за COVID"
          }
        },
        {
          "index": 121,
          "cells": {
            "1": "Добавена нова колона \"Mapping to CL038\" в мета-данните за номенклатура CL037"
          }
        },
        {
          "index": 122,
          "cells": {
            "1": "Променено името на ваксина \"COVID-19 Vaccine AstraZeneca\" на \"Vaxzevria\" в номенклатура CL037"
          }
        },
        {
          "index": 123,
          "cells": {
            "1": "Добавен нов ред за ваксина \"COVID-19 Vaccine Janssen\" в номенклатура CL037"
          }
        },
        {
          "index": 124,
          "cells": {
            "1": "Версия 1.2.1"
          }
        },
        {
          "index": 125,
          "cells": {
            "1": "Добавена номенклатура CL055"
          }
        },
        {
          "index": 126,
          "cells": {
            "1": "Номенклатура CL026 разширена със стойности, които бяха премахнати с ъпдейта от 16.03.2021 - тези редове показват правилно валидност до тази дата и са в червено"
          }
        },
        {
          "index": 127,
          "cells": {
            "1": "Номенклатура CL009 обновена с данни от НСЦРЛП към 02.04.2021 - отменените стойности се показват в червено и са с валидност до тази дата"
          }
        },
        {
          "index": 128,
          "cells": {
            "1": "Версия 1.2.2"
          }
        },
        {
          "index": 129,
          "cells": {
            "1": "Номенклатура CL026 обновена с данни от НЗОК към 16.04.2021 - отменените стойности се показват в червено и са с валидност до тази дата"
          }
        },
        {
          "index": 130,
          "cells": {
            "1": "Версия 1.2.3"
          }
        },
        {
          "index": 131,
          "cells": {
            "1": "Добавени нови редове в CL010"
          }
        },
        {
          "index": 132,
          "cells": {
            "1": "Добавени нови редове в CL035"
          }
        },
        {
          "index": 133,
          "cells": {
            "1": "Номенклатура CL026 обновена с данни от НЗОК към 16.05.2021 - отменените стойности се показват в червено и са с валидност до тази дата"
          }
        },
        {
          "index": 134,
          "cells": {
            "1": "Номенклатура CL009 обновена с данни от НСЦРЛП към 02.05.2021 - отменените стойности се показват в червено и са с валидност до тази дата"
          }
        },
        {
          "index": 135,
          "cells": {
            "1": "Версия 1.2.4"
          }
        },
        {
          "index": 136,
          "cells": {
            "1": "Добавена нова колона \"Permit Owner ID\" в мета-данните за номенклатура CL037 със стойности за 4-те COVID ваксини"
          }
        },
        {
          "index": 137,
          "cells": {
            "1": "Променено името на колона \"Permit Owner Name\" в мета-данните за номенклатура CL037 и коригирани стойности за 4-те COVID ваксини"
          }
        },
        {
          "index": 138,
          "cells": {
            "1": "Добавена нова колона \"SNOMED\" в мета-данните за номенклатура CL030 със стойности за първите два резултата"
          }
        },
        {
          "index": 139,
          "cells": {
            "1": "Коригиран ред в CL005 - LB Ливан Lebanon"
          }
        },
        {
          "index": 140,
          "cells": {
            "1": "Ред BU в CL005 e направен неактивен"
          }
        },
        {
          "index": 141,
          "cells": {
            "1": "Променено името на колона \"NSCRLP Code\" на \"CL009 Mapping\" в номенклатура CL026"
          }
        },
        {
          "index": 142,
          "cells": {
            "1": "Добавена нова колона \"CL010 Mapping\" в номенклатура CL026"
          }
        },
        {
          "index": 143,
          "cells": {
            "1": "Коригирано описание на ред BQ в номенклатура CL005"
          }
        },
        {
          "index": 144,
          "cells": {
            "1": "Коригирано описание на ред GB в номенклатура CL005"
          }
        },
        {
          "index": 145,
          "cells": {
            "1": "Сменено името на CL056 на \"Медицински инструменти\""
          }
        },
        {
          "index": 146,
          "cells": {
            "1": "Добавена номенклатура CL057"
          }
        },
        {
          "index": 147,
          "cells": {
            "1": "Добавена номенклатура CL058"
          }
        },
        {
          "index": 148,
          "cells": {
            "1": "Променени редовете по номенклатура CL056 спрямо последните данни от ЕК за DGC. Добавени мета колони \"CL057 Mapping\" и \"CL058 Mapping\""
          }
        },
        {
          "index": 149,
          "cells": {
            "1": "Добавен нов ред с код \"VNT001\" в номенклатура CL022"
          }
        },
        {
          "index": 150,
          "cells": {
            "1": "Версия 1.2.5"
          }
        },
        {
          "index": 151,
          "cells": {
            "1": "Добавен нов ред с код \"25\" в номенклатура CL024"
          }
        },
        {
          "index": 152,
          "cells": {
            "1": "Версия 1.2.6"
          }
        },
        {
          "index": 153,
          "cells": {
            "1": "Добавени нови колони \"Quantity\", \"Divisible\", \"Narcotic\", \"Target Disease\", \"Prescription Type\" в номенклатура CL026"
          }
        },
        {
          "index": 154,
          "cells": {
            "1": "Номенклатура CL026 е сведена до няколко примерни реда; данните за тази номенклатура се синхронизират автоматично от НЗОК"
          }
        },
        {
          "index": 155,
          "cells": {
            "1": "Добавени 2 реда с кодове Т4 и Т5 в номенклатура CL007"
          }
        },
        {
          "index": 156,
          "cells": {
            "1": "Коригирани описанията на всички редове в номенклатура CL007"
          }
        },
        {
          "index": 157,
          "cells": {
            "1": "Номенклатура CL009 е сведена до няколко примерни реда; данните за тази номенклатура се синхронизират автоматично от НСЦРЛП"
          }
        },
        {
          "index": 158,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL002 за статус 6 на е-рецепта"
          }
        },
        {
          "index": 159,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL014 за направление R4"
          }
        },
        {
          "index": 160,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL003 за статус 8 на е-направление"
          }
        },
        {
          "index": 161,
          "cells": {
            "1": "Добавена номенклатура CL059"
          }
        },
        {
          "index": 162,
          "cells": {
            "1": "Добавена номенклатура CL060"
          }
        },
        {
          "index": 163,
          "cells": {
            "1": "Добавена номенклатура CL061"
          }
        },
        {
          "index": 164,
          "cells": {
            "1": "Добавена номенклатура CL062"
          }
        },
        {
          "index": 165,
          "cells": {
            "1": "Добавена номенклатура CL063"
          }
        },
        {
          "index": 166,
          "cells": {
            "1": "Добавена номенклатура CL064"
          }
        },
        {
          "index": 167,
          "cells": {
            "1": "Добавена номенклатура CL065"
          }
        },
        {
          "index": 168,
          "cells": {
            "1": "Добавена номенклатура CL066"
          }
        },
        {
          "index": 169,
          "cells": {
            "1": "Добавена номенклатура CL067"
          }
        },
        {
          "index": 170,
          "cells": {
            "1": "Добавена номенклатура CL068"
          }
        },
        {
          "index": 171,
          "cells": {
            "1": "Добавена номенклатура CL069"
          }
        },
        {
          "index": 172,
          "cells": {
            "1": "Добавена номенклатура CL070"
          }
        },
        {
          "index": 173,
          "cells": {
            "1": "Добавена номенклатура CL071"
          }
        },
        {
          "index": 174,
          "cells": {
            "1": "Добавена номенклатура CL072"
          }
        },
        {
          "index": 175,
          "cells": {
            "1": "Добавена номенклатура CL073"
          }
        },
        {
          "index": 176,
          "cells": {
            "1": "Добавена номенклатура CL074"
          }
        },
        {
          "index": 177,
          "cells": {
            "1": "Добавена номенклатура CL075"
          }
        },
        {
          "index": 178,
          "cells": {
            "1": "Добавена номенклатура CL076"
          }
        },
        {
          "index": 179,
          "cells": {
            "1": "Добавена номенклатура CL077"
          }
        },
        {
          "index": 180,
          "cells": {
            "1": "Добавена номенклатура CL078"
          }
        },
        {
          "index": 181,
          "cells": {
            "1": "Добавена номенклатура CL079"
          }
        },
        {
          "index": 182,
          "cells": {
            "1": "Добавена номенклатура CL080"
          }
        },
        {
          "index": 183,
          "cells": {
            "1": "Добавена номенклатура CL081"
          }
        },
        {
          "index": 184,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL002 за статус 7 на е-рецепта"
          }
        },
        {
          "index": 185,
          "cells": {
            "1": "Версия 1.2.7"
          }
        },
        {
          "index": 186,
          "cells": {
            "1": "Добавена номенклатура CL082"
          }
        },
        {
          "index": 187,
          "cells": {
            "1": "Премахната колона \"CL038 Mapping\" от номенклатура CL037"
          }
        },
        {
          "index": 188,
          "cells": {
            "1": "Добавена колона \"CL037 Mapping\" в номенклатура CL038"
          }
        },
        {
          "index": 189,
          "cells": {
            "1": "Добавена колона \"CL082 Mapping\" в номенклатура CL038"
          }
        },
        {
          "index": 190,
          "cells": {
            "1": "Актуализирана номенклатура CL037"
          }
        },
        {
          "index": 191,
          "cells": {
            "1": "Актуализирана номенклатура CL038"
          }
        },
        {
          "index": 192,
          "cells": {
            "1": "Променено описанието (и значението) на редове 05 и 06 в номенклатура CL049"
          }
        },
        {
          "index": 193,
          "cells": {
            "1": "Версия 1.2.8"
          }
        },
        {
          "index": 194,
          "cells": {
            "1": "Попълнена номенлатура CL050 с данни от НЗОК"
          }
        },
        {
          "index": 195,
          "cells": {
            "1": "Добавена колона \"Type\" в номенклатура CL050"
          }
        },
        {
          "index": 196,
          "cells": {
            "1": "Предефинирана номенклатуа CL049 с изцяло нови редове и по FHIR стандарт"
          }
        },
        {
          "index": 197,
          "cells": {
            "1": "Комбинирани номенклатури CL047 с CL048 в нова номенклатура CL047; номенклатура CL048 е изтрита"
          }
        },
        {
          "index": 198,
          "cells": {
            "1": "Версия 1.3.0"
          }
        },
        {
          "index": 199,
          "cells": {
            "1": "Добавена номенклатура CL083"
          }
        },
        {
          "index": 200,
          "cells": {
            "1": "Коригирани имената на номенклатури CL012, CL022, CL024, CL025"
          }
        },
        {
          "index": 201,
          "cells": {
            "1": "Изцяло преработена номенкалтура CL022"
          }
        },
        {
          "index": 202,
          "cells": {
            "1": "Изцяло преработена номенкалтура CL024"
          }
        },
        {
          "index": 203,
          "cells": {
            "1": "Премахната номенклатура CL068"
          }
        },
        {
          "index": 204,
          "cells": {
            "1": "Добавена номенклатура CL084"
          }
        },
        {
          "index": 205,
          "cells": {
            "1": "Добавена номенклатура CL085"
          }
        },
        {
          "index": 206,
          "cells": {
            "1": "Добавена номенклатура CL086"
          }
        },
        {
          "index": 207,
          "cells": {
            "1": "Добавена номенклатура CL087"
          }
        },
        {
          "index": 208,
          "cells": {
            "1": "Изцяло преработена номенклатура CL037"
          }
        },
        {
          "index": 209,
          "cells": {
            "1": "Актуализирана номенклатура CL038"
          }
        },
        {
          "index": 210,
          "cells": {
            "1": "Добавена колона \"Vaccine Group\" в номенклатура CL037"
          }
        },
        {
          "index": 211,
          "cells": {
            "1": "Добавена колона \"Dose Number\" в номенклатура CL038"
          }
        },
        {
          "index": 212,
          "cells": {
            "1": "Добавена номенклатура CL088"
          }
        },
        {
          "index": 213,
          "cells": {
            "1": "Добавена колона \"Offset Allowed\" в номенклатура CL034"
          }
        },
        {
          "index": 214,
          "cells": {
            "1": "Коригирани описания \"Description\" на всички редове в номенклатура CL013"
          }
        },
        {
          "index": 215,
          "cells": {
            "1": "Коригирани описания \"Description\" на всички редове в номенклатура CL034"
          }
        },
        {
          "index": 216,
          "cells": {
            "1": "Добавена колона \"Medicament Details\" в номенклатура CL037"
          }
        },
        {
          "index": 217,
          "cells": {
            "1": "Премахната колона \"Language EN\" в номенклатура CL038"
          }
        },
        {
          "index": 218,
          "cells": {
            "1": "Версия 1.3.1"
          }
        },
        {
          "index": 219,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL014 за направление R5"
          }
        },
        {
          "index": 220,
          "cells": {
            "1": "Изцяло преработена номенклатура CL052"
          }
        },
        {
          "index": 221,
          "cells": {
            "1": "Изцяло преработена номенклатура CL051"
          }
        },
        {
          "index": 222,
          "cells": {
            "1": "Коригирани мапинги между CL038 и CL037"
          }
        },
        {
          "index": 223,
          "cells": {
            "1": "Коригирани номера на разрешителни за всички ваксини в CL037"
          }
        },
        {
          "index": 224,
          "cells": {
            "1": "Всички лекарствени продукти в CL037 маркирани като активни (след проверка в НСЦРЛП)"
          }
        },
        {
          "index": 225,
          "cells": {
            "1": "Добавен нов ред \"7401\" в номенклатура CL037"
          }
        },
        {
          "index": 226,
          "cells": {
            "1": "Добавен нов ред \"15358\" в номенклатура CL037"
          }
        },
        {
          "index": 227,
          "cells": {
            "1": "Добавен нов ред \"8556\" в номенклатура CL037"
          }
        },
        {
          "index": 228,
          "cells": {
            "1": "Добавен нов ред \"16887\" в номенклатура CL037"
          }
        },
        {
          "index": 229,
          "cells": {
            "1": "Добавени нови мапинги към CL037 в номенклатура CL038 (спрямо новите редове)"
          }
        },
        {
          "index": 230,
          "cells": {
            "1": "Версия 1.3.2"
          }
        },
        {
          "index": 231,
          "cells": {
            "1": "Добавена номенклaтура CL089"
          }
        },
        {
          "index": 232,
          "cells": {
            "1": "Добавен нов ред \"R6\" в номенклатура CL014"
          }
        },
        {
          "index": 233,
          "cells": {
            "1": "Добавена нова колона \"NHIF Document\" в номенклатура CL014"
          }
        },
        {
          "index": 234,
          "cells": {
            "1": "Добавена нова колона \"NHIF Document\" в номенклатура CL007"
          }
        },
        {
          "index": 235,
          "cells": {
            "1": "Коригирани всички \"Description\" данни в номенклатура CL007"
          }
        },
        {
          "index": 236,
          "cells": {
            "1": "Коригирани всички \"EN Translation\" данни в номенклатура CL007"
          }
        },
        {
          "index": 237,
          "cells": {
            "1": "Коригирани данните в \"Dose Number\" в номенклатура CL038"
          }
        },
        {
          "index": 238,
          "cells": {
            "1": "Коригирани данните в \"Number of Doses\" в номенклатура CL037"
          }
        },
        {
          "index": 239,
          "cells": {
            "1": "Попълнена номенклатура CL062"
          }
        },
        {
          "index": 240,
          "cells": {
            "1": "Попълнена номенклатура CL063"
          }
        },
        {
          "index": 241,
          "cells": {
            "1": "Добавен нов ред \"R7\" в номенклатура CL014"
          }
        },
        {
          "index": 242,
          "cells": {
            "1": "Версия 1.3.3"
          }
        },
        {
          "index": 243,
          "cells": {
            "1": "Изцяло преработена номенкалтура CL022"
          }
        },
        {
          "index": 244,
          "cells": {
            "1": "Изцяло преработена номенкалтура CL024"
          }
        },
        {
          "index": 245,
          "cells": {
            "1": "Добавена нова колона \"CL032 Mapping\" в номенклатура CL088"
          }
        },
        {
          "index": 246,
          "cells": {
            "1": "Добавен нов ред \"2-00001\" в номенклатура CL050"
          }
        },
        {
          "index": 247,
          "cells": {
            "1": "Добавен нов ред \"2-00001-1\" в номенклатура CL088"
          }
        },
        {
          "index": 248,
          "cells": {
            "1": "Добавен нов ред \"2-00001-2\" в номенклатура CL088"
          }
        },
        {
          "index": 249,
          "cells": {
            "1": "Коригирани стойностите в \"Description\" за редове от \"33\" до \"41\" в номенклатура CL038"
          }
        },
        {
          "index": 250,
          "cells": {
            "1": "Променен код на ред \"5\" на \"6\" в номенклатра CL061"
          }
        },
        {
          "index": 251,
          "cells": {
            "1": "Добавен нов код \"5\" в номенклатура CL061"
          }
        },
        {
          "index": 252,
          "cells": {
            "1": "Коригирани данните в \"Dose Number\" за редове \"04\", \"06\", \"07\" и \"09\" в номенклатура CL038"
          }
        },
        {
          "index": 253,
          "cells": {
            "1": "Добавена номенклaтура CL090"
          }
        },
        {
          "index": 254,
          "cells": {
            "1": "Добавена номенклaтура CL091"
          }
        },
        {
          "index": 255,
          "cells": {
            "1": "Добавена номенклaтура CL092"
          }
        },
        {
          "index": 256,
          "cells": {
            "1": "Добавена номенклaтура CL093"
          }
        },
        {
          "index": 257,
          "cells": {
            "1": "Добавена нова колона \"Usage Instructions\" в номенклатура CL014"
          }
        },
        {
          "index": 258,
          "cells": {
            "1": "Премахната номенклатура CL036"
          }
        },
        {
          "index": 259,
          "cells": {
            "1": "Добавена номенклaтура CL094"
          }
        },
        {
          "index": 260,
          "cells": {
            "1": "Променено описанието \"Description\" и \"Language EN\" на ред \"1\" в номенклатура CL069"
          }
        },
        {
          "index": 261,
          "cells": {
            "1": "Добавен ред \"5\" в номенклатура CL069"
          }
        },
        {
          "index": 262,
          "cells": {
            "1": "Добавена номенклaтура CL998"
          }
        },
        {
          "index": 263,
          "cells": {
            "1": "Версия 1.3.4"
          }
        },
        {
          "index": 264,
          "cells": {
            "1": "Добавена номенклaтура CL095"
          }
        },
        {
          "index": 265,
          "cells": {
            "1": "Добавена номенклaтура CL096"
          }
        },
        {
          "index": 266,
          "cells": {
            "1": "Добавена обратно колона \"NHIF Package\" в номенклатура CL022 (стойности само за дейности, заплащани от НЗОК)"
          }
        },
        {
          "index": 267,
          "cells": {
            "1": "Добавен нов ред \"01-000-0B\" в номенклатура CL024"
          }
        },
        {
          "index": 268,
          "cells": {
            "1": "Попълнена колона \"CL028 Mapping\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024"
          }
        },
        {
          "index": 269,
          "cells": {
            "1": "Попълнена колона \"CL032 Mapping\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"01-013-00\", \"02-005-00\", \"02-007-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024"
          }
        },
        {
          "index": 270,
          "cells": {
            "1": "Попълнена колона \"UCUM\" за редове \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-005-00\", \"01-006-00\", \"01-007-00\", \"01-00C-00\", \"01-00E-00\", \"01-00F-00\", \"01-011-00\", \"01-012-00\", \"01-015-00\", \"02-005-00\", \"02-007-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"02-026-00\", \"02-028-00\", \"03-000-00\", \"03-009-00\", \"03-01E-00\", \"03-01F-00\", \"03-020-00\", \"03-022-00\", \"03-023-00\", \"03-024-00\", \"03-025-00\", \"03-026-00\", \"04-000-00\", \"08-00A-00\", \"08-00B-00\", \"08-00C-00\", \"08-00D-00\", \"08-00E-00\", \"08-00F-00\", \"08-010-00\", \"08-012-00\", \"08-013-00\", \"08-014-00\", \"08-015-00\", \"08-016-00\", \"09-007-00\", \"09-008-00\", \"09-009-00\", \"09-00A-00\", \"09-00B-00\", \"09-00C-00\", \"09-00D-00\", \"0A-01A-00\", \"0B-04A-00\" в номенклатура CL024"
          }
        },
        {
          "index": 271,
          "cells": {
            "1": "Коригирана колона \"Description\" за редове \"01-001-01\", \"02-00C-00\", \"02-00D-00\", \"02-015-00\", \"02-016-00\", \"02-017-00\", \"02-018-00\", \"02-019-00\", \"02-01A-00\", \"02-01B-00\", \"02-023-00\", \"09-00B-00\", \"03-014-00\" в номенклатура CL024"
          }
        },
        {
          "index": 272,
          "cells": {
            "1": "Добавен нов ред \"01-010-01\" в номенклатура CL024"
          }
        },
        {
          "index": 273,
          "cells": {
            "1": "Коригирана колона \"Description\" за редове \"02-00D\", \"02-015\", \"02-016\", \"02-017\", \"02-018\", \"02-019\", \"02-01A\", \"02-01B\", \"02-023\", \"09-00B\", \"03-014\" в номенклатура CL022"
          }
        },
        {
          "index": 274,
          "cells": {
            "1": "Коригирана колона \"CL028 Mapping\" за редове \"02-010-00\" в номенклатура CL024"
          }
        },
        {
          "index": 275,
          "cells": {
            "1": "Коригирана колона \"CL032 Mapping\" за редове \"02-010-00\" в номенклатура CL024"
          }
        },
        {
          "index": 276,
          "cells": {
            "1": "Коригирана колона \"UCUM\" за редове \"02-010-00\", \"08-001-00\", \"03-024-00\", \"03-025-00\", \"03-009-00\" в номенклатура CL024"
          }
        },
        {
          "index": 277,
          "cells": {
            "1": "Добавен нов ред \"03-023-01\" в номенклатура CL024"
          }
        },
        {
          "index": 278,
          "cells": {
            "1": "Добавен нов ред \"08-018\" в номенклатура CL022"
          }
        },
        {
          "index": 279,
          "cells": {
            "1": "Добавен нов ред \"08-018-00\" в номенклатура CL024"
          }
        },
        {
          "index": 280,
          "cells": {
            "1": "Попълнени стойности в колони \"NHIF Code\" и \"NHIF Package\" за редове \"00-00E\", \"09-00C\", \"06-013\", \"06-011\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\" в номенклатура CL022"
          }
        },
        {
          "index": 281,
          "cells": {
            "1": "Допълнена колона \"NHIF Code\" за редове \"0F-120\", \"0F-11D\" в номенклатура CL022"
          }
        },
        {
          "index": 282,
          "cells": {
            "1": "Допълнена колона \"NHIF Package\" за редове \"04-010\" в номенклатура CL022"
          }
        },
        {
          "index": 283,
          "cells": {
            "1": "Добавен нов ред \"0F-11E\" в номенклатура CL022"
          }
        },
        {
          "index": 284,
          "cells": {
            "1": "Добавен нов ред \"0F-121\" в номенклатура CL022"
          }
        },
        {
          "index": 285,
          "cells": {
            "1": "Допълнена колона \"CL022 Mapping\" за редове \"0F-11D-00\", \"0F-120-00\" в номенклатура CL024"
          }
        },
        {
          "index": 286,
          "cells": {
            "1": "Добавен нов ред \"R8\" в номенклатура CL014"
          }
        },
        {
          "index": 287,
          "cells": {
            "1": "Версия 1.3.5"
          }
        },
        {
          "index": 288,
          "cells": {
            "1": "Комбинирани номенклатури CL021 и CL094 в нова версия на номенклатура CL021"
          }
        },
        {
          "index": 289,
          "cells": {
            "1": "Премахната номенклатура CL094"
          }
        },
        {
          "index": 290,
          "cells": {
            "1": "Допълнена колона \"NHIF Code\" за редове \"0C-121\" в номенклатура CL022"
          }
        },
        {
          "index": 291,
          "cells": {
            "1": "Коригирана колона \"Description\" за редове \"0C-121\" в номенклатура CL022"
          }
        },
        {
          "index": 292,
          "cells": {
            "1": "Коригирани изцяло редове \"0C-121-00\", \"01-000-00\", \"01-000-01\", \"01-000-02\", \"01-000-03\", \"01-000-04\", \"01-000-05\", \"01-000-06\", \"01-000-07\", \"01-000-08\", \"01-000-09\", \"01-000-0A\", \"01-000-0B\", \"01-000-0C\", \"01-001-00\", \"01-001-01\", \"01-001-02\", \"01-001-03\", \"01-001-04\", \"01-001-05\", \"01-001-06\", \"01-001-07\", \"01-001-08\", \"01-00F-00\", \"01-002-00\", \"02-001-00\", \"07-000-00\", \"01-00C-00\", \"01-007-01\", \"0B-040-01\", \"02-007-00\", \"02-002-01\" в номенклатура CL024"
          }
        },
        {
          "index": 293,
          "cells": {
            "1": "Добавени нови редове \"01-000-0C\", \"01-001-09\", \"01-001-0A\", \"01-001-0B\", \"01-001-0C\", \"01-001-0D\", \"01-001-0E\", \"01-001-0F\", \"01-001-10\", \"01-001-11\", \"01-001-12\", \"01-001-13\", \"01-001-14\", \"01-001-15\", \"01-000-0E\", \"01-000-0F\", \"01-000-10\", \"01-000-11\", \"01-000-12\", \"01-000-13\", \"01-000-14\", \"01-000-15\", \"01-000-16\", \"01-000-17\", \"01-000-18\", \"01-000-19\", \"01-000-1A\", \"01-000-1B\", \"01-000-1C\", \"01-000-1D\", \"01-000-1E\", \"01-000-1F\", \"01-000-20\", \"01-000-21\", \"01-000-22\", \"01-000-23\", \"01-00F-01\", \"01-00F-02\", \"01-00F-03\", \"01-00F-04\", \"01-00F-05\", \"01-00F-06\", \"01-00F-07\", \"01-00F-08\", \"01-001-F0\", \"01-002-01\", \"01-002-02\", \"01-002-03\", \"01-002-04\", \"01-002-05\", \"01-002-06\", \"01-002-07\", \"01-002-08\", \"01-002-09\", \"01-002-0A\", \"01-002-0B\", \"01-002-0C\", \"01-002-0D\", \"01-002-0E\", \"01-002-0F\", \"01-002-10\", \"01-002-11\", \"01-002-12\", \"01-002-13\", \"01-002-14\", \"01-002-15\", \"01-002-16\", \"02-001-01\", \"02-001-02\", \"02-001-03\", \"02-001-04\", \"07-000-01\", \"07-000-02\", \"01-00C-01\", \"01-00C-02\", \"01-00C-03\", \"01-00C-04\", \"01-00C-05\", \"01-00C-06\", \"01-007-01\", \"0B-040-01\" в номенклатура CL024"
          }
        },
        {
          "index": 294,
          "cells": {
            "1": "Код \"01-00D-00\" променен на \"01-000-0D\" в номенклатура CL024"
          }
        },
        {
          "index": 295,
          "cells": {
            "1": "Добавени нови редове \"2\" в номенклатура CL032"
          }
        },
        {
          "index": 296,
          "cells": {
            "1": "Добавени нови редове \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"10\" в номенклатура CL030"
          }
        },
        {
          "index": 297,
          "cells": {
            "1": "Версия 1.3.6"
          }
        },
        {
          "index": 298,
          "cells": {
            "1": "Добавени нови редове \"02-001-05\", \"02-001-06\", \"02-001-07\", \"02-001-08\", \"02-001-09\", \"04-01A-01\", \"0C-124-00\", \"04-009-01\", \"04-00A-01\", \"04-00B-01\", \"04-00C-01\", \"04-00D-01\", \"04-015-01\", \"04-015-02\", \"04-015-03\", \"04-015-04\", \"04-015-05\", \"0C-015-00\", \"0C-165-00\", \"04-021-01\", \"04-022-01\", \"04-000-01\", \"04-000-02\", \"04-000-03\", \"04-000-04\", \"04-000-05\", \"01-002-F0\", \"04-021-F0\", \"04-022-F0\" в номенклатура CL024"
          }
        },
        {
          "index": 299,
          "cells": {
            "1": "Коригирани изцяло редове \"04-01A-00\", \"0C-121-00\", \"04-015-00\", \"04-009-00\", \"04-00A-00\", \"04-00B-00\", \"04-00C-00\", \"04-00D-00\", \"04-021-00\", \"04-022-00\", \"04-000-00\" в номенклатура CL024"
          }
        },
        {
          "index": 300,
          "cells": {
            "1": "Добавени нови редове \"0C-124\", \"0F-130\", \"0F-131\", \"0F-132\", \"0F-133\", \"0F-134\", \"0F-135\", \"0F-136\", \"0F-137\", \"0F-138\", \"0F-139\", \"0F-13A\", \"0C-015\", \"0C-165\" в номенклатура CL022"
          }
        },
        {
          "index": 301,
          "cells": {
            "1": "Коригирана колона \"Description\" за редове \"0C-121\", \"04-01A\" в номенклатура CL022"
          }
        },
        {
          "index": 302,
          "cells": {
            "1": "Коригирана колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"0C-121\", \"0F-112\", \"0F-113\", \"0F-114\", \"0F-115\", \"0F-116\", \"0F-117\", \"0F-118\", \"0F-119\", \"0F-11A\", \"0F-11B\", \"0F-11C\", \"0C-100\", \"0C-101\", \"0C-102\", \"0C-103\", \"0C-110\", \"0C-111\" в номенклатура CL022"
          }
        },
        {
          "index": 303,
          "cells": {
            "1": "Коригирана колона \"CL022 Mapping\" за редове \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\" в номенклатура CL024"
          }
        },
        {
          "index": 304,
          "cells": {
            "1": "Версия 1.3.7"
          }
        },
        {
          "index": 305,
          "cells": {
            "1": "Коригирана колона \"CL022 Mapping\" за редове \"0F-112-00\", \"0F-113-00\", \"0F-114-00\", \"0F-115-00\", \"0F-116-00\", \"0F-117-00\", \"0F-118-00\", \"0F-119-00\", \"0F-11A-00\", \"0F-11B-00\", \"0F-11C-00\", \"0F-11D-00\", \"0F-120-00\" в номенклатура CL024"
          }
        },
        {
          "index": 306,
          "cells": {
            "1": "Коригиран код Q90.3 на Q90.9 в номенклатура CL011"
          }
        },
        {
          "index": 307,
          "cells": {
            "1": "Добавен код M94.2 в номенклатура CL011"
          }
        },
        {
          "index": 308,
          "cells": {
            "1": "Добавена номенклaтура CL097"
          }
        },
        {
          "index": 309,
          "cells": {
            "1": "Добавена номенклaтура CL098"
          }
        },
        {
          "index": 310,
          "cells": {
            "1": "Добавена номенклaтура CL099"
          }
        },
        {
          "index": 311,
          "cells": {
            "1": "Добавени нови редове \"00-027\", \"00-028\", \"00-029\" в номенклатура CL022"
          }
        },
        {
          "index": 312,
          "cells": {
            "1": "Добавени нови редове \"00-027-00\", \"00-028-00\", \"00-029-00\" в номенклатура CL024"
          }
        },
        {
          "index": 313,
          "cells": {
            "1": "Промемен ред \"8\" на номенклатура CL060"
          }
        },
        {
          "index": 314,
          "cells": {
            "1": "Добавен нов ред \"9\" в номенклатура CL060"
          }
        },
        {
          "index": 315,
          "cells": {
            "1": "Добавен нов ред \"0\" в номенклатура CL004"
          }
        },
        {
          "index": 316,
          "cells": {
            "1": "Добавена номенклaтура CL100"
          }
        },
        {
          "index": 317,
          "cells": {
            "1": "Версия 1.3.8"
          }
        },
        {
          "index": 318,
          "cells": {
            "1": "Коригирана колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"05-00F\", \"05-00D\" в номенклатура CL022"
          }
        },
        {
          "index": 319,
          "cells": {
            "1": "Променен код \"0\" на \"6\" в номенклатура CL004"
          }
        },
        {
          "index": 320,
          "cells": {
            "1": "Версия 1.3.9"
          }
        },
        {
          "index": 321,
          "cells": {
            "1": "Коригирани редове \"<\" и \">\" на \"LT\" и \"GT\" съответно в номенклатура CL097"
          }
        },
        {
          "index": 322,
          "cells": {
            "1": "Променени са стойностите на редове \"391\", \"392\" в номенклатура CL085"
          }
        },
        {
          "index": 323,
          "cells": {
            "1": "Версия 1.3.10"
          }
        },
        {
          "index": 324,
          "cells": {
            "1": "Добавен код \"6\" в номенклатура CL069"
          }
        },
        {
          "index": 325,
          "cells": {
            "1": "Добавена номенклaтура CL101"
          }
        },
        {
          "index": 326,
          "cells": {
            "1": "Версия 1.3.11"
          }
        },
        {
          "index": 327,
          "cells": {
            "1": "Добавен код \"1137\" в номенклатура CL006"
          }
        },
        {
          "index": 328,
          "cells": {
            "1": "Добавена номенклaтура CL997"
          }
        },
        {
          "index": 329,
          "cells": {
            "1": "Допълнена номенклатура CL011 с МКБ кодове M70 с пети знак"
          }
        },
        {
          "index": 330,
          "cells": {
            "1": "Попълнена колона \"NHIF Code\" и колона \"NHIF Package\" за редове \"00-027\", \"00-028\", \"00-029\", \"09-007\", \"00-001\" в номенклатура CL022"
          }
        },
        {
          "index": 331,
          "cells": {
            "1": "Версия 1.3.12"
          }
        },
        {
          "index": 332,
          "cells": {
            "1": "Добавен код \"P267\" в номенклатура CL062"
          }
        },
        {
          "index": 333,
          "cells": {
            "1": "Добавена номенклaтура CL102"
          }
        },
        {
          "index": 334,
          "cells": {
            "1": "Добавени кодове A45, A46, A47 в номенклатура CL063"
          }
        },
        {
          "index": 335,
          "cells": {
            "1": "Коригирана номенклатура CL054 колона \"KEY\" ред 6 \"1,11\" променен на \"01.11\""
          }
        },
        {
          "index": 336,
          "cells": {
            "1": "Добавено описане в номенклатура CL011, ред 35973 - код Y11.34, ред 35989 - код Y11.54, ред 35997 - код Y11.64"
          }
        },
        {
          "index": 337,
          "cells": {
            "1": "Версия 1.3.12"
          }
        },
        {
          "index": 338,
          "cells": {
            "1": "Добавена вид ваксина"
          }
        },
        {
          "index": 339,
          "cells": {
            "1": "Версия 1.3.13"
          }
        },
        {
          "index": 340,
          "cells": {
            "1": "Добавен код 2 в номенклатура CL052"
          }
        },
        {
          "index": 341,
          "cells": {
            "1": "Добавяне на код -1005 в номенклатура CL037"
          }
        },
        {
          "index": 342,
          "cells": {
            "1": "Коригирана колона \"Description\" за редове 3 и 4 в номенклатура CL047"
          }
        },
        {
          "index": 343,
          "cells": {
            "1": "Добавени колони за мета данни в номенклатура CL011"
          }
        },
        {
          "index": 344,
          "cells": {
            "1": "Добавени нови редове \"T6\" и \"T7\" в номенклатура CL007"
          }
        },
        {
          "index": 345,
          "cells": {
            "1": "Добавени преводи на Български в номенклатура CL046"
          }
        },
        {
          "index": 346,
          "cells": {
            "1": "Добавени преводи на Английски в номенклатура CL045"
          }
        },
        {
          "index": 347,
          "cells": {
            "1": "Версия 1.4.0"
          }
        },
        {
          "index": 348,
          "cells": {
            "1": "Добавяне на код -1006 в номенклатура CL037"
          }
        },
        {
          "index": 349,
          "cells": {
            "1": "Добавена номенклaтура CL103"
          }
        },
        {
          "index": 350,
          "cells": {
            "1": "Добавена номенклaтура CL104"
          }
        },
        {
          "index": 351,
          "cells": {
            "1": "Добавена номенклaтура CL105"
          }
        },
        {
          "index": 352,
          "cells": {
            "1": "Добавена номенклaтура CL106"
          }
        },
        {
          "index": 353,
          "cells": {
            "1": "Добавена номенклaтура CL107"
          }
        },
        {
          "index": 354,
          "cells": {
            "1": "Добавена номенклaтура CL108"
          }
        },
        {
          "index": 355,
          "cells": {
            "1": "Добавена номенклaтура CL109"
          }
        },
        {
          "index": 356,
          "cells": {
            "1": "Добавена номенклaтура CL110"
          }
        },
        {
          "index": 357,
          "cells": {
            "1": "Добавена номенклaтура CL111"
          }
        },
        {
          "index": 358,
          "cells": {
            "1": "Добавена номенклaтура CL112"
          }
        },
        {
          "index": 359,
          "cells": {
            "1": "Добавена номенклaтура CL113"
          }
        },
        {
          "index": 360,
          "cells": {
            "1": "Добавяне на нов код \"D\" в номенклатура CL102"
          }
        },
        {
          "index": 361,
          "cells": {
            "1": "Версия 1.4.1"
          }
        },
        {
          "index": 362,
          "cells": {
            "1": "Коригирана номенклатура CL106 като са премахнати свръхбройните зъби"
          }
        },
        {
          "index": 363,
          "cells": {
            "1": "CL037 - Ваксини - добавена колона N - MH Code"
          }
        },
        {
          "index": 364,
          "cells": {
            "1": "Променена изцяло номенклатура CL107 с нови кодове и различни редове"
          }
        },
        {
          "index": 365,
          "cells": {
            "1": "Променена изцяло номенклатура CL111 с нови кодове и различни редове"
          }
        },
        {
          "index": 366,
          "cells": {
            "1": "Версия 1.4.2"
          }
        },
        {
          "index": 367,
          "cells": {
            "1": "Променена изцяло номенклатура CL110 с нови кодове и различни редове"
          }
        },
        {
          "index": 368,
          "cells": {
            "1": "Променена изцяло номенклатура CL112 с нови кодове и различни редове"
          }
        },
        {
          "index": 369,
          "cells": {
            "1": "Коригирани няколко стойности в колона Description в номенклатура CL107"
          }
        },
        {
          "index": 370,
          "cells": {
            "1": "Версия 1.4.3"
          }
        },
        {
          "index": 371,
          "cells": {
            "1": "Променено името на номенклатура CL032"
          }
        },
        {
          "index": 372,
          "cells": {
            "1": "Променено името на номенклатура CL012"
          }
        },
        {
          "index": 373,
          "cells": {
            "1": "Добавени колони за мета данни \"Definition\" и \"Definition EN\" в номенклатура CL012"
          }
        },
        {
          "index": 374,
          "cells": {
            "1": "Премахнат код \"50\" от номенклатура CL038"
          }
        },
        {
          "index": 375,
          "cells": {
            "1": "Променени стойности в колони \"Description\" и \"Dose Number\" за код \"51\" в номенклатура CL038"
          }
        },
        {
          "index": 376,
          "cells": {
            "1": "Добавен код \"Kb\" в номенклатура CL107"
          }
        },
        {
          "index": 377,
          "cells": {
            "1": "Коригирани няколко стойности в колона \"Description\" в номенклатура CL107"
          }
        },
        {
          "index": 378,
          "cells": {
            "1": "Коригирани няколко стойности в колона \"Language EN\" в номенклатура CL107"
          }
        },
        {
          "index": 379,
          "cells": {
            "1": "Коригирани няколко стойности в колона \"Incompatible other codes from CL107\" в номенклатура CL107"
          }
        },
        {
          "index": 380,
          "cells": {
            "1": "Коригирани няколко стойности в колона \"Language EN\" в номенклатура CL111"
          }
        },
        {
          "index": 381,
          "cells": {
            "1": "Променено името на номенклатура CL098"
          }
        },
        {
          "index": 382,
          "cells": {
            "1": "Добавен код \"7\" в номенклатура CL069"
          }
        },
        {
          "index": 383,
          "cells": {
            "1": "Добавени редове \"11-001\" до \"6E-005\" в номенклатура CL022"
          }
        },
        {
          "index": 384,
          "cells": {
            "1": "Добавени редове \"11-001-00\" до \"6E-005-00\" в номенклатура CL024 (подлежат на разширяване и конкретизиране)"
          }
        },
        {
          "index": 385,
          "cells": {
            "1": "Коригирани стойностите в колона \"Incompatible other codes from CL107\" в номенклатура CL107"
          }
        },
        {
          "index": 386,
          "cells": {
            "1": "Създадена номенклатура CL114"
          }
        },
        {
          "index": 387,
          "cells": {
            "1": "Създадена номенклатура CL115"
          }
        },
        {
          "index": 388,
          "cells": {
            "1": "Версия 1.4.4"
          }
        },
        {
          "index": 389,
          "cells": {
            "1": "Добавен код \"T8\" в номенклатура CL007"
          }
        },
        {
          "index": 390,
          "cells": {
            "1": "Добавен код \"T9\" в номенклатура CL007"
          }
        },
        {
          "index": 391,
          "cells": {
            "1": "Коригирани няколко стойности в CL038,  Key 77,78"
          }
        },
        {
          "index": 392,
          "cells": {
            "1": "Добавен код \"81\" в CL038 ( даваща опция да се добавят и лица извън посочената от имунизация възраст)"
          }
        },
        {
          "index": 393,
          "cells": {
            "1": "Създадена номенклатура CL116"
          }
        },
        {
          "index": 394,
          "cells": {
            "1": "Създадена номенклатура CL117"
          }
        },
        {
          "index": 395,
          "cells": {
            "1": "Версия 1.4.5"
          }
        },
        {
          "index": 396,
          "cells": {
            "1": "Създадена номенклатура CL118"
          }
        },
        {
          "index": 397,
          "cells": {
            "1": "Коригирано описанието на ред \"81\" в номенклатура CL038"
          }
        },
        {
          "index": 398,
          "cells": {
            "1": "Добавен ред \"48571\" в номенклатура CL037"
          }
        },
        {
          "index": 399,
          "cells": {
            "1": "Редове \"7401\", \"-1001\", \"-1002\", \"-1003\", \"-1004\" в номенклатура CL037 стават невалидни след 15.09.2023"
          }
        },
        {
          "index": 400,
          "cells": {
            "1": "Добавен ред \"NA\" в номенклатура CL045"
          }
        },
        {
          "index": 401,
          "cells": {
            "1": "Версия 1.4.6"
          }
        },
        {
          "index": 402,
          "cells": {
            "1": "Добавен код 48571  в колона \"Е\" в Key 77 в номенклатура CL038"
          }
        },
        {
          "index": 403,
          "cells": {
            "1": "Добавен код 48571  в колона \"Е\" в Key 78 в номенклатура CL038"
          }
        },
        {
          "index": 404,
          "cells": {
            "1": "Добавен код 48571  в колона \"Е\" в Key 79 в номенклатура CL038"
          }
        },
        {
          "index": 405,
          "cells": {
            "1": "Добавен код 48571  в колона \"Е\" в Key 80 в номенклатура CL038"
          }
        },
        {
          "index": 406,
          "cells": {
            "1": "Добавен код 48571  в колона \"Е\" в Key 81 в номенклатура CL038"
          }
        },
        {
          "index": 407,
          "cells": {
            "1": "Добавен код \" P123.1 \" в номенклатура CL062"
          }
        },
        {
          "index": 408,
          "cells": {
            "1": "Добавен код \"P123.2\" в номенклатура CL062"
          }
        },
        {
          "index": 409,
          "cells": {
            "1": "Добавен код \"P123.3\" в номенклатура CL062"
          }
        },
        {
          "index": 410,
          "cells": {
            "1": "Добавен код \" P123.4\" в номенклатура CL062"
          }
        },
        {
          "index": 411,
          "cells": {
            "1": "Добавен код \"P248.1\" в номенклатура CL062"
          }
        },
        {
          "index": 412,
          "cells": {
            "1": "Добавен код \"P248.2\" в номенклатура CL062"
          }
        },
        {
          "index": 413,
          "cells": {
            "1": "Добавен код \"P260.1\" в номенклатура CL062"
          }
        },
        {
          "index": 414,
          "cells": {
            "1": "Добавен код \"P260.2\" в номенклатура CL062"
          }
        },
        {
          "index": 415,
          "cells": {
            "1": "Добавен код \"P263.1\" в номенклатура CL062"
          }
        },
        {
          "index": 416,
          "cells": {
            "1": "Добавен код \"P263.2\" в номенклатура CL062"
          }
        },
        {
          "index": 417,
          "cells": {
            "1": "Добавен код \"P265.1\" в номенклатура CL062"
          }
        },
        {
          "index": 418,
          "cells": {
            "1": "Добавен код \"P265.2\" в номенклатура CL062"
          }
        },
        {
          "index": 419,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W001\" става \"Е001\""
          }
        },
        {
          "index": 420,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W002\" става \"Е002\""
          }
        },
        {
          "index": 421,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W003\" става \"Е003\""
          }
        },
        {
          "index": 422,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W004\" става \"Е004\""
          }
        },
        {
          "index": 423,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W005\" става \"Е005\""
          }
        },
        {
          "index": 424,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W006\" става \"Е006\""
          }
        },
        {
          "index": 425,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W007\" става \"Е007\""
          }
        },
        {
          "index": 426,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W008\" става \"Е008\""
          }
        },
        {
          "index": 427,
          "cells": {
            "1": "Коригирана стойност в колона \"Key\" в номенклатура CL998 от \"W009\" става \"Е009\""
          }
        },
        {
          "index": 428,
          "cells": {
            "1": "Добавен код 16146 в номенклатура CL037"
          }
        },
        {
          "index": 429,
          "cells": {
            "1": "Мапинг към код 16146 в колона \"Е\" ред 94 в номенклатура CL038"
          }
        },
        {
          "index": 430,
          "cells": {
            "1": "Добавени кодове \"00-02A\" до \"00-02D\", \"04-02D\", \"04-02E\", \"04-02F\", \"04-030\" в номенклатура CL022"
          }
        },
        {
          "index": 431,
          "cells": {
            "1": "Добавени кодове \"00-02A-00\" до \"00-02D-00\", \"04-02D-00\", \"04-02E-00\", \"04-02F-00\", \"04-030-00\" до \"04-030-17\" в номенклатура CL024"
          }
        },
        {
          "index": 432,
          "cells": {
            "1": "Код \"00-00D\" в номенклатура CL022 става невалиден след 09.10.2023 - използвайте прецизираните кодове \"00-02B\", \"00-02C\" вместо това"
          }
        },
        {
          "index": 433,
          "cells": {
            "1": "Код \"00-00D-00\" в номенклатура CL024 става невалиден след 09.10.2023"
          }
        },
        {
          "index": 434,
          "cells": {
            "1": "Коригирано описанието на \"00-00C\", \"04-014\" в номенклатура CL022"
          }
        },
        {
          "index": 435,
          "cells": {
            "1": "Коригирани описание и стойности за измерване на \"00-00C-00\" в номенклатура CL024"
          }
        },
        {
          "index": 436,
          "cells": {
            "1": "Коригиран изцяло код \"04-014-00\" в номенклатура CL024"
          }
        },
        {
          "index": 437,
          "cells": {
            "1": "Добавен код \"3\" в номенклатура CL032"
          }
        },
        {
          "index": 438,
          "cells": {
            "1": "Добавени кодове \"11\" до \"14\" в номенклатура CL030"
          }
        },
        {
          "index": 439,
          "cells": {
            "1": "Създадена номенклатура CL120"
          }
        },
        {
          "index": 440,
          "cells": {
            "1": "Създадена номенклатура CL121"
          }
        },
        {
          "index": 441,
          "cells": {
            "1": "Създадена номенклатура CL122 (незавършена – да не се използва!)"
          }
        },
        {
          "index": 442,
          "cells": {
            "1": "Версия 1.4.7"
          }
        },
        {
          "index": 443,
          "cells": {
            "1": "Добавен код 6 в номенклатура CL018"
          }
        },
        {
          "index": 444,
          "cells": {
            "1": "Добавен код 7 в номенклатура CL018 (ще влезе в сила след финализиране на интеграцията с регистъра на съсловната организация)"
          }
        },
        {
          "index": 445,
          "cells": {
            "1": "Кодове EC, BC, TE, TB, TG, F са деактивирани в номенклатура CL016 считано от 20.10.2023"
          }
        },
        {
          "index": 446,
          "cells": {
            "1": "Номенкалтура CL009 е напълно актуализирана (за разлика от регулярните incremental updates) - моля синхронизирайте я във вашите софтуери"
          }
        },
        {
          "index": 447,
          "cells": {
            "1": "Версия 1.4.8"
          }
        },
        {
          "index": 448,
          "cells": {
            "1": "Добавени кодове 545, 546, 547, 548, 549, 550 в номенклатура CL010"
          }
        },
        {
          "index": 449,
          "cells": {
            "1": "Версия 1.4.9"
          }
        },
        {
          "index": 450,
          "cells": {
            "1": "Добавен код 15497 в номенклатура CL037"
          }
        },
        {
          "index": 451,
          "cells": {
            "1": "Добавен код 15497 в колона \"CL037 Mapping\" за ред 72 на номенклатура CL038"
          }
        },
        {
          "index": 452,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL002 за статус 8 на е-рецепта"
          }
        },
        {
          "index": 453,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL003 за статус 9 на е-направление"
          }
        },
        {
          "index": 454,
          "cells": {
            "1": "Добавен нов ред в номенклатура CL003 за статус 10 на е-направление"
          }
        },
        {
          "index": 455,
          "cells": {
            "1": "Добавена нова колона към Meta Data в номенклатура CL006 - колона Clinical speciality"
          }
        },
        {
          "index": 456,
          "cells": {
            "1": "Създадена номенклатура CL123"
          }
        },
        {
          "index": 457,
          "cells": {
            "1": "Създадена номенклатура CL124"
          }
        },
        {
          "index": 458,
          "cells": {
            "1": "Версия 1.4.10"
          }
        },
        {
          "index": 459,
          "cells": {
            "1": "Създадена номенклатура CL125"
          }
        },
        {
          "index": 460,
          "cells": {
            "1": "Версия 1.4.11"
          }
        },
        {
          "index": 461,
          "cells": {
            "1": "Добавена нова колона \"CL037 Mapping (2024)\" към номенклатура CL038 - разликите спрямо 2023 са маркирани в жълто"
          }
        },
        {
          "index": 462,
          "cells": {
            "1": "Код 71 е преместен към Национални програми, преименуван е и е променен броят на дозите в номенклатура CL038"
          }
        },
        {
          "index": 463,
          "cells": {
            "1": "Код 70 е преименуван и е с променен брой на дозите в номенклатура CL038"
          }
        },
        {
          "index": 464,
          "cells": {
            "1": "Прекратен запис -1001 в номенклатура CL037"
          }
        },
        {
          "index": 465,
          "cells": {
            "1": "Прекратен запис -1002 в номенклатура CL037"
          }
        },
        {
          "index": 466,
          "cells": {
            "1": "Прекратен запис -1003 в номенклатура CL037"
          }
        },
        {
          "index": 467,
          "cells": {
            "1": "Прекратен запис -1004 в номенклатура CL037"
          }
        },
        {
          "index": 468,
          "cells": {
            "1": "Прекратен запис -1006 в номенклатура CL037"
          }
        },
        {
          "index": 469,
          "cells": {
            "1": "Прекратен запис 1541 в номенклатура CL037"
          }
        },
        {
          "index": 470,
          "cells": {
            "1": "Прекратен запис 4184 в номенклатура CL037"
          }
        },
        {
          "index": 471,
          "cells": {
            "1": "Прекратен запис 1653 в номенклатура CL037"
          }
        },
        {
          "index": 472,
          "cells": {
            "1": "Прекратен запис 7401 в номенклатура CL037"
          }
        },
        {
          "index": 473,
          "cells": {
            "1": "Прекратен запис 3932 в номенклатура CL037"
          }
        },
        {
          "index": 474,
          "cells": {
            "1": "Добавен код 15210 в номенклатура CL037"
          }
        },
        {
          "index": 475,
          "cells": {
            "1": "Добавен код 57335 в номенклатура CL037"
          }
        },
        {
          "index": 476,
          "cells": {
            "1": "Добавен код 61121 в номенклатура CL037"
          }
        },
        {
          "index": 477,
          "cells": {
            "1": "Коригирано \"Medicament details\" на запис 15497 в номенклатура CL037"
          }
        },
        {
          "index": 478,
          "cells": {
            "1": "Коригирано \"Medicament details\", \"Number of doses\", \"Days to Next Dose\" на запис 16146 в номенклатура CL037"
          }
        },
        {
          "index": 479,
          "cells": {
            "1": "Версия 1.4.12"
          }
        },
        {
          "index": 480,
          "cells": {
            "1": "Добавен нов код 152 в номенклатура CL087"
          }
        },
        {
          "index": 481,
          "cells": {
            "1": "Промяна в наименованието на код 141"
          }
        },
        {
          "index": 482,
          "cells": {
            "1": "Промяна в наименованието на код 142"
          }
        },
        {
          "index": 483,
          "cells": {
            "1": "Заличени 8 броя кодове в номенклатура CL087"
          }
        },
        {
          "index": 484,
          "cells": {
            "1": "Премахнат код \"K\" на ред 32 колона F в номенклатура CL107"
          }
        },
        {
          "index": 485,
          "cells": {
            "1": "Премахнат код \"F\" на ред 24 колона F в номенклатура CL107"
          }
        },
        {
          "index": 486,
          "cells": {
            "1": "Премахнат код \"Е\" на ред 38 колона F в номенклатура CL107"
          }
        },
        {
          "index": 487,
          "cells": {
            "1": "Премахнат код \"S\" на ред 23 колона F в номенклатура CL107"
          }
        },
        {
          "index": 488,
          "cells": {
            "1": "Премахнат код \"D\" на ред 23 колона F в номенклатура CL107"
          }
        },
        {
          "index": 489,
          "cells": {
            "1": "Премахнат код \"Е\" на ред 34 колона F в номенклатура CL107"
          }
        },
        {
          "index": 490,
          "cells": {
            "1": "Коригиранo наименование на ред 6 колона B в номенклатура CL107"
          }
        },
        {
          "index": 491,
          "cells": {
            "1": "Коригиранo наименование на ред 16 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 492,
          "cells": {
            "1": "Промяна в наименованието при код 70 и код 71 в номенклатура CL038"
          }
        },
        {
          "index": 493,
          "cells": {
            "1": "Създадена номенклатура CL135"
          }
        },
        {
          "index": 494,
          "cells": {
            "1": "Коригирано наименование на ред 6 колона C  в номенклатура CL107"
          }
        },
        {
          "index": 495,
          "cells": {
            "1": "Версия 1.4.13"
          }
        },
        {
          "index": 496,
          "cells": {
            "1": "Коригирано наименование на ред 6 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 497,
          "cells": {
            "1": "Коригирано наименование на ред 7 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 498,
          "cells": {
            "1": "Коригирано наименование на ред 8 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 499,
          "cells": {
            "1": "Коригирано наименование на ред 9 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 500,
          "cells": {
            "1": "Коригирано наименование на ред 10 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 501,
          "cells": {
            "1": "Коригирано наименование на ред 11 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 502,
          "cells": {
            "1": "Коригирано наименование на ред 12 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 503,
          "cells": {
            "1": "Коригирано наименование на ред 16 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 504,
          "cells": {
            "1": "Коригирано наименование на ред 17 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 505,
          "cells": {
            "1": "Коригирано наименование на ред 18 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 506,
          "cells": {
            "1": "Коригирано наименование на ред 19 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 507,
          "cells": {
            "1": "Коригирано наименование на ред 20 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 508,
          "cells": {
            "1": "Коригирано наименование на ред 21 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 509,
          "cells": {
            "1": "Коригирано наименование на ред 22 колона B  в номенклатура CL107"
          }
        },
        {
          "index": 510,
          "cells": {
            "1": "Добавен нов код P187.1 в номенклатура CL062"
          }
        },
        {
          "index": 511,
          "cells": {
            "1": "Добавен нов код P187.2 в номенклатура CL062"
          }
        },
        {
          "index": 512,
          "cells": {
            "1": "Добавен нов код P262.1 в номенклатура CL062"
          }
        },
        {
          "index": 513,
          "cells": {
            "1": "Добавен нов код P262.2 в номенклатура CL062"
          }
        },
        {
          "index": 514,
          "cells": {
            "1": "Добавен нов код P265.3 в номенклатура CL062"
          }
        },
        {
          "index": 515,
          "cells": {
            "1": "Версия 1.5.0"
          }
        },
        {
          "index": 516,
          "cells": {
            "1": "Добавен нов код \"8\" в номенклатура CL069"
          }
        },
        {
          "index": 517,
          "cells": {
            "1": "Добавен нов код \"4\" в номенклатура CL028"
          }
        },
        {
          "index": 518,
          "cells": {
            "1": "Добавен нов код \"5\" в номенклатура CL028"
          }
        },
        {
          "index": 519,
          "cells": {
            "1": "Добавен нов код \"58717\" в номенклатура CL114"
          }
        },
        {
          "index": 520,
          "cells": {
            "1": "Реконструирана номенклатура CL050"
          }
        },
        {
          "index": 521,
          "cells": {
            "1": "Реконструирана номенклатура CL088"
          }
        },
        {
          "index": 522,
          "cells": {
            "1": "Създадена номенклатура CL126"
          }
        },
        {
          "index": 523,
          "cells": {
            "1": "Създадена номенклатура CL127"
          }
        },
        {
          "index": 524,
          "cells": {
            "1": "Създадена номенклатура CL128"
          }
        },
        {
          "index": 525,
          "cells": {
            "1": "Създадена номенклатура CL130"
          }
        },
        {
          "index": 526,
          "cells": {
            "1": "Създадена номенклатура CL131"
          }
        },
        {
          "index": 527,
          "cells": {
            "1": "Създадена номенклатура CL132"
          }
        },
        {
          "index": 528,
          "cells": {
            "1": "Създадена номенклатура CL133"
          }
        },
        {
          "index": 529,
          "cells": {
            "1": "Създадена номенклатура CL134"
          }
        },
        {
          "index": 530,
          "cells": {
            "1": "Създадена номенклатура CL136"
          }
        },
        {
          "index": 531,
          "cells": {
            "1": "Създадена номенклатура CL137"
          }
        },
        {
          "index": 532,
          "cells": {
            "1": "Създадена номенклатура CL138"
          }
        },
        {
          "index": 533,
          "cells": {
            "1": "Създадена номенклатура CL139"
          }
        },
        {
          "index": 534,
          "cells": {
            "1": "Коригирано наименование на поле в колона \"Е\" ред 9 от номенклатура CL088"
          }
        },
        {
          "index": 535,
          "cells": {
            "1": "Създадена номенклатура CL140"
          }
        },
        {
          "index": 536,
          "cells": {
            "1": "Деактивиране на следните кодове в CL037: 1234, 4084, 16291, 16744, 2683, 16962, 16058, 1754, 3339, 61121, 57335 считано от 17.04.2024"
          }
        },
        {
          "index": 537,
          "cells": {
            "1": "Актуализиране на записи с Key: 16, 17, 18, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 51, 00 на колона F в номенклатура CL038"
          }
        },
        {
          "index": 538,
          "cells": {
            "1": "Версия 1.5.1"
          }
        },
        {
          "index": 539,
          "cells": {
            "1": "Добавен нов код \"5\" в номенклатура CL137"
          }
        },
        {
          "index": 540,
          "cells": {
            "1": "Създадена номенклатура CL141"
          }
        },
        {
          "index": 541,
          "cells": {
            "1": "Добавени нови кодове B, C, A, S, V, M, N, T, HC в номенклатура CL102"
          }
        },
        {
          "index": 542,
          "cells": {
            "1": "Версия 1.5.2"
          }
        },
        {
          "index": 543,
          "cells": {
            "1": "Добавен нов код \"01.04\" в номенклатура CL139"
          }
        },
        {
          "index": 544,
          "cells": {
            "1": "Версия 1.5.3"
          }
        },
        {
          "index": 545,
          "cells": {
            "1": "Добавен нови кодове: \"D-09-004\" и \"D-09-005\" в номенклатура CL110"
          }
        },
        {
          "index": 546,
          "cells": {
            "1": "Актуализация на Meta Data - \"ACHI Code\" за кодове: 0C-015, 0C-124 и 0C-165 в номенклатура CL022"
          }
        },
        {
          "index": 547,
          "cells": {
            "1": "Коригирано наименование на поле в колона \"C\" ред 17 от номенклатура CL132"
          }
        },
        {
          "index": 548,
          "cells": {
            "1": "Възстановяване на записи от версия 1.2.7 в номенклатура CL050, в това число на кодове: 02-002, 09-019, 10-022, 09-023, 11-025, 14-032, 17-041, 19-043, 19-044, 24-003, 20-006, 20-007, 29-011, 27-016, 29-019, 31-023, 36-037, 36-038, 36-040, 35-041, 47-046, 58-087, 56-088, 60-103, 60-104, 64-119, 64-120, 65-122, 65-135, 65-136, 67-143, 68-146, 68-148, 68-149, 69-150, 69-152, 70-161, 67-189, 71-193, 65-229, 73-231, 73-232, 69-296, 74-305, 74-306, 70-343, 71-350, 71-352, 69-378, 71-384, 71-385, 67-386, 80-389, 79-390, 77-392, 77-396, 77-398, 77-399, 77-401, 77-402, 77-403, 77-404, 59-095, 71-157, 71-388, 71-195, 73-287, 73-288, 73-289, 73-290, 73-291, 70-344, 70-345, 71-346, 71-347, 71-348, 71-349, 73-355, 70-359, 71-383, 71-190, 74-303, 74-304, 28-010, 33-020, 67-387, 71-353"
          }
        },
        {
          "index": 549,
          "cells": {
            "1": "Актуализиране на Description, Display value BG и Display value EN в номенклатура CL132 при всички налични записи"
          }
        },
        {
          "index": 550,
          "cells": {
            "1": "Актуализиране на age и max age при всички ваксини в номенклатура CL132 в това число на кодове: V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12, V13, V14, V15, V16, V17"
          }
        },
        {
          "index": 551,
          "cells": {
            "1": "Изравняване на данните за age и max age с цел записите да са валидни в рамките на календарната година на навършване на възрастта в номенклатура CL132 за кодове: J7, J7M, J8, J9, J10, J10M, J11, J12, J13, J13M, J14, J15, J16, J16M, J17, A30, A31, A32, A33, A34, A35, A36, A37, A38, A39"
          }
        },
        {
          "index": 552,
          "cells": {
            "1": "Корекция на данните за max age с цел избягване на застъпване със следващ преглед в номенклатура CL132 в това число на кодове: A2M30, A4M30, A4M32, A4M34, A2M35, A4M36, A4M38, A2M40, A3M40, A4M40, A4M42, A4M44, A3M45, A2M45, A4M46, A4M48, A3M50, A2M50, A8M50, A8M52, A8M54, A3M55, A2M55, A8M56, A8M58, A8M60, A2M60, A8M62, A8M64, A8M66"
          }
        },
        {
          "index": 553,
          "cells": {
            "1": "Корекция на данни за Display value EN в номенклатура CL132 за кодове: V3, V5, V6, V11, V12, V15"
          }
        },
        {
          "index": 554,
          "cells": {
            "1": "Добавен код 75-390-01 в номенклатура CL088"
          }
        },
        {
          "index": 555,
          "cells": {
            "1": "Версия 1.5.4"
          }
        },
        {
          "index": 556,
          "cells": {
            "1": "Добавена номенклатура CL142"
          }
        },
        {
          "index": 557,
          "cells": {
            "1": "Възстановена номенклатура CL050 спрямо версия 1.5.2 на спецификацията"
          }
        },
        {
          "index": 558,
          "cells": {
            "1": "Корекция в nhif_code в номенклатура CL142 за кодове: 11-025, 29-019, 64-120, 60-103"
          }
        },
        {
          "index": 559,
          "cells": {
            "1": "Възстановяване на деактивирани кодове в CL037 - 1754 и 3339"
          }
        },
        {
          "index": 560,
          "cells": {
            "1": "В номенклатура CL038 - добавяне на код 1754 в Meta Data - CL037 за кодове: 16, 17, 18"
          }
        },
        {
          "index": 561,
          "cells": {
            "1": "В номенклатура CL038 - добавяне на код 3339 в Meta Data - CL037 за кодове: 28, 29, 30, 31"
          }
        },
        {
          "index": 562,
          "cells": {
            "1": "Версия 1.5.5"
          }
        },
        {
          "index": 563,
          "cells": {
            "1": "Добавена номенклатура CL143"
          }
        },
        {
          "index": 564,
          "cells": {
            "1": "Добавен нов код \"1\" в номенклатура CL143"
          }
        },
        {
          "index": 565,
          "cells": {
            "1": "Добавен нов код \"12\" в номенклатура CL047"
          }
        },
        {
          "index": 566,
          "cells": {
            "1": "Добавен нов код \"14\" в номенклатура CL021"
          }
        },
        {
          "index": 567,
          "cells": {
            "1": "Код \"8\" в номенклатура CL069 става неактивен след 30.09.2024"
          }
        },
        {
          "index": 568,
          "cells": {
            "1": "Версия 1.5.6"
          }
        },
        {
          "index": 569,
          "cells": {
            "1": "Добавен нов ред \"00-030\" в номенклатура CL022"
          }
        },
        {
          "index": 570,
          "cells": {
            "1": "Добавен нов ред \"00-030-00\" в номенклатура CL024"
          }
        },
        {
          "index": 571,
          "cells": {
            "1": "Към CL088 e добавена колона F с \"CL50 Mapping\" с връзка към номенклатура CL050"
          }
        },
        {
          "index": 572,
          "cells": {
            "1": "Към CL088 е добавени стойности за CL028 Mapping за записи: 75-175-01; 76-168-01"
          }
        },
        {
          "index": 573,
          "cells": {
            "1": "Към CL088 е добавени колона за CL032 Mapping за излседванията, при които CL028 е по номенклатура"
          }
        },
        {
          "index": 574,
          "cells": {
            "1": "Към CL088 е добавени стойности за CL032 Mapping за записи: 75-175-01"
          }
        },
        {
          "index": 575,
          "cells": {
            "1": "Променена номенклатура CL110 в съответствие с новата наредба за зъболекарските дейности. Старите кодове остават валидни до 1.12.2024"
          }
        },
        {
          "index": 576,
          "cells": {
            "1": "Версия 1.5.7"
          }
        },
        {
          "index": 577,
          "cells": {
            "1": "Коригирани текстове в CL110"
          }
        },
        {
          "index": 578,
          "cells": {
            "1": "Променена номенклатура CL112 в съответствие с новата наредба за зъболекарските дейности. Старите кодове остават валидни до 1.12.2024"
          }
        },
        {
          "index": 579,
          "cells": {
            "1": "Версия 1.5.8"
          }
        },
        {
          "index": 580,
          "cells": {
            "1": "Добавен код \"01.05\" в номенклатура CL139"
          }
        },
        {
          "index": 581,
          "cells": {
            "1": "Премахнат код \"75-175\" от номенклатура CL142"
          }
        },
        {
          "index": 582,
          "cells": {
            "1": "Номенклатура CL142 е реструктприрана да съдържа само дейности от дългосрочната грижа (т.е. без дейности от CL050)"
          }
        },
        {
          "index": 583,
          "cells": {
            "1": "Премахнат код \"76-168\" от номенклатура CL142"
          }
        },
        {
          "index": 584,
          "cells": {
            "1": "Премахната колона Specialty (CL006) в номенклатура CL142 - преминава в PR001"
          }
        },
        {
          "index": 585,
          "cells": {
            "1": "Създадена номенклатура CL144"
          }
        },
        {
          "index": 586,
          "cells": {
            "1": "Създадена номенклатура CL145"
          }
        },
        {
          "index": 587,
          "cells": {
            "1": "Добавена колона Organization BG / Organization EN в номенклатура CL018"
          }
        },
        {
          "index": 588,
          "cells": {
            "1": "Версия 1.5.9"
          }
        },
        {
          "index": 589,
          "cells": {
            "1": "Номенклатура CL144 - премахната стойност в колона Units при код 99-004-01"
          }
        },
        {
          "index": 590,
          "cells": {
            "1": "Премахнат код S2 в номенклатура CL132"
          }
        },
        {
          "index": 591,
          "cells": {
            "1": "Добавен код S3 в номенклатура CL132"
          }
        },
        {
          "index": 592,
          "cells": {
            "1": "Добавенa стойност за MH code за код \"57335\" в номенклатура CL037"
          }
        },
        {
          "index": 593,
          "cells": {
            "1": "Възстановяване на код 57335 в номенклатура CL037"
          }
        },
        {
          "index": 594,
          "cells": {
            "1": "Версия 1.5.10"
          }
        },
        {
          "index": 595,
          "cells": {
            "1": "Добавен запис с код 9 в CL069"
          }
        },
        {
          "index": 596,
          "cells": {
            "1": "Актуализирани данни в CL107 - променени стойности за Language En за кодове: Co, Cm, Cd, Cb, Cl, Cc"
          }
        },
        {
          "index": 597,
          "cells": {
            "1": "Добавени записи в CL037 с кодове: 58090, 64095, 64907"
          }
        },
        {
          "index": 598,
          "cells": {
            "1": "Направени промени в CL038 в колона CL037 Mapping (2024) при кодове: 00, 16, 17, 18, 28, 29, 30, 31, 61, 62, 63, 64, 68, 69"
          }
        },
        {
          "index": 599,
          "cells": {
            "1": "Коригирано заглавие на номенклатура CL0144 на CL144"
          }
        },
        {
          "index": 600,
          "cells": {
            "1": "Версия 1.5.11"
          }
        },
        {
          "index": 601,
          "cells": {
            "1": "Номенклатура CL144 - промяна на стойности в колона Units при кодове: 65-226-02, 65-226-08, 98-012-01, 98-012-02, 98-012-04"
          }
        },
        {
          "index": 602,
          "cells": {
            "1": "Номенклатура CL132 - промяна на стойности в колона Max age при код V1"
          }
        },
        {
          "index": 603,
          "cells": {
            "1": "Номенклатура CL132 - добавени стойности в колони Min interval from common index и Max interval from common index указващи минимален и максимален интервал между дози от една и съща група ваксини (групата се хваща по ключа в колона Common index) за кодове: V3, V7, V9"
          }
        },
        {
          "index": 604,
          "cells": {
            "1": "Номенклатура CL038 - добавени нови колони в Meta data със следните наименования: Display value BG и Display value EN, които да се използват при визуализация на данни за поствени ваксини от съответната група"
          }
        },
        {
          "index": 605,
          "cells": {
            "1": "Номенклатура CL132 - промени стойности на Description, Display value Bg и Display value En за код A1M"
          }
        },
        {
          "index": 606,
          "cells": {
            "1": "Номенклатура CL132 - добаве код J1M, включващ изследванията на урина от всички профилактични прегледи от група J*"
          }
        },
        {
          "index": 607,
          "cells": {
            "1": "Версия 1.5.12"
          }
        },
        {
          "index": 608,
          "cells": {
            "1": "Номенклатура CL139 - промяна в код 07.01 и добавени стойности за кодове от 07.02 до 07.11 - възможни отговори за битово-санитарни условия"
          }
        },
        {
          "index": 609,
          "cells": {
            "1": "Номенклатура CL134 - промяна на Note за код 04.03"
          }
        },
        {
          "index": 610,
          "cells": {
            "1": "Номенклатура CL132 - добавена стойност за Max age при преглед A6M, за да няма застъпване с дейностите по A10M"
          }
        },
        {
          "index": 611,
          "cells": {
            "1": "Версия 1.5.13"
          }
        },
        {
          "index": 612,
          "cells": {
            "1": "Номенклатура CL038 - добавена нова ваксина по CL037 - 57335 за кодове: 48, 49 и 51"
          }
        },
        {
          "index": 613,
          "cells": {
            "1": "Номенклатура CL044 - добавени са всички ЕКАТТЕ записи към публичната номенклатура. Включени са към номенклатурата всички селищни образувания"
          }
        },
        {
          "index": 614,
          "cells": {
            "1": "Номенклатура CL007 - премахнати грешно дублирани записи за Т4 и Т5"
          }
        },
        {
          "index": 615,
          "cells": {
            "1": "Номенклатура CL134 - добавена колона Ask once със стойност тип boolean, с която се посочва дали даден въпрос да се задава повторно, ако веднъж вече е получил отговор, различен от NULL или отрицателен отговор"
          }
        },
        {
          "index": 616,
          "cells": {
            "1": "Номенклатура CL114 - добавен нов лекарствен продукт с код 28724 - Fentanyl Kalceks"
          }
        },
        {
          "index": 617,
          "cells": {
            "1": "Номенклатура CL139 - добавен код 07.99, който да се използва в случай, че битово-санитарните условия са добри"
          }
        },
        {
          "index": 618,
          "cells": {
            "1": "Номенклатура CL037 - добавена стойност за vaccine group за код 57335"
          }
        },
        {
          "index": 619,
          "cells": {
            "1": "Номенклатура CL018 - добавен код 8 за фелдшери във връзка с отделянето им от БАПЗГ"
          }
        },
        {
          "index": 620,
          "cells": {
            "1": "Версия 1.5.14"
          }
        },
        {
          "index": 621,
          "cells": {
            "1": "Номенклатура CL132 - добавена стойност за Max age при преглед A5M, за да няма застъпване с дейностите по A10M"
          }
        },
        {
          "index": 622,
          "cells": {
            "1": "Номенклатура CL018 - добавен код 9 за медицинска експертиза"
          }
        },
        {
          "index": 623,
          "cells": {
            "1": "Версия 1.5.15"
          }
        },
        {
          "index": 624,
          "cells": {
            "1": "Номенклатура CL132 - промяна на стойност за Event trigger при прегледи J17 и A1 на \"от/до навършване на възрастта\" с цел да няма застъпване на събития при преходни вързрасти"
          }
        },
        {
          "index": 625,
          "cells": {
            "1": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 16, 17, 18, 43, 44, 48, 49, 73, 82, 83, 84, 85, 86. Всички възрасти, които са записани в седмици (weeks) са преобразувани в дни, за да може да се считат до дни включително (примерно 20 weeks = 20 * 7 + 6 дни за до края на 20-тата седмица = 146)"
          }
        },
        {
          "index": 626,
          "cells": {
            "1": "Номенклатура CL037 - за код 3339 (Infanrix-IPV+HIB) е променена стойността на number of doses от 3 на 4"
          }
        },
        {
          "index": 627,
          "cells": {
            "1": "Версия 1.5.16"
          }
        },
        {
          "index": 628,
          "cells": {
            "1": "Номенклатура CL132 - промяна на стойност за Max age при преглед A2M20, A2M25 и A8M68 - намаляват се с 1 година, тъй като се горната възрастова граница е до годината, в която се навършва възрастта и се удължават събитията"
          }
        },
        {
          "index": 629,
          "cells": {
            "1": "Добавен код \"03-028\" в номенклатура CL022"
          }
        },
        {
          "index": 630,
          "cells": {
            "1": "Добавен код \"03-028-00\" в номенклатура CL024"
          }
        },
        {
          "index": 631,
          "cells": {
            "1": "Добавени кодове 9, 10, 11 в номенклатура CL002"
          }
        },
        {
          "index": 632,
          "cells": {
            "1": "Добавен код 4 в номенклатура CL055"
          }
        },
        {
          "index": 633,
          "cells": {
            "1": "Добавени кодове 100, 101 в номенклатура CL038 за новите правила за HPV"
          }
        },
        {
          "index": 634,
          "cells": {
            "1": "Промяна на descr и min age при код 81 в номенклатура CL038"
          }
        },
        {
          "index": 635,
          "cells": {
            "1": "Създадена номенклатура CL146"
          }
        },
        {
          "index": 636,
          "cells": {
            "1": "Версия 1.5.17"
          }
        },
        {
          "index": 637,
          "cells": {
            "1": "Номенклатура CL037 - добавена стойност за Target desease за код 64095"
          }
        },
        {
          "index": 638,
          "cells": {
            "1": "Номенклатура CL021 - променен Description и Language EN за код 14 (добавено пояснение, че е Скрийнинг по национална програма)"
          }
        },
        {
          "index": 639,
          "cells": {
            "1": "Номенклатура CL047 - променен Description и Language EN за код 12 (добавено пояснение, че е Скрийнинг по национална програма)"
          }
        },
        {
          "index": 640,
          "cells": {
            "1": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 7, 8, 9, 27, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 46, 99. Промените са при всички възрасти над 12г. при които минималната възраст е в годината, в която пациентът навършва възрастта. Увеличен е периодът, така че да не сработват контроли при лица, които са гранично родени в началото и края на календарна година."
          }
        },
        {
          "index": 641,
          "cells": {
            "1": "Версия 1.5.18"
          }
        },
        {
          "index": 642,
          "cells": {
            "1": "Номенклатура CL038 - премахната е връзка към CL037 за кодове 48 и 49, като е премахната възможността за прилагане на код 16979 (Preventar 13) за пневмококови имунизации"
          }
        },
        {
          "index": 643,
          "cells": {
            "1": "Номенклатура CL038 - промяна на стойностите за Min age и Max age при кодове: 28, 29, 30, 44, 61, 62, 63, 64, 70, 74, 98"
          }
        },
        {
          "index": 644,
          "cells": {
            "1": "Номенклатура CL038 - премахнато правило от rules за код 52 по отношение на минимален интервал между дозите"
          }
        },
        {
          "index": 645,
          "cells": {
            "1": "Номенклатура CL038 - промяна в Dose number за код 59, 73, 74, 91, 92, 98"
          }
        },
        {
          "index": 646,
          "cells": {
            "1": "Номенклатура CL038 - при код 81 е премахната връзката към CL037 за код 16074 (Gardasil)"
          }
        },
        {
          "index": 647,
          "cells": {
            "1": "Номенклатура CL037 - възстановен е код 1234 за ваксина Priorix"
          }
        },
        {
          "index": 648,
          "cells": {
            "1": "Номенклатура CL038 - при код 45 е добавена връзката към CL037 за код 1234 (Priorix) за регистиране на случаи по медицински проучвания за ваксината"
          }
        },
        {
          "index": 649,
          "cells": {
            "1": "Номенклатура CL022 - промяна в Description и Display Value EN за кодове: 04-030; 00-02C във връзка с промени в приложение № 10 „Изисквания на НЗОК за сключване на договор с лечебни заведения за оказване на СИМП“"
          }
        },
        {
          "index": 650,
          "cells": {
            "1": "Номенклатура CL022 - добавени нови кодове: 02-029; 0B-04E; 03-029"
          }
        },
        {
          "index": 651,
          "cells": {
            "1": "Номенклатура CL022 - за код 02-024 са добавени стойности за NHIF code и NHIF Package"
          },
          "styles": {
            "1": "red"
          }
        },
        {
          "index": 652,
          "cells": {
            "1": "Номенклатура CL024 - добавени нови кодове: 02-029-00; 0B-04E-00; 03-029-00"
          }
        },
        {
          "index": 653,
          "cells": {
            "1": "Номенклатура CL038 - всички възрасти в Min age и Max age, които са в седмици, са преобразувани в дни. Това включва Min age при кодове: 28, 29, 30 и 70"
          }
        },
        {
          "index": 654,
          "cells": {
            "1": "Версия 1.5.19"
          }
        },
        {
          "index": 655,
          "cells": {
            "1": "Номенклатура CL038 - спиране на кодове 77, 78, 79 и 80 във връзка със стартиране на новата HPV програма и въвеждането на кодове 100 и 101"
          }
        },
        {
          "index": 656,
          "cells": {
            "1": "Номенклатура CL037 - спиране на код 1542 за ваксина Pentaxim поради изтичане на срок на годност на последни закупени партиди до 30.06.2025. Ваксината се заменя от Infanrix-IPV+HIB"
          }
        },
        {
          "index": 657,
          "cells": {
            "1": "Номенклатура CL038 - премахната е връзка към CL037 за кодове 28, 29, 30 и 31 за ваксина 1542 поради спиране на ваксина Pentaxim"
          }
        },
        {
          "index": 658,
          "cells": {
            "1": "Версия 1.5.20"
          }
        },
        {
          "index": 659,
          "cells": {
            "1": "Номенклатура CL037 - добавена ваксина с код 46255 - Bexsero"
          }
        },
        {
          "index": 660,
          "cells": {
            "1": "Номенклатура CL038 - промяна в данните за код 73 и 74 за следните данни: Dose number (брой дози); Min age; Rules; CL037 Mapping (2025)"
          }
        },
        {
          "index": 661,
          "cells": {
            "1": "Номенклатура CL001 - премахване на записи с код 3 и 4"
          }
        },
        {
          "index": 662,
          "cells": {
            "1": "Създадена номенклатура CL147"
          }
        },
        {
          "index": 663,
          "cells": {
            "1": "Номенклатура CL037 - спиране на кодове: 16568, 15497, 17327 поради смяна на продуктите за противогрипни ваксини"
          }
        },
        {
          "index": 664,
          "cells": {
            "1": "Номенклатура CL037 - добавени ваксини с кодове: 66739 (Vaxigrip), 66737 (Vaxigrip)"
          }
        },
        {
          "index": 665,
          "cells": {
            "1": "Номенклатура CL038 - промяна на кодове за връзка към CL037 - сменят се стойностите за код 99 и 72"
          }
        },
        {
          "index": 666,
          "cells": {
            "1": "Версия 1.5.21"
          }
        },
        {
          "index": 667,
          "cells": {
            "1": "Създадена номенклатура CL148 във връзка с регистър на Заразните болести"
          }
        },
        {
          "index": 668,
          "cells": {
            "1": "Номенклатура CL011 - добавяне на нови заболявания с кодове: J09, U04, U04.9"
          }
        },
        {
          "index": 669,
          "cells": {
            "1": "Номенклатура CL011 - добавяне на колона към Meta data с информация за това дали конкретния МКБ код е за заразно заболяване - Contagious (релация към CL148)"
          }
        },
        {
          "index": 670,
          "cells": {
            "1": "Създадена номенклатура CL149 за категоризация на случаите на заразни заболявания"
          }
        },
        {
          "index": 671,
          "cells": {
            "1": "Номенклатура CL038 - добавяне на колони към Meta data с информация за имена при мигрирани данни от НЗОК - колони Display transfered data BG и Display transfered data EN"
          }
        },
        {
          "index": 672,
          "cells": {
            "1": "Номенклатура CL038 - добавяне на колона към Meta data с информация за групата на имунизационните програми - Program Group, която преди беше представена като отделни редове и липсваше в данните по отделните кодове"
          }
        },
        {
          "index": 673,
          "cells": {
            "1": "Номенклатура CL018 - добавяне на код 10 за здравен експерт от МОН"
          }
        },
        {
          "index": 674,
          "cells": {
            "1": "Номенклатура CL018 - добавяне на код 11 за инспектор от ИАМН"
          }
        },
        {
          "index": 675,
          "cells": {
            "1": "Създадена номенклатура CL150 за редки заболявания по Orhpanet"
          }
        },
        {
          "index": 676,
          "cells": {
            "1": "Номенклатура CL078 - добавяне на колони към Meta data с информация за описание при редки заболявания - Orpha diseases label BG и Orpha diseases label EN"
          }
        },
        {
          "index": 677,
          "cells": {
            "1": "Номенклатура CL084 - корекция в наименованието на номенклатурата"
          }
        },
        {
          "index": 678,
          "cells": {
            "1": "Номенклатура CL086 - корекция в наименованието на номенклатурата"
          }
        },
        {
          "index": 679,
          "cells": {
            "1": "Версия 1.5.22"
          }
        },
        {
          "index": 680,
          "cells": {
            "1": "Номенклатура CL107 - промяна в стойностите на Description и Language EN за keys: C,Co,Cm,Cd,Cb,Cl,Cc,R,Rc"
          }
        },
        {
          "index": 681,
          "cells": {
            "1": "Номенклатура CL107 - добавени нови кодове: NC,NCo,NCm,NCd,NCb,NCl,NCc,N,Res,DR,DRo,DRm,DRd,DRb,DRl,DRc"
          }
        },
        {
          "index": 682,
          "cells": {
            "1": "Номенклатура CL107 - промяна в стойността на meta.Incompatible other codes from CL107 за keys: H,P,О,Oo,Om,Od,Ob,Ol,Oc,E,B,X,F.I,Re,T"
          }
        },
        {
          "index": 683,
          "cells": {
            "1": "Номенклатура CL107 - промяна в ключа на записи при които ключът е бил изписан на кирилица - заменя се с еквивалент на латиница при стойности с keys: Е, О, К, Т"
          }
        },
        {
          "index": 684,
          "cells": {
            "1": "Номенклатура CL022 - добавени нови кодове: 65-226, 98-012, 98-013, 98-014"
          }
        },
        {
          "index": 685,
          "cells": {
            "1": "Номенклатура CL022 - добавени нови Meta data колони за стойности за: LOINC и SNOMED"
          }
        },
        {
          "index": 686,
          "cells": {
            "1": "Номенклатура CL022 - добавени стойности за meta.LOINC за ключове: 03-002, 03-00C, 03-011"
          }
        },
        {
          "index": 687,
          "cells": {
            "1": "Номенклатура CL024 - добавени нови кодове: 02-00A-03, 02-00A-04, 02-00A-05, 65-226-01, 65-226-02,65-226-03, 65-226-04, 65-226-05, 65-226-06, 65-226-07, 65-226-08, 65-226-09,65-226-10,  98-012-01, 98-012-02, 98-012-03, 98-012-04, 98-012-05, 98-012-06, 98-012-07, 98-012-08, 98-012-09, 98-012-0A, 98-014-01, 98-013-01, 98-013-02, 98-013-03, 98-013-04, 98-013-05, 98-013-06, 98-013-07, 98-013-08, 98-013-09, 98-013-0A, 98-013-0B, 98-013-0C, 98-013-0D, 98-013-0E, 98-013-0F, 98-013-10, 98-013-11, 98-013-12, 98-013-13, 98-013-14, 98-013-15, 98-013-16, 98-013-17"
          }
        },
        {
          "index": 688,
          "cells": {
            "1": "Номенклатура CL024 - добавени нови Meta data колони за стойности за: SNOMED"
          }
        },
        {
          "index": 689,
          "cells": {
            "1": "Номенклатура CL028 - добавени нови Meta data колони за стойности за: Description EN, Label BG, Label EN, а колоната Description се променя на Description BG"
          }
        },
        {
          "index": 690,
          "cells": {
            "1": "Създадена номенклатура CL094 за Разделение на възрастови групи"
          }
        },
        {
          "index": 691,
          "cells": {
            "1": "Номенклатура CL032 - добавени нови кодове: 4, 5"
          }
        },
        {
          "index": 692,
          "cells": {
            "1": "Номенклатура CL032 - добавени нови Meta data колони за стойности за: LOINC и SNOMED"
          }
        },
        {
          "index": 693,
          "cells": {
            "1": "Номенклатура CL032 - добавени нови Meta data колони за стойности за: Description EN, Label BG, Label EN, а колоната Description се променя на Description BG"
          }
        },
        {
          "index": 694,
          "cells": {
            "1": "Номенклатура CL032 - добавени стойности за всички нови Meta data за ключове: 1, 2, 3"
          }
        },
        {
          "index": 695,
          "cells": {
            "1": "Номенклатура CL038 - промяна в стойностите на Display Value BG и Display Value EN за кодове: 84, 85, 86 поради допусната техническа грешка в изписването на поредност на дозите"
          }
        },
        {
          "index": 696,
          "cells": {
            "1": "Версия 1.5.23"
          }
        },
        {
          "index": 697,
          "cells": {
            "1": "Номенклатура CL038 - добавен код 102 за трета доза по новите правила за HPV"
          }
        },
        {
          "index": 698,
          "cells": {
            "1": "Номенклатура CL038 - промяна в правилата за кодове 100 и 101 във връзка с новата HPV програма"
          }
        },
        {
          "index": 699,
          "cells": {
            "1": "Версия 1.5.24"
          }
        },
        {
          "index": 700,
          "cells": {
            "1": "Номенклатура CL038 - добавен код 103 за варицела 1-ви прием"
          }
        },
        {
          "index": 701,
          "cells": {
            "1": "Номенклатура CL038 - добавен код 104 за варицела 2-ри прием"
          }
        },
        {
          "index": 702,
          "cells": {
            "1": "Номенклатура CL038 - добавен код 105 за коклюш при бременни"
          }
        },
        {
          "index": 703,
          "cells": {
            "1": "Номенклатура CL038 - добавен код 106 за РСВ при бременни"
          }
        },
        {
          "index": 704,
          "cells": {
            "1": "Версия 1.5.25"
          }
        },
        {
          "index": 705,
          "cells": {
            "1": "Номенклатира CL998 - добавено съобщение за предупреждение W001 за липсваща партида от ваксина"
          }
        },
        {
          "index": 706,
          "cells": {
            "1": "Номенклатира CL998 - добавено съобщение за предупреждение W002 за недостатъчно количество"
          }
        },
        {
          "index": 707,
          "cells": {
            "1": "Номенклатура CL150 - промяна в стойността на CL011 за рядко заболяване на ред с ключ 0511000089 - МКБ кодът е коригиран от E11 на E11.9"
          }
        },
        {
          "index": 708,
          "cells": {
            "1": "Версия 1.5.26"
          }
        },
        {
          "index": 709,
          "cells": {
            "1": "Създадена номенклатура CL151 за Статус на заявка за достъп до пациентско досие през НЗИС"
          }
        },
        {
          "index": 710,
          "cells": {
            "1": "Номенклатура CL038 - промяна в Min age за код 71"
          }
        },
        {
          "index": 711,
          "cells": {
            "1": "Номенклатура CL096 - премахнат дублиран запис с код 416 - Процедури за изследване на фаринкс / Procedures for examination of pharynx"
          }
        },
        {
          "index": 712,
          "cells": {
            "1": "Номенклатура CL132 - премахната стойност за Max age при V17 тъй като дублира данните за Recurring и интервал"
          }
        },
        {
          "index": 713,
          "cells": {
            "1": "Номенклатура CL096 - промяна в етикетите на български език на кодове: 223. 225. 226. 228. 229"
          }
        },
        {
          "index": 714,
          "cells": {
            "1": "Номенклатура CL999 - добавени стойности за български език за всички кодове"
          }
        },
        {
          "index": 715,
          "cells": {
            "1": "Номенклатура CL998 - добавяне на нов код W100"
          }
        },
        {
          "index": 716,
          "cells": {
            "1": "Номенклатура CL150 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 1190800256, 1190900257, 1191200258, 1191400259, 1191800260, 1743800305"
          }
        },
        {
          "index": 717,
          "cells": {
            "1": "Номенклатура CL011 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключ: B76, B76.0, B82, B82.9, C08.9, C14.0, C17.0, C17.3, C18.0, C18.1, C25.4, C38.0, C38.4, C40.1, C40.2, C40.3, C41.0, C41.2, C41.3, C41.4, C44.0, C44.1, C44.2, C44.3, C44.4, C44.5, C44.6, C44.7, C48.0, C53.0, C53.1, C53.9, C54.1, C57.9, C62.0, C63.0, C63.2, C63.9, C68.0, C69.0, C69.1, C69.2, C69.3, C69.4, C69.5, C69.9, C72.0, C72.9, C75.0, C75.1, C75.2, C75.3, C75.5, D00.1, D00.2, D01.0, D01.1, D01.2, D01.3, D01.5, D02.0, D02.1, D04.2, D04.3, D04.4, D04.5, D04.7, D04.9, D06.0, D06.1, D06.9, D07.0, D07.1, D07.4, D07.5, D09.0, D10.9, D11.9, D12.0, D12.1, D12.7, D12.8, D12.9, D13.0, D13.1, D13.2, D13.7, D14.1, D14.2, D15.0, D15.1, D15.2, D16.1, D16.2, D16.3, D16.4, D16.6, D16.7, D16.8, D20.0, D20.1, D23.0, D23.1, D23.2, D23.3, D23.4, D23.5, D23.6, D23.7, D23.9, D28.0, D28.9, D29.0, D29.1, D29.2, D29.3, D29.4, D29.7, D29.9, D30.0, D30.1, D30.2, D30.3, D30.4, D30.7, D31.0, D31.1, D31.2, D31.3, D31.4, D31.5, D31.9, D33.0, D33.1, D33.2, D33.3, D33.4, D33.7, D35.0, D35.1, D35.2, D35.3, D35.4, D35.5, D35.6, D35.8, D35.9, D36.1, D36.7, D37.1, D37.3, D37.4, D37.5, D37.6, D38.0, D38.2, D38.3, D38.4, D40.0, D40.1, D40.7, D41.0, D41.1, D41.2, D41.3, D41.4, D41.7, D43.0, D43.1, D43.2, D43.3, D43.4, D43.7, D43.9, D44.1, D44.2, D44.3, D44.4, D44.5, D44.6, D44.7, D44.8, D44.9, D48.2, D48.3, D48.4, D48.7, E56, E56.8, I24, I24.8, M24.9, M24.90, M24.91, M24.92, M24.93, M24.94, M24.95, M24.96, M24.97, M24.98, M24.99, M25.9, M25.90, M25.91, M25.92, M25.93, M25.94, M25.95, M25.96, M25.97, M25.98, M25.99, N82.1, N82.8, P03, P03.8, P61.3, P62.3, Q43.0, Q53, R09.0, S26.0, S26.00, S27.40, S27.50, S77, S77.2, T36.0, T36.3, T36.4, T36.7, T36.9, T37.1, T38.2, T38.4, T38.5, T38.6, T39.0, T39.4, T41.5, T42.0, T42.1, T42.4, T43.0, T43.2, T43.6, T43.9, T44.0, T44.2, T45.0, T45.2, T45.5, T45.7, T46.5, T46.6, T47.5, T48.4, T48.6, T49.1, T71, T75.2, T98, T98.1, V19.5, V19.50, V19.51, V19.52, V19.53, V19.54, V19.58, V19.59, V29.0, V29.00, V29.01, V29.02, V29.03, V29.04, V29.08, V29.09, V29.1, V29.10, V29.11, V29.12, V29.13, V29.14, V29.18, V29.19, V29.5, V29.50, V29.51, V29.52, V29.53, V29.54, V29.58, V29.59, V39.0, V39.00, V39.01, V39.02, V39.03, V39.04, V39.08, V39.09, V39.1, V39.10, V39.11, V39.12, V39.13, V39.14, V39.18, V39.19, V39.4, V39.40, V39.41, V39.42, V39.43, V39.44, V39.48, V39.49, V39.5, V39.50, V39.51, V39.52, V39.53, V39.54, V39.58, V39.59, V49.0, V49.00, V49.01, V49.02, V49.03, V49.04, V49.08, V49.09, V49.4, V49.40, V49.41, V49.42, V49.43, V49.44, V49.48, V49.49, V49.5, V49.50, V49.51, V49.52, V49.53, V49.54, V49.58, V49.59, V59.0, V59.00, V59.01, V59.02, V59.03, V59.04, V59.08, V59.09, V59.1, V59.10, V59.11, V59.12, V59.13, V59.14, V59.18, V59.19, V59.4, V59.40, V59.41, V59.42, V59.43, V59.44, V59.48, V59.49, V59.5, V59.50, V59.51, V59.52, V59.53, V59.54, V59.58, V59.59, V69.4, V69.40, V69.41, V69.42, V69.43, V69.44, V69.48, V69.49, V69.5, V69.50, V69.51, V69.52, V69.53, V69.54, V69.58, V69.59, V79.0, V79.00, V79.01, V79.02, V79.03, V79.04, V79.08, V79.09, V79.1, V79.10, V79.11, V79.12, V79.13, V79.14, V79.18, V79.19, V79.4, V79.40, V79.41, V79.42, V79.43, V79.44, V79.48, V79.49, V79.5, V79.50, V79.51, V79.52, V79.53, V79.54, V79.58, V79.59, W42, W43, Y11.33, Y11.34, Y11.53, Y11.54, Y40.0, Y40.3, Y40.4, Y40.7, Y40.9, Y41.1, Y42.2, Y42.4, Y42.5, Y42.6, Y43.0, Y44.2, Y44.3, Y45.1, Y45.4, Y46.2, Y46.4, Y47.1, Y48.5, Y49.0, Y49.2, Y49.7, Y49.9, Y51.0, Y51.2, Y51.4, Y51.5, Y51.6, Y51.7, Y52.5, Y52.6, Y53.5, Y55.4, Y55.6, Y56.1, Y57.7, Y60.0, Y60.1, Y60.2, Y60.3, Y60.4, Y60.5, Y60.6, Y60.8, Y60.9, Y61.0, Y61.1, Y61.2, Y61.3, Y61.4, Y61.5, Y61.6, Y61.8, Y61.9, Y62.0, Y62.1, Y62.2, Y62.3, Y62.4, Y62.5, Y62.6, Y62.8, Y62.9, Z58.0"
          }
        },
        {
          "index": 718,
          "cells": {
            "1": "Номенклатура CL025 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 376, 435, 461, 1051, 1693, 1821"
          }
        },
        {
          "index": 719,
          "cells": {
            "1": "Номенклатура CL085 - промяна в стойността на Description, Display value BG и Display value EN на редове с ключове: 391, 392"
          }
        },
        {
          "index": 720,
          "cells": {
            "1": "Номенклатура CL150 - промяна в стойността на Description, Display value BG на редове с ключ: 1190900257"
          }
        },
        {
          "index": 721,
          "cells": {
            "1": "Номенклатура CL132 - премахната стойност за Max age при: V12, V13, V14, V15, V16 тъй като в момента излиза, че тези ваксини са приложими както в годината, в която навършва възрастта, така и в следващата година"
          }
        },
        {
          "index": 722,
          "cells": {
            "1": "Номенклатура CL132 - промяна в стойността на Description и Age при ред с ключ: A7M (променя се от 50 на 45 години)"
          }
        },
        {
          "index": 723,
          "cells": {
            "1": "Номенклатура CL132 - добавяне на нови кодове A8M45, A8M70 за мамография"
          }
        },
        {
          "index": 724,
          "cells": {
            "1": "Номенклатура CL132 - премахнати кодове: A8M50, A8M52, A8M54, A8M56, A8M58, A8M60, A8M62, A8M64, A8M66, A8M68"
          }
        },
        {
          "index": 725,
          "cells": {
            "1": "Версия 1.5.27"
          }
        },
        {
          "index": 726,
          "cells": {
            "1": "Номенклатура CL038 - спиране на кодове 19, 20, 21, 22, 65, 75, 76"
          }
        },
        {
          "index": 727,
          "cells": {
            "1": "Номенклатура CL150 - промяна в стойността на връзката с МКБ код по CL011на \"M30.1\" за запис с ключ: 1330000271"
          }
        },
        {
          "index": 728,
          "cells": {
            "1": "Номенклатура CL136 - промяна в Description, Display value BG, Display value EN за записи с ключове: 3, 4"
          }
        }
      ]
    }
  ]
};
