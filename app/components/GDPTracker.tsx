'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getGDPData, 
  getGDPPerCapitaData, 
  getCountryDetails, 
  getPopulationData,
  getGDPGrowthData,
  getInflationData,
  getUnemploymentData,
  getLifeExpectancyData,
  getLiteracyRateData,
  getTertiaryEducationData,
  getHealthExpenditureData,
  getHospitalBedsData,
  getExportsData,
  getImportsData,
  getCO2EmissionsData,
  getRenewableEnergyData,
  getInternetUsageData,
  getRAndDExpenditureData
} from '../../lib/api';
import GDPChart from './GDPChart';

interface CountryDetails {
  name: string;
  capital: string;
  region: string;
  incomeLevel: string;
  longitude: string;
  latitude: string;
}

interface IndicatorData {
  year: string;
  value: number;
}

export default function GDPTracker({ countries }: { countries: { id: string; name: string }[] }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [gdpData, setGDPData] = useState<IndicatorData[]>([]);
  const [gdpPerCapitaData, setGDPPerCapitaData] = useState<IndicatorData[]>([]);
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
  const [population, setPopulation] = useState<IndicatorData | null>(null);
  const [gdpGrowth, setGDPGrowth] = useState<IndicatorData | null>(null);
  const [inflation, setInflation] = useState<IndicatorData | null>(null);
  const [unemployment, setUnemployment] = useState<IndicatorData | null>(null);
  const [lifeExpectancy, setLifeExpectancy] = useState<IndicatorData | null>(null);
  
  // Yeni state'ler
  const [literacyRate, setLiteracyRate] = useState<IndicatorData | null>(null);
  const [tertiaryEducation, setTertiaryEducation] = useState<IndicatorData | null>(null);
  const [healthExpenditure, setHealthExpenditure] = useState<IndicatorData | null>(null);
  const [hospitalBeds, setHospitalBeds] = useState<IndicatorData | null>(null);
  const [exports, setExports] = useState<IndicatorData | null>(null);
  const [imports, setImports] = useState<IndicatorData | null>(null);
  const [co2Emissions, setCO2Emissions] = useState<IndicatorData | null>(null);
  const [renewableEnergy, setRenewableEnergy] = useState<IndicatorData | null>(null);
  const [internetUsage, setInternetUsage] = useState<IndicatorData | null>(null);
  const [rAndDExpenditure, setRAndDExpenditure] = useState<IndicatorData | null>(null);

  const handleCountryChange = async (value: string) => {
    setSelectedCountry(value);
    const [
      gdpResult, 
      gdpPerCapitaResult, 
      details, 
      pop,
      growth,
      inf,
      unemp,
      life,
      literacy,
      tertiary,
      health,
      beds,
      exportsData,
      importsData,
      co2,
      renewable,
      internet,
      rAndD
    ] = await Promise.all([
      getGDPData(value),
      getGDPPerCapitaData(value),
      getCountryDetails(value),
      getPopulationData(value),
      getGDPGrowthData(value),
      getInflationData(value),
      getUnemploymentData(value),
      getLifeExpectancyData(value),
      getLiteracyRateData(value),
      getTertiaryEducationData(value),
      getHealthExpenditureData(value),
      getHospitalBedsData(value),
      getExportsData(value),
      getImportsData(value),
      getCO2EmissionsData(value),
      getRenewableEnergyData(value),
      getInternetUsageData(value),
      getRAndDExpenditureData(value)
    ]);

    setGDPData(gdpResult);
    setGDPPerCapitaData(gdpPerCapitaResult);
    setCountryDetails(details);
    setPopulation(pop);
    setGDPGrowth(growth);
    setInflation(inf);
    setUnemployment(unemp);
    setLifeExpectancy(life);
    setLiteracyRate(literacy);
    setTertiaryEducation(tertiary);
    setHealthExpenditure(health);
    setHospitalBeds(beds);
    setExports(exportsData);
    setImports(importsData);
    setCO2Emissions(co2);
    setRenewableEnergy(renewable);
    setInternetUsage(internet);
    setRAndDExpenditure(rAndD);
  };

  const formatPopulation = (value: number | null | undefined) => {
    if (value === undefined || value === null) return 'Unknown';
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Billion`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} Million`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)} Thousand`;
    return value.toString();
  };

  const formatPercent = (value: number | null | undefined) => {
    if (value === undefined || value === null) return 'Unknown';
    return `${value.toFixed(2)}%`;
  };

  const formatDecimal = (value: number | null | undefined) => {
    if (value === undefined || value === null) return 'Unknown';
    return value.toFixed(2);
  };

  return (
    <div className="grid gap-8">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
        <div className="p-6">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">Select Country</h2>
            <p className="text-sm text-gray-500">
              Choose a country to view its economic indicators
            </p>
          </div>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem 
                  key={country.id} 
                  value={country.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedCountry && countryDetails && (
        <>
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Capital</h3>
                  <p className="text-2xl font-semibold text-gray-900">{countryDetails.capital || 'Unknown'}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Region</h3>
                  <p className="text-2xl font-semibold text-gray-900">{countryDetails.region}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Income Level</h3>
                  <p className="text-2xl font-semibold text-gray-900">{countryDetails.incomeLevel}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Population ({population?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {population ? formatPopulation(population.value) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Economic Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">GDP Growth ({gdpGrowth?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(gdpGrowth?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Inflation ({inflation?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(inflation?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Unemployment ({unemployment?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(unemployment?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Exports/GDP ({exports?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(exports?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Imports/GDP ({imports?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(imports?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">R&D/GDP ({rAndDExpenditure?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(rAndDExpenditure?.value)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Social Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Life Expectancy ({lifeExpectancy?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatDecimal(lifeExpectancy?.value)} years</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Literacy Rate ({literacyRate?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(literacyRate?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Tertiary Education ({tertiaryEducation?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(tertiaryEducation?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Health Expenditure/GDP ({healthExpenditure?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(healthExpenditure?.value)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Hospital Beds ({hospitalBeds?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatDecimal(hospitalBeds?.value)} /1000 people</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Internet Usage ({internetUsage?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(internetUsage?.value)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Environmental Indicators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">CO2 Emissions ({co2Emissions?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatDecimal(co2Emissions?.value)} metric tons/capita</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Renewable Energy ({renewableEnergy?.year})</h3>
                  <p className="text-2xl font-semibold text-gray-900">{formatPercent(renewableEnergy?.value)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <div className="flex flex-col space-y-1.5 pb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">
                    {countryDetails.name}
                  </h2>
                  <span className="rounded-full px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700">
                    Total GDP
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Total GDP values for recent years (USD)
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <GDPChart data={gdpData} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6">
              <div className="flex flex-col space-y-1.5 pb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">
                    {countryDetails.name}
                  </h2>
                  <span className="rounded-full px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700">
                    GDP per Capita
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  GDP per capita values for recent years (USD)
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <GDPChart data={gdpPerCapitaData} color="#10b981" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
