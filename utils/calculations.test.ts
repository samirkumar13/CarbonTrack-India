import { describe, it, expect } from 'vitest';
import { calculateCombustionEmissions, calculateElectricityEmissions, calculateProcessEmissions, calculateTransportationEmissions } from './calculations';
import { CombustionItem, ElectricityItem, ProcessInput, TransportationItem } from '../types';

describe('Calculation Utils', () => {

    describe('calculateCombustionEmissions', () => {
        it('should calculate emissions for Diesel in Liters', () => {
            const items: CombustionItem[] = [
                { id: '1', fuelType: 'DIESEL', quantity: 1000, unit: 'LITERS' }
            ];
            // 1000 L * 0.85 kg/L = 850 kg = 0.85 Tonnes
            // 0.85 T * 0.043 TJ/T * 74100 kgCO2/TJ = 2,708.355 kg CO2
            const result = calculateCombustionEmissions(items);
            expect(result).toBeCloseTo(2708.355, 1);
        });

        it('should calculate emissions for Indian Coal in Tonnes', () => {
            const items: CombustionItem[] = [
                { id: '1', fuelType: 'INDIAN_COAL', quantity: 10, unit: 'TONNES' }
            ];
            // 10 T * 0.018 TJ/T * 96100 kgCO2/TJ = 17,298 kg CO2
            const result = calculateCombustionEmissions(items);
            expect(result).toBeCloseTo(17298, 0);
        });
    });

    describe('calculateElectricityEmissions', () => {
        it('should calculate grid emissions in kWh', () => {
            const items: ElectricityItem[] = [
                { id: '1', source: 'GRID', quantity: 1000, unit: 'KWH' }
            ];
            // 1000 kWh * 0.71 kgCO2/kWh = 710 kg CO2
            const result = calculateElectricityEmissions(items);
            expect(result).toBeCloseTo(710, 0);
        });

        it('should calculate grid emissions in MWh', () => {
            const items: ElectricityItem[] = [
                { id: '1', source: 'GRID', quantity: 1, unit: 'MWH' }
            ];
            // 1 MWh = 1000 kWh -> 710 kg CO2
            const result = calculateElectricityEmissions(items);
            expect(result).toBeCloseTo(710, 0);
        });

        it('should return 0 for renewable sources', () => {
            const items: ElectricityItem[] = [
                { id: '1', source: 'RENEWABLE', quantity: 1000, unit: 'KWH' }
            ];
            const result = calculateElectricityEmissions(items);
            expect(result).toBe(0);
        });
    });

    describe('calculateProcessEmissions', () => {
        it('should calculate process emissions without PFC', () => {
            const input: ProcessInput = {
                aluminumOutput: 10, // Tonnes
                pfcEnabled: false
            };
            // 10 * 0.45 * 3.66 = 16.47 Tonnes CO2
            // 16.47 * 1000 = 16470 kg CO2
            const result = calculateProcessEmissions(input);
            expect(result).toBeCloseTo(16470, 0);
        });

        it('should calculate process emissions with PFC', () => {
            const input: ProcessInput = {
                aluminumOutput: 10, // Tonnes
                pfcEnabled: true
            };
            // Process: 16.47 Tonnes
            // PFC: 10 * 0.6 = 6 Tonnes
            // Total: 22.47 Tonnes = 22470 kg CO2
            const result = calculateProcessEmissions(input);
            expect(result).toBeCloseTo(22470, 0);
        });
    });

    describe('calculateTransportationEmissions', () => {
        it('should calculate emissions for Diesel Truck', () => {
            const items: TransportationItem[] = [
                { id: '1', vehicleType: 'TRUCK_DIESEL', distance: 100, weight: 10 }
            ];
            // 10 Tonnes * 100 km * 0.10 kgCO2/T-km = 100 kg CO2
            const result = calculateTransportationEmissions(items);
            expect(result).toBeCloseTo(100, 0);
        });

        it('should calculate emissions for Air Freight', () => {
            const items: TransportationItem[] = [
                { id: '1', vehicleType: 'AIR_FREIGHT', distance: 1000, weight: 1 }
            ];
            // 1 Tonne * 1000 km * 0.50 kgCO2/T-km = 500 kg CO2
            const result = calculateTransportationEmissions(items);
            expect(result).toBeCloseTo(500, 0);
        });
    });
});
