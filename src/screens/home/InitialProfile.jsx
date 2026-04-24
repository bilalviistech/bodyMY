import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AboutYourself from "../../components/initialProfile/AboutYourself"
import WhatMatters from "../../components/initialProfile/WhatMatters"

import Input from '../../components/common/Input';
import { AuthContext } from '../../context/AuthContext';

const InitialProfile = () => {
    const [step, setStep] = useState(1);
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const [selectedGender, setSelectedGender] = useState('Male');

    const validationSchema = Yup.object().shape({
        // dob: Yup.string()
        //     .required('Date of Birth is required')
        //     .matches(
        //         /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
        //         'Date must be in MM/DD/YYYY format (e.g., 03/15/1985)'
        //     )
        //     .test('valid-date', 'Invalid date', (value) => {
        //         if (!value) return false;
        //         const [month, day, year] = value.split('/').map(Number);
        //         const date = new Date(year, month - 1, day);
        //         return date.getFullYear() === year &&
        //             date.getMonth() === month - 1 &&
        //             date.getDate() === day;
        //     })
        //     .test('age', 'You must be at least 18 years old', (value) => {
        //         if (!value) return false;
        //         const [month, day, year] = value.split('/').map(Number);
        //         const birthDate = new Date(year, month - 1, day);
        //         const today = new Date();
        //         let age = today.getFullYear() - birthDate.getFullYear();
        //         const monthDiff = today.getMonth() - birthDate.getMonth();
        //         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        //             age--;
        //         }
        //         return age >= 18;
        //     }),

        // gender: Yup.string()
        //     .oneOf(['Male', 'Female', 'Other'], 'Please select your biological sex'),

        // heightFt: Yup.number()
        //     .typeError('Height (ft) must be a number')
        //     .min(3, 'Height must be at least 3 ft')
        //     .max(8, 'Height must be less than 8 ft')
        //     .required('Height (feet) is required'),

        // heightIn: Yup.number()
        //     .typeError('Height (inches) must be a number')
        //     .min(0, 'Inches must be between 0 and 11')
        //     .max(11, 'Inches must be between 0 and 11')
        //     .required('Height (inches) is required'),

        // weightLbs: Yup.number()
        //     .typeError('Weight must be a number')
        //     .min(50, 'Weight must be at least 50 lbs')
        //     .max(600, 'Weight must be less than 600 lbs')
        //     .required('Weight is required'),

        // zipCode: Yup.string()
        //     .matches(/^\d{5}$/, 'ZIP code must be exactly 5 digits')
        //     .required('ZIP code is required'),
    });

    const handleNext = (values) => {
        if (!selectedGender) {
            setFieldTouched('gender', true);
            return;
        }
        if (step == 1) {
            setStep(2);
            return;
        } else {
            Keyboard.dismiss()
            navigation.navigate('MainTabs');

        }

        // console.log('Profile data:', {
        //     ...values,
        //     gender: selectedGender,
        // });
    };

    const navigationHandler = () => {
        navigation.navigate('MainTabs');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Formik
                        initialValues={{
                            dob: '',
                            heightFt: '',
                            heightIn: '',
                            weightLbs: '',
                            zipCode: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleNext}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            step === 1 ? (
                                <AboutYourself
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    selectedGender={selectedGender}
                                    setSelectedGender={setSelectedGender}
                                    touched={touched}
                                    errors={errors}
                                    handleSubmit={handleSubmit}
                                    isValid={isValid}
                                />
                            )
                                : (
                                    <WhatMatters
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        selectedGender={selectedGender}
                                        setSelectedGender={setSelectedGender}
                                        touched={touched}
                                        errors={errors}
                                        handleSubmit={handleSubmit}
                                        isValid={isValid}
                                    />
                                )
                        )}
                    </Formik>

                    {/* <TouchableOpacity
                        onPress={logout}
                        style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#e02012', marginVertical: 10 }}
                    >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigationHandler}
                        style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#e02012', marginVertical: 10 }}
                    >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Navigate Handler</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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
        lineHeight: 40
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
        backgroundColor: '#fff',
        borderColor: '#000',
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
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 1.5,
        borderColor: '#888',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#CDFF00',
        borderColor: '#CDFF00',
    },
    rememberText: {
        color: '#ddd',
        fontSize: 14,
    },
    forgot: {
        color: '#CDFF00',
        fontSize: 15,
        fontWeight: '600',
    },
    loginBtn: {
        backgroundColor: '#CDFF00',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 24
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
    label: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        fontSize: 15,
        color: '#727272',
        textTransform: "uppercase"
    },
    genderContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        overflow: 'hidden',
        padding: 2.5,
        marginBottom: 20,
        gap: 8
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#727272',
        borderRadius: 12,
    },
    activeButton: {
        backgroundColor: '#3D6B4F',
        borderRadius: 12,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    },
    activeButtonText: {
        color: "#FFFFFF"
    },
    errorText: {
        color: '#e02012',
        fontSize: 13,
        marginBottom: 12,
        marginTop: -8,
    },
});

export default InitialProfile;