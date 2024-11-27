import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import BottomNav from './src/screens/BottomNav/BottomNav';
import { getData } from './src/common/utils/Storage';

const Stack = createStackNavigator();

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getData();       
      if (token) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

    checkToken(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login ? (
          <Stack.Screen options={{ headerShown: false }} name="BottomNav" component={BottomNav} />
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
