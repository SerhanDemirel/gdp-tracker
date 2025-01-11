'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGDPData } from '../../lib/api';
import GDPChart from './GDPChart';

export default function GDPTracker({ countries }: { countries: { id: string; name: string }[] }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [gdpData, setGDPData] = useState<{ year: string; value: number }[]>([]);

  const handleCountryChange = async (value: string) => {
    setSelectedCountry(value);
    const data = await getGDPData(value);
    setGDPData(data);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ülke Seçin</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Bir ülke seçin" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedCountry && (
        <Card>
          <CardHeader>
            <CardTitle>{countries.find((c) => c.id === selectedCountry)?.name} GDP Verileri</CardTitle>
          </CardHeader>
          <CardContent>
            <GDPChart data={gdpData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

