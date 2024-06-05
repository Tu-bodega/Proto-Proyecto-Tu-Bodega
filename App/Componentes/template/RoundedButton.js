import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RoundedButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.boton} onPress={onPress}>
            <Text style={styles.textoBoton}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boton: {
        borderColor: '#ffffff',
        borderWidth: 2,
        backgroundColor: '#4F4F4F', 
        borderRadius: 25, 
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff', 
        fontSize: 18,
    },
});

export default RoundedButton;
