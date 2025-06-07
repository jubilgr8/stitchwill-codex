import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';

interface ChatInputProps {
  onFocus: () => void;
  onMicPress: () => void;
}

const Container = styled.View`
  height: 48px;
  margin: ${({ theme }) => theme.spacing.s2}px ${({ theme }) => theme.spacing.s4}px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  flex-direction: row;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s4}px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.inputPlaceholder.fontSize}px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MicButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const ChatInput = ({ onFocus, onMicPress }: ChatInputProps) => {
  return (
    <Container>
      <Input 
        placeholder="Message StitchWill AI…"
        placeholderTextColor={theme.colors.inputPlaceholder}
        onFocus={onFocus}
        accessible={true}
        accessibilityLabel="Message StitchWill AI, text field, double-tap to edit"
        accessibilityRole="text"
      />
      <MicButton 
        onPress={onMicPress}
        accessible={true}
        accessibilityLabel="Voice input"
        accessibilityRole="button"
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <MaterialCommunityIcons 
          name="microphone" 
          size={24} 
          color={theme.colors.primary} 
        />
      </MicButton>
    </Container>
  );
};

export default ChatInput;