import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {colors} from './src/global/styles';
import RootNavigator from './src/navigation/rootNavigation';
import {LogBox} from 'react-native';
import {SignInContextProvider} from './src/contexts/authContext';
import Home from './src/containers/home';
import AddFeed from './src/containers/home/DetailFeed';
import DetailFeed from './src/containers/home/DetailFeed';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <SignInContextProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.statusbar}
        />
        <RootNavigator />
      </View>
    </SignInContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
