import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import Feather from 'react-native-vector-icons/Feather';

const DURATIONS = [
    { label: '15s', sub: 'Quick', value: 15 },
    { label: '30s', sub: 'Standard', value: 30 },
    { label: '60s', sub: 'Deep', value: 60 },
];

const MetricCard = ({ label, value, unit, outOf, trend, trendValue }) => {
    const isUp = trend === 'up';
    return (
        <View style={styles.card1}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.unit}>{unit}</Text>
            {outOf && <Text style={styles.outOf}>{outOf}</Text>}
            <View style={styles.trendRow}>
                {/*  */}
                <Text style={[styles.trendArrow, isUp ? styles.trendUp : styles.trendDown]}>
                    {isUp ? <Feather name="arrow-up" size={18} color="#3D6B4F" /> : <Feather name="arrow-down" size={18} color="#3D6B4F" />}
                </Text>
                <Text style={styles.trendText}>{trendValue}</Text>
            </View>
            <View style={styles.greenBar} />
        </View>
    );
};

const HomeScreen = () => {
    const [selectedDuration, setSelectedDuration] = useState(30);
    return (
        <ScreenWrapperForDashboard>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Good Morning, Patrick
                </Text>
                <Text style={styles.subtitle}>
                    this is
                </Text>
                <Text style={styles.subtitle}>
                    <Text style={{ color: "#3D6B4F" }}>you,</Text> today
                </Text>
            </View>

            <View style={styles.badges}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Day 14</Text>
                </View>
                <View style={[styles.badge, styles.secondBadge]}>
                    <Text style={styles.secondBadgeText}>30s check in due</Text>
                </View>
            </View>

            {/*  */}
            <View style={styles.card}>
                {/* Watermark "me" text */}
                <Text style={styles.watermark}>me</Text>

                {/* Header */}
                <Text style={styles.topLabel}>Today's Check-In</Text>
                <Text style={styles.title1}>Records Now</Text>

                {/* Duration Buttons */}
                <View style={styles.durationRow}>
                    {DURATIONS.map((d) => {
                        const isSelected = selectedDuration === d.value;
                        return (
                            <TouchableOpacity
                                key={d.value}
                                style={[styles.durationBtn, isSelected && styles.durationBtnActive]}
                                onPress={() => setSelectedDuration(d.value)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.durationValue, isSelected && styles.durationValueActive]}>
                                    {d.label}
                                </Text>
                                <Text style={[styles.durationSub, isSelected && styles.durationSubActive]}>
                                    {d.sub}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View style={styles.row}>
                <MetricCard
                    label="HEART RATE"
                    value="62"
                    unit="bpm"
                    trend="down"
                    trendValue="4 from last week"
                />
                <MetricCard
                    label="WELLNESS SCORE"
                    value="78"
                    unit="bpm"
                    trend="up"
                    trendValue="5 pts last week"
                />
            </View>

            <View style={styles.card2}>
                <Text style={styles.title2}>
                    Morning pattern
                </Text>

                <Text style={styles.subtitle2}>
                    Energy 20% higher on early check-in{'\n'}days.
                </Text>
            </View>
        </ScreenWrapperForDashboard>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE8DF',
        paddingHorizontal: 24,
    },
    header: {
        marginHorizontal: 5,
    },
    title: {
        paddingBottom: 12,
        fontSize: 17,
        color: '#727272',
        fontFamily: 'sans-serif',
    },
    subtitle: {
        fontSize: 35,
        color: '#1E1A14',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 38
    },
    badges: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 18,
    },
    badge: {
        backgroundColor: '#C8E0D0',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 50,
    },
    secondBadge: {
        backgroundColor: '#DDD5C6',
    },
    badgeText: {
        color: '#3D6B4F',
        fontSize: 13,
    },
    secondBadgeText: {
        color: '#727272',
        fontSize: 13,
    },
    card: {
        backgroundColor: '#1C1A17',
        borderRadius: 4,
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
        marginTop: 20,
    },
    watermark: {
        position: 'absolute',
        top: 10,
        left: '36%',
        fontSize: 90,
        color: '#3D6B4F',
        opacity: 0.16,
        zIndex: 99,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    topLabel: {
        color: '#EEE8DF',
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 4,
        zIndex: 1,
    },
    title1: {
        color: '#EEE8DF',
        fontSize: 16,
        fontFamily: 'PlayfairDisplay-Bold',
        marginBottom: 20,
        zIndex: 1,
    },
    durationRow: {
        flexDirection: 'row',
        gap: 10,
        zIndex: 1,
    },
    durationBtn: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#232222',
        borderWidth: 0.5,
        borderColor: "#EEE8DF"
    },
    durationBtnActive: {
        backgroundColor: '#B85C38',
    },
    durationValue: {
        color: '#8A8575',
        fontSize: 20,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    durationValueActive: {
        color: '#FFFFFF',
    },
    durationSub: {
        color: '#5A5650',
        fontSize: 14,
        marginTop: 4,
        fontWeight: 600
    },
    durationSubActive: {
        color: '#F0E8E0',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
    },
    card1: {
        width: '49%',
        backgroundColor: '#F7F3EE',
        borderRadius: 4,
        padding: 16,
        borderColor: "#C4B89A",
        borderWidth: 0.5
    },
    label: {
        fontSize: 12,
        letterSpacing: 1,
        color: '#8A8575',
        marginBottom: 10,
    },
    value: {
        fontSize: 42,
        color: '#1C1A17',
        lineHeight: 52,
        fontFamily: 'PlayfairDisplay-Bold',
    },
    unit: {
        fontSize: 15,
        color: '#1C1A17',
        fontFamily: 'PlayfairDisplay-Bold',
        marginTop: 2,
        marginBottom: 2,
    },
    outOf: {
        fontSize: 15,
        color: '#1C1A17',
        fontWeight: '500',
        marginTop: 2,
        marginBottom: 2,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
        marginBottom: 10,
    },
    trendArrow: {
        fontSize: 17,
        fontWeight: '600',
    },
    trendUp: {
        color: '#3D6B4F',
    },
    trendDown: {
        color: '#3D6B4F',
    },
    trendText: {
        fontSize: 12,
        color: '#3D6B4F',
        fontWeight: '500',
    },
    greenBar: {
        height: 3,
        width: 40,
        backgroundColor: '#3D6B4F',
        borderRadius: 2,
        marginTop: 2,
    },
    card2: {
        backgroundColor: '#F7F3EE',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderLeftColor: "#3D6B4F",
        borderLeftWidth: 3,
        marginTop: 20
    },
    title2: {
        fontSize: 15,
        fontWeight: '400',
        color: '#3D6B4F',
        marginBottom: 4,
    },
    subtitle2: {
        fontSize: 13,
        color: '#727272',
        lineHeight: 20,
    },
});

export default HomeScreen