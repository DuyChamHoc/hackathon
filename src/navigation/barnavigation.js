import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../containers/home';
import {colors} from '../global/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import MyAccountScreen from '../containers/account/MyAccountScreen';
import FeedScreen from '../containers/search/index';
import {color} from '../assets/colors/color';
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
              color={focussed ? '#7cc' : color.primarygreen}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="feeds"
        component={FeedScreen}
        options={{
          headerShown: false,
          title: 'Feeds',
          tabBarIcon: ({focussed, size}) => (
            <Icon2
              name="text-document"
              color={focussed ? '#7cc' : color.primarygreen}
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
              color={focussed ? '#7cc' : color.primarygreen}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
