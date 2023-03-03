import {
  ALL_USERS_STATE_CHANGE,
  ALL_USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA_ON_LOGOUT,
} from "../constants";

const initialState = {
  allUsers: [],
  usersLoaded: 0,
};

export const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_STATE_CHANGE: {
      return {
        ...state,
        allUsers: !state.allUsers[action.allUsers] && [
          ...state.allUsers,
          action.allUsers,
        ],
      };
    }
    case ALL_USERS_POSTS_STATE_CHANGE: {
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        allUsers: state.allUsers.map((user) =>
          user.uid === action.uid ? { ...user, posts: action.posts } : user
        ),
      };
    }
    case CLEAR_DATA_ON_LOGOUT: {
      return {
        allUsers: [],
        usersLoaded: 0,
      };
    }
    default:
      return state;
  }
};
