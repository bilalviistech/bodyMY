import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { CustomErrorToast } from './src/components/common/CustomToast';

const toastConfig = {
  custom_error: (props) => <CustomErrorToast {...props} />,
};

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <Toast
        ref={(ref) => Toast.setRef(ref)}
        config={toastConfig}
      />
    </AuthProvider>
  );
}