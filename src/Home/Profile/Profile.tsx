import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import DropDown from '../../Component/DropDown';

const data = [
  { label: 'David Mwangi', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const datas = [
  { label: 'Health', value: '1' },
  { label: 'Life', value: '2' },
  { label: 'Homeowner', value: '3' },
  { label: 'Car Insurance', value: '4' },
];

const Profile = () => {
  const [value, setValue] = useState('');
  const [values, setValues] = useState('');

  console.log(value)

  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
      <View className='mt-10 ml-2 mr-2'>
        <View className='flex-row'>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={datas}
            placeholder='Claim type'
          />
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item.value)}
            datas={data}
            placeholder="Claim amount"
          />
        </View>

        <View className='flex-row'>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={datas}
          />
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item.value)}
            datas={data}
          />
        </View>

        <View className='flex-row'>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={datas}
          />
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item.value)}
            datas={data}
          />
        </View>

        <View className='flex-row'>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={datas}
          />
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item.value)}
            datas={data}
          />
        </View>


      </View>
    </ScrollView>

  );
};

export default Profile;

const styles = StyleSheet.create({
});