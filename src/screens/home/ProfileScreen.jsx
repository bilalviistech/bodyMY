import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';
import camera from '../../assets/icon/camera.png'
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = ({ size = 140 }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [selected, setSelected] = useState('Male');
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(null);

    const handleCompleteProfile = () => {
        alert("Completed the profile.")
    };

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                return;
            }
            if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
                return;
            }
            if (response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                setProfileImage(selectedUri);
            }
        });
    };

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
                    {/* Header text */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Fill Your <Text style={styles.highlight}>Profile</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Lorem ipsum dolor sit amet consectetur. Adipiscing felis ut sagittis sed nisi morbi morbi. Consequat venenatis.
                        </Text>
                    </View>

                    {/* Inputs */}
                    <View style={styles.form}>
                        <View style={styles.parentContainer}>
                            <TouchableOpacity
                                style={styles.imageWrapper}
                                onPress={openImagePicker}
                                activeOpacity={0.8}
                            >
                                {/* Profile Image */}
                                {profileImage ? (
                                    <Image
                                        source={{ uri: profileImage }}
                                        style={[styles.profileImage, { width: size, height: size }]}
                                    />
                                ) : (
                                    <View style={[styles.placeholder, { width: size, height: size }]}>
                                        <Icon name="account" size={size * 0.55} color="#666" />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openImagePicker}>
                                <View style={styles.cameraButton}>
                                    <Image source={camera} style={{
                                        width: 18,
                                        height: 15,
                                        resizeMode: 'cover'
                                    }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={[styles.input, { marginBottom: 16 }]}
                            placeholder="John"
                            placeholderTextColor="#000"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={[styles.input, { marginBottom: 16 }]}
                            placeholder="Doe"
                            placeholderTextColor="#000"
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={[styles.input, { marginBottom: 16 }]}
                            placeholder="24"
                            placeholderTextColor="#000"
                            value={age}
                            onChangeText={(text) => {
                                const numericText = text.replace(/[^0-9]/g, '');
                                setAge(numericText);
                            }}
                            keyboardType="numeric"
                            maxLength={3}
                            autoCapitalize="none"
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.label}>Height (cm)</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 16 }]}
                                    placeholder="120"
                                    placeholderTextColor="#000"
                                    value={height}
                                    onChangeText={(text) => {
                                        const numericText = text.replace(/[^0-9]/g, '');
                                        setHeight(numericText);
                                    }}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>Weight (kg)</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 16 }]}
                                    placeholder="80"
                                    placeholderTextColor="#000"
                                    value={weight}
                                    onChangeText={(text) => {
                                        const numericText = text.replace(/[^0-9]/g, '');
                                        setWeight(numericText);
                                    }}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        selected === 'Male' && styles.activeButton,
                                    ]}
                                    onPress={() => setSelected('Male')}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            selected === 'Male' && styles.activeButtonText,
                                        ]}
                                    >
                                        Male
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        selected === 'Female' && styles.activeButton,
                                    ]}
                                    onPress={() => setSelected('Female')}
                                >
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            selected === 'Female' && styles.activeButtonText,
                                        ]}
                                    >
                                        Female
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#CDFF00', fontSize: 15 }} onPress={handleCompleteProfile}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                                Complete The Profile
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={logout} style={{ paddingVertical: 16, borderRadius: 15, alignItems: 'center', backgroundColor: '#e02012', fontSize: 15, marginVertical: 10 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 24,
    },
    imageWrapper: {
        width: 125,
        height: 125,
        borderRadius: "50%",
        borderWidth: 4,
        borderColor: '#CDFF00',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
    parentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: "relative"
    },
    cameraButton: {
        position: 'absolute',
        bottom: 8,
        right: 4,
        backgroundColor: '#000',
        width: 40,
        height: 40,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#CDFF00',
    },
    header: {
        marginTop: 50,
        marginBottom: 30,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 38
    },
    highlight: {
        color: '#CDFF00',
    },
    subtitle: {
        fontSize: 15,
        color: '#fff',
        marginTop: 8,
    },
    form: {
        marginHorizontal: 5,
        flex: 1,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#666',
    },
    label: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        fontSize: 15,
        color: '#fff',
    },
    genderContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CDFF00',
        overflow: 'hidden',
        padding: 2.5,
        marginBottom: 20
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#000',
    },
    activeButton: {
        backgroundColor: '#CDFF00',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    activeButtonText: {
        color: '#000',
    },
});

export default ProfileScreen