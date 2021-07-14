/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import { BASE_URL } from '../utils/env';

class ViewerStreamerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            following: this.props.following,
        };
    }

    render() {
        const { profileImg, userName } = this.props;


        return (
            <View style={styles.cardContainer}>
                <View style={styles.innerContainer}>
                    <View>
                        <View style={styles.imageContainer}>
                            <ImageBackground
                                source={require('../assets/images/placeholder.png')}
                                style={styles.placeholderImage}>

                                {profileImg ? (
                                    <Image
                                        source={
                                            profileImg
                                                ? { uri: BASE_URL + profileImg }
                                                : require('../assets/images/model.jpg')
                                        }
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Image
                                        source={require('../assets/images/model.jpg')}
                                        style={styles.profileImage}
                                    />
                                )}
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={styles.nameContainer}>
                        <ResponsiveText style={styles.name}>{userName}</ResponsiveText>
                    </View>
                    <View style={styles.buttonContainer}>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = {
    cardContainer: {
        height: wp('22'),
        borderBottomWidth: wp('0.3'),
        borderColor: '#E1E1E1',
        justifyContent: 'center',
    },
    innerContainer: {
        width: '100%',
        height: wp('15'),
        flexDirection: 'row',
    },
    imageContainer: {
        height: wp('15'),
        width: wp('15'),
        borderRadius: wp('15'),
        overflow: 'hidden',
    },
    placeholderImage: {
        height: wp('15'),
        width: wp('15'),
    },
    profileImage: {
        height: wp('15'),
        width: wp('15'),
        borderRadius: wp('15'),
    },
    unseenBadge: {
        borderRadius: wp('10'),
        backgroundColor: '#000000',
        position: 'absolute',
        right: 0,
        fontSize: 3,
        paddingVertical: wp('0.7'),
        paddingHorizontal: wp('1.5'),
        color: 'white',
        fontFamily: Fonts.OpenSansRegular,
        elevation: 1,
    },
    nameContainer: {
        marginLeft: wp('3'),
        width: wp('45'),
        height: wp('14'),
        maxHeight: wp('14'),
        overflow: 'hidden',
        justifyContent: "center",

    },
    name: {
        fontFamily: Fonts.OpenSansRegular,
        fontSize: 4.3,
        marginBottom: wp('1'),
    },
    time: {
        fontFamily: Fonts.OpenSansRegular,
        fontSize: 3.6,
        maxHeight: wp('8'),
        color: '#797979',
        opacity: 0.5,
        maxWidth: wp('40'),
    },
    buttonContainer: {
    },
    followButton: {
        height: wp('8.5'),
        width: wp('25'),
        borderRadius: wp('10'),
        borderWidth: wp('0.4'),
        borderColor: '#000000',
        elevation: 0,
        marginTop: wp('1'),
    },
};
export default ViewerStreamerCard;