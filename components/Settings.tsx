import React from 'react';
import { Settings as SettingsIcon, Save, Building2, MapPin, Calendar } from 'lucide-react';
import { AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

export const Settings: React.FC<Props> = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState<AppSettings>(settings);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleChange = (field: keyof AppSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Application Settings</h1>
        <p className="text-slate-500 mt-2">
          Configure global parameters for your carbon reports.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-800">Organization Details</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
            <input
              type="text"
              value={localSettings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="e.g. Bharat Heavy Industries Ltd."
            />
            <p className="text-xs text-slate-500 mt-2">This name will appear on all exported PDF reports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </label>
              <input
                type="text"
                value={localSettings.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Reporting Year
              </label>
              <select
                value={localSettings.reportingYear}
                onChange={(e) => handleChange('reportingYear', parseInt(e.target.value))}
                className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-sm text-slate-500">
             {isSaved ? <span className="text-green-600 font-medium flex items-center gap-1">Saved Successfully!</span> : 'Changes are applied to future reports.'}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-sm active:scale-95 transform"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 text-sm">
        <strong>Note:</strong> Data is stored locally in your browser session. Clearing your cache will reset these settings.
      </div>
    </div>
  );
};
