import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileStackParamList } from '../../navigation/ProfileStack';

type OrdersScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Orders'>;

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

const OrderCard = styled.TouchableOpacity`
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

const OrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderId = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const OrderDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey500};
`;

const OrderContent = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderImage = styled.View`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  background-color: ${({ theme }) => theme.colors.grey200};
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

const OrderDetails = styled.View`
  flex: 1;
`;

const OrderTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderItems = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const OrderPrice = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const OrderFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey200};
`;

const StatusBadge = styled.View<{ status: string }>`
  background-color: ${({ status, theme }) => 
    status === 'Delivered' ? '#4CAF50' : 
    status === 'In Transit' ? '#2196F3' : 
    status === 'Processing' ? '#FF9800' : 
    status === 'Cancelled' ? '#F44336' : 
    theme.colors.grey300};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

const StatusText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const ViewDetailsText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
`;

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: 'June 5, 2025',
    title: 'Custom Tailored Suit',
    items: '3 items',
    price: '$349.99',
    status: 'Delivered',
  },
  {
    id: 'ORD-2025-002',
    date: 'June 1, 2025',
    title: 'Summer Collection Bundle',
    items: '5 items',
    price: '$189.50',
    status: 'In Transit',
  },
  {
    id: 'ORD-2025-003',
    date: 'May 28, 2025',
    title: 'Designer Dress',
    items: '1 item',
    price: '$129.99',
    status: 'Processing',
  },
  {
    id: 'ORD-2025-004',
    date: 'May 15, 2025',
    title: 'Casual Outfit Set',
    items: '4 items',
    price: '$159.95',
    status: 'Delivered',
  },
  {
    id: 'ORD-2025-005',
    date: 'May 10, 2025',
    title: 'Accessories Bundle',
    items: '6 items',
    price: '$79.99',
    status: 'Cancelled',
  },
];

export default function OrdersScreen() {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  
  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetail', { orderId });
  };
  
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </BackButton>
        <HeaderTitle>My Orders</HeaderTitle>
      </Header>
      
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard onPress={() => handleOrderPress(item.id)}>
            <OrderHeader>
              <OrderId>{item.id}</OrderId>
              <OrderDate>{item.date}</OrderDate>
            </OrderHeader>
            
            <OrderContent>
              <OrderImage />
              <OrderDetails>
                <OrderTitle>{item.title}</OrderTitle>
                <OrderItems>{item.items}</OrderItems>
                <OrderPrice>{item.price}</OrderPrice>
              </OrderDetails>
            </OrderContent>
            
            <OrderFooter>
              <StatusBadge status={item.status}>
                <StatusText>{item.status}</StatusText>
              </StatusBadge>
              <ViewDetailsText>View Details</ViewDetailsText>
            </OrderFooter>
          </OrderCard>
        )}
      />
    </Container>
  );
}