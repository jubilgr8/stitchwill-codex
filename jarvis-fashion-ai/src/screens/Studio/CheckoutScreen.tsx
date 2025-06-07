import React, { useState } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';

type CheckoutRouteProp = RouteProp<StudioStackParamList, 'Checkout'>;
type CheckoutNavigationProp = StackNavigationProp<StudioStackParamList, 'Checkout'>;

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

const Section = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemCard = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 1;
`;

const ItemImage = styled.View`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  background-color: ${({ theme }) => theme.colors.grey200};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const ItemDetails = styled.View`
  flex: 1;
`;

const ItemName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemVariant = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const ItemPrice = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const AddressCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  border-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey200};
`;

const AddressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AddressName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const AddressDefault = styled.View`
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  padding-vertical: 2px;
`;

const AddressDefaultText = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const AddressText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const AddressPhone = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const PaymentCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  border-width: ${({ isSelected }) => (isSelected ? 2 : 1)}px;
  border-color: ${({ isSelected, theme }) => 
    isSelected ? theme.colors.primary : theme.colors.grey200};
`;

const PaymentIcon = styled.View`
  width: 40px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: ${({ theme }) => theme.radii.xs}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

const PaymentDetails = styled.View`
  flex: 1;
`;

const PaymentName = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const PaymentNumber = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const TotalSection = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const TotalRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const TotalLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const TotalValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const GrandTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const GrandTotalLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const GrandTotalValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock data
const mockItem = {
  id: '1',
  name: 'Custom Tailored Suit',
  variant: 'Navy Blue, Size M',
  price: '$349.99',
};

const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    isDefault: true,
    address: '123 Fashion St, New York, NY 10001',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'Work',
    isDefault: false,
    address: '456 Style Ave, New York, NY 10002',
    phone: '+1 (555) 987-6543',
  },
];

const mockPaymentMethods = [
  {
    id: '1',
    type: 'Visa',
    number: '**** **** **** 4567',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Mastercard',
    number: '**** **** **** 8901',
    isDefault: false,
  },
];

export default function CheckoutScreen() {
  const navigation = useNavigation<CheckoutNavigationProp>();
  const route = useRoute<CheckoutRouteProp>();
  
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState(mockPaymentMethods[0].id);
  
  const handlePlaceOrder = () => {
    // In a real app, you would process the order here
    navigation.navigate('OrderProcessingTimeline', { orderId: 'ORD-2025-001' });
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Checkout</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Order Summary</SectionTitle>
          <ItemCard>
            <ItemImage />
            <ItemDetails>
              <ItemName>{mockItem.name}</ItemName>
              <ItemVariant>{mockItem.variant}</ItemVariant>
              <ItemPrice>{mockItem.price}</ItemPrice>
            </ItemDetails>
          </ItemCard>
        </Section>
        
        <Section>
          <SectionTitle>Shipping Address</SectionTitle>
          {mockAddresses.map((address) => (
            <AddressCard 
              key={address.id}
              isSelected={selectedAddress === address.id}
              onPress={() => setSelectedAddress(address.id)}
            >
              <AddressHeader>
                <AddressName>{address.name}</AddressName>
                {address.isDefault && (
                  <AddressDefault>
                    <AddressDefaultText>DEFAULT</AddressDefaultText>
                  </AddressDefault>
                )}
              </AddressHeader>
              <AddressText>{address.address}</AddressText>
              <AddressPhone>{address.phone}</AddressPhone>
            </AddressCard>
          ))}
        </Section>
        
        <Section>
          <SectionTitle>Payment Method</SectionTitle>
          {mockPaymentMethods.map((payment) => (
            <PaymentCard 
              key={payment.id}
              isSelected={selectedPayment === payment.id}
              onPress={() => setSelectedPayment(payment.id)}
            >
              <PaymentIcon>
                <MaterialCommunityIcons 
                  name={payment.type === 'Visa' ? 'credit-card' : 'credit-card-outline'} 
                  size={16} 
                  color="#000" 
                />
              </PaymentIcon>
              <PaymentDetails>
                <PaymentName>{payment.type}</PaymentName>
                <PaymentNumber>{payment.number}</PaymentNumber>
              </PaymentDetails>
              {payment.isDefault && (
                <AddressDefault>
                  <AddressDefaultText>DEFAULT</AddressDefaultText>
                </AddressDefault>
              )}
            </PaymentCard>
          ))}
        </Section>
        
        <TotalSection>
          <TotalRow>
            <TotalLabel>Subtotal</TotalLabel>
            <TotalValue>$349.99</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Shipping</TotalLabel>
            <TotalValue>$0.00</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Tax</TotalLabel>
            <TotalValue>$28.00</TotalValue>
          </TotalRow>
          <GrandTotal>
            <GrandTotalLabel>Total</GrandTotalLabel>
            <GrandTotalValue>$377.99</GrandTotalValue>
          </GrandTotal>
        </TotalSection>
      </Content>
      
      <ButtonContainer>
        <Button title="Place Order" onPress={handlePlaceOrder} />
      </ButtonContainer>
    </Container>
  );
}