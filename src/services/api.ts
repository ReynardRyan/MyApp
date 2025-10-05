import axios, { AxiosInstance } from 'axios';

class ServiceAPI {
  async getProvinces() {
    try {
      const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
      return response.data;
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw new Error(err.message);
    }
  }

  async getRegencies(provinceId: string) {
    try {
      const response = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw new Error(err.message);
    }
  }
}

export default ServiceAPI;