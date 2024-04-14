import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import BottomTabNavigation from './BottomTabNavigation';
import Cart from '../screens/Cart';
import Product from '../screens/Product';
import Detail from '../screens/Detail';
import ChangeProfile from '../screens/ChangeProfile';
import Payment from '../screens/Payment';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='SignUp' component={SignUp}/>
          <Stack.Screen
            name='BottomTabNavigation'
            component={BottomTabNavigation}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name='Cart' component={Cart}/>
          <Stack.Screen name='Product' component={Product}/>
          <Stack.Screen name='Detail' component={Detail}/>
          <Stack.Screen name='ChangeProfile' component={ChangeProfile}/>
          <Stack.Screen name='Payment' component={Payment}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})
