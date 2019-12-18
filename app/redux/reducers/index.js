import { combineReducers } from "redux";
// import { persistCombineReducers } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import AsyncStorage from "@react-native-community/async-storage";
// import AsyncStorage from "@react-native-community/async-storage";

import events from "./events";
import performers from "./performers";

// const config = {
//   key: "root",
//   storage
// };

export default combineReducers({
  events,
  performers
});
