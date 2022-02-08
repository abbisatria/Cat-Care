import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

const Diagnosa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [diagnosa, setDiagnosa] = useState([]);
  const navigation = useNavigation();

  const fetchGejala = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/gejala');
      setData(result.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const {message} = err.response.data;
      showMessage(message);
    }
  };

  useEffect(() => {
    fetchGejala();
  }, []);

  const submit = async (choose, value) => {
    // navigation.navigate('Solusi')
    if (step === data.length - 1) {
      if (choose === 'yes') {
        setDiagnosa([...diagnosa, value]);
      }
      try {
        setLoading(true);
        const payload = {
          id_gejala: diagnosa,
        };
        const token = await AsyncStorage.getItem('@token');
        const result = await http(token).post('api/v1/rule/diagnosa', payload);
        navigation.reset({
          index: 0,
          routes: [{name: 'Solusi', params: result.data.results}],
        });
      } catch (err) {
        setLoading(false);
        const {message} = err.response.data;
        showMessage(message);
      }
    } else if (choose === 'yes') {
      setDiagnosa([...diagnosa, value]);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cat Care</Text>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : data.length > 0 ? (
            <React.Fragment>
              {data[step].image && (
                <Image
                  source={{
                    uri: 'https://www.hewanpeliharaan.org/wp-content/uploads/2016/04/kucing-terkena-kutu.jpg',
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.subTitle}>
                {data[step].nama}
                {data[step].image ? '“Contoh pada gambar diatas!”' : ''}
              </Text>
            </React.Fragment>
          ) : null}
        </View>
        {data.length > 0 && !loading && (
          <View style={styles.content}>
            <View style={styles.buttonLeft}>
              <Button title="Ya" onPress={() => submit('yes', data[step].id)} />
            </View>
            <View style={styles.buttonRight}>
              <Button
                title="Tidak"
                onPress={() => submit('no', data[step].id)}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottonButtom}>
        <View style={styles.button}>
          <Button title="Kembali" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.button}>
          <Button
            title="Keluar"
            onPress={async () => {
              await AsyncStorage.removeItem('@token');
              navigation.reset({index: 0, routes: [{name: 'Login'}]});
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Diagnosa;

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
    fontSize: 14,
    fontWeight: '500',
    color: '#021638',
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 80,
  },
  image: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  buttonLeft: {
    width: '50%',
    marginRight: 20,
  },
  buttonRight: {
    width: '50%',
    marginLeft: 20,
  },
  bottonButtom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
});
