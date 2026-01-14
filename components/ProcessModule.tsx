import React from 'react';
import { Factory } from 'lucide-react';
import { ProcessInput } from '../types';

interface Props {
  data: ProcessInput;
  onChange: (data: ProcessInput) => void;
}

export const ProcessModule: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof ProcessInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-6 text-brand-700">
        <Factory className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Scope 1: Process Emissions</h2>
      </div>
      
      <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
        <strong>Industry Focus:</strong> Aluminum Production (Hall-Héroult Process).
        <br/>Calculates emissions from Carbon Anode oxidation.
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Aluminum Production Output (Tonnes)</label>
          <input
            type="number"
            min="0"
            value={data.aluminumOutput || ''}
            onChange={(e) => handleChange('aluminumOutput', parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="e.g., 500"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div>
            <span className="block font-medium text-slate-800">Include PFC Emissions</span>
            <span className="text-xs text-slate-500">Perfluorocarbons effect (+0.6 tCO₂e/t)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={data.pfcEnabled} 
              onChange={(e) => handleChange('pfcEnabled', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
