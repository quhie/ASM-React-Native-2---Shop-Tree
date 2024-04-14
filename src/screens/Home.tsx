import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import HomeItemContainer from '../component/HomeItemContainer';
import { getProducts } from '../api/product/AxiosProduct';
import { ProductItemProps } from '../component/item/ProductItem.tsx';
import {IMAGES} from '../resources/constant/Image';
import COLORS from '../resources/constant/Color';
import {ICON} from '../resources/constant/Icons';

const HEADER_HEIGHT = 300;
const AVATAR_SIZE = 100;
const Home = ({navigation}: any) => {
  const [ListData, setListData] = useState([]);
  const [products, setProducts] = useState<ProductItemProps[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      // @ts-ignore
      return setListData(data);
    });
  }, []);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 100],
      Extrapolate.CLAMP,
    );
    return {
      height: height,
    };
  });

  const headerScale = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [100, HEADER_HEIGHT],
      [1, 1], // giữ nguyên scale 1
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
    };
  });

  const cartIconStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [100, HEADER_HEIGHT],
      [0, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY}],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [100, HEADER_HEIGHT],
      [1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: 'black',
      fontSize: 18,
      marginRight: 150,
      fontWeight: 'bold',
    };
  });

  const imageHeight = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 200],
      Extrapolate.CLAMP,
    );
    return {
      height: height,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}>
        <Animated.View style={[styles.header, headerStyle, headerScale]}>
          <Animated.Image source={IMAGES.homebg} style={[styles.homebg, backgroundStyle, imageHeight]} />
          <View style={styles.headerBody}>
            <Animated.Text style={textStyle}>
              Planta - Toả sáng không gian nhà bạn
            </Animated.Text>
            <TouchableOpacity style={styles.newProductRow}>
              <Text style={styles.newProductText}>Xem hàng mới về</Text>
              <Image source={ICON.arrow_right} style={styles.newProductIcon} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.body}>
          <HomeItemContainer
            title="Cây trồng"
            moreButton={() => navigation.navigate('Product', {category: 'Cây trồng'})}
            listData={ListData.filter((item: ProductItemProps) =>
              item.category && item.category.name === "Ưa sáng"
              || item.category.name === "Ưa bóng"
              || item.category.name === "Hàng mới về"
            ).slice(0, 4)}
          />
          <HomeItemContainer
            title="Chậu cây trồng"
            moreButton={() => navigation.navigate('Product', {category: 'Chậu cây Trồng'})}
            listData={ListData.filter((item: ProductItemProps) => item.category && item.category.name === "Chậu cây Trồng").slice(0, 4)}
          />
          <HomeItemContainer
            title="Phụ kiện"
            moreButton={() => navigation.navigate('Product', {category: 'Phụ kiện chăm sóc'})}
            listData={ListData.filter((item: ProductItemProps) => item && item.category && item.category.name === "Phụ kiên chăm sóc").slice(0, 4)}        />
        </View>
        <View>
          <Text style={styles.tvFooter}>Combo chăm sóc (mới)</Text>
          <View style={styles.containerFooter}>
            <View style={styles.containerFooter2}>
              <Text style={styles.tvFooter2}>Lemon Balm Grow Kit </Text>
              <Text
                style={styles.tvFooter3}
                numberOfLines={3}
                ellipsizeMode="tail">
                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker
                đánh dấu...
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://36vine.com/wp-content/uploads/2023/12/Creeping-Fig-plant.webp',
              }}
              style={styles.imgFooter}
            />
          </View>
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        style={[styles.cart, {position: 'absolute', top: 50, right: 20}]}
        onPress={() => navigation.navigate('Cart')}>
        <Animated.Image source={ICON.cart} style={[styles.cartIcon, cartIconStyle]} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',

  },

  cart: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
  homebg: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    zIndex: -1,
  },
  headerBody: {
    marginTop: 70,
    marginLeft: 20,
  },
  headerText: {
    width: '60%',
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    lineHeight: 35,
    color: COLORS.black,
  },
  newProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  newProductText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: COLORS.primary,
  },
  newProductIcon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  cart: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
  cartIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  tvFooter: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: COLORS.black,
    marginHorizontal: 20,
  },
  containerFooter: {
    flexDirection: 'row',
    height: 170,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: COLORS.lightgray,
    borderRadius: 20,
  },
  containerFooter2: {
    flex: 1,
    justifyContent: 'center',
    top: 10,
    alignItems: 'center',
    padding: 10,
  },
  tvFooter2: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginTop: 40,
    color: COLORS.black,
    flex: 1,
  },
  tvFooter3: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    marginBottom: 40,
    color: COLORS.gray,
    flex: 1,
  },
  imgFooter: {
    width: '40%',
    height: 170,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
