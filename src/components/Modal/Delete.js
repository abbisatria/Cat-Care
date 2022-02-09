import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '..';
import {IcTrash} from '../../assets';

const ModalDelete = ({isOpen, toggle, loading, deleteData}) => {
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
          <View style={styles.trash}>
            <IcTrash />
          </View>
          <Text style={styles.modalText}>Apakah Anda Yakin?</Text>
          <Text style={styles.modalText}>
            Apakah Anda Yakin ingin menghapus data ini? Proses ini tidak dapat
            dibatalkan
          </Text>
          <Gap height={20} />
          <View style={styles.button}>
            <View style={styles.width}>
              <Button title="Tidak" color="red" onPress={() => toggle()} />
            </View>
            <View style={styles.width}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button title="Ya" onPress={() => deleteData()} />
              )}
            </View>
          </View>
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
  trash: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#021638',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  width: {
    width: '40%',
  },
});

export default ModalDelete;
