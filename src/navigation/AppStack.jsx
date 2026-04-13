import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import FaceVideoRecordingScreen from '../screens/home/FaceVideoRecordingScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={FaceVideoRecordingScreen} />
      {/* <Stack.Screen name="Home" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}