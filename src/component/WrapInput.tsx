import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import COLORS from '../resources/constant/Color';

interface WrapInputProps {
    children?: ReactNode;
    errorText?: string;
    bottomComponent?: ReactNode;
    style?: ViewStyle;
}



const WrapInput = (props: WrapInputProps) => {
    const { bottomComponent, errorText, children, style} = props;
    const handleError = () => {
        return (
            bottomComponent || (
                <View>
                    {errorText ? (
                        <Text style = {styles.text}>{errorText}</Text>
                    ) : null}
                </View>
            )
        )
    };
    return (
        <View style = {style}>
            {children}
            {handleError()}
        </View>
    )
}

export default WrapInput

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11,
        color: COLORS.red,
        marginTop: 5,
        marginBottom: 2
    }
})
