import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../component/Header';
import COLORS from '../resources/constant/Color';
import ProductItem from '../component/item/ProductItem';
import { getCategories } from '../api/category/AxiosCategory';
import { getProducts, getProductsByCategory } from '../api/product/AxiosProduct';
import { ICON } from '../resources/constant/Icons.tsx';
import HomeItemContainer from '../component/HomeItemContainer.tsx';

interface ProductItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  category: {
    _id: string;
    name: string;
    available: boolean;
    createAt: string;
    updateAt: string;
    __v: number;
  };
  role: number;
  available: boolean;
  createAt: string;
  updateAt: string;
  __v: number;
}

interface Category {
  name: string;
  _id: string;
}

const Product = ({ navigation, route }: any) => {
  const { category } = route.params;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    // @ts-ignore
    getCategories().then((data: Category[]) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      if (selectedCategoryId === 'all') {
        // @ts-ignore
        getProducts().then((data: ProductItem[]) => {
          setProducts(data);
        });
      } else {
        // @ts-ignore
        getProductsByCategory(selectedCategoryId).then((data: ProductItem[]) => {
          setProducts(data);
        });
      }
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    setSelectedCategoryId('all');
  }, []);


  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
  <SafeAreaView style={styles.container}>
      <Header
        title={category}
        iconLeft={ICON.left}
        iconRight={ICON.cart}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate('Cart')}
        leftIconSize={24}
        rightIconSize={24}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategoryId === 'all' ? styles.tabActive : {},
          ]}
          onPress={() => handleCategoryPress('all')}>
          <Text
            style={[
              styles.tabText,
              selectedCategoryId === 'all' ? styles.tabTextActive : {},
            ]}>
            Tất cả
          </Text>
        </TouchableOpacity>
        {categories.map((category: Category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              selectedCategoryId === category._id ? styles.tabActive : {},
            ]}
            onPress={() => handleCategoryPress(category._id)}>
            <Text
              style={[
                styles.tabText,
                selectedCategoryId === category._id ? styles.tabTextActive : {},
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.list}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductItem item={item} />}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default Product;


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 10,
  },
  tabContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    height: 50,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.white,
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  list: {
    flex: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
