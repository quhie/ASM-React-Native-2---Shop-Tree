import {StyleSheet} from 'react-native'
import COLORS from '../resources/constant/Color'

const LOGINSTYLE = StyleSheet.create({
    loginBackground: {
        width: '100%',
        height: 290
    },
    signUpBackground: {
        width: '100%',
        height: 190
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 0,
        margin: 15
    },
    container: {
        paddingHorizontal: 25
    },
    loginHeaderText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        textAlign: 'center',
        color: COLORS.black
    },
    loginTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.black
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxIcon: {
        width: 22,
        height: 22
    },
    checkBoxTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forgotText: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.primary,
        fontSize: 11,
    },
    line: {
        width: '42%',
        height: 1,
        backgroundColor: COLORS.primary
    },
    lineText: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.black,
        fontSize: 12,
    },
    otherRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    otherIcon: {
        width: 32,
        height: 32,
        marginHorizontal: 15
    },
    otherText: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.black,
        fontSize: 12,
        marginRight: 7
    },
    otherTouchText: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.secondary,
        fontSize: 12,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        color: COLORS.black,
        fontSize: 12,
        marginTop: 10
    },
    termText: {
        fontFamily: 'Poppins-Medium',
        color: COLORS.secondary,
        fontSize: 12,
        textDecorationLine: 'underline'
    },
    loginButton: {
        marginVertical: 18
    }
})

export default LOGINSTYLE