import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.userState.currentUser);
  const allUsers = useSelector((state) => state.allUsersState.allUsers);
  const usersLoaded = useSelector((state) => state.allUsersState.usersLoaded);

  useEffect(() => {
    let posts = [];
    if (allUsers) {
      for (let i = 0; i < allUsers?.length; i++) {
        for (let j = 0; j < allUsers[i]?.posts?.length; j++) {
          posts.push({
            ...allUsers[i].posts[j],
            name: allUsers[i].name,
            id: allUsers[i].posts[j].id,
            uid: allUsers[i].uid,
          });
        }
      }
      posts.sort(function (x, y) {
        return y.creation - x.creation;
      });

      setPosts(posts);
    }
  }, [usersLoaded]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={pageStyle.renderItemContainer}>
        <View style={pageStyle.nameContainer}>
          <MaterialCommunityIcons
            name="face-man-profile"
            color={"black"}
            size={30}
          />
          <Text style={pageStyle.renderItemText}>{item.name}</Text>
        </View>

        <Image
          source={{ uri: item.downloadURL }}
          style={{ aspectRatio: "1:1" }}
        />

        <View style={pageStyle.renderItemIcon}>
          <MaterialCommunityIcons
            name="comment"
            color={"black"}
            size={26}
            onPress={() =>
              props.navigation.navigate("Comments", {
                postId: item.id,
                uid: item.uid,
                currentUserName: currentUser.name,
              })
            }
          />
        </View>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View>
      <SafeAreaView>
        <View style={pageStyle.container}>
          <Text style={pageStyle.headerText}>InstaClone</Text>
        </View>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </View>
  );
};

const pageStyle = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 0.5,
    marginBottom: 10,
    borderBottomColor: "grey",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  renderItemContainer: {
    flex: 1,
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  renderItemText: {
    marginLeft: 10,
    fontSize: 15,
  },
  renderItemIcon: {
    marginLeft: 10,
    marginTop: 10,
  },
});

export default Feed;
