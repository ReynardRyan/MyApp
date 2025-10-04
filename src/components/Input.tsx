import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { InputProps } from '../types';
import { colors, inputColors } from '../utils/colors';

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        placeholderTextColor={inputColors.placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: inputColors.label,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: inputColors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: inputColors.background,
    color: inputColors.text,
    minHeight: 44,
  },
  inputError: {
    borderColor: inputColors.borderError,
  },
  inputDisabled: {
    backgroundColor: colors.lightGray,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 14,
    color: inputColors.error,
    marginTop: 4,
  },
});

export default Input;