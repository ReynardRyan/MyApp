export const colors = {
  primary: '#007AFF',
  primaryDark: '#0056CC',
  secondary: '#5856D6',
  secondaryDark: '#3F3EA3',
  white: '#FFFFFF',
  lightGray: '#F2F2F7',
  background: '#F2F2F7',
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  textDisabled: '#C7C7CC',
  error: '#FF3B30',
  border: '#C6C6C8',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const buttonColors = {
  primary: {
    background: colors.primary,
    backgroundPressed: colors.primaryDark,
    text: colors.white,
  },
  secondary: {
    background: colors.secondary,
    backgroundPressed: colors.secondaryDark,
    text: colors.white,
  },
  outline: {
    background: 'transparent',
    backgroundPressed: colors.lightGray,
    text: colors.primary,
    border: colors.primary,
  },
  disabled: {
    background: colors.lightGray,
    text: colors.textDisabled,
  },
};

export const inputColors = {
  background: colors.white,
  border: colors.border,
  borderFocused: colors.primary,
  borderError: colors.error,
  text: colors.textPrimary,
  placeholder: colors.textSecondary,
  label: colors.textPrimary,
  error: colors.error,
};

export default colors;