import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import Header from '../component/Header'
import { ICON } from '../resources/constant/Icons'
import COLORS from '../resources/constant/Color'
import LineTextInput from '../component/LineTextInput'
import RegularButton from '../component/RegularButton'
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { clearCart } from '../actions/userActions';
import axios from 'axios';

const Payment = ({navigation}: any) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const user = useSelector((state) => state.user);
    // @ts-ignore
    const cart = useSelector((state) => state.cart);
    const totalPrice = cart.reduce((total: number, item: { price: number; amount: number; }) => total + (item.price * item.amount), 0) + 25000;
    const totalPriceWithoutShipping = cart.reduce((total: number, item: { price: number; amount: number; }) => total + (item.price * item.amount), 0);
    return (
      <SafeAreaView style={styles.container2}>
          <View style = {styles.container}>
              <Header
                title='Thanh Toán'
                iconLeft={ICON.left}
                leftIconSize={24}
                onPressLeft={() => navigation.goBack()}
                rightIconSize={24}
              />
              <View style = {styles.body}>
                  <View style = {styles.info}>
                      <Text style = {styles.headerText}>Thông tin khách hàng</Text>
                      <View style = {styles.line}></View>
                      <LineTextInput
                        placeholder='Nhập họ và tên'
                        value={user.name}
                      />
                      <LineTextInput
                        placeholder='nhập email'
                        value={user.email}
                      />
                      <LineTextInput
                        placeholder='nhập số điện thoại'
                        value={user.phone}
                      />
                  </View>

                  <View style = {[styles.info, {marginTop: 30}]}>
                      <Text style = {styles.headerText}>Phương thức vận chuyển</Text>
                      <View style = {styles.line}></View>

                      <View style = {styles.row2}>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Text style = {styles.rowTitle2}>Giao hàng Nhanh - 25.000đ</Text>
                              <Image
                                source={{uri: 'https://img.icons8.com/ios-glyphs/30/007537/checkmark--v1.png'}}
                                style={{width: 22, height: 22}}
                              />
                          </View>
                          <Text style = {styles.rowBody2}>Dự kiến giao hàng 2-3 ngày</Text>
                          <View style = {styles.line2}></View>

                      </View>

                      <View style = {styles.row2}>
                          <Text style = {styles.rowBody3}>Giao hàng COD - 15.000đ</Text>
                          <Text style = {styles.rowBody2}>Dự kiến giao hàng 4-6 ngày</Text>
                          <View style = {styles.line2}></View>

                      </View>
                  </View>


                  <View style = {[styles.info, {marginTop: 30}]}>
                      <Text style = {styles.headerText}>Hình Thức Thanh Toán</Text>
                      <View style = {styles.line}></View>

                      <View style = {styles.row2}>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Text style = {styles.rowTitle2}>Thẻ VISA/MASTER CARD</Text>
                              <Image
                                source={{uri: 'https://img.icons8.com/ios-glyphs/30/007537/checkmark--v1.png'}}
                                style={{width: 22, height: 22}}
                              />
                          </View>
                          <View style = {styles.line2}></View>
                      </View>
                  </View>

              </View>

              <View style = {styles.bottom}>
                  <View style = {styles.rowContainer}>
                      <View style = {styles.row}>
                          <Text style = {styles.rowTitle}>Tạm tính</Text>
                          <Text style = {styles.rowBody}>{totalPriceWithoutShipping.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                      </View>
                      <View style = {styles.row}>
                          <Text style = {styles.rowTitle}>Phí vận chuyển</Text>
                          <Text style = {styles.rowBody}>25.000đ</Text>
                      </View>
                      <View style = {styles.row}>
                          <Text style = {[styles.rowTitle, {fontSize: 16, color: COLORS.black}]}>Tổng cộng</Text>
                          <Text style = {[styles.rowTitle, {fontSize: 16, color: COLORS.primary}]}>
                              {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </Text>
                      </View>
                  </View>

                  <RegularButton
                    title='Tiếp tục'
                    onPress={() => {
                        axios.post('http://localhost:3000/orders', {
                            user: user,
                            cart: cart,
                            total: totalPrice // Add total price to the request
                        })
                          .then(response => {
                              // Handle response here
                              Alert.alert(
                                "Thành công",
                                "Bạn đã đặt sản phẩm thành công!",
                                // ...
                              );
                          })
                          .catch(error => {
                              console.error('Error:', error);
                          });
                    }}
                  />
              </View>
          </View>
      </SafeAreaView>
    )
}

export default Payment

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
        padding: 20
    },
    headerText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.black
    },
    info: {
        paddingHorizontal: 20
    },
    bottom: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    rowContainer: {
        marginVertical: 10
    },
    rowTitle: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.gray,
    },
    rowBody: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.black,
    },
    row2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
    },
    rowTitle2: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 5
    },
    rowBody2: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.gray,
    },
    rowBody3: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: COLORS.black,
    },
    line2: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.gray,
        marginTop: 10
    }
})

