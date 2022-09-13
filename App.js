/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Screens/Splash';
import Sync from './Screens/Sync';
import OfflineData from './Screens/OfflineData';
const Stack = createNativeStackNavigator();
function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
      <Stack.Screen name="Sync" component={Sync} options={{ headerShown: false }}/>
      <Stack.Screen name="OfflineData" component={OfflineData} options={{ headerShown: false }}/>

     </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
