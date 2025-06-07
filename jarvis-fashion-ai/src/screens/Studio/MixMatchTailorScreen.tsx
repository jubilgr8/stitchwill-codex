import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';

type MixMatchTailorRouteProp = RouteProp<StudioStackParamList, 'MixMatchTailor'>;
type MixMatchTailorNavigationProp = StackNavigationProp<StudioStackParamList, 'MixMatchTailor'>;

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

const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const StepIndicator = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StepDot = styled.View<{ isActive: boolean; isCompleted: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : 
    isActive ? theme.colors.grey400 : theme.colors.grey200};
  margin-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

const StepTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

const TailorList = styled.ScrollView`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const TailorCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  border-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey200};
  flex-direction: row;
`;

const TailorAvatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.grey200};
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const TailorInfo = styled.View`
  flex: 1;
`;

const TailorName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const TailorSpecialty = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const TailorRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

const AutoAssignCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  border-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey200};
`;

const AutoAssignText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AutoAssignDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock tailors data
const mockTailors = [
  {
    id: 't1',
    name: 'Emma Thompson',
    specialty: 'Formal Wear Specialist',
    rating: 4.9,
  },
  {
    id: 't2',
    name: 'Michael Chen',
    specialty: 'Casual & Streetwear Expert',
    rating: 4.7,
  },
  {
    id: 't3',
    name: 'Sarah Johnson',
    specialty: 'Custom Suits & Dresses',
    rating: 4.8,
  },
];

export default function MixMatchTailorScreen() {
  const navigation = useNavigation<MixMatchTailorNavigationProp>();
  const route = useRoute<MixMatchTailorRouteProp>();
  const { designId, fabricId } = route.params;
  
  const [selectedTailor, setSelectedTailor] = useState<string | 'auto'>('auto');
  
  const handleNext = () => {
    navigation.navigate('MixMatchPreview', { 
      designId, 
      fabricId,
      tailorId: selectedTailor
    });
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Select Tailor</HeaderTitle>
      </Header>
      
      <Content>
        <StepIndicator>
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={true} isCompleted={false} />
          <StepDot isActive={false} isCompleted={false} />
        </StepIndicator>
        
        <StepTitle>Choose Your Tailor</StepTitle>
        
        <AutoAssignCard 
          isSelected={selectedTailor === 'auto'}
          onPress={() => setSelectedTailor('auto')}
        >
          <AutoAssignText>Auto-Assign Tailor</AutoAssignText>
          <AutoAssignDescription>
            We'll match you with the best available tailor for your garment
          </AutoAssignDescription>
        </AutoAssignCard>
        
        <TailorList showsVerticalScrollIndicator={false}>
          {mockTailors.map((tailor) => (
            <TailorCard 
              key={tailor.id}
              isSelected={selectedTailor === tailor.id}
              onPress={() => setSelectedTailor(tailor.id)}
            >
              <TailorAvatar />
              <TailorInfo>
                <TailorName>{tailor.name}</TailorName>
                <TailorSpecialty>{tailor.specialty}</TailorSpecialty>
                <TailorRating>
                  <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                  <RatingText>{tailor.rating}</RatingText>
                </TailorRating>
              </TailorInfo>
            </TailorCard>
          ))}
        </TailorList>
      </Content>
      
      <ButtonsContainer>
        <Button 
          title="Back" 
          onPress={() => navigation.goBack()} 
          variant="secondary"
        />
        <Button 
          title="Next" 
          onPress={handleNext}
        />
      </ButtonsContainer>
    </Container>
  );
}