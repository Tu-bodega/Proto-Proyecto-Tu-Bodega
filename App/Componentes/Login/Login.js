import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

// Importa las imágenes locales
const backgroundImage = require("../../assets/fondo.webp");
const logoImage = require("../../assets/Logo.png");

const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("Administrador");

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.2.6:3001/login/validar', {
                rol: 1,
                correo: email,
                contra: password
            });

            if (response.data.success) {
                login();
            } else {
                Alert.alert('Error', 'Credenciales inválidas');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Algo salió mal. Inténtalo de nuevo.');
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.logoContainer}>
                    <Image source={logoImage} style={styles.logo} resizeMode="contain" />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Inicio de Sesión</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tipo de Usuario</Text>
                        <Picker
                            selectedValue={userType}
                            onValueChange={(itemValue) => setUserType(itemValue)}
                            style={styles.input}
                            enabled={false}
                        >
                            <Picker.Item label="Administrador" value="Administrador" />
                            <Picker.Item label="Almacenista" value="Almacenista" />
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Button
                        title="Login"
                        buttonStyle={styles.loginButton}
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 10,
    },
    logo: {
        height: 90,
        width: 400,
    },
    overlay: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 10,
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
        backgroundColor: 'grey',
        borderRadius: 5,
        marginTop: 20,
    },
});

export default LoginScreen;

