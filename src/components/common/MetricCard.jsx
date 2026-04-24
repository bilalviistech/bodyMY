import {
  View,
  Text,
  useWindowDimensions,
  PixelRatio,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MetricCard = ({ label, value, unit, trend, trendValue }) => {
  const { width: screenWidth } = useWindowDimensions();
  const scale = screenWidth / 375;
  const rs = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));
 
  const isUp = trend === 'up';
 
  return (
    <View style={s.card}>
      <Text style={s.label}>{label}</Text>
      <View style={s.valueRow}>
        <Text style={s.value}>{value}</Text>
        {unit ? <Text style={s.unit}>{unit}</Text> : null}
      </View>
      <View style={s.trendRow}>
        <Text style={[s.trendIcon, isUp ? s.trendUp : s.trendDown]}>
          {isUp ? <Feather name="arrow-up" size={18} color="#3D6B4F" /> : <Feather name="arrow-down" size={18} color="#3D6B4F" />}
        </Text>
        <Text style={[s.trendText, isUp ? s.trendUp : s.trendDown]}>
          {trendValue}
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E0DAD0',
  },
  label: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: '#8A8575',
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginBottom: 10,
  },
  value: {
    fontSize: 42,
    color: '#1C1A17',
    lineHeight: 50,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  unit: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: '#8A7E6A',
    marginBottom: 5,
    paddingLeft: 5
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
  trendText: {
    fontSize: 14,
  },
  trendUp: {
    color: '#3D6B4F',
  },
  trendDown: {
    color: '#3D6B4F',
  },
});

export default MetricCard