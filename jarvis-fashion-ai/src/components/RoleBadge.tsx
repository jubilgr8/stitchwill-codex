import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RoleBadgeProps {
  role: 'designer' | 'model' | 'stylist' | 'customer' | 'tailor' | 'retailer';
  size?: 'small' | 'medium';
  icon?: string;
}

const BadgeContainer = styled.View<{ size: 'small' | 'medium'; role: string }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ role }) => 
    role === 'designer' ? '#FCE4EC' : 
    role === 'tailor' ? '#E3F2FD' : 
    role === 'retailer' ? '#E8F5E9' : 
    role === 'customer' ? '#FFF3E0' : 
    role === 'model' ? '#F3E5F5' :
    role === 'stylist' ? '#E0F7FA' :
    '#F5F5F5'};
  border-radius: ${({ theme, size }) => 
    size === 'small' ? theme.radii.sm : theme.radii.md}px;
  padding-vertical: ${({ theme, size }) => 
    size === 'small' ? theme.spacing.xs : theme.spacing.sm}px;
  padding-horizontal: ${({ theme, size }) => 
    size === 'small' ? theme.spacing.sm : theme.spacing.md}px;
`;

const BadgeText = styled.Text<{ size: 'small' | 'medium'; role: string }>`
  font-size: ${({ size }) => size === 'small' ? 12 : 14}px;
  font-weight: 500;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ role }) => 
    role === 'designer' ? '#C2185B' : 
    role === 'tailor' ? '#1976D2' : 
    role === 'retailer' ? '#388E3C' : 
    role === 'customer' ? '#E64A19' : 
    role === 'model' ? '#7B1FA2' :
    role === 'stylist' ? '#0097A7' :
    '#616161'};
`;

const getRoleIcon = (role: string, customIcon?: string) => {
  if (customIcon) return customIcon;
  
  switch (role) {
    case 'designer':
      return 'pencil';
    case 'model':
      return 'human-female';
    case 'stylist':
      return 'tshirt-crew';
    case 'customer':
      return 'account';
    case 'tailor':
      return 'needle';
    case 'retailer':
      return 'store';
    default:
      return 'account';
  }
};

export const RoleBadge = ({ role, size = 'small', icon }: RoleBadgeProps) => {
  const iconName = getRoleIcon(role, icon);
  const roleColor = 
    role === 'designer' ? '#C2185B' : 
    role === 'tailor' ? '#1976D2' : 
    role === 'retailer' ? '#388E3C' : 
    role === 'customer' ? '#E64A19' : 
    role === 'model' ? '#7B1FA2' :
    role === 'stylist' ? '#0097A7' :
    '#616161';
  
  return (
    <BadgeContainer size={size} role={role}>
      <MaterialCommunityIcons 
        name={iconName} 
        size={size === 'small' ? 12 : 16} 
        color={roleColor} 
      />
      <BadgeText size={size} role={role}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </BadgeText>
    </BadgeContainer>
  );
};

export default RoleBadge;