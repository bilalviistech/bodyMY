import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useState } from 'react';
import MattersCard from "./MattersCard"

const WhatMatters = ({ values, handleChange, handleBlur, selectedGender, setSelectedGender, touched, errors, handleSubmit, isValid }) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected);
    };
    return (
        <>
            {/* Header text */}
            <View style={styles.header}>
                <Text style={styles.title}>What matters to</Text>
                <Text style={styles.subtitle}>you?</Text>
                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    Select all that apply. You can change these anytime.
                </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <MattersCard title={"Reduce stress"} subTitle={"Track HRV & mental stress\nscore"} toggleSelection={toggleSelection} setIsSelected={setIsSelected} isSelected={isSelected} />
                <MattersCard title={"Heart health"} subTitle={"Monitor heart rate & HRV\ntrends"} toggleSelection={toggleSelection} setIsSelected={setIsSelected} isSelected={isSelected} />
                <MattersCard title={"Healthy weight"} subTitle={"BMI, ABSI & body composition"} toggleSelection={toggleSelection} setIsSelected={setIsSelected} isSelected={isSelected} />
                <MattersCard title={"Look & feel younger"} subTitle={"Facial skin age & wellness score"} toggleSelection={toggleSelection} setIsSelected={setIsSelected} isSelected={isSelected} />
                <MattersCard title={"Overall wellness"} subTitle={"Daily wellness score & trends"} toggleSelection={toggleSelection} setIsSelected={setIsSelected} isSelected={isSelected} />

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.signUpBtn, !isValid && { backgroundColor: '#a0a0a0' }]}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    type="submit"
                >
                    <Text style={styles.btnText}>Start Tracking</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
    signUpBtn: {
        backgroundColor: '#3D6B4F',
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 10
    },
    btnText: {
        color: '#EEE8DF',
        fontSize: 18,
        fontWeight: 'bold',
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

export default WhatMatters