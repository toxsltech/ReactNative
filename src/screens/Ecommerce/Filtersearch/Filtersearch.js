import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, FlatList, StatusBar, TextInput } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Filtersearchtag from '../../../ecommerceComponents/Filtersearchtag';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { androidHeight, iosH5 } from '../../../utils/constants';

export default class Filtersearch extends Component {
    constructor() {
        super()
        this.state = {
            filtersearchdate: [],
            searchdata: [],
            searchText: ''
        }
    }

    componentDidMount = () => {
        const inputtext = this.props.route.params.inputtext ? this.props.route.params.inputtext : ''
        const key = this.props.route.params.key ? this.props.route.params.key : ''
        if (inputtext != '') {
            this.setState({ searchText: inputtext })
        }
        if (key != '') {
            this.onGetFullCategory()
        } this.search()
    }

    search = () => {
        this.props.onGetSearchProduct().then(() => this.afteronGetSearchProduct());
    }

    afteronGetSearchProduct = () => {
        const { searchText } = this.state
        const searchdataData = this.props.getsearchResponse ? this.props.getsearchResponse.data : '';

        this.setState({
            searchdata: searchText == '' ? [] :
                searchdataData.filter((item) =>
                    item.title.toLowerCase().startsWith(searchText.toLowerCase()),
                )
        })
    }

    onGetFullCategory = () => {
        const key = this.props.route.params.key ? this.props.route.params.key : ''
        this.props.onGetFullCategory(key).then(() => this.afteronGetFullCategory());
    }

    afteronGetFullCategory = () => {
        const fullData = this.props.getfullcategoryResponse ? this.props.getfullcategoryResponse.data : '';
        this.setState({ filtersearchdate: fullData })
    }

    render() {
        const { searchdata, searchText } = this.state
        return (
            <View style={styles.view1}>
          
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <View style={styles.view5}>
                            <TouchableOpacity style={styles.view6} onPress={() => this.props.navigation.goBack()}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                            </TouchableOpacity>
                            <View style={styles.view7}>
                                <Image style={styles.searchicon} source={require("../images/msgsearch.png")} />
                                <TextInput style={styles.text}
                                    value={searchText}
                                    placeholder='Search'
                                    onChangeText={(searchText) => {
                                        this.setState({ searchText })
                                        setTimeout(() => {
                                            this.afteronGetSearchProduct()
                                        }, 10);
                                    }}
                                    returnKeyType='search'
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Filterscreen')}>
                                <Image style={styles.msgicon} source={require("../images/filter.png")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.view2}>
                    {searchText ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(item) => item._id}
                            data={searchdata}
                            renderItem={({ item }) =>
                                <Filtersearchtag
                                    item={item}
                                    navigation={this.props.navigation}
                                    tag={this.onGetFullCategory.bind(this)}
                                />
                            }
                            bounces={false}
                        />
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(item) => item._id}
                            data={this.state.filtersearchdate}
                            renderItem={({ item }) =>
                                <Filtersearchtag
                                    item={item}
                                    navigation={this.props.navigation}
                                    tag={this.onGetFullCategory.bind(this)}
                                />
                            }
                            bounces={false}
                        />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerSearchbar: {
        width: wp('65'),
        height: wp('8.5%'),
        borderRadius: wp('10'),
        backgroundColor: 'white',
        borderWidth: 1,
        paddingLeft: wp('3'),
        marginTop: wp('2'), marginLeft: 10,

    },
    searchIcon: {
        height: wp('4.5'),
        width: wp('4.5'),
        resizeMode: 'contain',
        marginLeft: wp('2'),
    },
    searchText: {
        fontSize: wp('3.5'),
    },
    backimagefirst: {
        height: hp('21'),
        width: wp('44'),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
        alignItems: 'flex-end',
        padding: 10
    },
    msgicon: {
        height: wp('7'),
        width: wp('7')
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        marginHorizontal: 10,
        tintColor: '#025960'
    },
    searchicon: {
        height: 15,
        width: 15,
        marginHorizontal: 5
    },
    view1: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? iosH5 :androidHeight

    },
    row: {
        flexDirection: 'row'
    },
    view2: {
        flex: 7,
        alignItems: 'center'
    },
    view3: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 20
    },
    view4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between'
    },
    view5: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    view6: {
        width: 60,
        alignItems: 'center'
    },
    view7: {
        width: wp('60'),
        height: 35,
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    text: {
        width: 150,
        padding: 0
    }
})
