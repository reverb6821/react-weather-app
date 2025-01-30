import { create } from 'zustand';

interface CoordinateState {
  lat: number;
  lon: number;
  setCoordinates: (lat: number, lon: number) => void;
}

interface TemperatureState {
  icon: string;
  temp: number;
  setTemperature: (icon: string, temp: number) => void;
}

export const useCoordinatesStore = create<CoordinateState>((set) => ({
  lat: 0,
  lon: 0,
  setCoordinates: (lat, lon) => set({ lat, lon }),
}));

export const useTemperatureStore = create<TemperatureState>((set) => ({
  icon: '',
  temp: 0,
  setTemperature: (icon, temp) => set({ icon, temp }),
}));