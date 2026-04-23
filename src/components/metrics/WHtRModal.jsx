import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const WHtRModal = ({ visible, onClose, whtr = 0 }) => {
whtr= 0.4
    const getStatus = () => {
        if (whtr > 0.6) return { label: 'High Risk', color: '#C94A3D' };
        if (whtr >= 0.5) return { label: 'Increased Risk', color: '#C96A3D' };
        if (whtr >= 0.4) return { label: 'Healthy', color: '#3D6B4F' };
        return { label: 'Low', color: '#999' };
    };

    const status = getStatus();

    const getPosition = () => {
        let percent = 0;

        if (whtr <= 0.4) {
            percent = (whtr / 0.4) * 30;
        }
        else if (whtr <= 0.5) {
            percent = 30 + ((whtr - 0.4) / (0.5 - 0.4)) * 30;
        }
        else if (whtr <= 0.6) {
            percent = 60 + ((whtr - 0.5) / (0.6 - 0.5)) * 30;
        }
        else {
            percent = 90;
        }

        return `${percent}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Waist-to-Height Ratio (WHtR)</Text>
                        <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                            <Text style={[styles.badgeText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* Value */}
                    <Text style={styles.value}>{whtr.toFixed(2)}</Text>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={styles.barVeryLow} />
                            <View style={styles.barLow} />
                            <View style={styles.barHealthy} />
                            <View style={styles.barRisk} />
                            <View style={styles.barHigh} />
                        </View>

                        {/* <View
                            style={[
                                styles.indicator,
                                { left: getPosition(), backgroundColor: status.color }
                            ]}
                        /> */}
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>to Low</Text>
                        <Text style={styles.label}>0.4</Text>
                        <Text style={styles.label}>0.5</Text>
                        <Text style={styles.label}>0.6</Text>
                        <Text style={styles.label}>0.6+</Text>
                    </View>

                    {/* Info */}
                    <Text style={styles.rangeText}>
                        Healthy: &lt; 0.5 • Risk: 0.5–0.6 • High: &gt; 0.6
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.infoText}>
                        WHtR = Waist ÷ Height (same units)
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
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: 10,
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
    barVeryLow: {
        flex: 2,
        backgroundColor: 'yellow',
    },
    barLow: {
        flex: 6,
        backgroundColor: 'red',
    },
    barHealthy: {
        flex: 6,
        backgroundColor: 'green',
    },
    barRisk: {
        flex: 8,
        backgroundColor: 'blue',
    },
    barHigh: {
        flex: 5,
        backgroundColor: '#F3D6D3',
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
        color: '#C96A3D',
        fontSize: 13,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    infoText: {
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

export default WHtRModal;