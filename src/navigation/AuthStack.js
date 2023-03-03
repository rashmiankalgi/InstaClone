import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../auth/Landing";
import Signup from "../auth/Signup";
import Login from "../auth/Login";

const StackNavigator = createStackNavigator();

export const AuthStack = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Landing">
      <StackNavigator.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      ></StackNavigator.Screen>
      <StackNavigator.Screen
        name="Signup"
        component={Signup}
      ></StackNavigator.Screen>
      <StackNavigator.Screen
        name="Login"
        component={Login}
      ></StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default AuthStack;
