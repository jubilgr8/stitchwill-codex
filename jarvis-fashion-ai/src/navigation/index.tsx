import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedStack from './FeedStack';
import StudioStack from './StudioStack';
import ProfileStack from './ProfileStack';

export type RootTabParamList = {
  Feed: undefined;
  Studio: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Design tokens as per spec
const COLORS = {
  PRIMARY: '#E63946',
  ICON_INACTIVE: '#757575',
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'home';
            
            if (route.name === 'Feed') iconName = 'home';
            if (route.name === 'Studio') iconName = 'palette';
            if (route.name === 'Profile') iconName = 'account-circle';
            
            return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.ICON_INACTIVE,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarStyle: {
            height: 56 + 34, // 56pt + bottom safe area inset (approx 34pt)
            paddingTop: 8,
            paddingBottom: 34, // bottom safe area inset
          },
        })}
      >
        <Tab.Screen 
          name="Feed" 
          component={FeedStack} 
          options={{
            tabBarLabel: 'Feed'
          }}
        />
        <Tab.Screen 
          name="Studio" 
          component={StudioStack} 
          options={{
            tabBarLabel: 'Studio'
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileStack} 
          options={{
            tabBarLabel: 'Profile'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}