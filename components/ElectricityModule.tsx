import React from 'react';
import { Zap, Plus, Trash2 } from 'lucide-react';
import { ElectricityItem, ElectricitySource, ElectricityUnit } from '../types';
import { GRID_EMISSION_FACTOR } from '../constants';

interface Props {
  items: ElectricityItem[];
  onChange: (items: ElectricityItem[]) => void;
}

export const ElectricityModule: React.FC<Props> = ({ items, onChange }) => {
  const handleAdd = () => {
    const newItem: ElectricityItem = {
      id: crypto.randomUUID(),
      source: 'GRID',
      quantity: 0,
      unit: 'KWH'
    };
    onChange([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof ElectricityItem, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-brand-700">
          <Zap className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Scope 2: Electricity Purchased</h2>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-800 transition-colors no-print"
        >
          <Plus className="w-4 h-4" /> Add Source
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group">
            {items.length > 1 && (
              <button 
                onClick={() => handleRemove(item.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors no-print"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Source #{index + 1}</label>
                <select
                  value={item.source}
                  onChange={(e) => handleChange(item.id, 'source', e.target.value as ElectricitySource)}
                  className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                >
                  <option value="GRID">India Grid Electricity</option>
                  <option value="RENEWABLE">Renewable / Solar / Wind</option>
                </select>
                {item.source === 'GRID' && (
                  <p className="text-[10px] text-amber-600 mt-1">
                    CEA Factor: {GRID_EMISSION_FACTOR} kg CO₂/kWh
                  </p>
                )}
                {item.source === 'RENEWABLE' && (
                  <p className="text-[10px] text-brand-600 mt-1">
                    Zero emissions.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Consumption</label>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity || ''}
                    onChange={(e) => handleChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Unit</label>
                  <select
                    value={item.unit}
                    onChange={(e) => handleChange(item.id, 'unit', e.target.value as ElectricityUnit)}
                    className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="KWH">kWh</option>
                    <option value="MWH">MWh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
            No electricity sources added. <button onClick={handleAdd} className="text-brand-600 underline">Add one</button>
          </div>
        )}
      </div>
    </div>
  );
};
