import {
  HTTP_LOGIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_LOGIN_FAILED,
  LOGOUT,
  LOGIN_STATUS,
  server,
} from "../constants";
import { httpClient } from "./../util/HttpClient";

//-----------------------------------///
export const setLoginStateToFetching = () => ({
  type: HTTP_LOGIN_FETCHING,
});
export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});
export const setLoginStateToFailed = () => ({
  type: HTTP_LOGIN_FAILED,
});

//----------------Action LOgin---------------------///
export const login = ({ email, password, history }) => {
  return async (dispatch) => {
    dispatch(setLoginStateToFetching());
    const result = await httpClient.post(server.LOGIN_URL,{ email, password})
    if (result.data.message === "เข้าสู่ระบบแล้ว") {
      localStorage.setItem(LOGIN_STATUS, "ok")
      dispatch(setLoginStateToSuccess(result.data.message))
      history.push("/home");
      alert(JSON.stringify(result.data))
    } else {
      localStorage.setItem(LOGIN_STATUS, "nok")
      dispatch(setLoginStateToFailed(result.data.message))
      alert(JSON.stringify(result.data))
    }
    
    
    //const result = await httpClient.post(server.LOGIN_URL, { email, password });
    //if (result.data.result !== "ok") {
    // localStorage.setItem(LOGIN_STATE, "ok");
    // dispatch(setLoginStateToSuccess("ok"));
    // history.push("./register");
    // } else {
    // localStorage.setItem(LOGIN_STATE, "nok");
    // dispatch(setLoginStateToFailed(result.data.message));
    // }
  };
};

//----------------Status-----------------------//
export const isLoggedIn = () => {
  const loginState = localStorage.getItem(LOGIN_STATUS);
  return loginState === "ok";
};

export const reLogin = () => {
  return (dispatch) => {
    const loginState = localStorage.getItem(LOGIN_STATUS);
    if (loginState === "ok") {
      dispatch(setLoginStateToSuccess({}));
    }
  };
};

///----------------------logout-------------------//
export const setStateToLogout = () => ({
  type: LOGOUT,
});
export const logout = ({ history }) => {
  return (dispatch) => {
    localStorage.removeItem(LOGIN_STATUS);
    dispatch(setStateToLogout());
    history.push("/home");
  };
};

