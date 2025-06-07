import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudioScreen from '../screens/Studio/StudioScreen';
import TryOnScreen from '../screens/Studio/TryOnScreen';
import MixMatchScreen from '../screens/Studio/MixMatchScreen';
import AvatarSetupScreen from '../screens/Studio/AvatarSetupScreen';
import TryOnDetailScreen from '../screens/Studio/TryOnDetailScreen';
import MixMatchFabricScreen from '../screens/Studio/MixMatchFabricScreen';
import MixMatchTailorScreen from '../screens/Studio/MixMatchTailorScreen';
import MixMatchPreviewScreen from '../screens/Studio/MixMatchPreviewScreen';
import CheckoutScreen from '../screens/Studio/CheckoutScreen';
import OrderProcessingTimelineScreen from '../screens/Studio/OrderProcessingTimelineScreen';

export type StudioStackParamList = {
  StudioHome: undefined;
  AvatarSetup: undefined;
  TryOn: undefined;
  TryOnDetail: { itemId: string };
  MixMatch: undefined;
  MixMatchFabric: { designId: string };
  MixMatchTailor: { designId: string; fabricId: string };
  MixMatchPreview: { designId: string; fabricId: string; tailorId: string };
  Checkout: { itemId: string } | { designId: string; fabricId: string; tailorId: string };
  OrderProcessingTimeline: { orderId: string };
};

const Stack = createStackNavigator<StudioStackParamList>();

const StudioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StudioHome" component={StudioScreen} />
      <Stack.Screen name="AvatarSetup" component={AvatarSetupScreen} />
      <Stack.Screen name="TryOn" component={TryOnScreen} />
      <Stack.Screen name="TryOnDetail" component={TryOnDetailScreen} />
      <Stack.Screen name="MixMatch" component={MixMatchScreen} />
      <Stack.Screen name="MixMatchFabric" component={MixMatchFabricScreen} />
      <Stack.Screen name="MixMatchTailor" component={MixMatchTailorScreen} />
      <Stack.Screen name="MixMatchPreview" component={MixMatchPreviewScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderProcessingTimeline" component={OrderProcessingTimelineScreen} />
    </Stack.Navigator>
  );
};

export default StudioStack;