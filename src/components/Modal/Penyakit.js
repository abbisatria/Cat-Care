import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Input} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

const ModalPenyakit = ({isOpen, toggle, fetch, dataEdit}) => {
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      setNama(dataEdit.nama);
    } else {
      setNama('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const submit = async () => {
    try {
      setLoading(true);
      const payload = {
        nama,
      };
      const token = await AsyncStorage.getItem('@token');
      let result;
      if (dataEdit) {
        result = await http(token).put(
          `api/v1/penyakit/${dataEdit.id}`,
          payload,
        );
      } else {
        result = await http(token).post('api/v1/penyakit', payload);
      }
      await fetch();
      setLoading(false);
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
          <Input
            placeholder="Nama Penyakit"
            onChange={value => setNama(value)}
            value={nama}
          />
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

export default ModalPenyakit;
