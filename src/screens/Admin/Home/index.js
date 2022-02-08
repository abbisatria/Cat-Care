import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  IcCat,
  IcPenyakit,
  IcFaktor,
  IcGejala,
  IcSolusi,
  IcRule,
} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeAdmin = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cat Care</Text>
          <IcCat />
          <Text style={styles.subTitle}>
            Selamat Datang{'\n'}Diagnosa Penyakit Kulit Kucing
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Penyakit')}>
            <IcPenyakit />
            <Text style={styles.textCard}>Penyakit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Faktor')}>
            <IcFaktor />
            <Text style={styles.textCard}>Faktor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Gejala')}>
            <IcGejala />
            <Text style={styles.textCard}>Gejala</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SolusiAdmin')}>
            <IcSolusi />
            <Text style={styles.textCard}>Solusi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Rule')}>
            <IcRule />
            <Text style={styles.textCard}>Rule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Button
        title="Keluar"
        onPress={async () => {
          await AsyncStorage.removeItem('@token');
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }}
      />
    </View>
  );
};

export default HomeAdmin;

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#021638',
    width: '25%',
    paddingVertical: 20,
    borderRadius: 8,
  },
  textCard: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 8,
  },
});
