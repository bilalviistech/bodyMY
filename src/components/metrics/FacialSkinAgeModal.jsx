import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const FacialSkinAgeModal = ({ visible, onClose, skAge = 0}) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <Text style={styles.title}>Facial skin age estimate</Text>

                    {/* Value */}
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>{skAge}</Text>
                        <Text style={styles.unit}>ms</Text>
                    </View>

                    {/* Sub info */}
                    <Text style={styles.subText}>
                        3 years younger than chronological age (41)
                    </Text>
                    {/* Sub info */}
                    <Text style={styles.subText2}>
                        Estimated from skin texture, pore visibility, fine lines and elasticity markers in your facial video. Not a medical diagnosis
                    </Text>

                    {/* Close */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: '#0B0B0B',
        borderRadius: 18,
        padding: 20,
    },
    title: {
        color: '#999',
        fontSize: 16,
        letterSpacing: 1,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    value: {
        fontSize: 54,
        color: '#fff',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    unit: {
        fontSize: 20,
        color: '#8A7E6A',
        marginLeft: 8,
        marginBottom: 8,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    subText: {
        marginTop: 8,
        color: '#7FB77E',
        fontSize: 13,
    },
    subText2: {
        marginTop: 10,
        color: '#727272',
        fontSize: 13,
    },
    closeBtn: {
        marginTop: 18,
        alignSelf: 'flex-end',
    },
    closeText: {
        color: '#7FB77E',
        fontWeight: '600',
    },
});

export default FacialSkinAgeModal