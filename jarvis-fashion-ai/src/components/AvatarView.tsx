import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface AvatarViewProps {
  size?: 'small' | 'medium' | 'large';
  imageUrl?: string;
}

const Container = styled.View<{ size: string }>`
  width: ${({ size }) => 
    size === 'small' ? 100 : 
    size === 'medium' ? 200 : 
    300}px;
  height: ${({ size }) => 
    size === 'small' ? 200 : 
    size === 'medium' ? 400 : 
    600}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.grey100};
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Placeholder = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey200};
`;

const PlaceholderText = styled.Text`
  color: ${({ theme }) => theme.colors.grey500};
  font-size: 16px;
  font-weight: 500;
`;

export const AvatarView = ({ size = 'medium', imageUrl }: AvatarViewProps) => {
  return (
    <Container size={size}>
      {imageUrl ? (
        <AvatarImage 
          source={{ uri: imageUrl }} 
          resizeMode="cover" 
        />
      ) : (
        <Placeholder>
          <PlaceholderText>3D Avatar</PlaceholderText>
        </Placeholder>
      )}
    </Container>
  );
};

export default AvatarView;