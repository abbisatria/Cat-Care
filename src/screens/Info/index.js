import React from 'react';
import {Text, View, StyleSheet, ScrollView, Linking} from 'react-native';
import {IcCat} from '../../assets';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Info = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cat Care</Text>
          <IcCat />
          <Text style={styles.subTitle}>
            Selamat Datang {'\n'} di Halaman Pemeliharaan {'\n'} Klik link
            dibawah untuk mengetahui {'\n'} informasi seputar kucing anda
          </Text>
        </View>
        <View style={styles.content}>
          <Text
            style={styles.desc}
            onPress={() => Linking.openURL('https://google.com')}>
            Cara pencegahan penyakit Scabies mengetahui umur kucing anda makanan
            yang tepat untuk perkembangan jenis-jenis kucing ras
            Selengkapnya....
          </Text>
        </View>
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

export default Info;

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
  desc: {
    textDecorationLine: 'underline',
    color: '#1560E0',
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
  },
  bottonButtom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
});
