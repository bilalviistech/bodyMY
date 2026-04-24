import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const StressModal = ({ visible, onClose, score = 0 }) => {

    // Status logic
    const getStatus = () => {
        if (score <= 40) return { label: 'Low', color: '#3D6B4F' };
        if (score <= 70) return { label: 'Moderate', color: '#C9A23D' };
        return { label: 'High', color: '#C94A3D' };
    };

    const status = getStatus();

    // Indicator position (0 → 100 scale)
    const getPosition = () => {
        const clamped = Math.max(0, Math.min(score, 100));
        return `${clamped}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Mental stress score</Text>
                        <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                            <Text style={[styles.badgeText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* Score */}
                    <Text style={styles.value}>
                        {score} <Text style={styles.total}>/100</Text>
                    </Text>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={[styles.segment, { flex: 40, backgroundColor: '#EAF3EE' }]} />
                            <View style={[styles.segment, { flex: 30, backgroundColor: '#F3EBD8' }]} />
                            <View style={[styles.segment, { flex: 30, backgroundColor: '#F3D6D3' }]} />
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
                        <Text style={styles.label}>Calm</Text>
                        <Text style={styles.label}>0</Text>
                        <Text style={[styles.label, { color: '#3D6B4F' }]}>40</Text>
                        <Text style={styles.label}>70</Text>
                        <Text style={styles.label}>High</Text>
                    </View>

                    {/* Description */}
                    <Text style={styles.desc}>
                        Low–moderate (0–40 = low stress). You’re in a good range.
                    </Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Info */}
                    <Text style={styles.info}>
                        Derived from facial micro-expression analysis and vocal stress cues in your check-in recording.
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
    total: {
        fontSize: 24,
        color: '#555',
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
    desc: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
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

export default StressModal;