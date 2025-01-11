const API_BASE = 'https://api.worldbank.org/v2';

export async function getCountries() {
  const response = await fetch(`${API_BASE}/country?format=json&per_page=300`);
  const [, data] = await response.json();
  interface Country {
    id: string;
    name: string;
  }

  return data.map((country: Country) => ({
    id: country.id,
    name: country.name,
  }));
}

interface WorldBankDataItem {
  date: string;
  value: number | null;
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
}

// Temel fonksiyonlar
export async function getGDPData(countryCode: string) {
  const response = await fetch(`${API_BASE}/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`);
  const [, data] = await response.json();
  return data?.map((item: WorldBankDataItem) => ({
    year: item.date,
    value: item.value
  })) || [];
}

export async function getGDPPerCapitaData(countryCode: string) {
  const response = await fetch(`${API_BASE}/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`);
  const [, data] = await response.json();
  return data?.map((item: WorldBankDataItem) => ({
    year: item.date,
    value: item.value
  })) || [];
}

export async function getCountryDetails(countryCode: string) {
  try {
    const response = await fetch(`${API_BASE}/country/${countryCode}?format=json`);
    const [data] = await response.json();
    
    if (!data) return null;

    // API yanıtındaki değerleri güvenli bir şekilde al
    const region = typeof data.region === 'object' ? data.region?.value : data.region;
    const incomeLevel = typeof data.incomeLevel === 'object' ? data.incomeLevel?.value : data.incomeLevel;

    return {
      name: data.name || '',
      capital: data.capitalCity || '',
      region: region || '',
      incomeLevel: incomeLevel || '',
      longitude: data.longitude || '',
      latitude: data.latitude || ''
    };
  } catch (error) {
    console.error('Error fetching country details:', error);
    return null;
  }
}

// Tek değer döndüren fonksiyonlar için yardımcı fonksiyon
async function getSingleIndicatorData(countryCode: string, indicator: string) {
  const response = await fetch(`${API_BASE}/country/${countryCode}/indicator/${indicator}?format=json&per_page=1`);
  const [, data] = await response.json();
  return data?.[0] ? {
    year: data[0].date,
    value: data[0].value,
  } : null;
}

export async function getPopulationData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SP.POP.TOTL');
}

export async function getGDPGrowthData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'NY.GDP.MKTP.KD.ZG');
}

export async function getInflationData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'FP.CPI.TOTL.ZG');
}

export async function getUnemploymentData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SL.UEM.TOTL.ZS');
}

export async function getLifeExpectancyData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SP.DYN.LE00.IN');
}

export async function getLiteracyRateData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SE.ADT.LITR.ZS');
}

export async function getTertiaryEducationData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SE.TER.ENRR');
}

export async function getHealthExpenditureData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SH.XPD.CHEX.GD.ZS');
}

export async function getHospitalBedsData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'SH.MED.BEDS.ZS');
}

export async function getExportsData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'NE.EXP.GNFS.ZS');
}

export async function getImportsData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'NE.IMP.GNFS.ZS');
}

export async function getCO2EmissionsData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'EN.ATM.CO2E.PC');
}

export async function getRenewableEnergyData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'EG.FEC.RNEW.ZS');
}

export async function getInternetUsageData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'IT.NET.USER.ZS');
}

export async function getRAndDExpenditureData(countryCode: string) {
  return getSingleIndicatorData(countryCode, 'GB.XPD.RSDV.GD.ZS');
}
