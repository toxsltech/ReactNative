import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView, StatusBar } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader';
import InputField from '../../components/InputField';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '../../themes/Fonts';
import { Card } from 'react-native-shadow-cards';

export default class Homescreen extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                { text: 'Women', men: 'Men', beauty: 'Beauty', kids: 'Kids', electronic: 'Elecrtonics', jew: "Jewellery" }


            ],
            data1: [
                { uri: 'https://i.pinimg.com/474x/34/a1/a5/34a1a590c23599cbd7441346fa9093b7.jpg' },
                // { uri: 'https://i.pinimg.com/originals/e1/2d/cd/e12dcde0fd436da78a08bc719cfc6381.jpg' },
                { uri: 'https://i.pinimg.com/474x/34/a1/a5/34a1a590c23599cbd7441346fa9093b7.jpg' },
                { uri: 'https://i.pinimg.com/474x/34/a1/a5/34a1a590c23599cbd7441346fa9093b7.jpg' },
                // { uri: 'https://i.pinimg.com/originals/e1/2d/cd/e12dcde0fd436da78a08bc719cfc6381.jpg' },

            ], data2: [
                { uri: 'https://static.sscontent.com/prodimg/products/124/v753086_prozis_x600--headset-gaming_single-size_no-code_newin.jpg' },
                { uri: 'https://static.sscontent.com/prodimg/products/124/v753086_prozis_x600--headset-gaming_single-size_no-code_newin.jpg' },
                { uri: 'https://static.sscontent.com/prodimg/products/124/v753086_prozis_x600--headset-gaming_single-size_no-code_newin.jpg' },


            ],
            data3: [
                { uri: 'https://images-na.ssl-images-amazon.com/images/I/61-f2VmFysL._UX569_.jpg' },
                { uri: 'https://images-na.ssl-images-amazon.com/images/I/61-f2VmFysL._UX569_.jpg' },
                { uri: 'https://images-na.ssl-images-amazon.com/images/I/61-f2VmFysL._UX569_.jpg' },
                { uri: 'https://images-na.ssl-images-amazon.com/images/I/61-f2VmFysL._UX569_.jpg' },


            ],
            enableScrollViewScroll: true
        }
    }
    flate = (item) => {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/women.png')} />
                        <Text style={styles.flametext}>{item.text}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/men.png')} />
                        <Text style={styles.flametext}>{item.men}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/beauty.png')} />
                        <Text style={styles.flametext}>{item.beauty}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/kids.png')} />
                        <Text style={styles.flametext}>{item.kids}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/elec.png')} />
                        <Text style={styles.flametext}>{item.electronic}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                    <View style={styles.flatemain}>

                        <Image style={styles.flamimage} source={require('./images/home/jew.png')} />
                        <Text style={styles.flametext}>{item.jew}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
    flate1 = (item) => {
        return (
            <View style={{}} >
                <Card
                    elevation={6}
                    style={{ margin: 5, width: wp('40'), height: wp('42'), alignItems: 'center' }}>

                    <View style={styles.flate1main}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')}>

                            <ImageBackground style={styles.flate1image} source={{ uri: item.uri }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ heart: !this.state.heart })


                                }}>
                                    {this.state.heart ?
                                        <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/hearthalf.png')} />
                                        : <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/heartfull.png')} />

                                    }
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: wp('25'), }}>

                                <Text style={{ fontFamily: 'Poppins-Regular', }}>
                                    Floral dress..
                                </Text>
                                <Text style={{ fontSize: 9, color: '#bdc3c7', fontFamily: 'Poppins-Regular', }}>
                                    Fashion Trends
                                </Text>
                            </View>

                            <View style={{}}>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')}  >
                                    <Text style={{ color: '#025960', textAlign: 'right', fontSize: 11, fontFamily: 'Poppins-SemiBold', height: 16 }}>$520</Text>
                                    <View style={{ backgroundColor: '#025960', width: 46, borderRadius: 50, height: 15, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ textAlign: 'center', fontSize: 9, color: 'white' }}>Buy Now</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Card>
            </View>
        )
    }
    flate11 = (item) => {
        return (
            <View style={{}} >
                <Card
                    elevation={6}
                    style={{ margin: 5, width: wp('40'), height: wp('42'), alignItems: 'center' }}>

                    <View style={styles.flate1main}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')}>

                            <ImageBackground style={styles.flate1image} source={{ uri: item.uri }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ heart: !this.state.heart })


                                }}>
                                    {this.state.heart ?
                                        <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/hearthalf.png')} />
                                        : <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/heartfull.png')} />

                                    }
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginLeft: wp('2') }}>
                            <View style={{ width: wp('25') }}>

                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, height: 15 }}>
                                    Floral dress..
                                </Text>
                                <Text style={{ fontSize: 9, color: '#bdc3c7', fontFamily: 'Poppins-Regular', }}>
                                    Fashion Trends
                                </Text>
                            </View>

                            <View style={{}}>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')}  >
                                    <Text style={{ color: '#025960', textAlign: 'right', fontSize: 14, fontFamily: 'Poppins-SemiBold', height: 18, }}>$520</Text>
                                    <View style={{ flex: 1, justifyContent: 'center', marginTop: 5 }}>

                                        <Text style={{ textAlign: 'center', fontSize: 12, color: '#bdc3c7' }}>$650</Text>
                                        <View style={{ borderWidth: 0.6, position: 'absolute', flex: 1, width: '100%', alignSelf: 'center', borderColor: '#bdc3c7' }}></View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Card>
            </View>
        )
    }
    flate2 = (item) => {
        return (
            <View >
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')}>

                        <ImageBackground style={styles.flate2Image} source={{ uri: item.uri }}>


                            <TouchableOpacity onPress={() => {
                                this.setState({ heart2: !this.state.heart2 })


                            }}>
                                {this.state.heart2 ?
                                    <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/hearthalf.png')} />
                                    : <Image style={{ height: wp('7'), width: wp('7') }} source={require('./images/store/heartfull.png')} />

                                }
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: wp("65") }}>


                            <Text style={{ fontSize: 19, fontFamily: 'Poppins-Italic', height: 27 }}>
                                Orange Headphones
                            </Text>
                            <Text style={{ fontSize: 15, color: '#bdc3c7', fontFamily: 'Poppins-Italic', }}>
                                Beet & Boot
                            </Text>
                        </View>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile')} >
                                <Text style={{ color: '#025960', textAlign: 'right', fontSize: 14, fontFamily: 'Poppins-SemiBold', height: 18, }}>$520</Text>
                                <View style={{ backgroundColor: '#025960', width: wp('14'), borderRadius: 50 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 10, color: 'white', }}>Buy Now</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
                <View style={{ flex: 1 }}>

                    <AppHeader
                        left={
                            <View >
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Setting')}
                                >

                                    <IonIcon name="grid" color='#025960' size={30} />
                                </TouchableOpacity>

                            </View>
                        }
                        body={
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Filtersearch')}
                            >
                                <InputField
                                    editable={false}
                                    leftIcon={
                                        <Image
                                            source={require('../../assets/icons/search.png')}
                                            style={styles.searchIcon}
                                        />
                                    }
                                    inputField={styles.searchText}
                                    containerStyle={styles.headerSearchbar}
                                    placeholder={'Search'}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>






                <View style={{ flex: 9 }}>

                    <Text style={styles.maintext}>Shop by Category</Text>
                    <View>

                        <FlatList
                            horizontal={true}
                            style={{ marginHorizontal: 5 }}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={this.state.data}
                            renderItem={({ item }) =>
                                this.flate(item)
                            }
                        />
                    </View>
                    <ScrollView>
                        <View style={{ marginHorizontal: 5, height: 185, }}>

                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}

                                keyExtractor={(item) => item.id}
                                data={this.state.data1}
                                renderItem={({ item }) =>
                                    this.flate1(item)
                                }
                            />
                        </View>
                        <View style={{ height: 290, }}>

                            <FlatList
                                nestedScrollEnabled
                                showsHorizontalScrollIndicator={false}

                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                style={{ height: wp('90') }}
                                keyExtractor={(item) => item.id}
                                data={this.state.data2}
                                renderItem={({ item }) =>
                                    this.flate2(item)
                                }
                            />
                        </View>
                        <View style={{ marginHorizontal: 5, height: wp('47') }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}

                                horizontal={true}
                                style={{ height: 180 }}
                                keyExtractor={(item) => item.id}
                                data={this.state.data3}
                                renderItem={({ item }) =>
                                    this.flate11(item)
                                }
                            />



















                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerSearchbar: {
        width: wp('70'),
        height: wp('9.5%'),
        borderRadius: wp('10'),
        marginLeft: wp('4.5'),
        backgroundColor: 'white',
        borderWidth: 0,
        paddingLeft: wp('3'),
        borderWidth: 1,

    },
    searchIcon: {
        height: wp('4.5'),
        width: wp('4.5'),
        resizeMode: 'contain',
        marginLeft: wp('2'),
    },
    searchText: {
        fontFamily: Fonts.RobotoBold,
        fontSize: wp('3.5'),
        // marginLeft: -wp('1.5'),
    },
    maintext: {

        fontSize: wp('4'),
        //   fontWeight:'bold',
        marginLeft: wp('5'),
        fontFamily: 'Poppins-Regular'
    },
    flatemain: {
        margin: 9,
        flexDirection: 'column',
        alignItems: 'center', width: 55
    },
    flamimage: {
        height: 65,
        width: 65,
        borderRadius: 100
    },
    flametext: {
        textAlign: "center",
        fontSize: 10,
        fontFamily: 'Poppins-Regular'
    },
    flate1main: {
        alignItems: 'center'
    },
    flate1image: {
        height: wp('32'),
        width: wp('40'),

        overflow: 'hidden',
        alignItems: 'flex-end',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    flate2Image: {
        height: hp('30'),
        width: wp('85'),
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'flex-end',
        padding: 10
    }
})
