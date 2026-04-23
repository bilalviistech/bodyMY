import React, { useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio, TouchableOpacity, Modal } from 'react-native'
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import BMIModal from '../../components/metrics/BMIModal'
import WHtRModal from '../../components/metrics/WHtRModal'
import MetricRowList from '../../components/metrics/MetricRowList'

const METRICS = [
    {
        id: '1',
        title: 'Heart Rate',
        subtitle: 'Resting · from video',
        value: '64 bpm',
        status: 'Normal',
    },
    {
        id: '2',
        title: 'HRV',
        subtitle: 'Resting · from video',
        value: '42 ms',
        status: 'Low-normal',
    },
    {
        id: '3',
        title: 'Mental stress',
        subtitle: 'Score out of 100',
        value: '38/100',
        status: 'Moderate',
    },
    {
        id: '4',
        title: 'Facial skin age',
        subtitle: 'From facial analysis',
        value: '38 yrs',
        status: '-3 years',
    },
    {
        id: '5',
        title: 'BMI',
        subtitle: 'From height & weight',
        value: '25.8',
        status: 'Slight ovwt',
    },
    {
        id: '6',
        title: 'WHtR',
        subtitle: 'Weight-to-height ratio',
        value: '0.47',
        status: 'Healthy',
    },
    {
        id: '7',
        title: 'ABSI',
        subtitle: 'Body shape index',
        value: '0.0772',
        status: 'Normal',
    },
    {
        id: '8',
        title: 'Wellness score',
        subtitle: 'Overall composite',
        value: '78/100',
        status: 'Good',
    },
];

const AllMetrics = () => {
    const [showBMI, setShowBMI] = useState(false);
    const [showWHtR, setShowWHtR] = useState(false)

    const { width: screenWidth } = useWindowDimensions();
    const scale = screenWidth / 375;
    const rs = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
    return (
        <ScreenWrapperForDashboard>
            <View style={st(rs).header}>
                <Text style={st(rs).title}>all
                    <Text style={st(rs).subtitle}> metrics.</Text>
                </Text>
                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    Today · Oct 28
                </Text>
            </View>

            <View style={st(rs).card}>
                {METRICS.map((item, index) => (
                    <MetricRowList
                        key={item.id}
                        item={item}
                        rs={rs}
                        isLast={index === METRICS.length - 1}
                        index={index}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={() => setShowBMI(true)}><Text>Press me to show BMI</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowWHtR(true)}><Text>Press me to show WHtR</Text></TouchableOpacity>

            <BMIModal
                visible={showBMI}
                bmi={25.8}
                onClose={() => setShowBMI(false)}
            />

            <WHtRModal
                visible={showWHtR}
                whtr={0.47}
                onClose={() => setShowWHtR(false)}
            />
            
        </ScreenWrapperForDashboard>
    )
}

const st = (rs) => StyleSheet.create({
    header: {
        marginVertical: 10,
        marginHorizontal: 7,
    },
    title: {
        fontSize: 35,
        color: '#151515',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 37

    },
    subtitle: {
        fontSize: 35,
        color: '#3D6B4F',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 43
    },
    card: {
        backgroundColor: '#F0EDE6',
        borderRadius: rs(6),
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: "#C4B89A"
    },
});

export default AllMetrics