import { Dimensions, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropDown = ({ label, value, onchange, datas, placeholder }: any) => {
  return (
    <View className=''>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{
          zIndex: 60,
        }}
        data={datas}
        mode={"auto"}
        maxHeight={300}
        labelField={label}
        valueField={value}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={onchange}
      />
    </View>
  )
}

export default DropDown

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: 'grey'
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});