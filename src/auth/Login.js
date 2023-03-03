import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { styles } from "../styles/commonStyles";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((result) => {})
      .catch((error) => {
        console.log(error.message);

        this.setState({ error: error.message });
      });
  }
  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TextInput
          placeholder="email"
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity onPress={() => this.onLogin()} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {this.state.error && (
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 15,
              margin: 20,
            }}
          >
            {this.state.error}
          </Text>
        )}
      </View>
    );
  }
}
