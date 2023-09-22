import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

type HeaderButton = {
    child: JSX.Element;
    onPress?: () => void;
};

type Props = {
    leftButton?: HeaderButton;
    rightButton?: HeaderButton;
    label?: string
};

export const Header = (props: Props) => {
    const { leftButton, rightButton, label } = props;

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {leftButton && (
                    <TouchableOpacity onPress={leftButton.onPress}>
                        {leftButton.child}
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.middleContainer}>
                {/* Logo/Title/etc goes here */}
                <Text className='font-["gothici-Regular"]' style={{ fontSize: 18 }}>{label}</Text>
            </View>
            <View style={styles.rightContainer}>
                {rightButton && (
                    <TouchableOpacity onPress={rightButton.onPress}>
                        {rightButton.child}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //paddingTop: 50,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#87CEEB',
    },
    leftContainer: {
        alignItems: 'flex-start',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    middleContainer: {
        flex: 1,
        alignItems: 'center',
    },
});