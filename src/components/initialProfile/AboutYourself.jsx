import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Input from '../../components/common/Input';

const AboutYourself = ({values, handleChange, handleBlur, selectedGender, setSelectedGender, touched, errors, handleSubmit, isValid}) => {
    return (
        <>
            {/* Header text */}
            <View style={styles.header}>
                <Text style={styles.title}>Tell us about</Text>
                <Text style={styles.subtitle}>yourself.</Text>
                <Text style={{ marginVertical: 15, color: "#727272" }}>
                    This helps us personalise your metrics and calculate your health baselines accurately.
                </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                {/* Date of Birth */}
                <Text style={styles.label}>Date Of Birth</Text>
                <Input
                    placeholder="03/15/1985"
                    value={values.dob}
                    onChangeText={handleChange('dob')}
                    onBlur={handleBlur('dob')}
                    styles={{ input: [styles.input, { marginBottom: 8 }], inputActive: styles.inputActive }}
                    type="numeric"           // Helps show numeric keyboard
                    maxLength={10}           // MM/DD/YYYY = 10 characters
                />
                {touched.dob && errors.dob && (
                    <Text style={styles.errorText}>{errors.dob}</Text>
                )}

                {/* Biological Sex */}
                <Text style={styles.label}>
                    BIOLOGICAL SEX <Text style={{ fontSize: 10 }}>(used for health baselines only)</Text>
                </Text>

                <View style={styles.genderContainer}>
                    {['Male', 'Female', 'Other'].map((gender) => (
                        <TouchableOpacity
                            key={gender}
                            style={[
                                styles.button,
                                selectedGender === gender && styles.activeButton,
                            ]}
                            onPress={() => setSelectedGender(gender)}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedGender === gender && styles.activeButtonText,
                                ]}
                            >
                                {gender}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {touched.gender && errors.gender && (
                    <Text style={styles.errorText}>{errors.gender}</Text>
                )}

                {/* Height */}
                <Text style={styles.label}>Height</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder="5"
                            value={values.heightFt}
                            onChangeText={handleChange('heightFt')}
                            onBlur={handleBlur('heightFt')}
                            styles={{ input: [styles.input, { marginBottom: 5 }], inputActive: styles.inputActive }}
                            type="numeric"
                        />
                        <Text style={{ textAlign: 'center', color: "#727272" }}>ft</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder="11"
                            value={values.heightIn}
                            onChangeText={handleChange('heightIn')}
                            onBlur={handleBlur('heightIn')}
                            styles={{ input: [styles.input, { marginBottom: 5 }], inputActive: styles.inputActive }}
                            type="numeric"
                        />
                        <Text style={{ textAlign: 'center', color: "#727272" }}>in</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#727272", fontFamily: "sans-serif" }}>cm</Text>
                    </View>
                </View>
                {(touched.heightFt || touched.heightIn) && (errors.heightFt || errors.heightIn) && (
                    <Text style={[styles.errorText, { marginTop: 1 }]}>{errors.heightFt || errors.heightIn}</Text>
                )}

                {/* Weight */}
                <Text style={styles.label}>Weight</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder="150"
                            value={values.weightLbs}
                            onChangeText={handleChange('weightLbs')}
                            onBlur={handleBlur('weightLbs')}
                            styles={{ input: [styles.input, { marginBottom: 5 }], inputActive: styles.inputActive }}
                            type="numeric"
                        />
                        <Text style={{ textAlign: 'center', color: "#727272" }}>lbs</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#727272", fontFamily: "sans-serif" }}>kg</Text>
                    </View>
                </View>
                {touched.weightLbs && errors.weightLbs && <Text style={styles.errorText}>{errors.weightLbs}</Text>}

                {/* ZIP Code */}
                <Text style={styles.label}>
                    ZIP code <Text style={{ fontSize: 10 }}>(used for health baselines only)</Text>
                </Text>
                <Input
                    placeholder="81611"
                    value={values.zipCode}
                    onChangeText={handleChange('zipCode')}
                    onBlur={handleBlur('zipCode')}
                    styles={{ input: [styles.input, { marginBottom: 16 }], inputActive: styles.inputActive }}
                    type="numeric"
                />
                {touched.zipCode && errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}

                {/* Continue Button */}
                <TouchableOpacity
                    style={[styles.signUpBtn, !isValid && { backgroundColor: '#a0a0a0' }]}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    type="submit"
                >
                    <Text style={styles.btnText}>Continue</Text>
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
        marginBottom: 24
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

export default AboutYourself