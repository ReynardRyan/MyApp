import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

import { Env } from '../constant/env';

class ServiceAPI {
  sapi: AxiosInstance;
  header: any;

  constructor() {
    this.sapi = axios.create({
      baseURL: Env.sapi
    });

    this.header = {
      headers: { 'Content-Type': 'application/json' },
    };
    
    this.sapi.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem(Env.tokenName);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async get(endpoint: string) {
    try {
      return await this.sapi.get(endpoint);
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw new Error(err.message);
    }
  }

  async post(endpoint: string, payload: any) {
    try {
      return await this.sapi.post(endpoint, payload);
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw new Error(err.message);
    }
  }
}

export default ServiceAPI;