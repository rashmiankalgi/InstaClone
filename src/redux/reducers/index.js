import { combineReducers } from "redux";
import { user } from "./user";
import { allUsers } from "./allUsers";

const Reducers = combineReducers({
  userState: user,
  allUsersState: allUsers,
});

export default Reducers;
