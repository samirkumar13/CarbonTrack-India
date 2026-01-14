import { CombustionItem, ElectricityItem, ProcessInput, TransportationItem } from '../types';
import { NCV, EF_FUEL, GRID_EMISSION_FACTOR, ANODE_CONSUMPTION_RATIO, C_TO_CO2_RATIO, PFC_FACTOR, DENSITY, EF_TRANSPORT } from '../constants';

export const calculateCombustionEmissions = (items: CombustionItem[]): number => {
  let totalEmissions = 0;

  items.forEach(input => {
    let quantityInTonnes = 0;

    // 1. Convert everything to Tonnes
    if (input.unit === 'TONNES') {
      quantityInTonnes = input.quantity;
    } else if (input.unit === 'KG') {
      quantityInTonnes = input.quantity / 1000;
    } else if (input.unit === 'LITERS') {
      // Only Diesel effectively uses Liters in this simplified model, 
      // but we apply density if applicable or default to 1:1 if gas (which shouldn't happen via UI)
      if (input.fuelType === 'DIESEL') {
        quantityInTonnes = (input.quantity * DENSITY.DIESEL_KG_PER_LITER) / 1000;
      } else {
        // Fallback for logic safety, though UI restricts this
        quantityInTonnes = input.quantity / 1000;
      }
    }

    // 2. Formula: Qty (T) * NCV (TJ/T) * EF (kgCO2/TJ)
    const ncv = NCV[input.fuelType];
    const ef = EF_FUEL[input.fuelType];

    totalEmissions += quantityInTonnes * ncv * ef; // Adds kg CO2
  });

  return totalEmissions;
};

export const calculateElectricityEmissions = (items: ElectricityItem[]): number => {
  let totalEmissions = 0;

  items.forEach(input => {
    if (input.source === 'RENEWABLE') return; // 0 emissions

    let quantityKWh = input.quantity;
    if (input.unit === 'MWH') {
      quantityKWh = input.quantity * 1000;
    }

    totalEmissions += quantityKWh * GRID_EMISSION_FACTOR; // Adds kg CO2
  });

  return totalEmissions;
};

export const calculateProcessEmissions = (input: ProcessInput): number => {
  // Formula: Production * 0.45 * 3.66
  const processCO2Tonnes = input.aluminumOutput * ANODE_CONSUMPTION_RATIO * C_TO_CO2_RATIO;

  // PFC Add-on
  const pfcCO2Tonnes = input.pfcEnabled ? (input.aluminumOutput * PFC_FACTOR) : 0;

  // Convert Tonnes to kg for consistent return type
  return (processCO2Tonnes + pfcCO2Tonnes) * 1000;
};

export const calculateTransportationEmissions = (items: TransportationItem[]): number => {
  let totalEmissions = 0;

  items.forEach(item => {
    const ef = EF_TRANSPORT[item.vehicleType];
    // Formula: Weight (Tonnes) * Distance (km) * EF (kgCO2/Tonne-km)
    totalEmissions += item.weight * item.distance * ef;
  });

  return totalEmissions;
};
