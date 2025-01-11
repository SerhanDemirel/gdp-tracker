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

export async function getGDPData(countryCode: string) {
  const response = await fetch(`${API_BASE}/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=60`);
  const [, data] = await response.json();
  interface GDPData {
    date: string;
    value: number | null;
  }

  return data
    .filter((item: GDPData) => item.value !== null)
    .map((item: GDPData) => ({
      year: item.date,
      value: item.value,
    }))
    .reverse();
}

