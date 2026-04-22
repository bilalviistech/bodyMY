import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import PasswordChangedScreen from '../screens/auth/PasswordChangedScreen';
import ForgotPasswordCodeScreen from '../screens/auth/ForgotPasswordCodeScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import { getHasSeenOnboarding, removeHasSeenOnboarding } from '../services/storage';
import { useEffect, useState } from 'react';
import OnBoardingScreens from '../screens/onboarding/OnBoardingScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        // await removeHasSeenOnboarding();
        const hasSeen = await getHasSeenOnboarding();
        setShowOnboarding(!hasSeen);
      } catch (e) {
        setShowOnboarding(true);
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     animation: 'fade_from_bottom',
    //     animationDuration: 450,
    //     contentStyle: { backgroundColor: '#000' },
    //   }}>
    //   {showOnboarding ? (
    //     <Stack.Screen name="Onboarding" component={OnBoardingScreens} />
    //   ) : (
    //     <>
    //       <Stack.Screen name="Login" component={LoginScreen} options={{ animationDuration: 450, animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="Register" component={RegisterScreen} options={{ animationDuration: 450, animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} options={{ animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCodeScreen} options={{ animation: 'fade_from_bottom' }} />
    //       <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{ animation: 'fade_from_bottom' }} />
    //     </>
    //   )}

    // </Stack.Navigator>
    <Stack.Navigator
      initialRouteName={showOnboarding ? 'Onboarding' : 'Login'}
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        animationDuration: 800,
        contentStyle: { backgroundColor: '#000' },
      }}>
      <Stack.Screen name="Onboarding" component={OnBoardingScreens} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCodeScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
}