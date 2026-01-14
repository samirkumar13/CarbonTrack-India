import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CombustionModule } from './components/CombustionModule';
import { ElectricityModule } from './components/ElectricityModule';
import { ProcessModule } from './components/ProcessModule';
import { TransportationModule } from './components/TransportationModule';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { calculateCombustionEmissions, calculateElectricityEmissions, calculateProcessEmissions, calculateTransportationEmissions } from './utils/calculations';
import { CombustionItem, ElectricityItem, ProcessInput, EmissionsSummary, AppSettings, View, TransportationItem } from './types';
import { RotateCcw } from 'lucide-react';

// Lazy load non-critical components
const Methodology = React.lazy(() => import('./components/Methodology').then(module => ({ default: module.Methodology })));
const Settings = React.lazy(() => import('./components/Settings').then(module => ({ default: module.Settings })));
const Help = React.lazy(() => import('./components/Help').then(module => ({ default: module.Help })));

const App: React.FC = () => {
  // --- View State ---
  const [currentView, setCurrentView] = useState<View>('CALCULATOR');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Data State ---
  const defaultSettings: AppSettings = {
    companyName: 'My Industrial Co.',
    reportingYear: new Date().getFullYear(),
    location: 'India'
  };

  const defaultCombustionItems: CombustionItem[] = [
    { id: '1', fuelType: 'DIESEL', quantity: 0, unit: 'LITERS' }
  ];

  const defaultElectricityItems: ElectricityItem[] = [
    { id: '1', source: 'GRID', quantity: 0, unit: 'KWH' }
  ];

  const defaultProcessData: ProcessInput = {
    aluminumOutput: 0,
    pfcEnabled: false
  };

  const defaultTransportationItems: TransportationItem[] = [];

  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [combustionItems, setCombustionItems] = useState<CombustionItem[]>(defaultCombustionItems);
  const [electricityItems, setElectricityItems] = useState<ElectricityItem[]>(defaultElectricityItems);
  const [processData, setProcessData] = useState<ProcessInput>(defaultProcessData);
  const [transportationItems, setTransportationItems] = useState<TransportationItem[]>(defaultTransportationItems);

  const [summary, setSummary] = useState<EmissionsSummary>({
    combustion: 0,
    electricity: 0,
    process: 0,
    transportation: 0,
    total: 0,
    totalTonnes: 0
  });

  // --- Effects ---

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedSettings = localStorage.getItem('carbonTrack_settings');
        const savedCombustion = localStorage.getItem('carbonTrack_combustion');
        const savedElectricity = localStorage.getItem('carbonTrack_electricity');
        const savedProcess = localStorage.getItem('carbonTrack_process');
        const savedTransportation = localStorage.getItem('carbonTrack_transportation');

        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedCombustion) setCombustionItems(JSON.parse(savedCombustion));
        if (savedElectricity) setElectricityItems(JSON.parse(savedElectricity));
        if (savedProcess) setProcessData(JSON.parse(savedProcess));
        if (savedTransportation) setTransportationItems(JSON.parse(savedTransportation));
      } catch (error) {
        console.error("Failed to load data from localStorage", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load
    localStorage.setItem('carbonTrack_settings', JSON.stringify(settings));
    localStorage.setItem('carbonTrack_combustion', JSON.stringify(combustionItems));
    localStorage.setItem('carbonTrack_electricity', JSON.stringify(electricityItems));
    localStorage.setItem('carbonTrack_process', JSON.stringify(processData));
    localStorage.setItem('carbonTrack_transportation', JSON.stringify(transportationItems));
  }, [settings, combustionItems, electricityItems, processData, transportationItems, isLoaded]);


  // Memoize calculations to avoid re-calculating on every render if inputs haven't changed
  const calculatedSummary = useMemo(() => {
    const combustion = calculateCombustionEmissions(combustionItems);
    const electricity = calculateElectricityEmissions(electricityItems);
    const process = calculateProcessEmissions(processData);
    const transportation = calculateTransportationEmissions(transportationItems);
    const total = combustion + electricity + process + transportation;

    return {
      combustion,
      electricity,
      process,
      transportation,
      total,
      totalTonnes: total / 1000
    };
  }, [combustionItems, electricityItems, processData, transportationItems]);

  useEffect(() => {
    setSummary(calculatedSummary);
  }, [calculatedSummary]);

  // --- Handlers ---
  const handleExport = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setSettings(defaultSettings);
      setCombustionItems(defaultCombustionItems);
      setElectricityItems(defaultElectricityItems);
      setProcessData(defaultProcessData);
      setTransportationItems(defaultTransportationItems);
      localStorage.clear();
    }
  };

  const handleNavChange = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (!isLoaded) return null; // Or a loading spinner

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar currentView={currentView} onViewChange={handleNavChange} />

      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        currentView={currentView}
        onViewChange={handleNavChange}
      />

      <main className="flex-1 p-4 lg:p-10 mt-14 lg:mt-0 print-layout">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Print Report Header */}
          <div className="hidden print-only mb-8 text-center border-b border-slate-300 pb-4">
            <h1 className="text-3xl font-bold text-slate-900">Carbon Emission Report</h1>
            <p className="text-xl font-medium text-slate-700 mt-1">{settings.companyName}</p>
            <div className="flex justify-center gap-4 text-sm text-slate-500 mt-2">
              <span>Year: {settings.reportingYear}</span>
              <span>Location: {settings.location}</span>
              <span>Date: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {currentView === 'CALCULATOR' && (
            <>
              <div className="mb-6 hidden lg:flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Calculator</h1>
                  <p className="text-slate-500">Estimate your industrial carbon footprint based on Indian emission standards.</p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                  title="Reset all data"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Data
                </button>
              </div>

              <Dashboard summary={summary} onExport={handleExport} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <CombustionModule items={combustionItems} onChange={setCombustionItems} />
                <ProcessModule data={processData} onChange={setProcessData} />
                <ElectricityModule items={electricityItems} onChange={setElectricityItems} />
                <TransportationModule items={transportationItems} onChange={setTransportationItems} />
              </div>
            </>
          )}

          <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            {currentView === 'METHODOLOGY' && <Methodology />}

            {currentView === 'SETTINGS' && (
              <Settings settings={settings} onSave={setSettings} />
            )}

            {currentView === 'HELP' && <Help />}
          </Suspense>

          {/* Footer */}
          <div className="mt-12 text-center text-xs text-slate-400 pb-8 no-print">
            <p>© {new Date().getFullYear()} CarbonTrack India. All rights reserved.</p>
            <p className="mt-1">
              Methodology compliant with GHG Protocol & CEA (Central Electricity Authority) guidelines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
