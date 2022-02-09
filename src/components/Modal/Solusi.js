import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Input, Select} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

const ModalSolusi = ({isOpen, toggle, data, fetch}) => {
  const [nama, setNama] = useState('');
  const [penyakit, setPenyakit] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const payload = {
        nama,
        id_penyakit: penyakit,
      };
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).post('api/v1/solusi', payload);
      await fetch();
      setLoading(true);
      toggle();
      showMessage(result.data.message, 'success');
    } catch (err) {
      setLoading(false);
      const {message} = err.response.data;
      showMessage(message);
    }
  };

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
            label="Pilih Penyakit"
          />
          <Gap height={20} />
          <Text style={styles.modalText}>Nama Solusi</Text>
          <Input placeholder="Nama Solusi" onChange={value => setNama(value)} />
          <Gap height={20} />
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Simpan" onPress={() => submit()} />
          )}
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

export default ModalSolusi;
