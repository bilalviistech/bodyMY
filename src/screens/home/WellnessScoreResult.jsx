import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import WellnessScoreGauge from '../../components/wellnessscoreresult/WellnessScoreGauge'
import MetricCard from '../../components/common/MetricCard';

const WellnessScoreResult = () => {
    return (
        <ScreenWrapperForDashboard>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Today's results · Oct 28
                </Text>
                <Text style={styles.subtitle}>
                    your wellness
                </Text>
                <Text style={styles.subtitle}>
                    <Text style={{ color: "#3D6B4F" }}>picture.</Text>
                </Text>
            </View>

            <WellnessScoreGauge score={78} total={100} trend="up" trendText="5 pts this week" />

            <View style={styles.card}>
                <Text style={styles.title1}>
                    Today's insight
                </Text>

                <Text style={{ color: "#000000", fontFamily: "PlayfairDisplay-Bold", fontSize: 16, paddingBottom: 10, paddingTop: 5 }}>You look a little tired today.</Text>

                <Text style={styles.subtitle1}>
                    Your facial signals and HRV suggest{'\n'}mild fatigue. Plan a 10–15 min break{'\n'}around midday — even a short walk{'\n'}helps restore focus.
                </Text>
            </View>

            <View style={styles.row}>
                {[
                    { label: "HEART RATE", value: "62", unit: "bpm", trend: "down", trendValue: "4 bpm" },
                    { label: "HRV", value: "46", unit: "ms", trend: "down", trendValue: "8 bpm" },
                    { label: "Stress score", value: "34", unit: "/100", trend: "down", trendValue: "6 pts" },
                    { label: "Skin age", value: "38", unit: "yrs", trend: "down", trendValue: "1.4 yrs" },
                ].map((item, index) => (
                    <View key={index} style={styles.item}>
                        <MetricCard {...item} />
                    </View>
                ))}
            </View>

            <TouchableOpacity onPress={() => console.log("is working")}>
                <Text style={{ textAlign: "center", textDecorationLine: "underline", color: "#3D6B4F", fontWeight: 500 }}>See all metrics</Text>
            </TouchableOpacity>
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    item: {
        width: '48%',
        marginBottom: 10,
    },
    card: {
        width: '100%',
        backgroundColor: '#DEBA9F',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 0.5,
        borderColor: '#3D6B4F',
        marginVertical: 20
    },
    title1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#B85C38',
        marginBottom: 4,
    },
    subtitle1: {
        fontSize: 13,
        color: '#727272',
        lineHeight: 20,
    },
});

export default WellnessScoreResult