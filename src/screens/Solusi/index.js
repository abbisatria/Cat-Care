import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {IcCat} from '../../assets';

const Solusi = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cat Care</Text>
        <IcCat />
        <Text style={styles.subTitle}>Hasil Diagnosa</Text>
      </View>
      <View style={styles.content}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>Penyakit </Text>
          <Text>kucing anda adalah </Text>
          <Text>SCABIES!!!</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>Faktor </Text>
          <Text>terjadi SCABIES adalah </Text>
          <Text>TUNGAU atau KUTU KULIT</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>Solusi yang disarankan adalah </Text>
          <Text>
            Bersihkan keropeng atau kerak yang ada pada kulit kucing lalu
            berikan obat scabimite
          </Text>
        </View>
      </View>
    </ScrollView>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    marginTop: 30,
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
});
