import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const STATUS_COLORS = {
    Normal: { bg: '#C8E0D0', text: '#3D6B4F' },
    'Low-normal': { bg: '#DDD5C6', text: '#727272' },
    Moderate: { bg: '#C8E0D0', text: '#3D6B4F' },
    '-3 years': { bg: '#C8DDD6', text: '#2E5E4A' },
    'Slight ovwt': { bg: '#EDD5C5', text: '#B9603C' },
    Healthy: { bg: '#C8DDD6', text: '#2E5E4A' },
    Good: { bg: '#C8DDD6', text: '#2E5E4A' },
};

const MetricRowList = ({ item, rs, isLast, index, pressHandler }) => {
    const colors = STATUS_COLORS[item.status] ?? { bg: '#C8DDD6', text: '#2E5E4A' };
    const isEven = index % 2 === 0;

    return (
        <TouchableOpacity onPress={() => 
            item?.title == 'BMI' ? pressHandler('BMI') : 
            item?.title == 'ABSI' ? pressHandler('ABSI') :
            item?.title == 'Mental stress' ? pressHandler('Mental stress') :
            item?.title == 'HRV' ? pressHandler('HRV') :
            item?.title == 'WHtR' ? pressHandler('WHtR') :
            item?.title == 'Heart Rate' ? pressHandler('Heart Rate') :
            item?.title == 'Facial skin age' ? pressHandler('Facial skin age') :
            ''}
        >
            <View style={[st(rs).row, !isLast && st(rs).rowBorder, { backgroundColor: isEven ? '#FAFAF7' : '#F0EDE6' }]}>
                <View style={st(rs).rowTop}>
                    <Text style={st(rs).title1}>{item.title}</Text>
                    <Text style={st(rs).value}>{item.value}</Text>
                </View>
                <View style={st(rs).rowBottom}>
                    <Text style={st(rs).subtitle1}>{item.subtitle}</Text>
                    <View style={[st(rs).badge, { backgroundColor: colors.bg }]}>
                        <Text style={[st(rs).badgeText, { color: colors.text }]}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const st = (rs) => StyleSheet.create({
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
    row: {
        paddingVertical: rs(14),
        paddingHorizontal: rs(16),
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0DAD0',
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: rs(6),
    },
    rowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title1: {
        fontSize: rs(15),
        fontWeight: '500',
        color: '#727272',
    },
    value: {
        fontSize: rs(15),
        color: '#727272',
        fontFamily: 'PlayfairDisplay-Bold',
    },
    subtitle1: {
        fontSize: rs(12),
        color: '#8A8575',
        fontWeight: '400',
    },
    badge: {
        paddingHorizontal: rs(12),
        paddingVertical: rs(4),
        borderRadius: rs(20),
    },
    badgeText: {
        fontSize: rs(12),
    },
});

export default MetricRowList