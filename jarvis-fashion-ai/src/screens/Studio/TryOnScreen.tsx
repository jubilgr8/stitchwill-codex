import React, { useState } from 'react';
import { View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import AvatarView from '../../components/AvatarView';
import Button from '../../components/Button';

type TryOnScreenNavigationProp = StackNavigationProp<StudioStackParamList, 'TryOn'>;

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

const SegmentedControl = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  overflow: hidden;
`;

const SegmentButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary : 'transparent'};
  align-items: center;
`;

const SegmentText = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.white : theme.colors.text};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const ItemsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ItemCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 48%;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  overflow: hidden;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 0)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

const ItemImage = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.grey200};
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock data for items
const mockItems = {
  readyToWear: [
    { id: 'r1', name: 'Classic White Shirt', imageUrl: 'https://example.com/shirt1.jpg' },
    { id: 'r2', name: 'Blue Denim Jeans', imageUrl: 'https://example.com/jeans1.jpg' },
    { id: 'r3', name: 'Black Blazer', imageUrl: 'https://example.com/blazer1.jpg' },
    { id: 'r4', name: 'Red Dress', imageUrl: 'https://example.com/dress1.jpg' },
  ],
  customDesigns: [
    { id: 'c1', name: 'Custom Suit Template', imageUrl: 'https://example.com/suit1.jpg' },
    { id: 'c2', name: 'Custom Dress Template', imageUrl: 'https://example.com/dress2.jpg' },
    { id: 'c3', name: 'Custom Jacket Template', imageUrl: 'https://example.com/jacket1.jpg' },
    { id: 'c4', name: 'Custom Pants Template', imageUrl: 'https://example.com/pants1.jpg' },
  ],
  designerSketches: [
    { id: 'd1', name: 'Summer Collection Sketch', imageUrl: 'https://example.com/sketch1.jpg' },
    { id: 'd2', name: 'Winter Collection Sketch', imageUrl: 'https://example.com/sketch2.jpg' },
    { id: 'd3', name: 'Formal Wear Sketch', imageUrl: 'https://example.com/sketch3.jpg' },
    { id: 'd4', name: 'Casual Wear Sketch', imageUrl: 'https://example.com/sketch4.jpg' },
  ],
};

type Category = 'readyToWear' | 'customDesigns' | 'designerSketches';

export default function TryOnScreen() {
  const navigation = useNavigation<TryOnScreenNavigationProp>();
  const [activeCategory, setActiveCategory] = useState<Category>('readyToWear');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const handleItemSelect = (id: string) => {
    setSelectedItem(id);
  };
  
  const handleViewDetail = () => {
    if (selectedItem) {
      navigation.navigate('TryOnDetail', { itemId: selectedItem });
    }
  };

  const handleCustomDesign = () => {
    if (selectedItem && activeCategory === 'customDesigns') {
      navigation.navigate('MixMatch');
    }
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Try On Items</HeaderTitle>
      </Header>
      
      <Content>
        <SegmentedControl>
          <SegmentButton 
            isActive={activeCategory === 'readyToWear'} 
            onPress={() => setActiveCategory('readyToWear')}
          >
            <SegmentText isActive={activeCategory === 'readyToWear'}>Ready-to-Wear</SegmentText>
          </SegmentButton>
          <SegmentButton 
            isActive={activeCategory === 'customDesigns'} 
            onPress={() => setActiveCategory('customDesigns')}
          >
            <SegmentText isActive={activeCategory === 'customDesigns'}>Custom Designs</SegmentText>
          </SegmentButton>
          <SegmentButton 
            isActive={activeCategory === 'designerSketches'} 
            onPress={() => setActiveCategory('designerSketches')}
          >
            <SegmentText isActive={activeCategory === 'designerSketches'}>Designer Sketches</SegmentText>
          </SegmentButton>
        </SegmentedControl>
        
        <AvatarContainer>
          <AvatarView size="medium" />
        </AvatarContainer>
        
        <ItemsGrid>
          {mockItems[activeCategory].map((item) => (
            <ItemCard 
              key={item.id}
              isSelected={selectedItem === item.id}
              onPress={() => handleItemSelect(item.id)}
            >
              <ItemImage />
            </ItemCard>
          ))}
        </ItemsGrid>
      </Content>
      
      <ButtonContainer>
        {activeCategory === 'readyToWear' && (
          <Button 
            title="View Details" 
            onPress={handleViewDetail} 
            disabled={!selectedItem}
          />
        )}
        {activeCategory === 'customDesigns' && (
          <Button 
            title="Customize Design" 
            onPress={handleCustomDesign} 
            disabled={!selectedItem}
          />
        )}
        {activeCategory === 'designerSketches' && (
          <Button 
            title="View Sketch Details" 
            onPress={handleViewDetail} 
            disabled={!selectedItem}
          />
        )}
      </ButtonContainer>
    </Container>
  );
}