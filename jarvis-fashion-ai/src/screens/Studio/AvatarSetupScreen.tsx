import React, { useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Button';
import AvatarView from '../../components/AvatarView';

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

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const SliderContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const SliderLabel = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const SliderText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const SliderValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const Slider = styled.View`
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export default function AvatarSetupScreen() {
  const navigation = useNavigation();
  const [measurements, setMeasurements] = useState({
    height: 170,
    weight: 65,
    shoulders: 45,
    chest: 90,
    waist: 75,
    hips: 90,
    inseam: 80,
  });
  
  const handleSave = () => {
    // Save measurements and navigate back
    navigation.goBack();
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Avatar Setup</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <AvatarContainer>
          <AvatarView size="medium" />
        </AvatarContainer>
        
        <SectionTitle>Body Measurements</SectionTitle>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Height</SliderText>
            <SliderValue>{measurements.height} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Weight</SliderText>
            <SliderValue>{measurements.weight} kg</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Shoulders</SliderText>
            <SliderValue>{measurements.shoulders} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Chest</SliderText>
            <SliderValue>{measurements.chest} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Waist</SliderText>
            <SliderValue>{measurements.waist} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Hips</SliderText>
            <SliderValue>{measurements.hips} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
        
        <SliderContainer>
          <SliderLabel>
            <SliderText>Inseam</SliderText>
            <SliderValue>{measurements.inseam} cm</SliderValue>
          </SliderLabel>
          <Slider />
        </SliderContainer>
      </Content>
      
      <ButtonContainer>
        <Button title="Save Avatar" onPress={handleSave} />
      </ButtonContainer>
    </Container>
  );
}