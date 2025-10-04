import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ButtonProps } from '../types';
import { colors, buttonColors } from '../utils/colors';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button_${size}`],
        disabled || loading ? styles.buttonDisabled : styles[`button_${variant}`],
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${size}`],
            disabled || loading ? styles.textDisabled : styles[`text_${variant}`],
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button_small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  button_medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  button_large: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },

  button_primary: {
    backgroundColor: buttonColors.primary.background,
  },
  button_secondary: {
    backgroundColor: buttonColors.secondary.background,
  },
  button_outline: {
    backgroundColor: buttonColors.outline.background,
    borderWidth: 1,
    borderColor: buttonColors.outline.border,
  },
  buttonDisabled: {
    backgroundColor: buttonColors.disabled.background,
    borderColor: buttonColors.disabled.background,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  text_primary: {
    color: buttonColors.primary.text,
  },
  text_secondary: {
    color: buttonColors.secondary.text,
  },
  text_outline: {
    color: buttonColors.outline.text,
  },
  textDisabled: {
    color: buttonColors.disabled.text,
  },
});

export default Button;