import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
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

const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const StepIndicator = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const StepDot = styled.View<{ isActive: boolean; isCompleted: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : 
    isActive ? theme.colors.grey300 : theme.colors.grey100};
  align-items: center;
  justify-content: center;
`;

const StepNumber = styled.Text<{ isActive: boolean; isCompleted: boolean }>`
  color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.white : 
    isActive ? theme.colors.text : theme.colors.grey400};
  font-weight: bold;
  font-size: 12px;
`;

const StepLine = styled.View<{ isCompleted: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : theme.colors.grey200};
  margin-top: 12px;
`;

const StepTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const StepDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ItemsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ItemCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 48%;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  overflow: hidden;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock data for items
const mockItems = {
  tops: [
    { id: 't1', imageUrl: 'https://example.com/top1.jpg' },
    { id: 't2', imageUrl: 'https://example.com/top2.jpg' },
    { id: 't3', imageUrl: 'https://example.com/top3.jpg' },
    { id: 't4', imageUrl: 'https://example.com/top4.jpg' },
  ],
  bottoms: [
    { id: 'b1', imageUrl: 'https://example.com/bottom1.jpg' },
    { id: 'b2', imageUrl: 'https://example.com/bottom2.jpg' },
    { id: 'b3', imageUrl: 'https://example.com/bottom3.jpg' },
    { id: 'b4', imageUrl: 'https://example.com/bottom4.jpg' },
  ],
  shoes: [
    { id: 's1', imageUrl: 'https://example.com/shoes1.jpg' },
    { id: 's2', imageUrl: 'https://example.com/shoes2.jpg' },
    { id: 's3', imageUrl: 'https://example.com/shoes3.jpg' },
    { id: 's4', imageUrl: 'https://example.com/shoes4.jpg' },
  ],
};

type Step = 'top' | 'bottom' | 'shoes' | 'review';

export default function MixMatchScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState<Step>('top');
  const [selectedItems, setSelectedItems] = useState({
    top: '',
    bottom: '',
    shoes: '',
  });
  
  const handleItemSelect = (id: string) => {
    setSelectedItems({
      ...selectedItems,
      [currentStep]: id,
    });
  };
  
  const handleNext = () => {
    if (currentStep === 'top') setCurrentStep('bottom');
    else if (currentStep === 'bottom') setCurrentStep('shoes');
    else if (currentStep === 'shoes') setCurrentStep('review');
  };
  
  const handleBack = () => {
    if (currentStep === 'bottom') setCurrentStep('top');
    else if (currentStep === 'shoes') setCurrentStep('bottom');
    else if (currentStep === 'review') setCurrentStep('shoes');
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'top':
        return (
          <>
            <StepTitle>Select a Top</StepTitle>
            <StepDescription>Choose a top to start building your outfit</StepDescription>
            <ItemsGrid>
              {mockItems.tops.map((item) => (
                <ItemCard 
                  key={item.id}
                  isSelected={selectedItems.top === item.id}
                  onPress={() => handleItemSelect(item.id)}
                >
                  <ItemImage 
                    source={{ uri: item.imageUrl }} 
                    resizeMode="cover" 
                  />
                </ItemCard>
              ))}
            </ItemsGrid>
          </>
        );
      case 'bottom':
        return (
          <>
            <StepTitle>Select Bottoms</StepTitle>
            <StepDescription>Choose bottoms that match your selected top</StepDescription>
            <ItemsGrid>
              {mockItems.bottoms.map((item) => (
                <ItemCard 
                  key={item.id}
                  isSelected={selectedItems.bottom === item.id}
                  onPress={() => handleItemSelect(item.id)}
                >
                  <ItemImage 
                    source={{ uri: item.imageUrl }} 
                    resizeMode="cover" 
                  />
                </ItemCard>
              ))}
            </ItemsGrid>
          </>
        );
      case 'shoes':
        return (
          <>
            <StepTitle>Select Shoes</StepTitle>
            <StepDescription>Complete your outfit with the perfect shoes</StepDescription>
            <ItemsGrid>
              {mockItems.shoes.map((item) => (
                <ItemCard 
                  key={item.id}
                  isSelected={selectedItems.shoes === item.id}
                  onPress={() => handleItemSelect(item.id)}
                >
                  <ItemImage 
                    source={{ uri: item.imageUrl }} 
                    resizeMode="cover" 
                  />
                </ItemCard>
              ))}
            </ItemsGrid>
          </>
        );
      case 'review':
        return (
          <>
            <StepTitle>Review Your Outfit</StepTitle>
            <StepDescription>Here's your complete outfit</StepDescription>
            <AvatarContainer>
              <AvatarView size="medium" />
            </AvatarContainer>
          </>
        );
    }
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Mix & Match</HeaderTitle>
      </Header>
      
      <Content>
        <StepIndicator>
          <StepDot 
            isActive={currentStep === 'top'} 
            isCompleted={currentStep !== 'top' && selectedItems.top !== ''}
          >
            <StepNumber 
              isActive={currentStep === 'top'} 
              isCompleted={currentStep !== 'top' && selectedItems.top !== ''}
            >
              1
            </StepNumber>
          </StepDot>
          <StepLine isCompleted={currentStep !== 'top' && selectedItems.top !== ''} />
          <StepDot 
            isActive={currentStep === 'bottom'} 
            isCompleted={currentStep !== 'top' && currentStep !== 'bottom' && selectedItems.bottom !== ''}
          >
            <StepNumber 
              isActive={currentStep === 'bottom'} 
              isCompleted={currentStep !== 'top' && currentStep !== 'bottom' && selectedItems.bottom !== ''}
            >
              2
            </StepNumber>
          </StepDot>
          <StepLine isCompleted={currentStep !== 'top' && currentStep !== 'bottom' && selectedItems.bottom !== ''} />
          <StepDot 
            isActive={currentStep === 'shoes'} 
            isCompleted={currentStep === 'review' && selectedItems.shoes !== ''}
          >
            <StepNumber 
              isActive={currentStep === 'shoes'} 
              isCompleted={currentStep === 'review' && selectedItems.shoes !== ''}
            >
              3
            </StepNumber>
          </StepDot>
          <StepLine isCompleted={currentStep === 'review' && selectedItems.shoes !== ''} />
          <StepDot 
            isActive={currentStep === 'review'} 
            isCompleted={false}
          >
            <StepNumber 
              isActive={currentStep === 'review'} 
              isCompleted={false}
            >
              4
            </StepNumber>
          </StepDot>
        </StepIndicator>
        
        {renderStepContent()}
      </Content>
      
      <ButtonsContainer>
        {currentStep !== 'top' && (
          <Button 
            title="Back" 
            onPress={handleBack} 
            variant="secondary"
          />
        )}
        
        {currentStep !== 'review' ? (
          <Button 
            title="Next" 
            onPress={handleNext} 
            disabled={
              (currentStep === 'top' && !selectedItems.top) ||
              (currentStep === 'bottom' && !selectedItems.bottom) ||
              (currentStep === 'shoes' && !selectedItems.shoes)
            }
          />
        ) : (
          <Button 
            title="Save Outfit" 
            onPress={() => {}} 
          />
        )}
      </ButtonsContainer>
    </Container>
  );
}