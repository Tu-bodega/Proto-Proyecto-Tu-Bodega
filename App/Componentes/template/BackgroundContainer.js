import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Dimensions } from 'react-native';


const backgroundImage = require("../../assets/fondo.webp");
const logoImage = require("../../assets/Logo.png");

const { height } = Dimensions.get('window');

const BackgroundContainer = ({ children }) => {
    return (
        <ImageBackground source={backgroundImage} style={styles.fondo}>
            <View style={styles.navStatus} />
            <View style={styles.overlay}>
                <View style={styles.contenedorLogo}>
                    <Image source={logoImage} style={styles.logo} resizeMode="cover" />
                </View>
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    fondo: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'space-evenly'
    },
    navStatus: {
        width: '100%',
        height: 30,
        backgroundColor: '#ffffff',
    },
    overlay: {
        height:'96%',
/*         borderColor: 'blue', 
        borderWidth: 1,  */
    },
    contenedorLogo: {
        height: 80,
        width: '100%',
/*         borderColor: 'red', 
        borderWidth: 1,  */
    },
    logo: {
        width: '100%', 
        height: '100%',
    },
    childrenContainer: {
        height: '90%',
        width: '100%',
/* 
 */
        justifyContent: 'center',
        alignItems: 'center'
    },    
});

export default BackgroundContainer;
