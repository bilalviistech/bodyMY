import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { CustomErrorToast, CustomSuccessToast } from './src/components/common/CustomToast';
import { NavigationContainer } from '@react-navigation/native';

const toastConfig = {
  custom_error: (props) => <CustomErrorToast {...props} />,
  custom_success: (props) => <CustomSuccessToast {...props} />,
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast
        ref={(ref) => Toast.setRef(ref)}
        config={toastConfig}
      />
    </AuthProvider>
  );
}