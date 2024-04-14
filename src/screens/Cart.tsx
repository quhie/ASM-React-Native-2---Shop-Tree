import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../component/Header';
import {ICON} from '../resources/constant/Icons';
import COLORS from '../resources/constant/Color';
import CartItem from '../component/item/CartItem';
import RegularButton from '../component/RegularButton';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { removeFromCart } from '../actions/userActions';
import RBSheet from "react-native-raw-bottom-sheet";



const Cart = ({navigation}: any) => {
  const [ListData, setListData] = useState([]);
  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const refRBSheet = useRef();


  const handleDeleteAll = () => {
    // @ts-ignore
    refRBSheet.current.close();
    cart.forEach((item: { _id: any; }) => {
      dispatch(removeFromCart(item._id));
    });
  };

  const totalPrice = cart.reduce((total: number, item: { price: number; amount: number; }) => total + (item.price * item.amount), 0);

  return (
      <SafeAreaView style={styles.container2}>
      <View style={styles.container}>
        <Header
          title="Giỏ hàng"
          iconLeft={ICON.left}
          leftIconSize={24}
          onPressLeft={() => navigation.goBack()}
          iconRight={ICON.trash}
          rightIconSize={24}
          onPressRight={() => refRBSheet.current.open()}
        />
        <FlatList
          data={cart}
          renderItem={({item}) => <CartItem item={item} />}
        />
        <View style = {styles.bottom}>
          <View style = {styles.priceConatiner}>
            <Text style = {styles.text}>Tạm tính</Text>
            <Text style = {styles.price}>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
          </View>
          <RegularButton
            title = "Tiến hành thanh toán ➤"
            style = {styles.buyButton}
            onPress = {() => navigation.navigate('Payment')}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(21,21,21,0.2)",
            },
            draggableIcon: {
              width: 150,
              height: 5,
              backgroundColor: COLORS.primary,
            },
            container: {
              height: 300,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }
          }}>
          <Text style={{textAlign: 'center', fontSize: 18, marginVertical: 20}}>Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?</Text>
          <Text style={{textAlign: 'center', fontSize: 14,
            marginVertical: 10, color: COLORS.gray, fontWeight: 'bold'
          }}>Hành động này không thể hoàn tác</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <RegularButton style={styles.buyBtn}
                           title={'Xác nhận'} onPress={handleDeleteAll} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => refRBSheet.current.close()}>
              <Text style={{color: '#000000', textDecorationLine: 'underline'}}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  priceConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },

  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black
  },
  buyButton: {
      backgroundColor: COLORS.primary,
    marginTop: 10,
  },
  bottom: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    width: '70%',
  },
cancelBtn: {
  backgroundColor: COLORS.white,
  marginVertical: 10,
  width: '70%',
  alignItems: 'center',
  justifyContent: 'center',
  color: "#000000",
},
});
