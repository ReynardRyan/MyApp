import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../types';

export class StorageUtil {
  static async setUserToken(token: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(StorageKeys.USER_TOKEN, token);
      return true;
    } catch (error) {
      console.error('Error saving token to storage:', error);
      return false;
    }
  }

  static async getUserToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(StorageKeys.USER_TOKEN);
      return token;
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  }

  static async removeUserToken(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(StorageKeys.USER_TOKEN);
      return true;
    } catch (error) {
      console.error('Error removing token from storage:', error);
      return false;
    }
  }
}

export default StorageUtil;