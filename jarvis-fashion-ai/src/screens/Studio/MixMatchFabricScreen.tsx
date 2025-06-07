import React, { useState } from 'react';
import { View, StatusBar, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';

type MixMatchFabricRouteProp = RouteProp<StudioStackParamList, 'MixMatchFabric'>;
type MixMatchFabricNavigationProp = StackNavigationProp<StudioStackParamList, 'MixMatchFabric'>;

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

const FabricGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FabricCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 48%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  overflow: hidden;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const FabricSwatch = styled.View<{ color: string }>`
  height: 100px;
  background-color: ${({ color }) => color};
`;

const FabricInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FabricName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const FabricType = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const ColorSelector = styled.View`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ColorOption = styled.TouchableOpacity<{ color: string; isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ color }) => color};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock fabric data
const mockFabrics = [
  { id: 'f1', name: 'Cotton', type: 'Natural', colors: ['#FFFFFF', '#F5F5DC', '#87CEFA', '#FFB6C1'] },
  { id: 'f2', name: 'Linen', type: 'Natural', colors: ['#F5F5DC', '#D3D3D3', '#F0E68C', '#FFFFFF'] },
  { id: 'f3', name: 'Silk', type: 'Natural', colors: ['#FFD700', '#FF6347', '#4682B4', '#800080'] },
  { id: 'f4', name: 'Polyester', type: 'Synthetic', colors: ['#000000', '#808080', '#FF0000', '#0000FF'] },
  { id: 'f5', name: 'Wool', type: 'Natural', colors: ['#A52A2A', '#808080', '#000000', '#F5F5DC'] },
  { id: 'f6', name: 'Denim', type: 'Cotton blend', colors: ['#1E90FF', '#4169E1', '#000080', '#87CEFA'] },
];

export default function MixMatchFabricScreen() {
  const navigation = useNavigation<MixMatchFabricNavigationProp>();
  const route = useRoute<MixMatchFabricRouteProp>();
  const { designId } = route.params;
  
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const handleFabricSelect = (fabricId: string) => {
    setSelectedFabric(fabricId);
    setSelectedColor(null); // Reset color selection when fabric changes
  };
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleNext = () => {
    if (selectedFabric) {
      navigation.navigate('MixMatchTailor', { 
        designId, 
        fabricId: selectedFabric 
      });
    }
  };
  
  const selectedFabricData = mockFabrics.find(fabric => fabric.id === selectedFabric);
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Select Fabric</HeaderTitle>
      </Header>
      
      <Content>
        <StepIndicator>
          <StepDot isActive={false} isCompleted={true} />
          <StepDot isActive={true} isCompleted={false} />
          <StepDot isActive={false} isCompleted={false} />
          <StepDot isActive={false} isCompleted={false} />
        </StepIndicator>
        
        <StepTitle>Choose Your Fabric</StepTitle>
        
        <FabricGrid>
          {mockFabrics.map((fabric) => (
            <FabricCard 
              key={fabric.id}
              isSelected={selectedFabric === fabric.id}
              onPress={() => handleFabricSelect(fabric.id)}
            >
              <FabricSwatch color={fabric.colors[0]} />
              <FabricInfo>
                <FabricName>{fabric.name}</FabricName>
                <FabricType>{fabric.type}</FabricType>
              </FabricInfo>
            </FabricCard>
          ))}
        </FabricGrid>
        
        {selectedFabricData && (
          <>
            <StepTitle>Select Color</StepTitle>
            <ColorSelector>
              {selectedFabricData.colors.map((color, index) => (
                <ColorOption 
                  key={index}
                  color={color}
                  isSelected={selectedColor === color}
                  onPress={() => handleColorSelect(color)}
                />
              ))}
            </ColorSelector>
          </>
        )}
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
          disabled={!selectedFabric || !selectedColor}
        />
      </ButtonsContainer>
    </Container>
  );
}