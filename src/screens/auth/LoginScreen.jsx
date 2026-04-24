import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import googleIcons from "../../assets/icon/flat-color-icons_google.png";
import LoadingModal from '../../components/common/LoadingModal';
// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values) => {
    Keyboard.dismiss();
    setIsLoading(true);
    const email = values.email.trim();
    const password = values.password;

    if (email !== "testing@mail.com") {
      Toast.show({
        type: 'custom_error',
        text1: 'Login Failed',
        text2: 'Email is incorrect 👎',
        visibilityTime: 3000,
        position: 'top',
      });
      setIsLoading(false);
      return;
    }

    if (password !== "123456") {
      Toast.show({
        type: 'custom_error',
        text1: 'Login Failed',
        text2: 'Password is incorrect 👎',
        visibilityTime: 3000,
        position: 'top',
      });
      setIsLoading(false);
      return;
    }

    // await login("123456789875");
    setTimeout(async () => {
      await login("123456789875");
      setIsLoading(false);
      Toast.show({
        type: 'custom_success',
        text1: 'Login Successfull',
        text2: 'Welcome to dashbaord',
        visibilityTime: 3000,
        position: 'top',
      });
    }, 2000);
  };

  // const handleAppleSignIn = async () => {
  //   try {
  //     const response = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     console.log('Apple success:', response);
  //     // Backend pe token bhejo
  //   } catch (error) {
  //     if (error.code === appleAuth.Error.CANCELED) {
  //       console.log('User cancelled');
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE8DF" />

      {/* Header text */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome back!
        </Text>
        <Text style={styles.subtitle}>
          this is <Text style={{ color: "#3D6B4F" }}>me.</Text>
        </Text>
      </View>

      <View>
        <Button
          text={"Continue with Apple"}
          touchableStyle={styles.appleBtn}
          textStyle={styles.appleBtnText}
          viewStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}
          handleSubmit={() => console.log("is working")} isLoading={false} showIsLoading={false}
          iconName={"logo-apple"}
          iconColor={"#1E1A14"}
        />
        <Button
          text={"Continue with Google"}
          touchableStyle={styles.appleBtn}
          textStyle={styles.appleBtnText}
          viewStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 }}
          handleSubmit={() => console.log("is working")} isLoading={false} showIsLoading={false}
          imageName={googleIcons}
          iconColor={"transparent"}
        />
      </View>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Formik form */}
      <Formik
        initialValues={{ email: 'testing@mail.com', password: '123456' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* Email */}
            <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "capitalize" }}>email</Text>
            <TextInput
              style={[styles.input, { marginBottom: 8 }]}
              placeholder="Enter email"
              placeholderTextColor="#666"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password */}
            <View style={[styles.passwordWrapper]}>
              <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "capitalize" }}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#666"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Remember + Forgot */}
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.btnText}>Login</Text>
                {isLoading && (
                  <ActivityIndicator
                    color="#EEE8DF"
                    size="small"
                    style={{ marginLeft: 10 }}
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Apple Button - iOS only */}
            {/* {Platform.OS === 'ios' && (
                <AppleButton
                  buttonStyle={AppleButton.Style.WHITE}
                  buttonType={AppleButton.Type.CONTINUE}
                  style={styles.appleBtn}
                  onPress={handleAppleSignIn}
                />
              )} */}


            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate('Register')}
                >
                  Register Now
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>

      {/* <LoadingModal
        visible={isLoading}
        title="Signing you in..."
        subtitle="Please wait a moment"
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE8DF',
    paddingHorizontal: 24,
  },
  header: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  title: {
    marginTop: 20,
    fontSize: 17,
    color: '#727272',
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 35,
    color: '#1E1A14',
    fontFamily: 'PlayfairDisplay-Bold',
    lineHeight: 38
  },
  form: {
    marginHorizontal: 5,
    flex: 1,
  },
  input: {
    backgroundColor: '#F7F3EE',
    borderWidth: 1,
    borderColor: '#C4B89A',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#666',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eye: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 12,
    top: 29,
  },
  forgot: {
    color: '#3D6B4F',
    fontSize: 16,
    fontFamily: 'sans-serif',
    textAlign: "right",
    paddingVertical: 10
  },
  loginBtn: {
    backgroundColor: '#3D6B4F',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24
  },
  appleBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginVertical: 10
  },
  appleBtnText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
  },
  btnText: {
    color: '#EEE8DF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: 'center',
    marginBottom: 25,
  },
  footerText: {
    color: '#888',
    fontSize: 16,
  },
  register: {
    color: '#3D6B4F',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 14,
    marginBottom: 10
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    maxWidth: 360,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADCE0',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 17,
    color: '#70757A',
    fontWeight: '400',
  },
});

export default LoginScreen