import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import { IMAGES } from '../resources/constant/Image'
import LineTextInput from '../component/LineTextInput'
import RegularButton from '../component/RegularButton'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../api/user/AxiosUsers.tsx';
import { setUser } from '../actions/userActions';

const ChangeProfile = ({navigation}: any) => {
    // @ts-ignore
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [newUserInfo, setNewUserInfo] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const [originalUserInfo, setOriginalUserInfo] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    useEffect(() => {
        setOriginalUserInfo(user);
    }, [user]);

    const handleChange = (name: string) => (text: any) => {
        setNewUserInfo({
            ...newUserInfo,
            [name]: text,
        });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleSave = async () => {
        if (!validateEmail(newUserInfo.email)) {
            Alert.alert('Lỗi', 'Email không hợp lệ');
            return;
        }

        if (!validatePhone(newUserInfo.phone)) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }

        try {
            const updatedUser = await updateUser(user._id, newUserInfo);
            dispatch(setUser(updatedUser));
            Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
        }
    };

    const isChanged = JSON.stringify(originalUserInfo) !== JSON.stringify(newUserInfo);

    // @ts-ignore
    // @ts-ignore
    return (
      <SafeAreaView style = {styles.container2}>
          <View style = {styles.container}>
              <Header
                title='Chỉnh sửa thông tin'
                iconLeft={ICON.left}
                onPressLeft={() => navigation.goBack()}
                leftIconSize={24}
                rightIconSize={24}
              />
              <View style = {styles.body}>
                  <Image
                    source={IMAGES.chessboard}
                    style = {styles.image}
                  />
                  <View style = {styles.textContainer}>
                      <Text style = {styles.text}>Thông tin sẽ được lưu cho lần mua kế tiếp.</Text>
                      <Text style = {styles.text}>Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
                  </View>

                  <View>
                      <LineTextInput
                        placeholder='username'
                        value={newUserInfo.name}
                        onChangeText={handleChange('name')}
                      />
                      <LineTextInput
                        placeholder='asdasd@gmail.com'
                        value={newUserInfo.email}
                        onChangeText={handleChange('email')}
                      />
                      <LineTextInput
                        placeholder='Địa chỉ'
                      />
                      <LineTextInput
                        placeholder='0123456789'
                        value={newUserInfo.phone}
                        onChangeText={handleChange('phone')}
                      />
                  </View>
              </View>
              <View style = {styles.bottom}>
                  <RegularButton
                    title="Lưu thông tin"
                    style={[styles.buyButton, {backgroundColor: isChanged ? COLORS.primary : COLORS.gray}]}
                    onPress={isChanged ? handleSave : null}
                  />
              </View>
          </View>
      </SafeAreaView>
    )
}

export default ChangeProfile

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    body: {
        paddingHorizontal: 40,
        marginTop: 30
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.black,
        marginTop: 3
    },
    textContainer: {
        marginVertical: 30
    },
    buyButton: {
        marginTop: 10
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 30,
        paddingHorizontal: 20
    }
})
