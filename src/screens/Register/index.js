import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IcWelcome} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {showMessage} from '../../helpers/showMessage';
import http from '../../helpers/http';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const submit = async () => {
    try {
      if (!username || !password || !email) {
        if (!username) {
          showMessage('Username harus diisi!!!');
        } else if (!password) {
          showMessage('Password harus diisi!!!');
        } else {
          showMessage('Email harus diisi!!!');
        }
      } else {
        setLoading(true);
        const payload = {
          username,
          password,
          email,
        };
        const result = await http().post('api/v1/users/register', payload);
        showMessage(result.data.message, 'success');
        setLoading(false);
        navigation.navigate('Login');
      }
    } catch (err) {
      setLoading(false);
      const {message} = err.response.data;
      showMessage(message);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cat Care</Text>
        <IcWelcome />
        <Text style={styles.subTitle}>Register</Text>
      </View>
      <Input placeholder="Username" onChange={value => setUsername(value)} />
      <Gap height={16} />
      <Input
        placeholder="Password"
        password
        onChange={value => setPassword(value)}
      />
      <Gap height={16} />
      <Input
        placeholder="Email"
        type="email-address"
        onChange={value => setEmail(value)}
      />
      <Gap height={16} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Register" onPress={() => submit()} />
      )}
      <Gap height={27} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.register}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

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
