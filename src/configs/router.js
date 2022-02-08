import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Diagnosa,
  Faktor,
  Gejala,
  Home,
  HomeAdmin,
  Info,
  Loading,
  Login,
  Penyakit,
  Pradiagnosa,
  Register,
  Rule,
  Solusi,
  SolusiAdmin,
} from '../screens';

const Stack = createNativeStackNavigator();

class router extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="Pradiagnosa" component={Pradiagnosa} />
        <Stack.Screen name="Diagnosa" component={Diagnosa} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Solusi" component={Solusi} />
        {/* Admin */}
        <Stack.Screen name="Penyakit" component={Penyakit} />
        <Stack.Screen name="Gejala" component={Gejala} />
        <Stack.Screen name="Faktor" component={Faktor} />
        <Stack.Screen name="SolusiAdmin" component={SolusiAdmin} />
        <Stack.Screen name="Rule" component={Rule} />
      </Stack.Navigator>
    );
  }
}

export default router;
