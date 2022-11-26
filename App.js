import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {colors} from './src/global/styles';
import RootNavigator from './src/navigation/rootNavigation';
import {LogBox} from 'react-native';
import {SignInContextProvider} from './src/contexts/authContext';
import Home from './src/containers/home';
import { color } from './src/assets/colors/color';
import SearchFeed from './src/containers/search';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <SignInContextProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={color.primarygreen}
        />
        <RootNavigator />
      </View>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
