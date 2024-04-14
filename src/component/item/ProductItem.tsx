import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../resources/constant/Color'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export interface ProductItemProps {
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

const ProductItem = ({item}: {item: ProductItemProps}) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {item: item})}
        style = {styles.container}
      >
          <Image
            source={{uri: item.image}}
            style = {styles.image}
            resizeMode='cover'
          />
          <Text style = {styles.name}>{item.name}</Text>
          <Text style = {styles.category}>{item.category ? item.category.name : ''}</Text>
          <Text style = {styles.price}>{item.price}đ</Text>

      </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    image: {
        width: 155,
        height: 134,
        borderRadius: 5
    },
    name: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.black,
        marginTop: 4
    },
    category: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        marginTop: 3
    },
    price: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: COLORS.primary,
        marginTop: 4
    }
})
