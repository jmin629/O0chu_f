import { LOGIN_USER, AUTH_USER } from "../_actions/types";
import { GENRES_LIST } from "../_actions/types";
import { CLICK } from "../_actions/types";
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    // case GENRES_LIST:
    //   return { ...state, gendata: action.payload };
    //   break;

    case CLICK:
      return { ...state, clickdata: action.payload };
      break;

    default:
      return state;
  }
}
