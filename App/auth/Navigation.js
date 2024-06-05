import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Componentes/Login/Login.js";
import Admi from "../Componentes/Admi/Admi.js";
import Empleados from "../Componentes/Empleados/Empleados.js";
import Salidas from "../Componentes/Salidas/Salidas.js";
import { AuthContext } from "../context/AuthContext.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const AppStack = () => (
    <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
        <Tab.Screen
            name="Admi"
            component={Admi}
            options={{ tabBarLabel: () => null, headerShown: false }}
        />
        <Tab.Screen
            name="Empleados"
            component={Empleados}
            options={{ tabBarLabel: () => null, headerShown: false }}
        />
        <Tab.Screen
            name="Salidas"
            component={Salidas}
            options={{ tabBarLabel: () => null, headerShown: false }}
        />
    </Tab.Navigator>
);

const Navigation = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
