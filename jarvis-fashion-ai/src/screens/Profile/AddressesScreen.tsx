import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type AddressesScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Addresses'>;

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

const AddressCard = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  margin: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const AddressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AddressName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DefaultBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

const DefaultText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  font-weight: 500;
`;

const AddressText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AddressPhone = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const ActionButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const ActionText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;

const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey500};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock addresses data
const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    address: '123 Fashion St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Work',
    address: '456 Style Ave, Floor 8',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const navigation = useNavigation<AddressesScreenNavigationProp>();
  
  const handleAddAddress = () => {
    navigation.navigate('AddressEdit', {});
  };
  
  const handleEditAddress = (addressId: string) => {
    navigation.navigate('AddressEdit', { addressId });
  };
  
  const renderEmptyState = () => (
    <EmptyState>
      <EmptyStateText>
        You don't have any saved addresses yet. Add an address to make checkout faster.
      </EmptyStateText>
      <Button 
        title="Add Address" 
        onPress={handleAddAddress} 
      />
    </EmptyState>
  );
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Shipping Addresses</HeaderTitle>
      </Header>
      
      <FlatList
        data={mockAddresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AddressCard>
            <AddressHeader>
              <AddressName>{item.name}</AddressName>
              {item.isDefault && (
                <DefaultBadge>
                  <DefaultText>DEFAULT</DefaultText>
                </DefaultBadge>
              )}
            </AddressHeader>
            
            <AddressText>{item.address}</AddressText>
            <AddressText>{`${item.city}, ${item.state} ${item.zipCode}`}</AddressText>
            <AddressText>{item.country}</AddressText>
            <AddressPhone>{item.phone}</AddressPhone>
            
            <ActionRow>
              {!item.isDefault && (
                <ActionButton>
                  <ActionText>Set as Default</ActionText>
                </ActionButton>
              )}
              <ActionButton onPress={() => handleEditAddress(item.id)}>
                <ActionText>Edit</ActionText>
              </ActionButton>
              {!item.isDefault && (
                <ActionButton>
                  <ActionText>Delete</ActionText>
                </ActionButton>
              )}
            </ActionRow>
          </AddressCard>
        )}
        ListEmptyComponent={renderEmptyState}
      />
      
      {mockAddresses.length > 0 && (
        <ButtonContainer>
          <Button 
            title="Add New Address" 
            onPress={handleAddAddress} 
          />
        </ButtonContainer>
      )}
    </Container>
  );
}