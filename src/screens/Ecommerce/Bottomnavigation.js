import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Image, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from './Homescreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Notificationsscreen from './Notificationsscreen';
import Cartscreen from '../Ecommerce/cartScreen'
import Profile from '../dashboard/profile/Profile';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fonts from '../../themes/Fonts'
const Tab = createBottomTabNavigator()
export default class Bottomnavigation extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                {/* <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: 'white',
                        style: { backgroundColor: 'orange', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                        labelStyle: { fontSize: 12, color: 'white' },



                    }}>
                    <Tab.Screen name="Home" component={Homescreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <IonIcon name="home-outline" size={25} color={color} />
                            )
                        }} />
                    <Tab.Screen name="Notifications" component={Notificationsscreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <IonIcon name="notifications-outline" size={25} color={color} />
                            )
                        }} />
                    <Tab.Screen name="Cart" component={Cartscreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <IonIcon name="home-outline" size={50} color={color} style={{ backgroundColor: 'white', borderRadius: 50, marginBottom: 30, borderTopWidth: 2, borderTopColor: 'orange' ,borderTopRightColor:"orange"}} />
                            )
                        }} />
                    <Tab.Screen name="My Account" component={Profile}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <IonIcon name="person-outline" size={25} color={color} />
                            )
                        }} />
                    <Tab.Screen name="Home1" component={Profile}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <IonIcon name="person-outline" size={25} color={color} />
                            )
                        }} />

                </Tab.Navigator> */}
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            return(
                                <View style={{ flex: 1 }}>
                                <Text>222</Text>
                            </View>

                            )
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'Home';
                            } else if (route.name === 'Cart') {
                                iconName = 'Cart';
                            } else if (route.name === 'My Account') {
                                iconName = 'My Account';
                            } else if (route.name === 'Notifications') {
                                iconName = 'Notifications';
                            } else if (route.name === 'Profile') {
                                iconName = 'Profile';
                            }

                            if (iconName == 'Home') {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <Text>222</Text>
                                    </View>

                                );
                            }
                            if (iconName == 'Cart') {
                                return (
                                    <>
                                        <Image
                                            source={require('../../assets/icons/stream_tab.png')}
                                            style={[styles.tabBarIcon, { tintColor: color }]}
                                        />
                                        <Text
                                            style={{
                                                color: color,
                                                fontSize: wp('3'),
                                                fontFamily: Fonts.RobotoBold,
                                            }}>
                                            {iconName}
                                        </Text>
                                    </>
                                );
                            }
                            if (iconName == 'My Account') {
                                return (
                                    <>
                                        <View style={styles.plusContainer}>
                                            <Image
                                                source={require('../../assets/icons/home_tab.png')}
                                                style={styles.plusIcon}
                                            />
                                        </View>
                                    </>
                                );
                            }

                            if (iconName == 'Notifications') {
                                return (
                                    <>
                                        <Image
                                            source={require('../../assets/icons/ic_comment_un.png')}
                                            style={[styles.tabBarIcon, { tintColor: color }]}
                                        />
                                        <Text
                                            style={{
                                                color: color,
                                                fontSize: wp('3'),
                                                fontFamily: Fonts.RobotoBold,
                                            }}>
                                            {iconName}
                                        </Text>
                                    </>
                                );
                            }
                            if (iconName == 'Profile') {
                                return (
                                    <>
                                        <Image
                                            source={require('../../assets/icons/profile_tab.png')}
                                            style={[styles.tabBarIcon, { tintColor: color }]}
                                        />
                                        <Text
                                            style={{
                                                color: color,
                                                fontSize: wp('3'),
                                                fontFamily: Fonts.RobotoBold,
                                            }}>
                                            {iconName}
                                        </Text>
                                    </>
                                );
                            }
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'white',
                        inactiveTintColor: 'white',
                     
                        style: { backgroundColor: 'orange', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopEndRadius: 10 },
                    }}>
                    <Tab.Screen
                        name="Home"
                        options={{ title: '' }}
                        component={Homescreen}
                    />
                    <Tab.Screen name="Cart" options={{ title: '' }} component={Cartscreen} />
                    <Tab.Screen
                        name="My Account"
                        options={{ title: '', tabBarVisible: false }}
                        component={Notificationsscreen}
                    />
                    <Tab.Screen name="Notifications" options={{ title: '' }} component={Notificationsscreen} />
                    <Tab.Screen
                        name="Profile"
                        options={{ title: '' }}
                        component={Profile}
                    />
                </Tab.Navigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    plusContainer: {
        height: wp('10.5'),
        width: wp('10.5'),
        borderRadius: wp('12.5'),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: wp('3'),
        marginBottom: wp('5'),
        elevation: 2,
        borderTopColor: 'orange',
        borderLeftColor: 'orange',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderRightColor: 'orange'
    },
    plusIcon: {
        height: wp('6'),
        width: wp('6'),
        resizeMode: 'contain',
        tintColor: '#000000',
    },
    tabBarIcon: {
        height: wp('6.5'),
        width: wp('6.5'),
        resizeMode: 'contain',
        marginTop: wp('3'),
    },
})
