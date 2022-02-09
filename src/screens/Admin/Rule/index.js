import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcArrowBack, IcPlus, IcTrash} from '../../../assets';
import {Gap, Input, ModalDelete, ModalRule} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import http from '../../../helpers/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from '../../../helpers/showMessage';

const Rule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [data, setData] = useState({
    count: 1,
    pageCount: 1,
    data: [],
  });
  const [dataGejala, setDataGejala] = useState([]);
  const [dataPenyakit, setDataPenyakit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleDelete = () => setIsOpenDelete(!isOpenDelete);
  const navigation = useNavigation();

  const fetchRule = async type => {
    try {
      setLoading(true);
      const params = {
        page: type ? 1 : page,
        search,
      };
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/rule', {params});
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

  const fetchGejala = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).get('api/v1/gejala');
      const finalResult = result.data.results.map(val => {
        return {
          id: val.id,
          name: val.nama,
        };
      });
      setDataGejala(finalResult);
    } catch (err) {
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
      const result = await http(token).get('api/v1/rule', {params});
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
    fetchRule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRule = async () => {
    try {
      setLoadingDelete(true);
      const token = await AsyncStorage.getItem('@token');
      const result = await http(token).delete(`api/v1/rule/${deleteData}`);
      showMessage(result.data.message, 'success');
      toggleDelete();
      fetchRule('refresh');
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
        <Text style={styles.title}>Daftar Rule</Text>
        <TouchableOpacity
          onPress={async () => {
            await fetchGejala();
            await fetchPenyakit();
            toggle();
          }}>
          <IcPlus />
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Cari Penyakit"
        search={() => fetchRule('search')}
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
              <Text>{item.nama}</Text>
              <TouchableOpacity
                onPress={() => {
                  setDeleteData(item.id);
                  toggleDelete();
                }}>
                <IcTrash />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          refreshing={false}
          onRefresh={() => fetchRule('refresh')}
          onEndReached={next}
          onEndReachedThreshold={0.5}
        />
      )}
      <ModalRule
        isOpen={isOpen}
        toggle={() => toggle()}
        dataGejala={dataGejala}
        dataPenyakit={dataPenyakit}
        fetch={() => fetchRule('refresh')}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        toggle={() => toggleDelete()}
        loading={loadingDelete}
        deleteData={() => deleteRule()}
      />
    </View>
  );
};

export default Rule;

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
