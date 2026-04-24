import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const HRVModal = ({ visible, onClose, hrv = 0 }) => {

    // Status logic (approx HRV interpretation)
    const getStatus = () => {
        if (hrv < 40) return { label: 'Low', color: '#C94A3D' };
        if (hrv <= 65) return { label: 'Normal', color: '#3D6B4F' };
        if (hrv <= 80) return { label: 'Good', color: '#7FB77E' };
        return { label: 'High', color: '#3A7DFF' };
    };

    const status = getStatus();

    // Indicator position (40 → 100 scale)
    const getPosition = () => {
        const min = 40;
        const max = 100;

        const clamped = Math.max(min, Math.min(hrv, max));
        const percent = ((clamped - min) / (max - min)) * 100;

        return `${percent}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>
                            HEART RATE <Text style={styles.subTitle}>{hrv} ms</Text> {status.label}
                        </Text>

                        <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                            <Text style={[styles.badgeText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* Value */}
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>{hrv}</Text>
                        <Text style={styles.unit}>ms</Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#E5E5E5' }]} />
                            <View style={[styles.segment, { flex: 25, backgroundColor: '#EAF3EE' }]} />
                            <View style={[styles.segment, { flex: 20, backgroundColor: '#DCEFE2' }]} />
                            <View style={[styles.segment, { flex: 35, backgroundColor: '#E6EAF5' }]} />
                        </View>

                        {/* Indicator */}
                        <View
                            style={[
                                styles.indicator,
                                { left: getPosition(), backgroundColor: '#000' }
                            ]}
                        />
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>40</Text>
                        <Text style={styles.label}>60</Text>
                        <Text style={[styles.label, { color: '#3D6B4F' }]}>65</Text>
                        <Text style={styles.label}>80</Text>
                        <Text style={styles.label}>100+</Text>
                    </View>

                    {/* Range Info */}
                    <Text style={styles.rangeText}>
                        Your range: 40–65 ms. Today is on the lower end.
                    </Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Info */}
                    <Text style={styles.info}>
                        Low HRV often signals stress or fatigue. A good night's sleep typically restores it within 24 hrs.
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: '#F4F1EA',
        borderRadius: 16,
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: '#666',
    },
    subTitle: {
        fontWeight: '600',
        color: '#000',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    value: {
        fontSize: 48,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    unit: {
        fontSize: 20,
        marginLeft: 8,
        color: '#777',
        marginBottom: 6,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    barWrapper: {
        marginTop: 10,
        marginBottom: 5,
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
        top: -4,
        width: 16,
        height: 16,
        borderRadius: 8,
        transform: [{ translateX: -8 }],
    },
    labelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    label: {
        fontSize: 12,
        color: '#777',
    },
    rangeText: {
        marginTop: 10,
        fontSize: 13,
        color: '#2D6A4F',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    info: {
        fontSize: 13,
        color: '#666',
    },
    closeBtn: {
        marginTop: 15,
        alignSelf: 'flex-end',
    },
    closeText: {
        color: '#3D6B4F',
        fontWeight: '600',
    },
});

export default HRVModal;