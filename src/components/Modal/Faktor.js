import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Input, Select} from '..';

const ModalFaktor = ({isOpen, toggle}) => {
  const [penyakit, setPenyakit] = useState('');
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
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        toggle();
      }}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Nama Penyakit</Text>
          <Select
            data={data}
            onChange={value => setPenyakit(value)}
            value={penyakit}
          />
          <Gap height={20} />
          <Text style={styles.modalText}>Nama Faktor</Text>
          <Input placeholder="Nama Faktor" />
          <Gap height={20} />
          <Button title="Simpan" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#021638',
  },
});

export default ModalFaktor;
