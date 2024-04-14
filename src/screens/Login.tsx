// File: Login.tsx
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LOGINSTYLE from '../styles/LoginStyle.tsx';
import {IMAGES} from '../resources/constant/Image';
import {ICON} from '../resources/constant/Icons';
import GradientButton from '../component/GradientButton';
import RegularTextInput from '../component/RegularTextInput';
import { loginUser } from '../api/user/AxiosUsers.tsx';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions';



const Login = ({navigation}: any) => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    password: '',
  });
  const resetCredentials = () => {
    setCredentials({
      phone: '',
      password: '',
    });
  };

  // Pass the function to the navigation object
  useEffect(() => {
    navigation.setParams({ resetCredentials });
  }, []);

  const handleChange = (name: string) => (text: any) => {
    setCredentials({
      ...credentials,
      [name]: text,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };
  const handleSubmit = async () => {
    if (credentials.phone.trim() === '') {
      setErrors(errors => ({ ...errors, phone: 'Vui lòng nhập số điện thoại' }));
      return;
    }

    if (!validatePhone(credentials.phone)) {
      setErrors(errors => ({ ...errors, phone: 'Số điện thoại không hợp lệ' }));
      return;
    }

    if (!validatePassword(credentials.password)) {
      setErrors(errors => ({ ...errors, password: 'Mật khẩu phải có ít nhất 6 ký tự' }));
      return;
    }

    try {
      const result = await loginUser(credentials);
      console.log(result);
      if (result.status === 'Người dùng không tồn tại') {
        setErrors(errors => ({ ...errors, phone: 'Người dùng không tồn tại. Vui lòng đăng ký!' }));
      } else if (result.status === 'Mật khẩu không đúng') {
        setErrors(errors => ({ ...errors, password: 'Mật khẩu không đúng. Thử lại!' }));
      }  else {
        dispatch(setUser(result));
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
        });

        Alert.alert('Thành công', 'Đăng nhập thành công');
      }
    } catch (error) {
      console.error(error);
      setErrors(errors => ({ ...errors, phone: 'Đã có lỗi xảy ra. Vui lòng thử lại!' }));
    }
  };

  return (
    <ScrollView>
      <StatusBar hidden />
      <View>
        <Image
          style={LOGINSTYLE.loginBackground}
          resizeMode="stretch"
          source={IMAGES.background}
        />
        <TouchableOpacity style={LOGINSTYLE.backButton}>
          <Image
            style={LOGINSTYLE.backIcon}
            source={require('../resources/icons/back.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={LOGINSTYLE.container}>
        <Text style={LOGINSTYLE.loginHeaderText}>Chào mừng bạn</Text>
        <Text style={LOGINSTYLE.loginTitle}>Đăng nhập tài khoản</Text>
        <RegularTextInput placeholder="Số điện thoại" onChangeText={handleChange('phone')} hasError={errors.phone !== ''} errorText={errors.phone} />
        <RegularTextInput placeholder="Mật khẩu" secureTextEntry={true} onChangeText={handleChange('password')} hasError={errors.password !== ''} errorText={errors.password}
        />
        <View style={LOGINSTYLE.rowContainer}>
          <TouchableOpacity style={LOGINSTYLE.checkBox}>
            <Image
              style={LOGINSTYLE.checkBoxIcon}
              source={ICON.checkboxInvisible}
            />
            <Text style={LOGINSTYLE.checkBoxTitle}>Nhớ tài khoản</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={LOGINSTYLE.forgotText}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
        </View>
        <GradientButton
          title="Đăng nhập"
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
          <Text style={LOGINSTYLE.otherText}>Bạn không có tài khoản</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={LOGINSTYLE.otherTouchText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
