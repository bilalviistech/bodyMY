import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import WellnessTrendChart from '../../components/trends/WellnessTrendChart'
import MetricCard from '../../components/common/MetricCard'

const Trends = () => {
    return (
        <ScreenWrapperForDashboard>
            <Text style={styles.subtitle}>
                30-day <Text style={{ color: "#3D6B4F" }}>picture.</Text>
            </Text>

            <WellnessTrendChart />
            <View style={styles.row}>
                {[
                    { label: "HEART RATE", value: "62", unit: "bpm", trend: "down", trendValue: "4 bpm" },
                    { label: "Avg HRV", value: "46", unit: "ms", trend: "down", trendValue: "8 bpm" },
                    { label: "Avg stress", value: "34", unit: "/100", trend: "down", trendValue: "6 pts" },
                    { label: "Skin age", value: "38", unit: "yrs", trend: "down", trendValue: "1.4 yrs" },
                    { label: "BMI", value: "25.8", trend: "down", trendValue: "0.4" },
                    { label: "Check-ins", value: "26", unit: "/30", trend: "down", trendValue: "4 vs prev" }
                ].map((item, index) => (
                    <View key={index} style={styles.item}>
                        <MetricCard {...item} />
                    </View>
                ))}
            </View>
        </ScreenWrapperForDashboard>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 35,
        color: '#1E1A14',
        fontFamily: 'PlayfairDisplay-Bold',
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
    }
})

export default Trends