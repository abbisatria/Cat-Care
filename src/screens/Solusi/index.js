import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IcCat} from '../../assets';
import {Button} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Solusi = ({route}) => {
  const navigation = useNavigation();

  const {faktor, nama_penyakit, solusi} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cat Care</Text>
          <IcCat />
          <Text style={styles.subTitle}>Hasil Diagnosa</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.text}>
            <Text style={styles.desc}>Penyakit </Text>
            <Text>kucing anda adalah </Text>
            <Text>{nama_penyakit}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.desc}>Faktor </Text>
            <Text>terjadi {nama_penyakit} adalah </Text>
            <Text>{faktor}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.desc}>Solusi yang disarankan adalah </Text>
            <Text>{solusi}</Text>
          </View>
        </View>
        <Button
          title="Selesai"
          onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}
        />
      </ScrollView>
      <View style={styles.bottonButtom}>
        <View style={styles.button}>
          <Button
            title="Kembali"
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'Home'}]})
            }
          />
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

export default Solusi;

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
    textDecorationLine: 'underline',
  },
  desc: {
    color: '#021638',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    marginVertical: 30,
    padding: 12,
    borderWidth: 1,
    color: '#021638',
    borderRadius: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {flexDirection: 'row', flexWrap: 'wrap'},
  bottonButtom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
});
