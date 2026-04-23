import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import ScreenWrapperForDashboard from '../../components/common/ScreenWrapperForDashboard'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/common/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SecurityPrivacy = () => {
    const navigation = useNavigation();

    const [dailyReminder, setDailyReminder] = useState(true);
    const [highAlerts, setHighAlerts] = useState(true);

    const validationSchema = Yup.object().shape({
        currentPass: Yup.string()
            .required('Current password is required'),

        newPass: Yup.string()
            .required('New password is required')
            .min(6, 'Password must be at least 6 characters')
            .notOneOf([Yup.ref('currentPass')], 'New password must be different from current password'),

        cNewPass: Yup.string()
            .required('Confirm your new password')
            .oneOf([Yup.ref('newPass')], 'Passwords must match'),
    });

    const handleNext = (values) => {
        console.log('Profile data:', values);
    };

    return (
        <ScreenWrapperForDashboard>
            <TouchableOpacity
                style={styles.container1}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
                <View style={styles.iconWrapper}>
                    <Icon name="chevron-left" size={25} color="#727272" />
                </View>
                <Text style={styles.text}>Me</Text>
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.header}>
                <Text style={styles.title}>security &</Text>
                <Text style={styles.subtitle}>privacy.</Text>

                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    Manage connected apps & integrations
                </Text>
            </View>

            {/* Account Card */}
            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>CONNECTED</Text>
                {/* Form */}
                <View style={styles.accountCard}>

                    <Formik
                        initialValues={{
                            currentPass: '',
                            newPass: '',
                            cNewPass: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleNext}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <View style={styles.form}>
                                {/* ZIP Code */}
                                <Text style={styles.label}>
                                    CURRENT PASSWORD
                                </Text>
                                <Input
                                    placeholder="*********"
                                    value={values.currentPass}
                                    onChangeText={handleChange('currentPass')}
                                    onBlur={handleBlur('currentPass')}
                                    styles={{ input: [styles.input], inputActive: styles.inputActive }}
                                    type="text"
                                />
                                {touched.currentPass && errors.currentPass && <Text style={styles.errorText}>{errors.currentPass}</Text>}
                                <Text style={styles.label}>
                                    NEW PASSWORD
                                </Text>
                                <Input
                                    placeholder="Min. 8 character "
                                    value={values.newPass}
                                    onChangeText={handleChange('newPass')}
                                    onBlur={handleBlur('newPass')}
                                    styles={{ input: [styles.input], inputActive: styles.inputActive }}
                                    type="text"
                                />
                                {touched.newPass && errors.newPass && <Text style={styles.errorText}>{errors.newPass}</Text>}
                                <Text style={styles.label}>
                                    CONFIRM NEW PASSWORD
                                </Text>
                                <Input
                                    placeholder="Retype new password"
                                    value={values.cNewPass}
                                    onChangeText={handleChange('cNewPass')}
                                    onBlur={handleBlur('cNewPass')}
                                    styles={{ input: [styles.input], inputActive: styles.inputActive }}
                                    type="text"
                                />
                                {touched.cNewPass && errors.cNewPass && <Text style={styles.errorText}>{errors.cNewPass}</Text>}


                                {/* Continue Button */}
                                <TouchableOpacity
                                    style={[styles.signUpBtn, !isValid && { backgroundColor: '#a0a0a0' }]}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    <Text style={styles.btnText}>Update Password</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>

            <View style={styles.accountSection}>
                <Text style={styles.sectionLabel}>PRIVACY</Text>
                <View style={styles.accountCard}>
                    <TouchableOpacity style={styles.notifyItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <View style={styles.accountItemLeft}>
                            <Text style={styles.accountItemTitle}>Face ID unlock</Text>
                        </View>
                        <Switch
                            value={dailyReminder}
                            onValueChange={setDailyReminder}
                            trackColor={{ false: '#ddd', true: '#3D6B4F' }}
                            thumbColor="#fff"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate('SecurityPrivacy')}>
                        <View style={[styles.accountItemLeft, { paddingVertical: 10 }]}>
                            <Text style={styles.accountItemTitle}>Analytics & improvement</Text>
                            <Text style={styles.accountItemSubtitle}>Anonymous usage data only</Text>
                        </View>
                        <Switch
                            value={highAlerts}
                            onValueChange={setHighAlerts}
                            trackColor={{ false: '#ddd', true: '#3D6B4F' }}
                            thumbColor="#fff"
                        />
                    </TouchableOpacity>

                    <View style={styles.divider} />
                </View>
            </View>
        </ScreenWrapperForDashboard>
    )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 10,
        marginHorizontal: 7,
    },
    title: {
        fontSize: 35,
        color: '#151515',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 37

    },
    subtitle: {
        fontSize: 35,
        color: '#3D6B4F',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: 43
    },
    container1: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderColor: "#727272",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#727272",
    },

    accountSection: {
        marginBottom: 22,
    },
    sectionLabel: {
        fontSize: 14,
        color: '#727272',
        backgroundColor: "#DDD5C6",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    accountCard: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        overflow: 'hidden',
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 2,
    },
    notifyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    accountItemLeft: {
        flex: 1,
        marginLeft: 10
    },
    accountItemTitle: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '400',
    },
    accountItemSubtitle: {
        fontSize: 13,
        color: '#727272',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#C4B89A',
    },
    form: {
        marginHorizontal: 5,
        flex: 1,
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: '#F7F3EE',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#666',
    },
    inputActive: {
        backgroundColor: '#fff',
        borderColor: '#000',
        paddingHorizontal: 16,
    },
    signUpBtn: {
        backgroundColor: '#3D6B4F',
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        marginVertical: 17
    },
    btnText: {
        color: '#EEE8DF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#e02012',
        fontSize: 13,
        paddingLeft: 4
    },
    label: {
        fontSize: 14,
        color: "#8A7E6A",
        textTransform: "uppercase",
        marginTop: 15,
        marginBottom: 5
    },
});

export default SecurityPrivacy