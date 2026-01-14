import { FuelType } from './types';

// Net Calorific Value (TJ/Tonne)
export const NCV: Record<FuelType, number> = {
  DIESEL: 0.043,
  NATURAL_GAS: 0.048,
  INDIAN_COAL: 0.018, // Lower than global average as per Indian context
};

// Emission Factor (kgCO2/TJ)
export const EF_FUEL: Record<FuelType, number> = {
  DIESEL: 74100,
  NATURAL_GAS: 56100,
  INDIAN_COAL: 96100,
};

// Emission Factors for Transportation (kg CO2 / Tonne-km)
// Source: approximate values based on GHG Protocol / DEFRA
export const EF_TRANSPORT: Record<string, number> = {
  TRUCK_DIESEL: 0.10, // kg CO2 per tonne-km
  VAN_DIESEL: 0.20,   // kg CO2 per tonne-km (less efficient per tonne)
  SHIP_FREIGHT: 0.01, // Very efficient
  AIR_FREIGHT: 0.50,  // Very high emissions
};

// Electricity Grid Factor (kg CO2/kWh) - CEA India
export const GRID_EMISSION_FACTOR = 0.71;

// Process Constants
export const ANODE_CONSUMPTION_RATIO = 0.45; // t Anode / t Al
export const C_TO_CO2_RATIO = 3.66; // 44/12
export const PFC_FACTOR = 0.6; // t CO2e / t Al

// Density Assumptions for Unit Conversion (approximate)
export const DENSITY = {
  DIESEL_KG_PER_LITER: 0.85,
};
