import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions, Alert
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Header from '../component/Header';
import {ICON} from '../resources/constant/Icons';
import COLORS from '../resources/constant/Color';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/userActions';


const Detail = ({navigation}: any) => {
  const route = useRoute();
  const dispatch = useDispatch();

  const {item} = route.params as {item: any};

  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.8;
  const images = [item.image, item.image, item.image];

  const [activeSlide, setActiveSlide] = React.useState(0);

  const [amount, setAmount] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={item.name}
        iconLeft={ICON.left}
        iconRight={ICON.cart}
        leftIconSize={24}
        rightIconSize={20}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate('Cart')}
      />

      <Carousel
        data={images}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} />
        )}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={index => setActiveSlide(index)}
      />

      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
          }}
          inactiveDotStyle={{
            backgroundColor: 'gray',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.typeContainer}>
          <View style={styles.type}>
            <Text style={styles.typeText}>{item.category.name}</Text>
          </View>
        </View>

        <Text style={styles.price}>
          {item.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
        <View>
          <Text style={styles.detailText}>Chi tiết sản phẩm</Text>
          <View style={styles.lineDark} />

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Kích cỡ</Text>
            <Text style={styles.blackText}>{item.size.charAt(0).toUpperCase() + item.size.slice(1)}</Text>
          </View>
          <View style={styles.lineGray} />

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Mô tả</Text>
            <Text style={styles.blackText}>{item.description}</Text>
          </View>
          <View style={styles.lineGray} />

          <View style={styles.infoRow}>
            <Text style={styles.blackText}>Tình trạng</Text>
            <Text style={styles.greenText}>còn {item.quantity} sp</Text>
          </View>
          <View style={styles.lineGray} />
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.moreContainer}>
          <View>
            <Text style={styles.headerAmount}>Đã chọn {amount} sản phẩm</Text>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (amount > 0) {
                    setAmount(amount - 1);
                  }
                  // amount === 0 ? setAmount(0) : setAmount(amount - 1);
                }}>
                <Image source={ICON.minus} style={styles.amountIcon} />
              </TouchableOpacity>
              <Text style={styles.amountText}>{amount}</Text>
              <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                <Image source={ICON.plus} style={styles.amountIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.headerPrice}>Tạm tính</Text>
            <Text style={styles.totalPrice}>
              {(item.price * amount).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.btnAddCart,
            amount > 0 ? styles.btnAddCartActive : {},
          ]}
          onPress={() => {
            dispatch(addToCart({...item, amount}));
            Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
          }}
        >
          <Text style={{color: COLORS.white, fontSize: 18}}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  body: {
    height: '52%',
    paddingHorizontal: 50,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  type: {
    padding: 7,
    marginRight: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  typeText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: COLORS.primary,
    marginVertical: 20,
  },
  lineDark: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
  },
  lineGray: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 2,
  },
  blackText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: COLORS.black,
  },
  greenText: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: COLORS.primary,
  },
  detailText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    color: COLORS.black,
    marginBottom: 3,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
  },
  headerAmount: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  amountIcon: {
    width: 30,
    height: 30,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  headerPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    textAlign: 'right',
  },
  totalPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'right',
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnAddCart: {
    width: '80%',
    height: 50,
    marginHorizontal: '10%',
    borderRadius: 10,
    top: 20,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddCartActive: {
    backgroundColor: COLORS.primary,
  },
  imageCarousel: {
    marginTop: 20,
  },
  paginationContainer: {
    position: 'absolute',
    top: 380,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
