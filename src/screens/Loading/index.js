import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = () => {
  const navigation = useNavigation();

  const fetchToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token !== null) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    flex: 1,
    backgroundColor: '#000000',
  },
});
