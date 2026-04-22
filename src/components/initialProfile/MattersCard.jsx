import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MattersCard = ({ subTitle, title }) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected(!isSelected);
    };
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={toggleSelection}
            activeOpacity={0.9}
        >
            <View style={[
                styles.card,
                isSelected && styles.cardSelected
            ]}>
                <Text style={[
                    styles.title1,
                    isSelected && styles.titleSelected
                ]}>
                    {title}
                </Text>

                <Text style={[
                    styles.subtitle1,
                    isSelected && styles.subtitleSelected
                ]}>
                    {subTitle}
                </Text>

                <View style={[
                    styles.checkCircle,
                    isSelected && styles.checkCircleSelected
                ]}>
                    <Ionicons
                        name="checkmark"
                        size={24}
                        color={"#fff"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingVertical: 10,
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
        height: 90
    },
    cardSelected: {
        backgroundColor: '#C8E0D0',
        borderColor: '#3D6B4F',
    },
    title1: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3D6B4F',
        marginBottom: 4,
    },
    titleSelected: {
        color: '#3D6B4F',
    },
    subtitle1: {
        fontSize: 13,
        color: '#727272',
        lineHeight: 20,
    },
    subtitleSelected: {
        color: '#727272',
    },
    checkCircle: {
        position: 'absolute',
        right: 20,
        top: '75%',
        transform: [{ translateY: -20 }],
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkCircleSelected: {
        backgroundColor: '#3D6B4F',
        borderWidth: 0,
    },
});

export default MattersCard