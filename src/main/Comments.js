import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { styles } from "../styles/commonStyles";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getCommments();
  }, [comments]);

  const getCommments = () => {
    if (props?.route?.params?.postId != postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(props?.route?.params?.uid)
        .collection("userPosts")
        .doc(props?.route?.params?.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setComments(comments);
          setPostId(props?.route?.params?.postId);
        });
    }
  };

  const onPostComment = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props?.route?.params?.uid)
      .collection("userPosts")
      .doc(props?.route?.params?.postId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text: newComment,
        name: props?.route?.params?.currentUserName,
      })
      .then(() => {
        setNewComment("");
        getCommments();
      });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={pageStyle.renderItemContainer}>
        <MaterialCommunityIcons
          name="face-man-profile"
          color={"black"}
          size={30}
        />
        <View style={pageStyle.renderItemText}>
          {item.name && <Text>{item.name}</Text>}
          <Text>{item.text}</Text>
        </View>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={pageStyle.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <View>
        <TextInput
          placeholder="Write a comment..."
          onChangeText={(text) => setNewComment(text)}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={(text) => onPostComment(text)}
          style={{ ...styles.button, alignSelf: "center", marginBottom: 10 }}
        >
          <Text style={styles.buttonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    margin: 10,
  },
  renderItemContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  renderItemText: {
    marginLeft: 10,
  },
});
