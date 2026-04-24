import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

const BMIModal = ({ visible, onClose, bmi = 0 }) => {
    const getStatus = () => {
        if (bmi > 30) return { label: 'Obese', color: '#C94A3D' };
        if (bmi <= 18.4) return { label: 'Underweight', color: '#999' };
        if (bmi < 25) return { label: 'Normal', color: '#3D6B4F' };
        if (bmi <= 30) return { label: 'Slightly elevated', color: '#C96A3D' };
        return { label: 'Obese', color: '#C94A3D' };
    };

    const status = getStatus();
    const getPosition = () => {
        let percent = 0;
        if (bmi <= 18.4) {
            percent = (bmi / 18.5) * 37.5;
        }
        else if (bmi < 26) {
            percent = 38 + ((bmi - 18.5) / (25 - 18.5)) * 29;
        }
        else {
            const capped = Math.min(bmi, 31);
            percent = 38 + ((capped - 18.5) / (25 - 18.5)) * 32;
        }
        return `${percent}%`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Body mass index (BMI)</Text>
                        <View style={[styles.badge, { backgroundColor: status.color + '20' }]}>
                            <Text style={[styles.badgeText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>

                    {/* BMI Value */}
                    <Text style={styles.bmiValue}>{bmi}</Text>

                    {/* Progress Bar */}
                    <View style={styles.barWrapper}>
                        <View style={styles.bar}>
                            <View style={styles.barUnder} />
                            <View style={styles.barNormal} />
                            <View style={styles.barOver} />
                            <View style={styles.barObese} />
                        </View>

                        {/* Indicator */}
                        <View style={[styles.indicator, { left: getPosition(), backgroundColor: status.color }]} />
                    </View>

                    {/* Labels */}
                    <View style={styles.labelsRow}>
                        <Text style={styles.label}>Under</Text>
                        <Text style={styles.label}>18.5</Text>
                        <Text style={styles.label}>25</Text>
                        <Text style={styles.label}>30+</Text>
                    </View>

                    {/* Range Info */}
                    <Text style={styles.rangeText}>
                        Normal: 18.5–24.9 • Overweight: 25–29.9
                    </Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Info */}
                    <Text style={styles.infoText}>
                        Based on height 5'11" (180 cm) and weight 185 lbs (83.9 kg)
                    </Text>

                    {/* Close Button */}
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
    bmiValue: {
        fontSize: 48,
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
    barUnder: {
        flex: 15.8,
        backgroundColor: '#E5E5E5',
    },
    barNormal: {
        flex: 12.6,
        backgroundColor: '#EAF3EE',
    },
    barOver: {
        flex: 11.5,
        backgroundColor: '#F3E1D8',
    },
    barObese: {
        flex: 2,
        backgroundColor: '#F3D6D3',
    },
    indicator: {
        position: 'absolute',
        top: -4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#C96A3D',
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

export default BMIModal