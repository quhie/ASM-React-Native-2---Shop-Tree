import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ProductItem, { ProductItemProps } from '../component/item/ProductItem';
import { searchProduct } from '../api/product/AxiosProduct';
import Header from '../component/Header.tsx';
import { ICON } from '../resources/constant/Icons.tsx';
import COLORS from '../resources/constant/Color.tsx';
const Search = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<ProductItemProps[]>([]); // state to store the search results

  useEffect(() => {
    if (searchQuery) {
      // @ts-ignore
      searchProduct(searchQuery).then(setProducts);
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tìm kiếm"
        iconLeft={ICON.left}
        onPressLeft={() => navigation.goBack()}
        leftIconSize={24}
        rightIconSize={24}
      />
      <View style={styles.container2}>
        <Searchbar
          icon={() => <View />}
          clearIcon={() => (
            <Image
              source={{uri: 'https://img.icons8.com/ios/50/search--v1.png'}}
              style={{
                width: 20,
                height: 20,
              }}
            />
          )}
          placeholder="Tìm kiếm..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={{
            textAlign: 'left',
            fontSize: 16,
            color: 'black',
            marginLeft: -30,
          }}
        />
        <Text style={styles.recentSearchTitle}>Tìm kiếm gần đây</Text>
        <FlatList
                  data={products}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <ProductItem item={item} />
                  )}
                  contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    flex: 1,
  },
  recentSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 36,
    marginTop: 16,
  },
  recentSearchItem: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 36,
    marginTop: 16,
  },
  searchBar: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});
