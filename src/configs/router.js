import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Diagnosa,
  Gejala,
  Home,
  Info,
  Login,
  Penyakit,
  Pradiagnosa,
  Register,
  Solusi,
} from '../screens';

const Stack = createNativeStackNavigator();

class router extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pradiagnosa" component={Pradiagnosa} />
        <Stack.Screen name="Diagnosa" component={Diagnosa} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Penyakit" component={Penyakit} />
        <Stack.Screen name="Gejala" component={Gejala} />
        <Stack.Screen name="Solusi" component={Solusi} />
      </Stack.Navigator>
    );
  }
}

export default router;
