import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../containers/home';
import {colors} from '../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import MyAccountScreen from '../containers/account/MyAccountScreen';
const Tab = createBottomTabNavigator();
export default function barnavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focussed, size}) => (
            <Icon
              name="home"
              color={focussed ? '#7cc' : colors.grey2}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myaccount"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          title: 'My Account',
          tabBarIcon: ({focussed, size}) => (
            <Icon1
              name="user"
              color={focussed ? '#7cc' : colors.grey2}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
