import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import SignUp from '../screens/SignUp';
import COLORS from '../resources/constant/Color';
import { ICON } from '../resources/constant/Icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const renderLabel = (props: {focused: boolean}) =>
        props.focused ? (
            <View style = {styles.dot}></View>
        ) : null;

    const renderIcon = (icon: ImageSourcePropType, props: {color: string}) => (
        <Image
            source={icon}
            style={[styles.icon, {tintColor: props.color}]}
        />
    );


    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.black,
                tabBarInactiveTintColor: COLORS.black,
                tabBarStyle: {
                    height: 65,
                    paddingTop: 12,
                    paddingBottom: 12,
                },
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: props => renderIcon(ICON.home, props),
                    tabBarLabel: props => renderLabel(props)
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: props => renderIcon(ICON.search, props),
                    tabBarLabel: props => renderLabel(props)
                }}
            />
            <Tab.Screen
                name='Notification'
                component={Notification}
                options={{
                    tabBarIcon: props => renderIcon(ICON.notification, props),
                    tabBarLabel: props => renderLabel(props)
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: props => renderIcon(ICON.profile, props),
                    tabBarLabel: props => renderLabel(props)
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation

const styles = StyleSheet.create({
    dot: {
        width: 3,
        height: 3,
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: COLORS.black,
    },
    icon: {
        width: 24,
        height: 24
    }
})
