import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Home from './src/Home.js';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(30,144,255)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(30,144,255)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Desafio Coopersystem' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

