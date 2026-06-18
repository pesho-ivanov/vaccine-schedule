window.VACCINE_SCHEDULE_TABLE = {
  "schema_version": 1,
  "country": "BG",
  "title": {
    "en": "Vaccine schedule for Bulgaria",
    "bg": "Имунизационен календар за България"
  },
  "columns": [
    {
      "id": "pregnancy_flu",
      "label": {
        "en": "Pregnancy",
        "bg": "Бременност"
      },
      "age_months": -3.0
    },
    {
      "id": "pregnancy_tdap",
      "label": {
        "en": "Pregnancy",
        "bg": "Бременност"
      },
      "age_months": -2.0
    },
    {
      "id": "pregnancy_rsv",
      "label": {
        "en": "Pregnancy",
        "bg": "Бременност"
      },
      "age_months": -1.0
    },
    {
      "id": "birth",
      "label": {
        "en": "Birth",
        "bg": "Раждане"
      },
      "age_months": 0.0
    },
    {
      "id": "1m",
      "label": {
        "en": "1m",
        "bg": "1m"
      },
      "age_months": 1.0
    },
    {
      "id": "2m",
      "label": {
        "en": "2m",
        "bg": "2m"
      },
      "age_months": 2.0
    },
    {
      "id": "3m",
      "label": {
        "en": "3m",
        "bg": "3m"
      },
      "age_months": 3.0
    },
    {
      "id": "4m",
      "label": {
        "en": "4m",
        "bg": "4m"
      },
      "age_months": 4.0
    },
    {
      "id": "6m",
      "label": {
        "en": "6m",
        "bg": "6m"
      },
      "age_months": 6.0
    },
    {
      "id": "7m",
      "label": {
        "en": "7m",
        "bg": "7m"
      },
      "age_months": 7.0
    },
    {
      "id": "12m",
      "label": {
        "en": "12m",
        "bg": "12m"
      },
      "age_months": 12.0
    },
    {
      "id": "13m",
      "label": {
        "en": "13m",
        "bg": "13m"
      },
      "age_months": 13.0
    },
    {
      "id": "15m",
      "label": {
        "en": "15m",
        "bg": "15m"
      },
      "age_months": 15.0
    },
    {
      "id": "16m",
      "label": {
        "en": "16m",
        "bg": "16m"
      },
      "age_months": 16.0
    },
    {
      "id": "4y",
      "label": {
        "en": "4y",
        "bg": "4y"
      },
      "age_months": 48.0
    },
    {
      "id": "6y",
      "label": {
        "en": "6y",
        "bg": "6y"
      },
      "age_months": 72.0
    },
    {
      "id": "7y",
      "label": {
        "en": "7y",
        "bg": "7y"
      },
      "age_months": 84.0
    },
    {
      "id": "10y",
      "label": {
        "en": "10y",
        "bg": "10y"
      },
      "age_months": 120.0
    },
    {
      "id": "12y",
      "label": {
        "en": "12y",
        "bg": "12y"
      },
      "age_months": 144.0
    },
    {
      "id": "14y",
      "label": {
        "en": "14y",
        "bg": "14y"
      },
      "age_months": 168.0
    },
    {
      "id": "15y",
      "label": {
        "en": "15y",
        "bg": "15y"
      },
      "age_months": 180.0
    },
    {
      "id": "17y",
      "label": {
        "en": "17y",
        "bg": "17y"
      },
      "age_months": 204.0
    },
    {
      "id": "18y",
      "label": {
        "en": "18y",
        "bg": "18y"
      },
      "age_months": 216.0
    },
    {
      "id": "25y",
      "label": {
        "en": "25y",
        "bg": "25y"
      },
      "age_months": 300.0
    },
    {
      "id": "59y",
      "label": {
        "en": "59y",
        "bg": "59y"
      },
      "age_months": 708.0
    },
    {
      "id": "60y",
      "label": {
        "en": "60y",
        "bg": "60y"
      },
      "age_months": 720.0
    },
    {
      "id": "64y",
      "label": {
        "en": "64y",
        "bg": "64y"
      },
      "age_months": 768.0
    },
    {
      "id": "gte65y",
      "label": {
        "en": "≥65y",
        "bg": "≥65y"
      },
      "age_months": 780.0
    }
  ],
  "rows": [
    {
      "vaccine": "tuberculosis",
      "group": "mandatory",
      "label": {
        "en": "tuberculosis",
        "bg": "туберкулоза"
      },
      "short": {
        "en": "TB",
        "bg": "ТБ"
      },
      "doses": [
        {
          "column": "birth",
          "through": "birth",
          "span": 1,
          "text": "BCG",
          "note": "Bacille Calmette-Guerin vaccine Administration after 48 hours from birth."
        },
        {
          "column": "7m",
          "through": "7m",
          "span": 1,
          "text": "BCG",
          "note": "Only after negative Montoux test. Проверка за белег след БЦЖ имунизацията. На децата без белег се прави проба манту. Отрицателните се имунизират с БЦЖ ваксина."
        },
        {
          "column": "7y",
          "through": "7y",
          "span": 1,
          "text": "BCG",
          "note": "Only after negative Montoux test. Проверка за белег след БЦЖ имунизацията. На децата без белег се прави проба манту. Отрицателните се имунизират с БЦЖ ваксина."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "diphtheria",
      "group": "mandatory",
      "label": {
        "en": "diphtheria",
        "bg": "дифтерия"
      },
      "short": {
        "en": "Diph",
        "bg": "Диф"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "D",
          "note": "Diphtheria toxoid, paediatric formulation Routine vaccination against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B vaccination begins at 6 weeks of age. Second and third doses are given at week 10 and week 14. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "D",
          "note": "Diphtheria toxoid, paediatric formulation"
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "D",
          "note": "Diphtheria toxoid, paediatric formulation"
        },
        {
          "column": "16m",
          "through": "16m",
          "span": 1,
          "text": "D",
          "note": "Diphtheria toxoid, paediatric formulation Not earlier than 12 months after the 3rd dose"
        },
        {
          "column": "6y",
          "through": "6y",
          "span": 1,
          "text": "D",
          "note": "Diphtheria toxoid, paediatric formulation"
        },
        {
          "column": "12y",
          "through": "12y",
          "span": 1,
          "text": "d",
          "note": "diphtheria toxoid, reduced antigen content"
        },
        {
          "column": "17y",
          "through": "17y",
          "span": 1,
          "text": "d",
          "note": "diphtheria toxoid, reduced antigen content"
        },
        {
          "column": "25y",
          "through": "gte65y",
          "span": 5,
          "text": "d",
          "note": "Subsequent Td booster every 10 years."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "tetanus",
      "group": "mandatory",
      "label": {
        "en": "tetanus",
        "bg": "тетанус"
      },
      "short": {
        "en": "Tet",
        "bg": "Тет"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid Routine vaccination against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B vaccination begins at 6 weeks of age. Second and third doses are given at week 10 and week 14. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid"
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid"
        },
        {
          "column": "16m",
          "through": "16m",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid Not earlier than 12 months after the 3rd dose"
        },
        {
          "column": "6y",
          "through": "6y",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid"
        },
        {
          "column": "12y",
          "through": "12y",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid"
        },
        {
          "column": "17y",
          "through": "17y",
          "span": 1,
          "text": "TT",
          "note": "Tetanus toxoid"
        },
        {
          "column": "25y",
          "through": "gte65y",
          "span": 5,
          "text": "TT",
          "note": "Subsequent Td booster every 10 years."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "pertussis",
      "group": "mandatory",
      "label": {
        "en": "pertussis",
        "bg": "коклюш"
      },
      "short": {
        "en": "Pert",
        "bg": "Кокл"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "acP",
          "note": "acellular pertussis vaccine, pediatric formulation Routine vaccination against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B vaccination begins at 6 weeks of age. Second and third doses are given at week 10 and week 14. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "acP",
          "note": "acellular pertussis vaccine, pediatric formulation"
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "acP",
          "note": "acellular pertussis vaccine, pediatric formulation"
        },
        {
          "column": "16m",
          "through": "16m",
          "span": 1,
          "text": "acP",
          "note": "acellular pertussis vaccine, pediatric formulation Not earlier than 12 months after the 3rd dose"
        },
        {
          "column": "6y",
          "through": "6y",
          "span": 1,
          "text": "acP",
          "note": "acellular pertussis vaccine, pediatric formulation"
        },
        {
          "column": "12y",
          "through": "12y",
          "span": 1,
          "text": "acp",
          "note": "acellular pertussis vaccine, adult/adolescent formulation"
        },
        {
          "column": "18y",
          "through": "64y",
          "span": 5,
          "text": "acp",
          "note": "acellular pertussis vaccine, adult/adolescent formulation Immunization against pertussis is given to pregnant women between the 27th and 36th weeks of pregnancy. A booster of TDaP reduced-antigen vaccine and the administration are free of charge for pregnant women and  funded by the National Health system."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "poliomyelitis",
      "group": "mandatory",
      "label": {
        "en": "poliomyelitis",
        "bg": "полиомиелит"
      },
      "short": {
        "en": "Polio",
        "bg": "Полио"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "IPV",
          "note": "poliovirus vaccine, types 1, 2, 3, inactivated Routine vaccination against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B vaccination begins at 6 weeks of age. Second and third doses are given at week 10 and week 14. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "IPV",
          "note": "poliovirus vaccine, types 1, 2, 3, inactivated"
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "IPV",
          "note": "poliovirus vaccine, types 1, 2, 3, inactivated"
        },
        {
          "column": "16m",
          "through": "16m",
          "span": 1,
          "text": "IPV",
          "note": "poliovirus vaccine, types 1, 2, 3, inactivated Not earlier than 12 months after the 3rd dose"
        },
        {
          "column": "6y",
          "through": "6y",
          "span": 1,
          "text": "IPV",
          "note": "poliovirus vaccine, types 1, 2, 3, inactivated"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "haemophilus_influenzae_type_b",
      "group": "mandatory",
      "label": {
        "en": "Haemophilus influenzae type b",
        "bg": "хемофилус инфлуенце тип Б"
      },
      "short": {
        "en": "Hib",
        "bg": "Хиб"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "Hib",
          "note": "Haemophilus influenzae type b conjugated vaccine Routine vaccination against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B vaccination begins at 6 weeks of age. Second and third doses are given at week 10 and week 14. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively. For children born to mothers vaccinated during pregnancy against pertussis, mandatory immunization against diphtheria, tetanus, pertussis, poliomyelitis, Haemophilus influenzae type B infections, and viral hepatitis type B is carried out from two months of age. Subsequent immunizations are administered no earlier than 4 weeks after the previous dose, at three and four months of age, respectively."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "Hib",
          "note": "Haemophilus influenzae type b conjugated vaccine"
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "Hib",
          "note": "Haemophilus influenzae type b conjugated vaccine"
        },
        {
          "column": "16m",
          "through": "16m",
          "span": 1,
          "text": "Hib",
          "note": "Haemophilus influenzae type b conjugated vaccine Not earlier than 12 months after the 3rd dose"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "hepatitis_b",
      "group": "mandatory",
      "label": {
        "en": "hepatitis B",
        "bg": "вирусен хепатит тип Б"
      },
      "short": {
        "en": "Hep B",
        "bg": "Хеп. Б"
      },
      "doses": [
        {
          "column": "birth",
          "through": "birth",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B During the first 24 hours after birth with a monovalent hepatitis B vaccine, regardless of the type of vaccine used to continue the immunization schedule."
        },
        {
          "column": "1m",
          "through": "1m",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B When using a monovalent vaccine, doses are administered at 1 and 6 months"
        },
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B When administering a combination vaccine containing a hepatitis B vaccine, doses are given at 2, 3 and 4 months of age."
        },
        {
          "column": "3m",
          "through": "3m",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B When administering a combination vaccine containing a hepatitis B vaccine, doses are given at 2, 3 and 4 months of age."
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B When administering a combination vaccine containing a hepatitis B vaccine, doses are given at 2, 3 and 4 months of age."
        },
        {
          "column": "6m",
          "through": "6m",
          "span": 1,
          "text": "HepB",
          "note": "Hepatitis B When using a monovalent vaccine, doses are administered at 1 and 6 months"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "pneumococcal_disease",
      "group": "mandatory",
      "label": {
        "en": "pneumococcal disease",
        "bg": "пневмококови инфекции"
      },
      "short": {
        "en": "Pneumo",
        "bg": "Пневмо"
      },
      "doses": [
        {
          "column": "2m",
          "through": "2m",
          "span": 1,
          "text": "PCV",
          "note": "Pneumococcal conjugate vaccine Routine vaccination begins at 6 weeks of age. Second dose is given at 14 weeks of age. For children born to mothers vaccinated against pertussis during pregnancy, mandatory immunization against pneumococcal infections is carried out from two months of age. Subsequent immunization is administered no earlier than 8 weeks after the first dose, respectively from four months of age."
        },
        {
          "column": "4m",
          "through": "4m",
          "span": 1,
          "text": "PCV",
          "note": "Pneumococcal conjugate vaccine Routine vaccination begins at 6 weeks of age. Second dose is given at 14 weeks of age. For children born to mothers vaccinated against pertussis during pregnancy, mandatory immunization against pneumococcal infections is carried out from two months of age. Subsequent immunization is administered no earlier than 8 weeks after the first dose, respectively from four months of age."
        },
        {
          "column": "12m",
          "through": "12m",
          "span": 1,
          "text": "PCV",
          "note": "Pneumococcal conjugate vaccine Not earlier than 6 months after the previous dose."
        },
        {
          "column": "gte65y",
          "through": "gte65y",
          "span": 1,
          "text": "PCV13",
          "note": "For people over 65 years of age, influenza and pneumococcal vaccines and administration are free of charge and funded according to the National programme."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "measles_mumps_rubella",
      "group": "mandatory",
      "label": {
        "en": "measles, mumps, rubella",
        "bg": "морбили, паротит, рубеола"
      },
      "short": {
        "en": "MMR",
        "bg": "МПР"
      },
      "doses": [
        {
          "column": "13m",
          "through": "13m",
          "span": 1,
          "text": "MMR",
          "note": "measles vaccine mumps vaccine rubella vaccine"
        },
        {
          "column": "12y",
          "through": "12y",
          "span": 1,
          "text": "MMR",
          "note": "measles vaccine mumps vaccine rubella vaccine"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "varicella",
      "group": "mandatory",
      "label": {
        "en": "varicella",
        "bg": "варицела"
      },
      "short": {
        "en": "Varicella",
        "bg": "Варицела"
      },
      "doses": [
        {
          "column": "12m",
          "through": "15m",
          "span": 3,
          "text": "VAR",
          "note": "varicella vaccine Varicella vaccine will be in place as mandatory vaccination since 1st July 2026. 2 doses scheme is recommended: 1 st dose at age 12-15 months and 2nd at 4 years of age."
        },
        {
          "column": "4y",
          "through": "4y",
          "span": 1,
          "text": "VAR",
          "note": "varicella vaccine Varicella vaccine will be in place as mandatory vaccination since 1st July 2026. 2 doses scheme is recommended: 1 st dose at age 12-15 months and 2nd at 4 years of age."
        }
      ],
      "divider_after": true
    },
    {
      "vaccine": "pert",
      "group": "recommended",
      "label": {
        "en": "Pert",
        "bg": "коклюш"
      },
      "short": {
        "en": "Pert",
        "bg": "Pert"
      },
      "doses": [
        {
          "column": "pregnancy_tdap",
          "through": "pregnancy_tdap",
          "span": 1,
          "text": "DPT"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "rsv",
      "group": "recommended",
      "label": {
        "en": "RSV",
        "bg": "респираторно-синцитиален вирус"
      },
      "short": {
        "en": "RSV",
        "bg": "РСВ"
      },
      "doses": [
        {
          "column": "pregnancy_rsv",
          "through": "pregnancy_rsv",
          "span": 1,
          "text": "RSV $",
          "muted": true
        },
        {
          "column": "18y",
          "through": "gte65y",
          "span": 6,
          "text": "RSV",
          "note": "Recommended for people aged 18 years and older. Препоръчва се за лица на възраст 18 години и повече."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "rotavirus",
      "group": "recommended",
      "label": {
        "en": "rotavirus",
        "bg": "ротавирус"
      },
      "short": {
        "en": "Rota",
        "bg": "Рота"
      },
      "doses": [
        {
          "column": "2m",
          "through": "6m",
          "span": 4,
          "text": "ROTA",
          "note": "rotavirus vaccine Active immunization of children aged 6 to 24 weeks. The vaccination course consists of two doses, with an interval of at least 4 weeks between doses. Vaccine and immunization are covered by National Program for the Prevention of Rotavirus Gastroenteritis"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "meningococcal",
      "group": "recommended",
      "label": {
        "en": "Meningococcal",
        "bg": "менингококови инфекции"
      },
      "short": {
        "en": "Men.",
        "bg": "Мен."
      },
      "doses": [
        {
          "column": "2m",
          "through": "18y",
          "span": 18,
          "text": "MCV4\nMenB",
          "note": "General recommendation: MCV4 between 6 weeks and 18 years. General recommendation: MenB between 2 months and 18 years."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "hepatitis_a",
      "group": "recommended",
      "label": {
        "en": "hepatitis A",
        "bg": "вирусен хепатит тип А"
      },
      "short": {
        "en": "Hep A",
        "bg": "Хеп. А"
      },
      "doses": [
        {
          "column": "12m",
          "through": "18y",
          "span": 13,
          "text": "HepA"
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "covid",
      "group": "recommended",
      "label": {
        "en": "COVID",
        "bg": "коронавирусна болест (COVID)"
      },
      "short": {
        "en": "COVID",
        "bg": "КОВИД"
      },
      "doses": [
        {
          "column": "6m",
          "through": "18y",
          "span": 15,
          "text": "COVID",
          "note": "Coronavirus disease (COVID-19) Priority groups for vaccination are: persons aged 60+; people with chronic diseases; immunocompromised persons (including children over 6 months); pregnant women; medical staff; users and staff of social institutions. More information: https://plusmen.bg/bg/optional/covid-19"
        },
        {
          "column": "25y",
          "through": "59y",
          "span": 2,
          "text": "COVID",
          "note": "Priority groups: people aged 60+, people with chronic diseases, immunocompromised people, pregnant women, medical staff, and users and staff of social institutions."
        },
        {
          "column": "60y",
          "through": "gte65y",
          "span": 3,
          "text": "COVID",
          "note": "Priority groups: people aged 60+, people with chronic diseases, immunocompromised people, pregnant women, medical staff, and users and staff of social institutions."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "influenza",
      "group": "recommended",
      "label": {
        "en": "influenza",
        "bg": "грип"
      },
      "short": {
        "en": "Flu",
        "bg": "Грип"
      },
      "doses": [
        {
          "column": "pregnancy_flu",
          "through": "pregnancy_flu",
          "span": 1,
          "text": "IIV3/IIV4"
        },
        {
          "column": "6m",
          "through": "17y",
          "span": 14,
          "text": "IIV3/LAIV",
          "note": "Influenza vaccine Inactivated vaccines are recommended for children over 6 months of age. LAIV is recommended for children over 24 months of age. Vaccines are not funded but vaccine administration is funded by the national health insurance."
        },
        {
          "column": "18y",
          "through": "64y",
          "span": 5,
          "text": "IIV3/IIV4",
          "note": "IIV3/IIV4 Inactivated vaccines are recommended for all people over 18 years of age. Vaccines are not funded but vaccine administration is funded by the national health insurance only for insured Inactivated vaccines are recommended for all people over 18 years of age. Vaccines are not funded but vaccine administration is funded by the national health insurance only for insured people."
        },
        {
          "column": "gte65y",
          "through": "gte65y",
          "span": 1,
          "text": "IIV3/IIV4",
          "note": "For people over 65 years of age, influenza and pneumococcal vaccines and administration are free of charge and funded according to the National programme."
        }
      ],
      "divider_after": false
    },
    {
      "vaccine": "hpv",
      "group": "recommended",
      "label": {
        "en": "HPV",
        "bg": "човешки папиломен вирус"
      },
      "short": {
        "en": "HPV",
        "bg": "ЧПВ"
      },
      "doses": [
        {
          "column": "10y",
          "through": "12y",
          "span": 2,
          "text": "HPV9 (F/M)",
          "note": "HPV9 Specific groups according to a National Programme: females 10-14 years, males 10-13 years; 2 doses scheme. Second dose: Not earlier than 6 months after the previous dose",
          "fill_background": "linear-gradient(90deg, #ffffff 0 50%, #94a3b8 50% 100%)"
        },
        {
          "column": "14y",
          "through": "18y",
          "span": 4,
          "text": "HPV9 (F)",
          "note_style": true,
          "fill_background": "linear-gradient(90deg, #ffffff 0 33.333%, #94a3b8 33.333% 66.667%, #ffffff 66.667% 100%)"
        }
      ],
      "divider_after": false
    }
  ],
  "groups": {
    "mandatory": {
      "en": "Mandatory",
      "bg": "Задължителни"
    },
    "recommended": {
      "en": "Recommended",
      "bg": "Препоръчителни"
    }
  },
  "source_links": {
    "ecdc_calendar": "https://vaccine-schedule.ecdc.europa.eu/Scheduler/ByCountry?SelectedCountryId=35&IncludeChildAgeGroup=true&IncludeChildAgeGroup=false&IncludeAdultAgeGroup=false",
    "lex_calendar": "https://lex.bg/laws/ldoc/2135504228",
    "pregnancy_vaccine": "https://plusmen.bg/bg/suggestions/pregnancy"
  },
  "generated_from": [
    "data/bg/columns.yaml",
    "data/bg/vaccines.yaml",
    "data/bg/schedule.yaml",
    "data/bg/sources.yaml",
    "data/bg/metadata.yaml"
  ]
};
