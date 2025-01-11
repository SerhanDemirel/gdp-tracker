import { Suspense } from 'react';
import GDPTracker from '../app/components/GDPTracker';
import { getCountries } from '../lib/api';

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8b5cf6,#6366f1)] opacity-20" />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              GDP Takip Uygulaması
            </h1>
            <p className="max-w-3xl text-lg sm:text-xl text-gray-600">
              Dünya ülkelerinin yıllara göre GDP verilerini keşfedin
            </p>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[500px]">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              </div>
            </div>
          }>
            <GDPTracker countries={countries} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
