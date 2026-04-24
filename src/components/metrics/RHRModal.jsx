import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const RHRModal = ({ visible, onClose, rhr = 0 }) => {

    // Status logic
    const getStatus = () => {
        if (rhr < 60) return { label: 'Low', color: '#7FB77E' };
        if (rhr <= 80) return { label: 'Normal', color: '#3D6B4F' };
        return { label: 'High', color: '#C94A3D' };
    };

    const status = getStatus();

    // Position (40 → 100 scale)
    const getPosition = () => {
        const min = 40;
        const max = 100;

        const clamped = Math.max(min, Math.min(rhr, max));
        const percent = ((clamped - min) / (max - min)) * 100;

        return `${percent}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <Text style={styles.title}>RESTING HEART RATE</Text>

                    {/* Value */}
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>{rhr}</Text>
                        <Text style={styles.unit}>bpm</Text>
                    </View>

                    {/* Sub info */}
                    <Text style={styles.subText}>
                        ↑ 2 bpm from yesterday • {status.label} range
                    </Text>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#2D2D2D' }]} />
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#3D6B4F' }]} />
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#7FB77E' }]} />
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#C9A23D' }]} />
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#C94A3D' }]} />
                        </View>

                        {/* Indicator */}
                        <View
                            style={[
                                styles.indicator,
                                { left: getPosition(), borderColor: '#fff' }
                            ]}
                        />
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>40</Text>
                        <Text style={styles.label}>60</Text>
                        <Text style={styles.label}>64</Text>
                        <Text style={styles.label}>80</Text>
                        <Text style={styles.label}>100+</Text>
                    </View>

                    {/* Range text */}
                    <Text style={styles.rangeText}>
                        Normal (60–80 bpm for adults)
                    </Text>

                    {/* Close */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

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
        fontSize: 14,
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
        color: '#888',
        marginLeft: 8,
        marginBottom: 8,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    subText: {
        marginTop: 8,
        color: '#7FB77E',
        fontSize: 13,
    },
    barWrapper: {
        marginTop: 20,
    },
    bar: {
        height: 10,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    segment: {
        height: '100%',
    },
    indicator: {
        position: 'absolute',
        top: -5,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: '#000',
        transform: [{ translateX: -8 }],
    },
    labelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    label: {
        color: '#888',
        fontSize: 12,
    },
    rangeText: {
        marginTop: 10,
        color: '#7FB77E',
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

export default RHRModal;