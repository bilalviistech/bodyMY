import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CustomErrorToast = ({ text1, text2 }) => {
    return (
        <View style={[styles.container, styles.error]}>
            <Text style={styles.title}>{text1}</Text>
            {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
        </View>
    );
};

export const CustomSuccessToast = ({ text1, text2 }) => {
    return (
        <View style={[styles.container, styles.success]}>
            <Text style={styles.title}>{text1}</Text>
            {text2 ? <Text style={styles.subtitle}>{text2}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    error: {
        backgroundColor: '#FF3B30',
    },
    success: {
        backgroundColor: '#34C759',
    },
    title: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    },
});