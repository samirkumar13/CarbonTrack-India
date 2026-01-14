import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { EmissionsSummary } from '../types';
import { Download } from 'lucide-react';

interface Props {
  summary: EmissionsSummary;
  onExport: () => void;
}

export const Dashboard: React.FC<Props> = ({ summary, onExport }) => {
  const data = [
    { name: 'Combustion', value: summary.combustion, color: '#f97316' }, // Orange
    { name: 'Electricity', value: summary.electricity, color: '#eab308' }, // Yellow
    { name: 'Process', value: summary.process, color: '#16a34a' }, // Brand Green
    { name: 'Transport', value: summary.transportation, color: '#3b82f6' }, // Blue
  ];

  // Filter out zero values for cleaner chart
  const chartData = data.filter(d => d.value > 0);

  // Data for Bar Chart
  const barData = [
    { name: 'Scope 1', value: (summary.combustion + summary.process) / 1000, fill: '#f97316' },
    { name: 'Scope 2', value: summary.electricity / 1000, fill: '#eab308' },
    { name: 'Scope 3', value: summary.transportation / 1000, fill: '#3b82f6' },
  ];

  return (
    <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Left Side: Numbers */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-slate-400 font-medium uppercase tracking-wider text-sm mb-1">Total Carbon Footprint</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {summary.totalTonnes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xl text-slate-400 font-medium">tCO₂e</span>
              </div>
            </div>
            <button
              onClick={onExport}
              className="no-print flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 border-t border-slate-800 pt-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Combustion</p>
              <p className="text-lg font-semibold text-orange-400">
                {(summary.combustion / 1000).toFixed(2)} <span className="text-xs text-slate-500">t</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Electricity</p>
              <p className="text-lg font-semibold text-yellow-400">
                {(summary.electricity / 1000).toFixed(2)} <span className="text-xs text-slate-500">t</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Process</p>
              <p className="text-lg font-semibold text-brand-400">
                {(summary.process / 1000).toFixed(2)} <span className="text-xs text-slate-500">t</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Transport</p>
              <p className="text-lg font-semibold text-blue-400">
                {(summary.transportation / 1000).toFixed(2)} <span className="text-xs text-slate-500">t</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Charts */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          {/* Pie Chart */}
          <div className="h-40 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${(value / 1000).toFixed(2)} t`, 'Emissions']}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm italic">
                Enter data to visualize
              </div>
            )}
          </div>

          {/* Bar Chart (Scope 1 vs Scope 2 vs Scope 3) */}
          <div className="h-32 w-full border-t border-slate-800 pt-4">
            <p className="text-xs text-slate-500 mb-2 text-center">Scope 1 vs Scope 2 vs Scope 3</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={50} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
