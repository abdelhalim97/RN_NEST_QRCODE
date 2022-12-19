import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup, Welcome, Login, Scanner } from './src/components';
import { TokenContext, } from './src/contexts/token-context';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState<string>('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
      <TokenContext.Provider value={{token,setToken}}>
        <Stack.Navigator>
          {token===null?
          <>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </>
          :
          <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: true }} />
          }
        </Stack.Navigator>
        </TokenContext.Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
