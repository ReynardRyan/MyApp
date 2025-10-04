import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  userToken: string | null;
  login: (email: string, token?: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  checkAuthStatus: () => void;
}

const base64Encode = (str: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-';
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    const a = str.charCodeAt(i++);
    const b = i < str.length ? str.charCodeAt(i++) : 0;
    const c = i < str.length ? str.charCodeAt(i++) : 0;
    
    const bitmap = (a << 16) | (b << 8) | c;
    
    result += chars.charAt((bitmap >> 18) & 63);
    result += chars.charAt((bitmap >> 12) & 63);
    result += i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
    result += i - 1 < str.length ? chars.charAt(bitmap & 63) : '=';
  }
  
  return result;
};

const generateJWTToken = (email: string): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload = {
    email: email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  };
  
  const encodedHeader = base64Encode(JSON.stringify(header));
  const encodedPayload = base64Encode(JSON.stringify(payload));
  const signature = base64Encode(`${encodedHeader}.${encodedPayload}.secret`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: true,
      userEmail: null,
      userToken: null,

      login: (email: string, token?: string) => {
        const jwtToken = token || generateJWTToken(email);
        set({
          isAuthenticated: true,
          userEmail: email,
          userToken: jwtToken,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          userEmail: null,
          userToken: null,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkAuthStatus: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: AuthState) => ({
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
        userToken: state.userToken,
      }),
    }
  )
);