import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import COLORS from '../resources/constant/Color'

interface RegularButtonProps {
  style?: ViewStyle;
  title: string;
  onPress?: () => void;
}

const RegularButton = (props: RegularButtonProps) => {
  const {style, title, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style = {[styles.container, style]}
    >
        <Text style = {styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default RegularButton

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.white,
    textTransform: 'uppercase'
  }
})
