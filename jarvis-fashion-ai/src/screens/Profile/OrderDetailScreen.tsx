import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import Button from '../../components/Button';

type OrderDetailRouteProp = RouteProp<ProfileStackParamList, 'OrderDetail'>;
type OrderDetailNavigationProp = StackNavigationProp<ProfileStackParamList, 'OrderDetail'>;

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

const OrderInfo = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const TimelineContainer = styled.View`
  padding-left: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineItem = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineDot = styled.View<{ isActive: boolean; isCompleted: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : 
    isActive ? theme.colors.grey400 : theme.colors.grey200};
  margin-top: 2px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const TimelineConnector = styled.View<{ isLast: boolean; isCompleted: boolean }>`
  position: absolute;
  left: 7px;
  top: 16px;
  bottom: ${({ isLast }) => (isLast ? 0 : -16)}px;
  width: 2px;
  background-color: ${({ isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : theme.colors.grey200};
  display: ${({ isLast }) => (isLast ? 'none' : 'flex')};
`;

const TimelineContent = styled.View`
  flex: 1;
`;

const TimelineTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TimelineDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-top: 2px;
`;

const TimelineDescription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
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

const TotalSection = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
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

// Mock order data
const mockOrder = {
  id: 'ORD-2025-001',
  date: 'June 5, 2025',
  status: 'Delivered',
  paymentMethod: 'Credit Card (****4567)',
  shippingAddress: '123 Fashion St, New York, NY 10001',
  items: [
    { id: '1', name: 'Custom Tailored Suit Jacket', variant: 'Navy Blue, Size M', price: '$199.99' },
    { id: '2', name: 'Custom Tailored Suit Pants', variant: 'Navy Blue, Size 32', price: '$99.99' },
    { id: '3', name: 'Dress Shirt', variant: 'White, Size M', price: '$49.99' },
  ],
  subtotal: '$349.97',
  shipping: '$0.00',
  tax: '$28.00',
  total: '$377.97',
  timeline: [
    { 
      id: '1', 
      title: 'Order Placed', 
      date: 'May 20, 2025', 
      description: 'Your order has been received and is being processed.',
      isCompleted: true 
    },
    { 
      id: '2', 
      title: 'Payment Confirmed', 
      date: 'May 20, 2025', 
      description: 'Payment has been successfully processed.',
      isCompleted: true 
    },
    { 
      id: '3', 
      title: 'In Production', 
      date: 'May 22, 2025', 
      description: 'Your custom items are being crafted by our tailors.',
      isCompleted: true 
    },
    { 
      id: '4', 
      title: 'Quality Check', 
      date: 'May 30, 2025', 
      description: 'Your items have passed our quality inspection.',
      isCompleted: true 
    },
    { 
      id: '5', 
      title: 'Shipped', 
      date: 'June 1, 2025', 
      description: 'Your order has been shipped via Express Delivery.',
      isCompleted: true 
    },
    { 
      id: '6', 
      title: 'Delivered', 
      date: 'June 5, 2025', 
      description: 'Your order has been delivered.',
      isCompleted: true 
    },
  ],
};

export default function OrderDetailScreen() {
  const navigation = useNavigation<OrderDetailNavigationProp>();
  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;
  
  // In a real app, you would fetch the order data based on the ID
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Order Details</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Order Information</SectionTitle>
          <OrderInfo>
            <InfoRow>
              <InfoLabel>Order Number</InfoLabel>
              <InfoValue>{mockOrder.id}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Date</InfoLabel>
              <InfoValue>{mockOrder.date}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Status</InfoLabel>
              <InfoValue>{mockOrder.status}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Payment Method</InfoLabel>
              <InfoValue>{mockOrder.paymentMethod}</InfoValue>
            </InfoRow>
          </OrderInfo>
        </Section>
        
        <Section>
          <SectionTitle>Shipping Address</SectionTitle>
          <InfoValue>{mockOrder.shippingAddress}</InfoValue>
        </Section>
        
        <Section>
          <SectionTitle>Order Timeline</SectionTitle>
          <TimelineContainer>
            {mockOrder.timeline.map((item, index) => (
              <TimelineItem key={item.id}>
                <TimelineDot 
                  isActive={index === mockOrder.timeline.length - 1} 
                  isCompleted={item.isCompleted} 
                />
                <TimelineConnector 
                  isLast={index === mockOrder.timeline.length - 1}
                  isCompleted={item.isCompleted}
                />
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Section>
        
        <Section>
          <SectionTitle>Items</SectionTitle>
          {mockOrder.items.map((item) => (
            <ItemCard key={item.id}>
              <ItemImage />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemVariant>{item.variant}</ItemVariant>
                <ItemPrice>{item.price}</ItemPrice>
              </ItemDetails>
            </ItemCard>
          ))}
        </Section>
        
        <TotalSection>
          <TotalRow>
            <TotalLabel>Subtotal</TotalLabel>
            <TotalValue>{mockOrder.subtotal}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Shipping</TotalLabel>
            <TotalValue>{mockOrder.shipping}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Tax</TotalLabel>
            <TotalValue>{mockOrder.tax}</TotalValue>
          </TotalRow>
          <GrandTotal>
            <GrandTotalLabel>Total</GrandTotalLabel>
            <GrandTotalValue>{mockOrder.total}</GrandTotalValue>
          </GrandTotal>
        </TotalSection>
      </Content>
      
      <ButtonContainer>
        <Button title="Track Shipment" onPress={() => {}} />
      </ButtonContainer>
    </Container>
  );
}