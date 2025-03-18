import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../../src/screen/registration";
import FirstPageScreen from "../../src/screen/firstpage";
import AlreadyRegisteredScreen from "../../src/screen/alreadyregistered";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen name="FirstPage" component={FirstPageScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="AlreadyRegistered" component={AlreadyRegisteredScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator; // Don't use NavigationContainer here!
