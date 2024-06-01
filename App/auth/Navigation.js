import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Componentes/Login/Login.js";
import Admi from "../Componentes/Admi/Admi.js";
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
    <Tab.Navigator>
        <Tab.Screen name="Admi" component={Admi} />
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
