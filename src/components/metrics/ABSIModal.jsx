import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const ABSIModal = ({ visible, onClose, absi = 0 }) => {
    // ABSI classification (approx ranges based on risk)
    const getStatus = () => {
        if (absi < 0.06) return { label: 'Very Low Risk', color: '#3A7DFF' };
        if (absi < 0.07) return { label: 'Excellent', color: '#3D6B4F' };
        if (absi < 0.08) return { label: 'Normal', color: '#7FB77E' };
        if (absi < 0.09) return { label: 'Average', color: '#C9A23D' };
        if (absi < 0.10) return { label: 'High Risk', color: '#C96A3D' };
        return { label: 'Very High Risk', color: '#C94A3D' };
    };

    const status = getStatus();

    // Position on bar (normalize between 0.06 → 0.11)
    const getPosition = () => {
        const min = 0.06;
        const max = 0.10;

        const clamped = Math.max(min, Math.min(absi, max));
        const percent = (clamped - min) * 2500;
        return `${percent}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>A Body Shape Index (ABSI)</Text>
                        <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                            <Text style={[styles.badgeText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* ABSI Value */}
                    <Text style={styles.value}>{absi.toFixed(3)}</Text>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={[styles.segment, { flex: 0.84, backgroundColor: '#3D6B4F30' }]} />
                            <View style={[styles.segment, { flex: 0.76, backgroundColor: '#7FB77E30' }]} />
                            <View style={[styles.segment, { flex: 0.75, backgroundColor: '#C9A23D30' }]} />
                            <View style={[styles.segment, { flex: 0.95, backgroundColor: '#C96A3D30' }]} />
                        </View>

                        {/* Indicator */}
                        <View
                            style={[
                                styles.indicator,
                                { left: getPosition(), backgroundColor: status.color }
                            ]}
                        />
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>0.06</Text>
                        <Text style={styles.label}>0.07</Text>
                        <Text style={styles.label}>0.08</Text>
                        <Text style={styles.label}>0.09</Text>
                        <Text style={styles.label}>0.10+</Text>
                    </View>

                    {/* Info */}
                    <Text style={styles.infoText}>
                        ABSI uses waist circumference, height, and BMI to estimate health risk.
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
        fontSize: 16,
        color: '#666',
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
    value: {
        fontSize: 42,
        marginVertical: 10,
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
    infoText: {
        marginTop: 10,
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

export default ABSIModal;