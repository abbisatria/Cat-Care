import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {IcEye, IcEyeSlash, IcSearch} from '../../assets';

const Input = ({placeholder, type, password, onChange, search}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <View style={styles.input}>
      {search && (
        <TouchableOpacity onPress={search} style={styles.search}>
          <IcSearch />
        </TouchableOpacity>
      )}
      <TextInput
        placeholder={placeholder}
        keyboardType={type}
        style={styles.textInput}
        secureTextEntry={password ? (isPasswordShown ? false : true) : false}
        onChangeText={onChange}
      />
      {password && (
        <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)}>
          {isPasswordShown ? <IcEyeSlash /> : <IcEye />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#BEBAB3',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
  },
  search: {
    marginRight: 12,
  },
});
