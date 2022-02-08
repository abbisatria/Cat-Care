import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowBack, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalFaktor} from '../../../components';
import {useNavigation} from '@react-navigation/native';

const Faktor = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      nama: 'Suhu lembab, Bulu tidak kering sempurna pasca mandi, Kurang berjemur',
    },
    {
      id: 2,
      nama: 'Tungau/Kutu',
    },
    {
      id: 3,
      nama: 'Suhu lembab, Bulu tidak kering sempurna pasca mandi, Kurang berjemur',
    },
    {
      id: 4,
      nama: 'Infeksi bakteri',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IcArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Faktor</Text>
        <TouchableOpacity onPress={() => toggle()}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input placeholder="Cari Faktor" search={() => console.log('test')} />
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
      <ModalFaktor isOpen={isOpen} toggle={() => toggle()} />
    </View>
  );
};

export default Faktor;

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
