import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/common/Input';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        setIsLoading(true);
        // console.warn('Resend code to:', email);
        // navigation.navigate('ForgotPasswordCode')
        setTimeout(async () => {
            setIsLoading(false);
            // Toast.show({
            //     type: 'custom_error',
            //     text1: 'Link has been sent',
            //     text2: `${email}`,
            //     props: {
            //     text1Style: { fontSize: 15 },
            //     text2Style: { fontSize: 13, color: '#000' },
            //     indicator: { backgroundColor: '#1bdf0a' }
            //     },
            //     position: 'top',
            //     visibilityTime: 4000,
            // });
            Toast.show({
              type: 'success',
              text1: 'Link has been sent',
              text2: `${email}`
            });
        }, 2000);
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <TouchableOpacity
                style={styles.container1}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <View style={styles.iconWrapper}>
                    <Icon name="chevron-left" size={25} color="#727272" />
                </View>
                <Text style={styles.text}>Back to login</Text>
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.header}>
                <Text style={styles.title}>Reset your</Text>
                <Text style={styles.subtitle}>password</Text>
                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    Enter your email and we'll send you a secure link to reset your password.
                </Text>
            </View>

            <View style={styles.form}>
                <Text style={{ color: "#727272", marginBottom: 5, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>EMAIL ADDRESS</Text>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
                />

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={handleForgotPassword}
                    disabled={isLoading}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.btnText}>Send Reset link</Text>
                        {isLoading && (
                            <ActivityIndicator
                                color="#EEE8DF"
                                size="small"
                                style={{ marginLeft: 10 }}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            {
                isLoading === false && (
                    <View style={styles.card}>
                        <Text style={styles.title1}>
                            Check your inbox
                        </Text>

                        <Text style={styles.subtitle1}>
                            If an account exists for this email, a{"\n"}reset link will arrive within a few{"\n"}minutes
                        </Text>
                    </View>
                )
            }
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
        marginHorizontal: 7,
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
        lineHeight: 40
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        borderColor: "#727272",
        borderWidth: 1,
        borderRadius: 13,
        padding: 5,
        marginHorizontal: 5
    },
    form: {
        marginHorizontal: 5,
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
        backgroundColor: '#fff',
        borderColor: '#000',
    },
    loginBtn: {
        backgroundColor: '#3D6B4F',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 10,
        marginBottom: 19
    },
    btnText: {
        color: '#EEE8DF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardContainer: {
        paddingVertical: 10,
    },
    container1: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#727272",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
        color: "#727272",
    },
    card: {
        width: '100%',
        backgroundColor: '#C8E0D0',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 0.5,
        borderColor: '#3D6B4F',
        position: 'relative',
        borderLeftColor: "#3D6B4F",
        borderLeftWidth: 4
    },
    title1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#3D6B4F',
        marginBottom: 4,
    },
    subtitle1: {
        fontSize: 13,
        color: '#727272',
        lineHeight: 20,
    },
});

export default ForgotPasswordScreen