import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../containers/home';
import {colors} from '../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import MyAccountScreen from '../containers/account/MyAccountScreen';
import barnavigation from './barnavigation';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BarNavigation"
        component={barnavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
