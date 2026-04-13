import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const CustomErrorToast = ({ text1, text2, props }) => {
    return (
        <View style={styles.container}>
            {/* Red indicator bar */}
            <View style={[styles.indicator, props.indicator]} />

            {/* Text container */}
            <View style={styles.textContainer}>
                <Text style={[styles.title, props?.text1Style]}>{text1}</Text>
                {text2 ? (
                    <Text style={[styles.message, props?.text2Style]}>{text2}</Text>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        width: width * 0.9,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    indicator: {
        width: 6,
        borderRadius: 3,
        marginRight: 10,
        height: '100%',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    message: {
        fontSize: width * 0.04,
        color: '#000',
    },
});