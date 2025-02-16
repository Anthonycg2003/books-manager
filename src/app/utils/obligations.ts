const allObligations = [
  { tribute: "0114022", code: "10015", month: "Enero", date: "20/Feb/25" },
  { tribute: "0510122", code: "40045", month: "Enero", date: "20/Feb/25" },
  { tribute: "0520522", code: "70305", month: "Enero", date: "20/Feb/25" },

  { tribute: "0114022", code: "30815", month: "Febrero", date: "20/Mar/25" },
  { tribute: "0510122", code: "60845", month: "Febrero", date: "20/Mar/25" },
  { tribute: "0520522", code: "71105", month: "Febrero", date: "20/Mar/25" },

  {
    tribute: "0900122",
    code: "00115", //ver codigo
    month: "Trimestre enero - marzo",
    date: "10/Abr/25",
  },
  { tribute: "0114022", code: "31615", month: "Marzo", date: "21/Abr/25" },
  { tribute: "0510122", code: "61645", month: "Marzo", date: "21/Abr/25" },
  { tribute: "0520522", code: "91905", month: "Marzo", date: "21/Abr/25" },
  {
    tribute: "0610322",
    code: "00115",
    month: "Trimestre enero - marzo",
    date: "21/Abr/25",
  },
  {
    tribute: "0820132",
    code: "80205",
    month: "Trimestre enero - marzo",
    date: "21/Abr/25",
  },

  { tribute: "0114022", code: "32415", month: "Abril", date: "20/May/25" },
  { tribute: "0510122", code: "62445", month: "Abril", date: "20/May/25" },
  { tribute: "0520522", code: "92705", month: "Abril", date: "20/May/25" },

  { tribute: "0114022", code: "33215", month: "Mayo", date: "20/Jun/25" },
  { tribute: "0510122", code: "63245", month: "Mayo", date: "20/Jun/25" },
  { tribute: "0520522", code: "93505", month: "Mayo", date: "20/Jun/25" },

  { tribute: "0114022", code: "34015", month: "Junio", date: "21/Jul/25" },
  { tribute: "0510122", code: "64045", month: "Junio", date: "21/Jul/25" },
  { tribute: "0520522", code: "94305", month: "Junio", date: "21/Jul/25" },
  {
    tribute: "0610322",
    code: "22515",
    month: "Trimestre abril - junio",
    date: "21/Jul/25",
  },
  {
    tribute: "0820132",
    code: "02605",
    month: "Trimestre abril - junio",
    date: "21/Jul/25",
  },

  { tribute: "0114022", code: "54815", month: "Julio", date: "20/Ago/25" },
  { tribute: "0510122", code: "84845", month: "Julio", date: "20/Ago/25" },
  { tribute: "05201522", code: "95105", month: "Julio", date: "20/Ago/25" },

  { tribute: "0114022", code: "55615", month: "Agosto", date: "22/Sep/25" },
  { tribute: "0510122", code: "85645", month: "Agosto", date: "22/Sep/25" },
  { tribute: "0520522", code: "15905", month: "Agosto", date: "22/Sep/25" },
  { tribute: "0710622", code: "60175", month: "Anual", date: "30/Sep/25" },

  { tribute: "0114022", code: "56415", month: "Septiembre", date: "20/Oct/25" },
  { tribute: "0510122", code: "86445", month: "Septiembre", date: "20/Oct/25" },
  { tribute: "0520522", code: "16705", month: "Septiembre", date: "20/Oct/25" },
  {
    tribute: "0610322",
    code: "44915",
    month: "Trimestre julio-septiembre",
    date: "20/Oct/25",
  },
  {
    tribute: "0820132",
    code: "05005",
    month: "Trimestre julio-septiembre",
    date: "20/Oct/25",
  },

  { tribute: "0114022", code: "57215", month: "Octubre", date: "20/Nov/25" },
  { tribute: "0510122", code: "87245", month: "Octubre", date: "20/Nov/25" },
  { tribute: "0520522", code: "17505", month: "Octubre", date: "20/Nov/25" },

  { tribute: "0114022", code: "58015", month: "Noviembre", date: "22/Dic/25" },
  { tribute: "0510122", code: "88045", month: "Noviembre", date: "22/Dic/25" },
  { tribute: "0520522", code: "18305", month: "Noviembre", date: "22/Dic/25" },

  { tribute: "0114022", code: "78815", month: "Diciembre", date: "20/Ene/26" },
  { tribute: "0510122", code: "08845", month: "Diciembre", date: "20/Ene/26" },
  { tribute: "0520522", code: "19105", month: "Diciembre", date: "20/Ene/26" },
  {
    tribute: "0610322",
    code: "47315",
    month: "Trimestre octubre - diciembre",
    date: "20/Ene/26",
  },
  {
    tribute: "0820132",
    code: "27405",
    month: "Trimestre octubre - diciembre",
    date: "20/Ene/26",
  },
  { tribute: "0530222", code: "90105", month: "Anual", date: "30/Abr/26" },
];

export function defineObligations(obligations: []) {
  const taxes = allObligations.filter((obligation) =>
    obligations.includes(obligation.tribute)
  );
  return taxes;
}
