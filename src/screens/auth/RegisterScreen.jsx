import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import googleIcons from "../../assets/icon/flat-color-icons_google.png";
import Input from '../../components/common/Input';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('VerifyEmail')
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header text */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Create your
            </Text>
            <Text style={styles.subtitle}>
              account.
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

          {/* Inputs */}
          <View style={styles.form}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>First Name</Text>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>Last Name</Text>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
                />
              </View>
            </View>

            <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>Email</Text>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
            />

            <View style={[styles.passwordWrapper, { marginBottom: 16 }]}>
              <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>Password</Text>
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
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

            {/* Login Button */}
            <TouchableOpacity style={styles.signUpBtn} onPress={() => console.log("is working")}>
              <Text style={styles.btnText}>
                Sign Up
              </Text>
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
                Already have an account?{' '}
                <Text
                  style={styles.signNow}
                  onPress={() => navigation.navigate('Login')}
                >
                  Sign Now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginVertical: 20,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 35,
    color: '#151515',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  subtitle: {
    fontSize: 35,
    color: '#3D6B4F',
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
  inputActive: {
    backgroundColor: '#fff',   // 🔥 change when typing
    borderColor: '#000',       // optional highlight
  },
  passwordWrapper: {
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: 12,
    top: 29,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  signUpBtn: {
    backgroundColor: '#3D6B4F',
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24
  },
  btnText: {
    color: '#EEE8DF',
    fontSize: 18,
    fontWeight: 'bold',
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
  signNow: {
    color: '#3D6B4F',
    fontWeight: 'bold',
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

export default RegisterScreen