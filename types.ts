export type FuelType = 'DIESEL' | 'NATURAL_GAS' | 'INDIAN_COAL';
export type FuelUnit = 'TONNES' | 'KG' | 'LITERS';
export type ElectricitySource = 'GRID' | 'RENEWABLE';
export type ElectricityUnit = 'KWH' | 'MWH';
export type VehicleType = 'TRUCK_DIESEL' | 'VAN_DIESEL' | 'SHIP_FREIGHT' | 'AIR_FREIGHT';

export type View = 'CALCULATOR' | 'METHODOLOGY' | 'SETTINGS' | 'HELP';

export interface CombustionItem {
  id: string;
  fuelType: FuelType;
  quantity: number;
  unit: FuelUnit;
}

export interface ElectricityItem {
  id: string;
  source: ElectricitySource;
  quantity: number;
  unit: ElectricityUnit;
}

export interface TransportationItem {
  id: string;
  vehicleType: VehicleType;
  distance: number; // km
  weight: number; // Tonnes (for freight)
}

export interface ProcessInput {
  aluminumOutput: number; // in Tonnes
  pfcEnabled: boolean;
}

export interface EmissionsSummary {
  combustion: number; // kg CO2
  electricity: number; // kg CO2
  process: number; // kg CO2
  transportation: number; // kg CO2
  total: number; // kg CO2
  totalTonnes: number; // Tonnes CO2e
}

export interface AppSettings {
  companyName: string;
  reportingYear: number;
  location: string;
}
