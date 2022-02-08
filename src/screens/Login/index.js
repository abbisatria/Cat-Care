import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IcWelcome} from '../../assets';
import {Button, Gap, Input} from '../../components';
import http from '../../helpers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../../helpers/showMessage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submit = async () => {
    try {
      const payload = {
        username,
        password,
      };
      const result = await http().post('api/v1/users/login', payload);
      await AsyncStorage.setItem('@token', result.data.results.token);
      showMessage(result.data.message, 'success');
      navigation.replace('Home');
    } catch (err) {
      const {message} = err.response.data;
      showMessage(message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cat Care</Text>
        <IcWelcome />
        <Text style={styles.subTitle}>Login</Text>
      </View>
      <Input placeholder="Username" onChange={value => setUsername(value)} />
      <Gap height={16} />
      <Input
        placeholder="Password"
        password
        onChange={value => setPassword(value)}
      />
      <Gap height={16} />
      <Button title="Login" onPress={() => submit()} />
      <Gap height={27} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#021638',
    marginBottom: 40,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#021638',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  register: {
    fontSize: 14,
    textAlign: 'center',
    color: '#021638',
  },
});
