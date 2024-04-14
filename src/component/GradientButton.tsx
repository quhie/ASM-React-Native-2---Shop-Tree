import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import COLORS from '../resources/constant/Color'

interface GradientButtonProps {
    title: string
    onPress: () => void
    buttonStyle?: TextStyle
}

const GradientButton = (props: GradientButtonProps) => {
    const {title, onPress, buttonStyle} = props;
  return (
    
    <LinearGradient 
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={['#007537', '#4CAF50']}
        style = {[buttonStyle,{borderRadius: 10}]}
    >
        <TouchableOpacity
            onPress={onPress}
            style = {styles.button}
        >
            <Text style = {styles.text}>{title}</Text>
        </TouchableOpacity>
    </LinearGradient>
  )
}

export default GradientButton

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: COLORS.white
    }
})