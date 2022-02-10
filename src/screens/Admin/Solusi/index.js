import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcArrowBack, IcEdit, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalDelete, ModalSolusi} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import http from '../../../helpers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../../../helpers/showMessage';

const SolusiAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [data, setData] = useState({
    count: 1,
    pageCount: 1,
    data: [],
  });
  const [dataEdit, setDataEdit] = useState('');
  const [dataPenyakit, setDataPenyakit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDelete = () => setIsOpenDelete(!isOpenDelete);
  const navigation = useNavigation();

  const fetchSolusi = async type => {
    try {
      setLoading(true);
      const params = {
        page: type ? 1 : page,
        search,
      };
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/solusi', {params});
      if (type) {
        setPage(1);
      }
      setData(result.data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const {message} = err.response.data;
      showMessage(message);
    }
  };

  const fetchPenyakit = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/penyakit');
      setDataPenyakit(result.data.results);
    } catch (err) {
      const {message} = err.response.data;
      showMessage(message);
    }
  };

  const next = async () => {
    if (page !== data?.pageCount) {
      const params = {
        page: page + 1,
        search,
      };
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/solusi', {params});
      const finalResult = {
        ...data,
        data: [...data?.data, ...result.data.results.data],
        count: result.data.results.count,
        pageCount: result.data.results.pageCount,
      };
      setPage(page + 1);
      setData(finalResult);
    }
  };

  useEffect(() => {
    fetchSolusi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteSolusi = async () => {
    try {
      setLoadingDelete(true);
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).delete(`api/v1/solusi/${deleteData}`);
      showMessage(result.data.message, 'success');
      toggleDelete();
      fetchSolusi('refresh');
      setLoadingDelete(false);
    } catch (err) {
      setLoadingDelete(false);
      const {message} = err.response.data;
      showMessage(message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IcArrowBack />
        </TouchableOpacity>
        <Text style={styles.title}>Daftar Solusi</Text>
        <TouchableOpacity
          onPress={async () => {
            await fetchPenyakit();
            setDataEdit('');
            toggle();
          }}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Cari Solusi"
        search={() => fetchSolusi('search')}
        onChange={value => setSearch(value)}
      />
      <Gap height={25} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.data}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item.nama}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={async () => {
                    await fetchPenyakit();
                    setDataEdit(item);
                    toggle();
                  }}>
                  <IcEdit />
                </TouchableOpacity>
                <Gap width={5} />
                <TouchableOpacity
                  onPress={() => {
                    setDeleteData(item.id);
                    toggleDelete();
                  }}>
                  <IcTrash />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={() => fetchSolusi('refresh')}
          onEndReached={next}
          onEndReachedThreshold={0.5}
        />
      )}
      <ModalSolusi
        isOpen={isOpen}
        toggle={() => toggle()}
        data={dataPenyakit}
        fetch={() => fetchSolusi('refresh')}
        dataEdit={dataEdit}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        toggle={() => toggleDelete()}
        loading={loadingDelete}
        deleteData={() => deleteSolusi()}
      />
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
  text: {
    width: '75%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
