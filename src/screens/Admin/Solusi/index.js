import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowBack, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalSolusi} from '../../../components';
import {useNavigation} from '@react-navigation/native';

const SolusiAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      nama: 'Berjemur, Oles salep jamur, Usahakan bulu kering sempurna pasca mandi, Beri shampoo yang mengandung anti jamur (bawa pada drh untuk penanganan lebih tepat)',
    },
    {
      id: 2,
      nama: 'Keropeng pada kulit perlu dibersihkan, Oles salep scabimite, Mandikan kucing dengan shampoo yg mengandung zat sulphur (bawa ke drh untuk mendapatkan pengobatan anti parasit)',
    },
    {
      id: 3,
      nama: 'Berikan makanan khusus allergy, antihistamin atau antiinflamasi',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IcArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Solusi</Text>
        <TouchableOpacity onPress={() => toggle()}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input placeholder="Cari Solusi" search={() => console.log('test')} />
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
      <ModalSolusi isOpen={isOpen} toggle={() => toggle()} />
    </View>
  );
};

export default SolusiAdmin;

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
