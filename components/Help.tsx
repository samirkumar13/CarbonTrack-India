import React from 'react';
import { HelpCircle, ChevronDown, AlertCircle } from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
        <p className="text-slate-500 mt-2">
          Frequently asked questions and explanations about the calculation methodology.
        </p>
      </div>

      <div className="space-y-6">
        {/* FAQ Item 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-brand-600" />
            Why are "Process Emissions" separate from Fuel & Electricity?
          </h3>
          <div className="text-slate-600 space-y-3 leading-relaxed">
            <p>
              This is a common question. In the context of Aluminum production (Hall-Héroult process), carbon emissions come from three distinct sources that must be calculated separately according to the GHG Protocol:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Scope 1 (Chemical Process):</strong> The production of aluminum chemically consumes carbon anodes. The reaction <code className="bg-slate-100 px-1 rounded text-sm">2Al₂O₃ + 3C → 4Al + 3CO₂</code> generates CO₂ purely as a chemical byproduct of making the metal. This happens inside the pot and is related to the <em>amount of aluminum produced</em>, not the fuel used to heat the building.
              </li>
              <li>
                <strong>Scope 1 (Combustion):</strong> This covers the fuel (Diesel, Coal, Gas) used in boilers, furnaces, and onsite vehicles to generate heat or steam. This is energy consumption.
              </li>
              <li>
                <strong>Scope 2 (Electricity):</strong> The electrolysis process requires a massive electric current. This electricity is often bought from the grid. The emissions associated with <em>generating</em> that electricity at a power plant are counted here.
              </li>
            </ul>
            <p className="mt-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
              <strong>In summary:</strong> We add "Additional Factors" like Coal and Electricity because calculating the chemical breakdown of Alumina (Process) does not account for the energy required to run the factory lights, melt the metal, or keep the pots hot.
            </p>
          </div>
        </div>

        {/* FAQ Item 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            How do I add multiple fuel sources?
          </h3>
          <p className="text-slate-600">
            In the <strong>Calculator</strong> section, under the "Scope 1: Stationary Combustion" module, click the small <span className="text-brand-600 font-medium">+ Add Fuel Source</span> button. This allows you to list multiple fuels (e.g., Diesel for your generators and Coal for your boilers) simultaneously. The total carbon footprint will sum them up.
          </p>
        </div>

        {/* FAQ Item 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Why isn't the Export working?
          </h3>
          <p className="text-slate-600">
            The export feature utilizes your browser's native print functionality to generate a PDF. 
            <br />
            1. Click "Export".
            <br />
            2. In the print dialog that appears, look for "Destination" or "Printer".
            <br />
            3. Select <strong>"Save as PDF"</strong>.
            <br />
            4. Click Save.
            <br />
            <span className="text-sm text-slate-400 italic">If nothing happens, ensure you haven't blocked pop-ups for this site.</span>
          </p>
        </div>

        {/* Contact */}
        <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg mt-8 text-center">
          <h3 className="text-xl font-bold mb-2">Still need help?</h3>
          <p className="text-slate-400 mb-6">Our sustainability experts are available for consultation.</p>
          <a href="mailto:support@carbontrack.in" className="inline-block px-6 py-3 bg-brand-600 hover:bg-brand-500 rounded-lg font-medium transition-colors">
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  );
};
