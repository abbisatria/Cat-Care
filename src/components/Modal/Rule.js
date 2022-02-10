import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Select} from '..';
import Select2 from 'react-native-select-two';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

const ModalRule = ({
  isOpen,
  toggle,
  dataGejala,
  dataPenyakit,
  fetch,
  dataEdit,
}) => {
  const [penyakit, setPenyakit] = useState('');
  const [rule, setRule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      const editRule = dataEdit.rules.map(val => val.id_gejala);
      setRule(editRule);
      setPenyakit(dataEdit.id);
    } else {
      setRule([]);
      setPenyakit('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const submit = async () => {
    try {
      setLoading(true);
      const payload = {
        id_penyakit: penyakit,
        id_gejala: rule,
      };
      const token = await AsyncStorage.getItem('@token');
      let result;
      if (dataEdit) {
        result = await http(token).put('api/v1/rule', payload);
      } else {
        result = await http(token).post('api/v1/rule', payload);
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
          <Select
            data={dataPenyakit}
            onChange={value => setPenyakit(value)}
            value={penyakit}
            label="Pilih Penyakit"
          />
          <Gap height={20} />
          <Text style={styles.modalText}>Rule</Text>
          <Select2
            colorTheme="blue"
            popupTitle="Select Rule"
            title="Select Rule"
            style={styles.select}
            data={dataGejala}
            onSelect={data => {
              setRule(data);
            }}
            onRemoveItem={data => {
              setRule(data);
            }}
            cancelButtonText="Cancel"
            selectButtonText="Select"
            showSearchBox={false}
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
  select: {borderRadius: 10, borderColor: '#BEBAB3'},
});

export default ModalRule;
