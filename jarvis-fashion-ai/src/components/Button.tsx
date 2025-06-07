import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors, radii, spacing } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const ButtonContainer = styled.TouchableOpacity<{ variant: 'primary' | 'secondary'; disabled: boolean }>`
  background-color: ${({ variant, disabled, theme }) => 
    disabled ? theme.colors.grey300 : 
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  border-width: ${({ variant }) => (variant === 'secondary' ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ButtonText = styled.Text<{ variant: 'primary' | 'secondary'; disabled: boolean }>`
  color: ${({ variant, disabled, theme }) => 
    disabled ? theme.colors.grey500 : 
    variant === 'primary' ? theme.colors.white : theme.colors.primary};
  font-weight: 600;
  font-size: 16px;
`;

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false 
}: ButtonProps) => {
  return (
    <ButtonContainer 
      variant={variant} 
      disabled={disabled} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ButtonText variant={variant} disabled={disabled}>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;