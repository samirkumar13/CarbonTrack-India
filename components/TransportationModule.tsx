import React from 'react';
import { Truck, Plus, Trash2 } from 'lucide-react';
import { TransportationItem, VehicleType } from '../types';

interface Props {
    items: TransportationItem[];
    onChange: (items: TransportationItem[]) => void;
}

export const TransportationModule: React.FC<Props> = ({ items, onChange }) => {
    const handleAdd = () => {
        const newItem: TransportationItem = {
            id: crypto.randomUUID(),
            vehicleType: 'TRUCK_DIESEL',
            distance: 0,
            weight: 0
        };
        onChange([...items, newItem]);
    };

    const handleRemove = (id: string) => {
        onChange(items.filter(item => item.id !== id));
    };

    const handleChange = (id: string, field: keyof TransportationItem, value: any) => {
        onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-brand-700">
                    <Truck className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Scope 3: Transportation</h2>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-800 transition-colors no-print"
                >
                    <Plus className="w-4 h-4" /> Add Trip
                </button>
            </div>

            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 relative group">
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors no-print"
                            title="Remove Item"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Type</label>
                                <select
                                    value={item.vehicleType}
                                    onChange={(e) => handleChange(item.id, 'vehicleType', e.target.value as VehicleType)}
                                    className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                >
                                    <option value="TRUCK_DIESEL">Diesel Truck</option>
                                    <option value="VAN_DIESEL">Diesel Van</option>
                                    <option value="SHIP_FREIGHT">Cargo Ship</option>
                                    <option value="AIR_FREIGHT">Air Freight</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Distance (km)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={item.distance || ''}
                                    onChange={(e) => handleChange(item.id, 'distance', parseFloat(e.target.value) || 0)}
                                    className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Weight (Tonnes)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={item.weight || ''}
                                    onChange={(e) => handleChange(item.id, 'weight', parseFloat(e.target.value) || 0)}
                                    className="w-full rounded-md border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                        No transportation added. <button onClick={handleAdd} className="text-brand-600 underline">Add trip</button>
                    </div>
                )}
            </div>
        </div>
    );
};
