import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./BottomTabNavigation";
import AddPost from "../main/AddPost";
import SavePost from "../main/SavePost";
import Comments from "../main/Comments";

const StackNavigator = createStackNavigator();

export const RootStack = () => {
  return (
    <StackNavigator.Navigator initialRouteName="BottomTabNavigation">
      <StackNavigator.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen name="AddPost" component={AddPost} />
      <StackNavigator.Screen name="SavePost" component={SavePost} />
      <StackNavigator.Screen name="Comments" component={Comments} />
    </StackNavigator.Navigator>
  );
};

export default RootStack;
