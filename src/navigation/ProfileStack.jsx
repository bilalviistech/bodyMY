import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecurityPrivacy from '../screens/profile/SecurityPrivacy';
import DataSources from '../screens/profile/DataSources';
import ProfileScreen from '../screens/home/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator 
            initialRouteName={'ProfileScreen'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SecurityPrivacy" component={SecurityPrivacy} />
            <Stack.Screen name="DataSources" component={DataSources} />
        </Stack.Navigator>
    );
}