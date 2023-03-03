import { View, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { fetchUserPosts } from "../redux/actions";

import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/storage";

export default function SavePost(props) {
  const [caption, setCaption] = useState("");
  console.log(props.route.params.image);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(
      `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    );

    const uploadPicture = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);

    const progress = (snapshot) => {
      console.log(`progress: ${snapshot.bytesTransferred}`);
    };

    const completed = () => {
      uploadPicture.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePost(snapshot);

        console.log(snapshot);
      });
    };

    const error = (snapshot) => {
      console.log(snapshot);
    };

    uploadPicture.on("state_change", progress, error, completed);
  };

  const savePost = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ flex: 1 / 2 }}
      />
      <TextInput
        placeholder="Caption..."
        onChangeText={(text) => setCaption(text)}
      />
      <Button
        title={"Post"}
        onPress={() => {
          uploadImage();
        }}
      />
    </View>
  );
}
