import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalContext';
import HomeScreen from '../screens/HomeScreen';
import TravelEntryScreen from '../screens/TravelEntryScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isDarkMode } = useGlobalContext();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: isDarkMode ? '#242424' : '#fff' }, headerTintColor: isDarkMode ? '#fff' : '#000' }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Travel Entry" component={TravelEntryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;