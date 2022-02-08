import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowBack, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalGejala} from '../../../components';
import {useNavigation} from '@react-navigation/native';

const Gejala = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      nama: 'Bulu rontok/kebotakan',
    },
    {
      id: 2,
      nama: 'Kulit seperti ada ketombe',
    },
    {
      id: 3,
      nama: 'Kebotakan pada daerah tubuhnya',
    },
    {
      id: 4,
      nama: 'Kulit bersisik',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IcArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Gejala</Text>
        <TouchableOpacity onPress={() => toggle()}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input placeholder="Cari Gejala" search={() => console.log('test')} />
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
      <ModalGejala isOpen={isOpen} toggle={() => toggle()} />
    </View>
  );
};

export default Gejala;

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
