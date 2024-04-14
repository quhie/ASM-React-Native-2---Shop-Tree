import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import COLORS from '../resources/constant/Color'
import WrapInput from './WrapInput'
import { ICON } from '../resources/constant/Icons'

interface LineTextInputProps {
  errorText?: string,
  placeholder?: string,
  style?: ViewStyle,
  rightComponent?: ReactNode,
  rightImage?: ImageSourcePropType,
  value?: string,
  onChangeText?: (text: string) => void,
}
const LineTextInput = (props: LineTextInputProps) => {
  const {errorText, placeholder, style, rightComponent, rightImage, value, onChangeText} = props // Destructure the onChangeText prop

  const handleRightIcon = () => {
    return (
      rightComponent || (
        <View>
          {rightImage ? (
            <Image
              source={rightImage}
              style={styles.icon}
            />
          ) : (null)
          }

        </View>
      )
    )
  }
  return (
    <WrapInput
      errorText= {errorText}
      style={style}
    >
      <View style = {styles.inputContainer}>
        <TextInput
          placeholder= {placeholder}
          style = {styles.textInput}
          value={value}
          onChangeText={onChangeText}
        />
        {handleRightIcon()}
      </View>

      <View style = {styles.line}></View>
    </WrapInput>
  )
}

export default LineTextInput

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
  },
    textInput: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        width: '100%',
        height: 44,
      color: COLORS.gray
    },
    icon: {
        width: 20,
        height: 20
    }
})
