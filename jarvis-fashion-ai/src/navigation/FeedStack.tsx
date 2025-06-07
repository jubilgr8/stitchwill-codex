import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/Feed/FeedScreen';
import FeedDetailScreen from '../screens/Feed/FeedDetailScreen';

export type FeedStackParamList = {
  FeedHome: undefined;
  FeedDetail: { id: string };
  TryOnFlow: undefined;
  DesignFlow: undefined;
  FabricFlow: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FeedHome" component={FeedScreen} />
      <Stack.Screen name="FeedDetail" component={FeedDetailScreen} />
      {/* These screens would be implemented separately */}
      <Stack.Screen name="TryOnFlow" component={PlaceholderScreen} />
      <Stack.Screen name="DesignFlow" component={PlaceholderScreen} />
      <Stack.Screen name="FabricFlow" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
};

// Temporary placeholder for flow screens
const PlaceholderScreen = () => {
  return null;
};

export default FeedStack;