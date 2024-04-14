import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'

const AmountContainer = () => {
    return (
        
            <View style={styles.amountContainer}>
                <TouchableOpacity>
                    <Image
                        source={ICON.minus}
                        style={styles.amountIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.amountText}>0</Text>
                <TouchableOpacity>
                    <Image
                        source={ICON.plus}
                        style={styles.amountIcon}
                    />
                </TouchableOpacity>
            </View>
    )
}

export default AmountContainer

const styles = StyleSheet.create({
    
    amountIcon: {
        width: 30,
        height: 30
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    amountText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black
    },
})