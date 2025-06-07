import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import WardrobeScreen from '../screens/Profile/WardrobeScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import AvatarEditScreen from '../screens/Profile/AvatarEditScreen';
import WardrobeItemDetailScreen from '../screens/Profile/WardrobeItemDetailScreen';
import OrdersScreen from '../screens/Profile/OrdersScreen';
import OrderDetailScreen from '../screens/Profile/OrderDetailScreen';
import AddressesScreen from '../screens/Profile/AddressesScreen';
import AddressEditScreen from '../screens/Profile/AddressEditScreen';
import PaymentMethodsScreen from '../screens/Profile/PaymentMethodsScreen';
import PaymentMethodEditScreen from '../screens/Profile/PaymentMethodEditScreen';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  AvatarEdit: undefined;
  Wardrobe: undefined;
  WardrobeItemDetail: { itemId: string };
  Orders: undefined;
  OrderDetail: { orderId: string };
  Addresses: undefined;
  AddressEdit: { addressId?: string };
  PaymentMethods: undefined;
  PaymentMethodEdit: { paymentId?: string };
  Settings: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="AvatarEdit" component={AvatarEditScreen} />
      <Stack.Screen name="Wardrobe" component={WardrobeScreen} />
      <Stack.Screen name="WardrobeItemDetail" component={WardrobeItemDetailScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="AddressEdit" component={AddressEditScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentMethodEdit" component={PaymentMethodEditScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;