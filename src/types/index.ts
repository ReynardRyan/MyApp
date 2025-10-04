export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: { userId?: string };
  Settings: undefined;
};

export interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
}

export interface LoadingProps {
  visible: boolean;
  text?: string;
}

export enum StorageKeys {
  USER_TOKEN = 'user_token',
  USER_EMAIL = 'user_email',
}

export type HttpMethod = 'GET' | 'POST';
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}