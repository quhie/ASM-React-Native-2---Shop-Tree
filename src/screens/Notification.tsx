import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../component/Header';
import {ICON} from '../resources/constant/Icons';
import COLORS from '../resources/constant/Color';
import { useSelector } from 'react-redux';

const Notification = ({ navigation }: any) => {
  const lastAddedItem = useSelector((state: any) => state.lastAddedItem);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (lastAddedItem) {
      setMessage(`Sản phẩm ${lastAddedItem.name} đã được thêm vào giỏ hàng`);
    }
  }, [lastAddedItem]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Thông báo"
        iconLeft={ICON.left}
        leftIconSize={24}
        onPressLeft={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default Notification;
