import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowBack, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalPenyakit} from '../../../components';
import {useNavigation} from '@react-navigation/native';

const Penyakit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      nama: 'Dertamologi',
    },
    {
      id: 2,
      nama: 'Scabies',
    },
    {
      id: 3,
      nama: 'Feline Acne',
    },
    {
      id: 4,
      nama: 'Infestasi Kutu',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IcArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Penyakit</Text>
        <TouchableOpacity onPress={() => toggle()}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input placeholder="Cari Penyakit" search={() => console.log('test')} />
      <Gap height={25} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text>{item.nama}</Text>
            <TouchableOpacity>
              <IcTrash />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <ModalPenyakit isOpen={isOpen} toggle={() => toggle()} />
    </View>
  );
};

export default Penyakit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F8FAFD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#021638',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
  },
});
