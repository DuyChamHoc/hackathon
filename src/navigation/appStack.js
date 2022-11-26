import React from 'react';
import SignInScreen from '../authScreens/SignInScreen';
import SignInWelcomeScreen from '../authScreens/SignInWelcomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
export default function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SignInWelcomeScreen"
        component={SignInWelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
