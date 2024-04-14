import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { StackActions } from '@react-navigation/native';

import React, { useState } from 'react';
import {IMAGES} from '../resources/constant/Image';
import LOGINSTYLE from '../styles/LoginStyle.tsx';
import {ICON} from '../resources/constant/Icons';

import GradientButton from '../component/GradientButton';
import RegularTextInput from '../component/RegularTextInput';
import { loginUser, registerUser } from '../api/user/AxiosUsers.tsx';

const SignUp = ({navigation}: any) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (name: string) => (text: any) => {
    setUser({
      ...user,
      [name]: text,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    if (!validateName(user.name)) {
      setErrors(errors => ({ ...errors, name: 'Tên không được để trống' }));
      return;
    }

    if (!validateEmail(user.email)) {
      setErrors(errors => ({ ...errors, email: 'Email không hợp lệ' }));
      return;
    }

    if (!validatePhone(user.phone)) {
      setErrors(errors => ({ ...errors, phone: 'Số điện thoại không hợp lệ' }));
      return;
    }

    if (!validatePassword(user.password)) {
      setErrors(errors => ({ ...errors, password: 'Mật khẩu phải có ít nhất 6 ký tự' }));
      return;
    }

    try {
      const result = await registerUser(user);
      console.log(result);
      if (result.status === 'Người dùng không tồn tại') {
        setErrors(errors => ({ ...errors, phone: 'Người dùng không tồn tại. Vui lòng đăng ký!' }));
      } else if (result.status === 'Mật khẩu không đúng') {
        setErrors(errors => ({ ...errors, password: 'Mật khẩu không đúng. Thử lại!' }));
      } else {
        Alert.alert('đăng kí thành công', 'đăng kí thành công');
        navigation.dispatch(StackActions.replace('Login'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể đăng ký tài khoản');
    }
  }

  // @ts-ignore
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View>
          <Image
            source={IMAGES.suBackground}
            resizeMode="stretch"
            style={LOGINSTYLE.signUpBackground}
          />
        </View>
        <View style={LOGINSTYLE.container}>
          <Text style={LOGINSTYLE.loginHeaderText}>Đăng ký</Text>
          <Text style={LOGINSTYLE.loginTitle}>Tạo tài khoản</Text>
          <RegularTextInput placeholder="Họ tên" onChangeText={handleChange('name')} hasError={errors.name !== ''} errorText={errors.name} />
          <RegularTextInput placeholder="Email" onChangeText={handleChange('email')} hasError={errors.email !== ''} errorText={errors.email} />
          <RegularTextInput placeholder="Số điện thoại" onChangeText={handleChange('phone')} hasError={errors.phone !== ''} errorText={errors.phone} />
          <RegularTextInput placeholder="Mật khẩu" secureTextEntry onChangeText={handleChange('password')} hasError={errors.password !== ''} errorText={errors.password} />
          <RegularTextInput placeholder="Nhập lại mật khẩu" secureTextEntry />
          <Text style={LOGINSTYLE.text}>
            Để đăng ký tài khoản, bạn đồng ý
            <Text style={LOGINSTYLE.termText}> Term & Conditions</Text> and
            <Text style={LOGINSTYLE.termText}> Privacy Policy </Text>
          </Text>
          <GradientButton
            title="Đăng kí"
            buttonStyle={LOGINSTYLE.loginButton}
            onPress={handleSubmit}
          />
          <View style={LOGINSTYLE.rowContainer}>
            <View style={LOGINSTYLE.line} />
            <Text style={LOGINSTYLE.lineText}>Hoặc</Text>
            <View style={LOGINSTYLE.line} />
          </View>
          <View style={LOGINSTYLE.otherRow}>
            <TouchableOpacity>
              <Image source={ICON.google} style={LOGINSTYLE.otherIcon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={ICON.facebook} style={LOGINSTYLE.otherIcon} />
            </TouchableOpacity>
          </View>
          <View style={LOGINSTYLE.otherRow}>
            <Text style={LOGINSTYLE.otherText}>Tôi đã có tài khoản</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={LOGINSTYLE.otherTouchText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
