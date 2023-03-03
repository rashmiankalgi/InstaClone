import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearDataOnLogout } from "../redux/actions";

import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/commonStyles";

function Profile(props) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.userState.posts);
  const currentUser = useSelector((state) => state.userState.currentUser);

  const onLogout = () => {
    dispatch(clearDataOnLogout());
    firebase.auth().signOut();
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ flex: 1 / 3, padding: 1 }}>
        <Image
          source={{ uri: item.downloadURL }}
          style={{ flex: 1, aspectRatio: "1:1" }}
        />
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <MaterialCommunityIcons
          name="face-man-profile"
          color={"black"}
          size={70}
          style={{ marginRight: 20 }}
        />

        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {currentUser?.name}
          </Text>
          <Text>{currentUser?.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onLogout()}
        style={{ ...styles.button, alignSelf: "center", marginBottom: 10 }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          numColumns={3}
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
