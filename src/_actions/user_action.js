import { signInApi } from "../api";
import { api } from "../config/api";
import { AUTH_USER, LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  const req = signInApi(dataToSubmit).then((res) => res);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}

export function auth(dataToSubmit) {
  const req = fetch(`${api}/api/auth/user-info`, dataToSubmit).then((response) => response.json());

  return {
    type: AUTH_USER,
    payload: req,
  };
}
