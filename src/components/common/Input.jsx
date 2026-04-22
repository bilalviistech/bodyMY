import { useState } from 'react';
import { TextInput } from 'react-native';

const Input = ({ value, onChangeText, placeholder, autoCapitalize, styles, secureTextEntry, type }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[styles.input, isFocused && styles.inputActive]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize || 'none'}
            secureTextEntry={secureTextEntry || false}
            keyboardType={type === 'numeric' ? 'numeric' : 'default'}
        />
    )
}

export default Input