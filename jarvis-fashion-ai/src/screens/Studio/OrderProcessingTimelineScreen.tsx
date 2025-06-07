import React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StudioStackParamList } from '../../navigation/StudioStack';
import Button from '../../components/Button';

type OrderProcessingTimelineRouteProp = RouteProp<StudioStackParamList, 'OrderProcessingTimeline'>;
type OrderProcessingTimelineNavigationProp = StackNavigationProp<StudioStackParamList, 'OrderProcessingTimeline'>;

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

const OrderHeader = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey200};
`;

const OrderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderInfoItem = styled.View``;

const OrderInfoLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const OrderInfoValue = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const TimelineContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineItem = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const TimelineDot = styled.View<{ isActive: boolean; isCompleted: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : 
    isActive ? theme.colors.grey400 : theme.colors.grey200};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const TimelineIcon = styled.View`
  align-items: center;
  justify-content: center;
`;

const TimelineConnector = styled.View<{ isLast: boolean; isCompleted: boolean }>`
  position: absolute;
  left: 11px;
  top: 24px;
  bottom: ${({ isLast }) => (isLast ? 0 : -24)}px;
  width: 2px;
  background-color: ${({ isCompleted, theme }) => 
    isCompleted ? theme.colors.primary : theme.colors.grey200};
  display: ${({ isLast }) => (isLast ? 'none' : 'flex')};
`;

const TimelineContent = styled.View`
  flex: 1;
`;

const TimelineTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const TimelineDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-top: 2px;
`;

const TimelineDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  line-height: 20px;
`;

const EstimatedDelivery = styled.View`
  background-color: ${({ theme }) => theme.colors.grey100};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

const EstimatedDeliveryLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const EstimatedDeliveryDate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

// Mock order data
const mockOrder = {
  id: 'ORD-2025-001',
  title: 'Custom Tailored Suit',
  date: 'May 20, 2025',
  total: '$377.99',
  estimatedDelivery: 'June 5, 2025',
  timeline: [
    { 
      id: '1', 
      title: 'Order Placed', 
      date: 'May 20, 2025', 
      description: 'Your order has been received and is being processed.',
      icon: 'clipboard-check',
      isCompleted: true 
    },
    { 
      id: '2', 
      title: 'Payment Confirmed', 
      date: 'May 20, 2025', 
      description: 'Payment has been successfully processed.',
      icon: 'credit-card-check',
      isCompleted: true 
    },
    { 
      id: '3', 
      title: 'In Production', 
      date: 'May 22, 2025', 
      description: 'Your custom items are being crafted by our tailors. This typically takes 5-7 business days.',
      icon: 'scissors-cutting',
      isCompleted: false,
      isActive: true
    },
    { 
      id: '4', 
      title: 'Quality Check', 
      date: 'Estimated: May 30, 2025', 
      description: 'Your items will undergo a thorough quality inspection.',
      icon: 'check-circle',
      isCompleted: false 
    },
    { 
      id: '5', 
      title: 'Shipping', 
      date: 'Estimated: June 1, 2025', 
      description: 'Your order will be shipped via Express Delivery.',
      icon: 'truck-delivery',
      isCompleted: false 
    },
    { 
      id: '6', 
      title: 'Delivery', 
      date: 'Estimated: June 5, 2025', 
      description: 'Your order will be delivered to your shipping address.',
      icon: 'home',
      isCompleted: false 
    },
  ],
};

export default function OrderProcessingTimelineScreen() {
  const navigation = useNavigation<OrderProcessingTimelineNavigationProp>();
  const route = useRoute<OrderProcessingTimelineRouteProp>();
  const { orderId } = route.params;
  
  // In a real app, you would fetch the order data based on the ID
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Order Status</HeaderTitle>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <OrderHeader>
          <OrderTitle>{mockOrder.title}</OrderTitle>
          <OrderInfo>
            <OrderInfoItem>
              <OrderInfoLabel>Order Number</OrderInfoLabel>
              <OrderInfoValue>{mockOrder.id}</OrderInfoValue>
            </OrderInfoItem>
            <OrderInfoItem>
              <OrderInfoLabel>Order Date</OrderInfoLabel>
              <OrderInfoValue>{mockOrder.date}</OrderInfoValue>
            </OrderInfoItem>
            <OrderInfoItem>
              <OrderInfoLabel>Total</OrderInfoLabel>
              <OrderInfoValue>{mockOrder.total}</OrderInfoValue>
            </OrderInfoItem>
          </OrderInfo>
        </OrderHeader>
        
        <EstimatedDelivery>
          <EstimatedDeliveryLabel>Estimated Delivery</EstimatedDeliveryLabel>
          <EstimatedDeliveryDate>{mockOrder.estimatedDelivery}</EstimatedDeliveryDate>
        </EstimatedDelivery>
        
        <TimelineContainer>
          {mockOrder.timeline.map((item, index) => (
            <TimelineItem key={item.id}>
              <TimelineDot 
                isActive={item.isActive || false} 
                isCompleted={item.isCompleted} 
              >
                <TimelineIcon>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={14} 
                    color={item.isCompleted ? "#FFF" : item.isActive ? "#000" : "#9E9E9E"} 
                  />
                </TimelineIcon>
              </TimelineDot>
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
      </Content>
      
      <ButtonContainer>
        <Button title="Contact Support" onPress={() => {}} variant="secondary" />
      </ButtonContainer>
    </Container>
  );
}