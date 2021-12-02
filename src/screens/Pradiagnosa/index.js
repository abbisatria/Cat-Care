import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {IcCat} from '../../assets';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Pradiagnosa = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cat Care</Text>
        <IcCat />
        <Text style={styles.subTitle}>
          Selamat Datang {'\n'} di Halaman Diagnosa Penyakit {'\n'} Anda hanya
          perlu menjawab “Ya” atau {'\n'} “Tidak” disetiap pertanyaan yang
          diajukan
        </Text>
      </View>
      <View style={styles.content}>
        <Button title="Mulai" onPress={() => navigation.navigate('Diagnosa')} />
      </View>
    </ScrollView>
  );
};

export default Pradiagnosa;

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
    marginTop: 30,
  },
});
