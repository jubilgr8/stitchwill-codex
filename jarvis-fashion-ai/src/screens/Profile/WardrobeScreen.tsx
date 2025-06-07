import React from 'react';
import { View, StatusBar, FlatList } from 'react-native';
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

const ItemCard = styled.View`
  margin: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ItemImage = styled.View`
  height: 150px;
  background-color: ${({ theme }) => theme.colors.grey200};
`;

const ItemInfo = styled.View`
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemName = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemCategory = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

// Mock data
const mockItems = [
  { id: '1', name: 'Red T-Shirt', category: 'Tops' },
  { id: '2', name: 'Blue Jeans', category: 'Bottoms' },
  { id: '3', name: 'Black Dress', category: 'Dresses' },
  { id: '4', name: 'White Sneakers', category: 'Shoes' },
  { id: '5', name: 'Silver Necklace', category: 'Accessories' },
  { id: '6', name: 'Denim Jacket', category: 'Outerwear' },
];

export default function WardrobeScreen() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>My Wardrobe</HeaderTitle>
      </Header>
      
      <FlatList
        data={mockItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ItemCard>
            <ItemImage />
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemCategory>{item.category}</ItemCategory>
            </ItemInfo>
          </ItemCard>
        )}
      />
    </Container>
  );
}