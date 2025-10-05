import { create } from 'zustand';
import ServiceAPI from '../services/api';

interface Regency {
  id: string;
  name: string;
  province_id: string;
}

interface RegencyState {
  regencies: Regency[];
  isLoading: boolean;
  error: string | null;
  currentProvinceId: string | null;
  currentProvinceName: string | null;
  fetchRegencies: (provinceId: string, provinceName: string) => Promise<void>;
  clearRegencies: () => void;
}

const api = new ServiceAPI();

export const useRegencyStore = create<RegencyState>((set, get) => ({
  regencies: [],
  isLoading: false,
  error: null,
  currentProvinceId: null,
  currentProvinceName: null,

  fetchRegencies: async (provinceId: string, provinceName: string) => {
    set({ 
      isLoading: true, 
      error: null, 
      currentProvinceId: provinceId,
      currentProvinceName: provinceName 
    });
    try {
      const data = await api.getRegencies(provinceId);
      set({ regencies: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to retrieve data', 
        isLoading: false 
      });
    }
  },

  clearRegencies: () => {
    set({ 
      regencies: [], 
      currentProvinceId: null, 
      currentProvinceName: null,
      error: null 
    });
  },

}));