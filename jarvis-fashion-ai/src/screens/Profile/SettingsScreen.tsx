import React from 'react';
import { View, StatusBar, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const Section = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md}px;
`;

const SettingItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const SettingText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Settings</HeaderTitle>
      </Header>
      
      <Section>
        <SectionTitle>App Settings</SectionTitle>
        
        <SettingItem>
          <SettingText>Notifications</SettingText>
          <Switch />
        </SettingItem>
        
        <SettingItem>
          <SettingText>Dark Mode</SettingText>
          <Switch />
        </SettingItem>
        
        <SettingItem>
          <SettingText>Save Items Offline</SettingText>
          <Switch />
        </SettingItem>
      </Section>
      
      <Section>
        <SectionTitle>Account</SectionTitle>
        
        <SettingItem>
          <SettingText>Edit Profile</SettingText>
        </SettingItem>
        
        <SettingItem>
          <SettingText>Change Password</SettingText>
        </SettingItem>
        
        <SettingItem>
          <SettingText>Privacy Settings</SettingText>
        </SettingItem>
      </Section>
    </Container>
  );
}