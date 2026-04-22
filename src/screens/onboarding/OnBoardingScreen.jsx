import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import bodymy from '../../assets/images/logoOne.png'
import { setHasSeenOnboarding } from '../../services/storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const OnBoardingScreen = () => {
    const navigation = useNavigation();

    const moveHandler = async (value) => {
        await setHasSeenOnboarding();
        if (value === "skip" || value === "login") {
            navigation.replace('Login');
        } else {
            navigation.replace('Register');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Top Bar */}
            <TouchableOpacity style={styles.topBar} onPress={() => console.log("press")}>
                <View style={styles.topRight}>
                    <Text style={styles.skip}>Skip</Text>
                </View>
            </TouchableOpacity>

            {/* Main Content */}
            <View style={styles.content}>
                <Image
                    source={bodymy}
                    style={{ width: width * 0.28, height: height * 0.15 }}
                />

                <Text style={styles.subtitle}>
                    Your whole health{'\n'}picture.In motion.
                </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: "#3D6B4F" }]} onPress={() => moveHandler("register")}>
                    <Text style={styles.btnText}>
                        Get Started
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { borderColor: '#C4B89A', borderWidth: 1.5, }]} onPress={() => moveHandler("login")}>
                    <Text style={styles.alreadyAccountText}>I already have an account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 24,
    },
    topBar: {
        padding: 15,
    },
    skip: {
        color: '#fff',
        fontSize: 16,
        textAlign: "right"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    subtitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'PlayfairDisplayBoldItalic',
        lineHeight: 32,
        paddingTop: 30
    },
    buttonContainer: {
        paddingBottom: 40,
    },
    alreadyAccountText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
    },
    btn: {
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
});

export default OnBoardingScreen;