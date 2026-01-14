import React from 'react';
import { BookOpen, TableProperties, Zap, Flame, Factory, Truck } from 'lucide-react';

export const Methodology: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Calculation Methodology</h1>
        <p className="text-slate-500 mt-2">
          Transparent breakdown of emission factors and formulas used in this calculator, compliant with Indian standards and GHG Protocol.
        </p>
      </div>

      {/* Scope 1: Combustion */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-slate-100 pb-3">
          <Flame className="w-5 h-5" />
          <h2 className="text-lg font-bold">Scope 1: Stationary Combustion</h2>
        </div>
        <p className="text-slate-600 mb-4">
          Emissions from fuel combustion are calculated based on the quantity of fuel consumed, its Net Calorific Value (NCV), and its carbon content.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg mb-6 font-mono text-sm text-slate-700 border border-slate-200">
          Formula: Quantity (Tonnes) × NCV (TJ/Tonne) × Emission Factor (kgCO₂/TJ)
        </div>

        <h3 className="font-semibold text-slate-800 mb-3">Emission Factors Used</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Fuel Type</th>
                <th className="px-4 py-3">NCV (TJ/Tonne)</th>
                <th className="px-4 py-3 rounded-r-lg">EF (kgCO₂/TJ)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">Diesel (HSD)</td>
                <td className="px-4 py-3">0.043</td>
                <td className="px-4 py-3">74,100</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">Natural Gas</td>
                <td className="px-4 py-3">0.048</td>
                <td className="px-4 py-3">56,100</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Indian Coal (Bituminous)</td>
                <td className="px-4 py-3 text-brand-700 font-bold">0.018*</td>
                <td className="px-4 py-3">96,100</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-2 italic">
            * Note: Indian Coal NCV is significantly lower than the global average (typically ~0.026 TJ/t) due to high ash content.
          </p>
        </div>
      </section>

      {/* Scope 2: Electricity */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-slate-100 pb-3">
          <Zap className="w-5 h-5" />
          <h2 className="text-lg font-bold">Scope 2: Purchased Electricity</h2>
        </div>
        <p className="text-slate-600 mb-4">
          Scope 2 emissions account for the indirect emissions from the generation of purchased electricity.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="font-semibold text-amber-900 mb-2">Grid Electricity</h3>
            <p className="text-sm text-amber-800 mb-2">
              Calculated using the specific Grid Emission Factor for India as published by the Central Electricity Authority (CEA).
            </p>
            <div className="text-2xl font-bold text-amber-700">0.71 <span className="text-sm font-normal text-amber-900">kg CO₂/kWh</span></div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-900 mb-2">Renewable Energy</h3>
            <p className="text-sm text-green-800 mb-2">
              Solar, Wind, and other renewable sources are treated as zero-emission sources for Scope 2 accounting in this tool.
            </p>
            <div className="text-2xl font-bold text-green-700">0.00 <span className="text-sm font-normal text-green-900">kg CO₂/kWh</span></div>
          </div>
        </div>
      </section>

      {/* Scope 1: Process */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-slate-100 pb-3">
          <Factory className="w-5 h-5" />
          <h2 className="text-lg font-bold">Scope 1: Process Emissions (Aluminum)</h2>
        </div>
        <p className="text-slate-600 mb-4">
          Specific to the Hall-Héroult process, calculating CO₂ emissions from the consumption of carbon anodes during electrolysis.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-slate-900">Anode Consumption</h4>
              <p className="text-sm text-slate-600">
                It is assumed that <strong>0.45 tonnes</strong> of Carbon Anode is consumed per tonne of Aluminum produced.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-slate-900">Stoichiometry</h4>
              <p className="text-sm text-slate-600">
                The reaction <code className="bg-slate-100 px-1 rounded">C + O₂ → CO₂</code> implies a molecular weight conversion ratio of <strong>44/12 (approx 3.66)</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-slate-900">Perfluorocarbons (PFCs)</h4>
              <p className="text-sm text-slate-600">
                If enabled, an additional factor of <strong>0.6 tonnes CO₂e</strong> per tonne of aluminum is added to account for "Anode Effect" emissions (CF₄ and C₂F₆).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scope 3: Transportation */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4 text-brand-700 border-b border-slate-100 pb-3">
          <Truck className="w-5 h-5" />
          <h2 className="text-lg font-bold">Scope 3: Transportation</h2>
        </div>
        <p className="text-slate-600 mb-4">
          Emissions from the transportation of goods are calculated based on the weight of cargo, distance traveled, and the mode of transport.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg mb-6 font-mono text-sm text-slate-700 border border-slate-200">
          Formula: Weight (Tonnes) × Distance (km) × Emission Factor (kgCO₂/Tonne-km)
        </div>

        <h3 className="font-semibold text-slate-800 mb-3">Emission Factors Used</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Vehicle Type</th>
                <th className="px-4 py-3 rounded-r-lg">EF (kgCO₂/Tonne-km)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">Diesel Truck</td>
                <td className="px-4 py-3">0.10</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">Diesel Van</td>
                <td className="px-4 py-3">0.20</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">Cargo Ship</td>
                <td className="px-4 py-3">0.01</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">Air Freight</td>
                <td className="px-4 py-3">0.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
