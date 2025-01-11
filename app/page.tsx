import { Suspense } from 'react';
import GDPTracker from '../app/components/GDPTracker';
import { getCountries } from '../lib/api';

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Ülke GDP Takip Uygulaması</h1>
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <GDPTracker countries={countries} />
        </Suspense>
      </main>
    </div>
  );
}

