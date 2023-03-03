import React, { Component } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//These keys should ideally be in the .env files to be hidden and be protected.
const firebaseConfig = {
  apiKey: "AIzaSyDIVAB0tyYoIE6jeuB8t6qVN3uBArdsDs4",
  authDomain: "instaclone-ba64a.firebaseapp.com",
  projectId: "instaclone-ba64a",
  storageBucket: "instaclone-ba64a.appspot.com",
  messagingSenderId: "984466255622",
  appId: "1:984466255622:web:c1686f035763cdf8c77887",
  measurementId: "G-14CDESNY27",
};

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import thunk from "redux-thunk";
import { View, Text } from "react-native";

import RootStack from "./src/navigation/RootStack";
import AuthStack from "./src/navigation/AuthStack";

const store = createStore(rootReducer, applyMiddleware(thunk));

const StackNavigator = createStackNavigator();
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    );
  }
}
