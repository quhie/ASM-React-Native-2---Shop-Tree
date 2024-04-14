import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import COLORS from '../resources/constant/Color';
import WrapInput from './WrapInput';

interface RegularTextInputProps {
    placeholder?: string;
    secureTextEntry?: boolean;
    bottomComponent?: ReactNode;
    errorText?: string;
    onChangeText?: (text: string) => void;
    hasError?: boolean;
}

const RegularTextInput = (props: RegularTextInputProps) => {
    const {placeholder, secureTextEntry, bottomComponent,
        errorText, onChangeText, hasError} = props
    const [borderColor, setborderColor] = useState(COLORS.gray)

    const handleFocus = () => {
        setborderColor(COLORS.primary);
    };
    const handleBlur = () => {
        setborderColor(COLORS.gray)
    };

    return (
      <WrapInput
        errorText= {errorText}
      >
          <View style = {[styles.container, {borderColor: hasError ? 'red' : borderColor}]}>
              <TextInput
                placeholder= {placeholder}
                style = {styles.input}
                secureTextEntry = {secureTextEntry}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={onChangeText}
              />
          </View>
      </WrapInput>
    )
}

export default RegularTextInput

const styles = StyleSheet.create({
    container: {
        height: 46,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'center'
    },
    input: {
        height: 47,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 15,
        fontSize: 15,
        color: COLORS.black
    }
})
