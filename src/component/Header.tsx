import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../resources/constant/Color';

interface HeaderProps {
    title?: string;
    iconLeft?: ImageSourcePropType;
    iconRight?: ImageSourcePropType;
    onPressLeft?: () => void;
    onPressRight?: () => void;
    leftComponent?: React.ReactNode;
    centerComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    backgroundColor?: string;
    leftIconColor?: string;
    rightIconColor?: string;
    leftIconSize?: number;
    rightIconSize?: number;
    numberOfLines?: number;
}

const Header = (props: HeaderProps) => {
    const {title, iconLeft, iconRight, onPressLeft, onPressRight,
        leftComponent, centerComponent, rightComponent,
        backgroundColor, leftIconColor, rightIconColor,
        leftIconSize, rightIconSize, numberOfLines} = props;
    
    const renderLeft = () => {
        return (
            leftComponent || (
                <View>
                    {iconLeft ? (
                        <TouchableOpacity
                            onPress={onPressLeft}
                        >
                            <Image
                                source={iconLeft}
                                tintColor={leftIconColor}
                                style={{
                                    width: leftIconSize,
                                    height: leftIconSize
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style = {{width: leftIconSize, height: leftIconSize}}/>
                    )}
                </View>
            )
        );
    }

    const renderCenter = () => {
        return (
            centerComponent || (
                <View>
                    <Text
                        style = {styles.title}
                        numberOfLines={numberOfLines}
                    >
                        {title}
                    </Text>
                </View>
            )
        )
    }

    const renderRight = () => {
        return (
            rightComponent || (
                <View>
                    {iconRight ? (
                        <TouchableOpacity
                            onPress={onPressRight}
                        >
                            <Image
                                source={iconRight}
                                tintColor={rightIconColor}
                                style={{
                                    width: rightIconSize,
                                    height: rightIconSize
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style = {{width: rightIconSize, height: rightIconSize}}/>
                    )}
                </View>
            )
        )
    }
    return (
        <View style = {styles.container}>
            {renderLeft()}
            {renderCenter()}
            {renderRight()}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
        textTransform: 'uppercase'
    }
})