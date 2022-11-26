import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SignInContext} from '../contexts/authContext';
import AuthStack from './authStack';
import AppStack from './appStack';
// import {Provider as ReduxProvider} from 'react-redux';
// import configureStore from '../../redux/store';
// import auth from '@react-native-firebase/auth';
export default function RootNavigator() {
  const {signedIn} = useContext(SignInContext);
  return (
    <NavigationContainer>
      {signedIn.userToken === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
