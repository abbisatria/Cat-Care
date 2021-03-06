import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Select = ({value, onChange, data, label}) => {
  return (
    <View style={styles.input}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label={label} />
        {data &&
          data.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.nama} value={item.id} />
            );
          })}
      </Picker>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  input: {
    borderColor: '#BEBAB3',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
});
