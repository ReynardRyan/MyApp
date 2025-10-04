import { create } from 'zustand';
import ServiceAPI from '../services/api';

interface Province {
  id: string;
  name: string;
}

interface ProvinceState {
  provinces: Province[];
  isLoading: boolean;
  error: string | null;
  fetchProvinces: () => Promise<void>;
  refreshProvinces: () => Promise<void>;
}

const api = new ServiceAPI();

export const useProvinceStore = create<ProvinceState>((set, get) => ({
  provinces: [],
  isLoading: false,
  error: null,

  fetchProvinces: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getProvinces();
      set({ provinces: data, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to retrieve data', 
        isLoading: false 
      });
    }
  },

  refreshProvinces: async () => {
    const { fetchProvinces } = get();
    await fetchProvinces();
  },

}));