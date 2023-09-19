import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import theme, { Text } from "./Theme";

export default function CustomTabs({
    selectionMode,
    option1,
    option2,
    option3,
    onSelectSwitch,
}: any) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = (value: number) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View
            style={{
                height: 34,
                width: '100%',
                borderColor: '#AD40AF',
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 10
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1 ? '#FFA500' : '#e4e4e4',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#FFA500",
                    marginRight: 8,
                    marginLeft: 8
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? 'white' : 'black',
                        paddingRight: 10,
                        fontSize: 14
                    }}>
                    {option1}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? '#FFA500' : '#e4e4e4',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#FFA500",
                    marginRight: 8
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 2 ? 'white' : 'black',
                        paddingHorizontal: 10,
                        fontSize: 14
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(3)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 3 ? '#FFA500' : '#e4e4e4',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#FFA500",
                    marginRight: 8
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 3 ? 'white' : 'black',
                        paddingHorizontal: 10,
                        fontSize: 14
                    }}>
                    {option3}
                </Text>
            </TouchableOpacity>
        </View>
    );
}