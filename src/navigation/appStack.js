import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../containers/home';
import AddPost from '../containers/addpost/AddPost';
import Rate from '../containers/addpost/Rate';
import barnavigation from './barnavigation';
import AddFeed from '../containers/home/AddFeed';
import SearchFeed from '../containers/search';
import DetailFeed from '../containers/home/DetailFeed';
import Sample from '../containers/home/Sample';
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

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddFeed"
        component={AddFeed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchFeed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailFeed"
        component={DetailFeed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rate"
        component={Rate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sample"
        component={Sample}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
