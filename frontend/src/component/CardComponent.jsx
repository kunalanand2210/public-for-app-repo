import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../constant/colors';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHeight = screenSize.height;
var screenHalfWidth = screenSize.width * 0.465;

const cardComponent = ({ heading, para, }) => {
    return (
        
            <View style={styles.backbox}>
                <View style={styles.box}>
                    <Text style={styles.heading}>{heading}</Text>
                    <Text style={styles.paragraph}>{para}</Text>
                    <View style={styles.arrowbox}>
                        <Icon name='arrowright' size={26} color='white' />
                    </View>
                </View>
            </View>
        


    )
}

export default cardComponent

const styles = StyleSheet.create({
    backbox: {
        width: screenWidth,
        height: screenHeight,
        paddingHorizontal: '3%'
    },

    box: {
        backgroundColor: '#878686',
        height: '20%',
        borderRadius: 5,
        paddingHorizontal: '17%',
        paddingVertical: '8%'
    },
    heading: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    },
    paragraph: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    arrowbox: {
        backgroundColor: colors.buttonColor,
        width: '30%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '35%',
        paddingHorizontal: '35%',
        paddingVertical: '10%',
        borderRadius: 5,
    }
})