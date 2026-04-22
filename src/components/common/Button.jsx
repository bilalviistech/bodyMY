import React from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Button = ({ touchableStyle, viewStyle, handleSubmit, isLoading, textStyle, showIsLoading, text, iconColor, iconName, imageName }) => {
    return (
        <TouchableOpacity
            style={touchableStyle}
            onPress={handleSubmit}
            disabled={isLoading}
        >
            <View style={viewStyle}>
                {iconName && (
                    <Icon
                        name={iconName}
                        size={24}
                        color={iconColor}
                    />
                )}
                {imageName && (
                    <Image
                        source={imageName}
                        style={{ width: 22, height: 22, marginRight: 2 }}
                    />
                )}
                <Text style={textStyle}>{text}</Text>
                {isLoading && (
                    <ActivityIndicator
                        color="#000"
                        size="small"
                        style={{ marginLeft: 10 }}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Button