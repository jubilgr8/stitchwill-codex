import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type WardrobeItemDetailRouteProp = RouteProp<ProfileStackParamList, 'WardrobeItemDetail'>;
type WardrobeItemDetailNavigationProp = StackNavigationProp<ProfileStackParamList, 'WardrobeItemDetail'>;

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
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.grey200};
`;

const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const ItemName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const ItemCategory = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemInfo = styled.View`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  width: 100px;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const ActionButton = styled.TouchableOpacity`
  align-items: center;
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
  name: 'Blue Denim Jacket',
  category: 'Outerwear',
  size: 'M',
  color: 'Blue',
  material: 'Denim (100% Cotton)',
  purchaseDate: 'March 15, 2025',
  lastWorn: '2 weeks ago',
  timesWorn: 8,
};

export default function WardrobeItemDetailScreen() {
  const navigation = useNavigation<WardrobeItemDetailNavigationProp>();
  const route = useRoute<WardrobeItemDetailRouteProp>();
  const { itemId } = route.params;
  
  // In a real app, you would fetch the item data based on the ID
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Item Details</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <ImageContainer>
          <ItemImage 
            source={{ uri: 'https://example.com/jacket.jpg' }} 
            resizeMode="cover" 
          />
        </ImageContainer>
        
        <ItemDetails>
          <ItemName>{mockItem.name}</ItemName>
          <ItemCategory>{mockItem.category}</ItemCategory>
          
          <ItemInfo>
            <InfoRow>
              <InfoLabel>Size</InfoLabel>
              <InfoValue>{mockItem.size}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Color</InfoLabel>
              <InfoValue>{mockItem.color}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Material</InfoLabel>
              <InfoValue>{mockItem.material}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Purchased</InfoLabel>
              <InfoValue>{mockItem.purchaseDate}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Last Worn</InfoLabel>
              <InfoValue>{mockItem.lastWorn}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Times Worn</InfoLabel>
              <InfoValue>{mockItem.timesWorn}</InfoValue>
            </InfoRow>
          </ItemInfo>
          
          <ActionRow>
            <ActionButton>
              <MaterialCommunityIcons name="tshirt-crew" size={24} color="#000" />
              <ActionText>Try On</ActionText>
            </ActionButton>
            <ActionButton>
              <MaterialCommunityIcons name="share-variant" size={24} color="#000" />
              <ActionText>Share</ActionText>
            </ActionButton>
            <ActionButton>
              <MaterialCommunityIcons name="pencil" size={24} color="#000" />
              <ActionText>Edit</ActionText>
            </ActionButton>
          </ActionRow>
        </ItemDetails>
      </Content>
      
      <ButtonContainer>
        <Button title="Add to Outfit" onPress={() => {}} />
      </ButtonContainer>
    </Container>
  );
}