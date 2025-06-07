import React from 'react';
import { StatusBar, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface SafeScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
  barStyle?: 'light-content' | 'dark-content';
  style?: StyleProp<ViewStyle>;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

/**
 * A wrapper component that provides safe area insets and status bar configuration
 */
export default function SafeScreen({ 
  children, 
  edges = ['top'], 
  barStyle = 'dark-content',
  style
}: SafeScreenProps) {
  return (
    <Container edges={edges} style={style}>
      <StatusBar barStyle={barStyle} />
      {children}
    </Container>
  );
}