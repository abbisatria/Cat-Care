import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/configs/router';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
      <Route />
      <FlashMessage position="top" duration={3000} />
    </NavigationContainer>
  );
}
