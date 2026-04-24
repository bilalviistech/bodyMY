import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMetrics from '../screens/insights/AllMetrics';
import WellnessScoreResult from '../screens/insights/WellnessScoreResult';

const Stack = createNativeStackNavigator();

export default function InsightStack() {
    return (
        <Stack.Navigator 
            initialRouteName={'AllMetrics'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AllMetrics" component={AllMetrics} />
            <Stack.Screen name="WellnessScoreResult" component={WellnessScoreResult} />
        </Stack.Navigator>
    );
}