import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { styles } from "../styles/commonStyles";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      error: "",
    };

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message });
      });
  }
  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <TextInput
          placeholder="name"
          style={styles.textInput}
          onChangeText={(name) => this.setState({ name })}
        />
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
        <TouchableOpacity onPress={() => this.onSignup()} style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
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
