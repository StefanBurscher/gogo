import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER
} from "Constants/actionTypes";
import { NotificationManager } from "Components/ReactNotifications";

const INIT_STATE = {
  user: localStorage.getItem("user"),
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      // notify.success('Register User Success');
      NotificationManager.success(
        "Register User Success",
        "Title here",
        3000,
        null,
        null,
        ''
      );
      return { ...state, loading: false, user: action.payload.id };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
};
