import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {Button} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Diagnosa = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cat Care</Text>
          <Image
            source={{
              uri: 'https://www.hewanpeliharaan.org/wp-content/uploads/2016/04/kucing-terkena-kutu.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.subTitle}>
            Apakah kucing anda sering garuk-garuk berlebihan? “Contoh pada
            gambar diatas!”
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.buttonLeft}>
            <Button title="Ya" onPress={() => navigation.navigate('Solusi')} />
          </View>
          <View style={styles.buttonRight}>
            <Button
              title="Tidak"
              onPress={() => navigation.navigate('Solusi')}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottonButtom}>
        <View style={styles.button}>
          <Button title="Kembali" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.button}>
          <Button title="Keluar" onPress={() => navigation.navigate('Login')} />
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
