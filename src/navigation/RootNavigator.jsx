import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import SplashScreen from '../screens/splash/SplashScreen';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        animationDuration: 800,
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      {userToken ? (
        <RootStack.Screen name="AppStack" component={AppStack} />
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
}