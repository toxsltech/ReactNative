import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ouchableOpacity, Picker, ScrollView, StatusBar, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { androidHeight, iosHeight } from '../../utils/constants';

export default class Filterscreen extends Component {
    constructor() {
        super()
        this.state = {
            check1: true,
            check2: false,
            check3: true,
            check4: false,


        }
    }
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 120 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Filter</Text>

                            </View>
                        </TouchableOpacity>
                        <View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>


                                <Image style={styles.homeicon} source={require("./images/store/home.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>



                {/* newww */}
                <View style={{ flex: 6, }}>
                    <ScrollView bounces={false}>

                        <View style={{ marginHorizontal: 20, margin: 8 }}>


                            <Text style={styles.maintext}>Price</Text>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={styles.text1}>Low to High </Text>
                                <TouchableOpacity onPress={() => this.setState({ check1: !this.state.check1 })}>
                                    {this.state.check1 ?
                                        <Image style={styles.button} source={require('./images/filterimages/3.png')} />
                                        : <Image style={styles.button} source={require('./images/filterimages/4.png')} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.text2}>High to low</Text>
                                <TouchableOpacity onPress={() => this.setState({ check2: !this.state.check2 })}>
                                    {this.state.check2 ?
                                        <Image style={styles.button} source={require('./images/filterimages/3.png')} />
                                        : <Image style={styles.button} source={require('./images/filterimages/4.png')} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.dot}></View>


                        {/* newww */}


                        <View style={{ marginHorizontal: 20, margin: 8 }}>

                            <Text style={styles.maintext}>Rating</Text>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={styles.text1}>Low to High </Text>
                                <TouchableOpacity onPress={() => this.setState({ check3: !this.state.check3 })}>
                                    {this.state.check3 ?
                                        <Image style={styles.button} source={require('./images/filterimages/3.png')} />
                                        : <Image style={styles.button} source={require('./images/filterimages/4.png')} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.text2}>High to low</Text>
                                <TouchableOpacity onPress={() => this.setState({ check4: !this.state.check4 })}>
                                    {this.state.check4 ?
                                        <Image style={styles.button} source={require('./images/filterimages/3.png')} />
                                        : <Image style={styles.button} source={require('./images/filterimages/4.png')} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.dot}></View>




                        {/* newww */}
                        <View style={{ marginHorizontal: 20, margin: 8 }}>

                            <Text style={styles.maintext}>Choose Filter</Text>
                            <View style={{ margin: 8, alignItems: 'center' }}>

                                <View style={styles.mainview}>

                                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={styles.pickerlogo} source={require('./images/filterimages/5.png')} />
                                        <Picker
                                            selectedValue={this.state.value}
                                            style={{ height: wp('10'), width: wp('78'), }}
                                            onValueChange={(value) => this.setState({ value })}
                                        >
                                            <Picker.Item label="Newest to Oldest" value="java" color='#bdc3c7' />
                                            <Picker.Item label="Oldest to Newest" value="js" color='#bdc3c7' />
                                        </Picker>
                                    </View>

                                </View>
                            </View>
                            <Text style={styles.maintext}>Brands</Text>
                            <View style={{ marginVertical: 8, alignItems: 'center' }}>

                                <View style={styles.mainview}>

                                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={styles.brandlogo} source={require('./images/filterimages/8.png')} />

                                        <Picker
                                            selectedValue={this.state.brandvalue}
                                            style={{ height: wp('10'), width: wp('78'), }}
                                            onValueChange={(brandvalue) => this.setState({ brandvalue })}
                                        >
                                            <Picker.Item label="Adidas" value="java" color='#bdc3c7' />
                                            <Picker.Item label="Puma" value="js" color='#bdc3c7' />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dot}></View>

                        {/* neww */}



                        <View style={{ marginHorizontal: 20, margin: 2 }}>

                            <Text style={styles.maintext}>Size</Text>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>


                                <TouchableOpacity>
                                    <Image style={styles.imagesize} source={require('./images/filterimages/9.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/10.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/11.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/12.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/14.png')} />
                                </TouchableOpacity>




                            </View>
                        </View>
                        <View style={styles.dot}></View>

                        {/* neww */}

                        <View style={{ marginHorizontal: 20, margin: 2 }}>

                            <Text style={styles.maintext}>Colors</Text>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/15.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/16.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity>

                                    <Image style={styles.imagesize} source={require('./images/filterimages/17.png')} />
                                </TouchableOpacity>


                            </View>
                        </View>
                        <View style={styles.dot}></View>
                        {/* neww */}

                        <View style={{ marginHorizontal: 20, margin: 2, marginVertical: 35 }}>


                            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                                    <Image style={styles.imagebutton} source={require('./images/filterimages/19.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch')}>

                                    <Image style={styles.imagebutton} source={require('./images/filterimages/18.png')} />
                                </TouchableOpacity>



                            </View>
                        </View>


                    </ScrollView>
                </View>




            </View>
        )
    }
}

const styles = StyleSheet.create({
    maintext: {
        fontSize: 18,
        marginVertical: 1
    },
    text1: {
        width: wp('75'),
        color: '#bdc3c7',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold'
    },
    text2: {
        width: wp('75'),
        color: '#bdc3c7',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold'

    },
    button: {
        height: wp('7'),
        width: wp('16'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    },
    dot: {
        borderWidth: 0.7,
        borderStyle: "dashed", resizeMode: 'center',
        borderRadius: 1,
        borderColor: '#bdc3c7',
    },
    pickerlogo: {

        height: wp('4'),
        width: wp('4'),
        marginLeft: wp('2')
    },
    brandlogo: {

        height: wp('5'),
        width: wp('5'),
        marginLeft: wp('2')


    },
    imagesize: {

        height: wp('12'),
        width: wp('11'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    }, height: 100,
    width: 170,
    imagebutton: {
        height: wp('20'),
        width: wp('42'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
        margin: 5
    },
    mainview: {
        borderRadius: 50,
        width: wp("90"),
        borderWidth: 1,
        borderColor: '#bdc3c7',
        height: wp('11'),
        justifyContent: 'center',
        marginBottom: 7
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },

})
