import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    useWindowDimensions
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 64;

const RANGES = [
    { label: '90D', days: 90 },
    { label: '7D', days: 7 },
    { label: '30D', days: 30 },
];

const generateData = (days) => {
    let value = 55;
    const now = new Date();
    return Array.from({ length: days }, (_, i) => {
        value = Math.min(100, Math.max(30, value + (Math.random() - 0.42) * 8));
        const date = new Date(now);
        date.setDate(now.getDate() - (days - 1 - i));
        return {
            value: Math.round(value),
            date,
        };
    });
};

const formatDate = (date, days) => {
    if (!date) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (days === 7) {
        const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return d[date.getDay()];
    }
    return `${months[date.getMonth()]} ${date.getDate()}`;
};

export default function WellnessTrendChart() {
    const [selectedRange, setSelectedRange] = useState(30);

    const rawData = useMemo(() => generateData(selectedRange), [selectedRange]);

    const chartData = rawData.map((d, i) => ({
        value: d.value,
        hideDataPoint: i !== rawData.length - 1,
        dataPointColor: '#3D6B4F',
        dataPointRadius: 6,
    }));

    const avg = Math.round(
        rawData.reduce((sum, d) => sum + d.value, 0) / rawData.length
    );

    const startLabel = formatDate(rawData[0]?.date, selectedRange);
    const endLabel = formatDate(rawData[rawData.length - 1]?.date, selectedRange);

    const { width: screenWidth } = useWindowDimensions();
    const chartWidth = screenWidth - 32 - 32; // 16*2 margin + 16*2 padding (adjust if needed)

    return (
        <>
            <View style={styles.rangeRow}>
                {RANGES.map((r) => (
                    <TouchableOpacity
                        key={r.days}
                        style={[
                            styles.rangeBtn,
                            selectedRange === r.days && styles.rangeBtnActive,
                        ]}
                        onPress={() => setSelectedRange(r.days)}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.rangeBtnText,
                                selectedRange === r.days && styles.rangeBtnTextActive,
                            ]}
                        >
                            {r.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.card}>
                {/* Header */}
                {/* Range buttons */}

                <View style={styles.header}>
                    <Text style={styles.title}>Wellness score trend</Text>
                    <Text style={styles.avg}>{avg} avg</Text>
                </View>

                {/* Chart */}
                <View style={styles.chartWrapper}>
                    <LineChart
                        data={chartData}
                        width={chartWidth}
                        height={110}
                        color="#3D6B4F"
                        thickness={2.5}
                        curved
                        hideYAxisText
                        hideAxesAndRules
                        initialSpacing={0}
                        endSpacing={0}
                        adjustToWidth
                        startFillColor="transparent"
                        endFillColor="transparent"
                        areaChart={false}
                    />
                </View>

                {/* Date labels */}
                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>{startLabel}</Text>
                    <Text style={styles.dateLabel}>{endLabel}</Text>
                </View>


            </View>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        marginTop: 12,
        paddingHorizontal: 10,
        paddingTop: 16,
        borderWidth: 0.5,
        borderColor: '#C4B89A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: '#727272',
        fontSize: 16,
    },
    avg: {
        color: '#3D6B4F',
        fontSize: 13,
    },
    chartWrapper: {
        marginLeft: -14,
        marginRight: -12,   // dono taraf se thoda adjust
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginTop: 6,
        marginBottom: 12,
    },
    dateLabel: {
        color: '#8A8575',
        fontSize: 16,
        fontWeight: '500',
    },
    rangeRow: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',        // small screen pe wrap ho jaaye
        gap: 8,
    },
    rangeBtn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#8A8575',
    },
    rangeBtnActive: {
        backgroundColor: '#3D6B4F',
    },
    rangeBtnText: {
        color: '#8A8575',
        fontSize: 15,
    },
    rangeBtnTextActive: {
        color: '#EEE8DF',
    },
});