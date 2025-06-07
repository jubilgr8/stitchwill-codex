import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';
import AvatarView from '../../components/AvatarView';

type TryOnDetailRouteProp = RouteProp<StudioStackParamList, 'TryOnDetail'>;
type TryOnDetailNavigationProp = StackNavigationProp<StudioStackParamList, 'TryOnDetail'>;

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

const AvatarContainer = styled.View`
  align-items: center;
  margin-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

const ItemDetails = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const ItemName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ItemBrand = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemPrice = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const ItemDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  line-height: 20px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const ActionButton = styled.TouchableOpacity`
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock item data
const mockItem = {
  id: '1',
  name: 'Classic White Shirt',
  brand: 'JARVIS Essentials',
  price: '$49.99',
  description: 'A timeless white shirt made from premium cotton. Features a slim fit design with button-down collar and single-button cuffs. Perfect for both casual and formal occasions.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['White', 'Light Blue', 'Black'],
};

export default function TryOnDetailScreen() {
  const navigation = useNavigation<TryOnDetailNavigationProp>();
  const route = useRoute<TryOnDetailRouteProp>();
  const { itemId } = route.params;
  
  // In a real app, you would fetch the item data based on the ID
  
  const handleBuy = () => {
    navigation.navigate('Checkout', { itemId });
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Try On</HeaderTitle>
      </Header>
      
      <Content>
        <AvatarContainer>
          <AvatarView size="large" />
        </AvatarContainer>
        
        <ItemDetails>
          <ItemName>{mockItem.name}</ItemName>
          <ItemBrand>{mockItem.brand}</ItemBrand>
          <ItemPrice>{mockItem.price}</ItemPrice>
          <ItemDescription>{mockItem.description}</ItemDescription>
          
          <ActionRow>
            <ActionButton>
              <MaterialCommunityIcons name="rotate-3d" size={24} color="#000" />
              <ActionText>Rotate</ActionText>
            </ActionButton>
            <ActionButton>
              <MaterialCommunityIcons name="heart-outline" size={24} color="#000" />
              <ActionText>Save</ActionText>
            </ActionButton>
            <ActionButton>
              <MaterialCommunityIcons name="share-variant" size={24} color="#000" />
              <ActionText>Share</ActionText>
            </ActionButton>
          </ActionRow>
        </ItemDetails>
      </Content>
      
      <ButtonContainer>
        <Button title="Buy Now" onPress={handleBuy} />
      </ButtonContainer>
    </Container>
  );
}