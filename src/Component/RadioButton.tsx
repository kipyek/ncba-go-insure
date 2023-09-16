import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const RadioButton = ({ label, value, selected, onSelect }: any) => (
  <View style={{}}>
    <TouchableOpacity
      style={selected ? styles.selectedRadioButton : styles.radioButton}
      onPress={() => onSelect(value)}
    >
      <View className='w-3 border-2 rounded-full h-3' style={selected ? styles.selectedButton : styles.unSelectedButton} />
      <Text style={selected ? styles.selectedLabel : styles.label}>{label}</Text>
    </TouchableOpacity>
  </View>

);

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedRadioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  unSelectedButton: {
    backgroundColor: 'white',
    borderColor: 'grey'
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  label: {
    marginLeft: 6,
  },
  selectedLabel: {
    marginLeft: 6,
    fontWeight: 'bold', // Customize the selected button's label style
  },
})