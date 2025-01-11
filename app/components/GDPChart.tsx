'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function GDPChart({ 
  data,
  color = '#6366f1' // Varsayılan renk
}: { 
  data: { year: string; value: number }[];
  color?: string;
}) {
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
          left: 60,
          bottom: 20
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="year"
          padding={{ left: 20, right: 20 }}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          stroke="#d1d5db"
          tickLine={{ stroke: '#d1d5db' }}
        />
        <YAxis
          tickFormatter={formatValue}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          width={80}
          padding={{ top: 20, bottom: 20 }}
          stroke="#d1d5db"
          tickLine={{ stroke: '#d1d5db' }}
        />
        <Tooltip 
          formatter={(value: number) => [`$${formatValue(value)}`, 'GDP']}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: '0.75rem',
            padding: '1rem',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}
          labelStyle={{ 
            color: '#111827',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}
          itemStyle={{ 
            color: color,
            fontWeight: '500'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ 
            r: 3,
            fill: color,
            strokeWidth: 2,
            stroke: '#ffffff'
          }}
          activeDot={{ 
            r: 5,
            fill: color,
            strokeWidth: 2,
            stroke: '#ffffff'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
