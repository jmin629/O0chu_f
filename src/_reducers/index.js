import { combineReducers } from "redux";
import user from "./user_reducer";
import genReducer from "./gen_reducer";

const rootReducer = combineReducers({
  user,
  // genReducer,
});
export default rootReducer;
