import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type PaymentMethodsScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'PaymentMethods'>;

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

const PaymentCard = styled.View`
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

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const CardIcon = styled.View`
  width: 40px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: ${({ theme }) => theme.radii.xs}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

const CardType = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
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

const CardNumber = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const CardInfo = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const CardInfoItem = styled.View`
  margin-right: ${({ theme }) => theme.spacing.lg}px;
`;

const CardInfoLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const CardInfoValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
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

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: '1',
    type: 'Visa',
    number: '**** **** **** 4567',
    expiryDate: '05/26',
    name: 'Alex Johnson',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Mastercard',
    number: '**** **** **** 8901',
    expiryDate: '12/25',
    name: 'Alex Johnson',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const navigation = useNavigation<PaymentMethodsScreenNavigationProp>();
  
  const handleAddPayment = () => {
    navigation.navigate('PaymentMethodEdit', {});
  };
  
  const handleEditPayment = (paymentId: string) => {
    navigation.navigate('PaymentMethodEdit', { paymentId });
  };
  
  const renderEmptyState = () => (
    <EmptyState>
      <EmptyStateText>
        You don't have any saved payment methods yet. Add a payment method to make checkout faster.
      </EmptyStateText>
      <Button 
        title="Add Payment Method" 
        onPress={handleAddPayment} 
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
        <HeaderTitle>Payment Methods</HeaderTitle>
      </Header>
      
      <FlatList
        data={mockPaymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PaymentCard>
            <CardHeader>
              <CardIcon>
                <MaterialCommunityIcons 
                  name={item.type === 'Visa' ? 'credit-card' : 'credit-card-outline'} 
                  size={16} 
                  color="#000" 
                />
              </CardIcon>
              <CardType>{item.type}</CardType>
              {item.isDefault && (
                <DefaultBadge>
                  <DefaultText>DEFAULT</DefaultText>
                </DefaultBadge>
              )}
            </CardHeader>
            
            <CardNumber>{item.number}</CardNumber>
            
            <CardInfo>
              <CardInfoItem>
                <CardInfoLabel>Expiry Date</CardInfoLabel>
                <CardInfoValue>{item.expiryDate}</CardInfoValue>
              </CardInfoItem>
              <CardInfoItem>
                <CardInfoLabel>Name</CardInfoLabel>
                <CardInfoValue>{item.name}</CardInfoValue>
              </CardInfoItem>
            </CardInfo>
            
            <ActionRow>
              {!item.isDefault && (
                <ActionButton>
                  <ActionText>Set as Default</ActionText>
                </ActionButton>
              )}
              <ActionButton onPress={() => handleEditPayment(item.id)}>
                <ActionText>Edit</ActionText>
              </ActionButton>
              {!item.isDefault && (
                <ActionButton>
                  <ActionText>Delete</ActionText>
                </ActionButton>
              )}
            </ActionRow>
          </PaymentCard>
        )}
        ListEmptyComponent={renderEmptyState}
      />
      
      {mockPaymentMethods.length > 0 && (
        <ButtonContainer>
          <Button 
            title="Add New Payment Method" 
            onPress={handleAddPayment} 
          />
        </ButtonContainer>
      )}
    </Container>
  );
}