/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { SOCKET_IO_SERVER } from '../config';
import convertToProxyURL from 'react-native-video-cache';

class MessageBubbleVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            loadingVideoback: true
        }
    }

    render() {
        const { image_url } = this.props.route.params;

        return (

            <View style={{ backgroundColor: "black", flex: 1, justifyContent: 'center' }}>

                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.crossContainer}>
                    <Image
                        source={require('../assets/icons/cross.png')}
                        style={styles.cross}
                    />
                </TouchableOpacity>
                {this.state.loadingVideoback && (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)',

                            position: 'absolute',
                            zIndex: 1000,
                        }}>
                        <ActivityIndicator
                            color={'white'}
                            size={'large'}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: 0,
                                bottom: 0,
                            }}
                        />
                    </View>
                )}
                <Video
                    source={{ uri: convertToProxyURL(SOCKET_IO_SERVER + image_url) }}
                    resizeMode='cover'
                    controls={true}
                    onLoad={() => this.setState({ loadingVideoback: false })}
                    style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                    }} />
            </View>
        );
    }
}

export default MessageBubbleVideo;

const styles = {

    cross: {
        height: wp('6'),
        width: wp('6'),
        resizeMode: 'contain',
    },
    crossContainer: {
        position: 'absolute',
        top: Platform.OS === "ios" ? wp('10') : wp('5'),
        right: wp('5'),
        zIndex: 20,
    },

};
