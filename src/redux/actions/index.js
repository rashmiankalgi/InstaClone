import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  ALL_USERS_STATE_CHANGE,
  ALL_USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA_ON_LOGOUT,
} from "../constants/index";

export function clearDataOnLogout() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA_ON_LOGOUT });
  };
}

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("user does not exist..");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts,
        });
      });
  };
}

export function fetchAllUsers() {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        if (snapshot) {
          snapshot.forEach((doc) => {
            let user = doc.data();
            user.uid = doc.id;
            const found = getState().allUsersState.allUsers.some(
              (el) => el.uid === user.uid
            );
            if (!found) {
              dispatch({
                type: ALL_USERS_STATE_CHANGE,
                allUsers: user,
              });
            }
          });
        } else {
          console.log("...user does not exist");
        }
      })
      .then(() => {
        const allUsers = getState().allUsersState.allUsers;
        allUsers.forEach((user) => {
          firebase
            .firestore()
            .collection("posts")
            .doc(user.uid)
            .collection("userPosts")
            .get()
            .then((snapshot) => {
              if (snapshot) {
                const uid = user.uid;
                let posts = snapshot.docs.map((doc) => {
                  const data = doc.data();
                  return { ...data, id: doc.id };
                });
                dispatch({
                  type: ALL_USERS_POSTS_STATE_CHANGE,
                  posts,
                  uid,
                });
              } else {
                console.log("user does not exist");
              }
            });
        });
      });
  };
}
