import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import InitialProfile from '../screens/home/InitialProfile';
import MainTabNavigator from './BottomTabs';
import VideoResultScreen from '../screens/home/VideoResultScreen'
import WellnessScoreResult from '../screens/home/WellnessScoreResult'
import FaceVideoRecordingScreen from '../screens/home/FaceVideoRecordingScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitialProfile" component={InitialProfile} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="VideoResult" component={VideoResultScreen} />
      <Stack.Screen name="WellnessScoreResult" component={WellnessScoreResult} />

      {/* Yeh nayi line add karo */}
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}