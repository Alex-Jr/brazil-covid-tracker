import Colors from "../constants/Colors";

const CovidService = {
  getGeneralInfo: async () => {
    const url =
      "https://us-central1-brasil-covid-tracker.cloudfunctions.net/covid?uf=BR&limit=1";
    return await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        return parseGeneralInfo(response);
      })
      .catch((err) => {
        console.warn(err);
        return {};
      });
  },
  getStatesInfo: async () => {
    const url =
      "https://us-central1-brasil-covid-tracker.cloudfunctions.net/summary";
    return await fetch(`${url}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        return parseStatesInfo(response);
      })
      .catch((err) => {
        console.warn(err);
        return [];
      });
  },
  getRegionalStatistics: async (uf, limit) => {
    const url =
      `https://us-central1-brasil-covid-tracker.cloudfunctions.net/covid?uf=${uf}&limit=${limit}`;
    return await fetch(`${url}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.warn(err);
        return [];
      });
  },
};

const parseGeneralInfo = (data) => {
  const updated = Object.keys(data)[0];

  let recovered = parseInt(data[updated].recovered);
  let totalDeaths = parseInt(data[updated].totalDeaths);
  let newCases = parseInt(data[updated].newCases);
  let active = parseInt(data[updated].totalCases) - recovered - totalDeaths

  return {
    updated: `${updated.slice(8, 10)}${updated.slice(4, 8)}${updated.slice(0, 4)}`,
    data: [
      { title: "active", quantity: active },
      { title: "recovered", quantity: recovered },
      { title: "deaths", quantity:  totalDeaths },
      { title: "newCases", quantity: newCases },
    ],
  };
};

const parseStatesInfo = (data) => {
  const regions = {
    Norte: ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
    Nordeste: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
    "Centro-Oeste": ["DF", "GO", "MT", "MS"],
    Sudeste: ["SP", "RJ", "ES", "MG"],
    Sul: ["PR", "RS", "SC"],
  };
  let regionData = [];
  let statesData = [];
  for (const [key, value] of Object.entries(regions)) {
    let sum = 0;
    value.forEach((region) => {
      cases = parseInt(data[region].totalCases);
      sum = sum + cases;
      statesData.push({ id: region, totalCases: cases });
    });
    regionData.push({ title: key, quantity: sum, color: Colors.region[key] });
  }
  regionData.sort((a, b) => a.quantity - b.quantity)
  statesData.sort((a, b) => a.totalCases - b.totalCases)
  
  return {
    regions: regionData,
    states: statesData,
  };
};

export default CovidService;
