'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GDPChart({ data }: { data: { year: string; value: number }[] }) {
  const formatValue = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toFixed(2);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 60, // Y ekseni için daha fazla alan
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="year"
          padding={{ left: 20, right: 20 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatValue}
          tick={{ fontSize: 12 }}
          width={80} // Y ekseni genişliği
          padding={{ top: 20, bottom: 20 }}
        />
        <Tooltip 
          formatter={(value: number) => [`$${formatValue(value)}`, 'GDP']}
          labelStyle={{ color: '#666' }}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

