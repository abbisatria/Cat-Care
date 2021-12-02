import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IcCat, IcDiagnosa, IcHome} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cat Care</Text>
        <IcCat />
        <Text style={styles.subTitle}>
          Selamat Datang{'\n'}Diagnosa Penyakit Kulit Kucing
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={null}>
          <IcHome />
          <Text style={styles.textCard}>Pemeliharaan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Pradiagnosa')}>
          <IcDiagnosa />
          <Text style={styles.textCard}>Diagnosa Penyakit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#021638',
    width: '45%',
    paddingVertical: 30,
    borderRadius: 12,
  },
  textCard: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 8,
  },
});
