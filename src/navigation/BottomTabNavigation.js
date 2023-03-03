import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchAllUsers,
  clearDataOnLogout,
} from "../redux/actions";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Feed from "../main/Feed";
import Profile from "../main/Profile";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export class BottomTabNavigation extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchAllUsers();
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="RootAdd"
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("AddPost");
            },
          })}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  allUsers: store.allUsersState.allUsers,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
      fetchAllUsers,
      clearDataOnLogout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(BottomTabNavigation);
