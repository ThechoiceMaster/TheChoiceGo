import {
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  HTTP_REGISTER_FAILED,
  server,
} from "../constants";
import { httpClient } from "./../util/HttpClient";

export const setRegisterStateToFetching = () => ({
  type: HTTP_REGISTER_FETCHING,
});
export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload,
});
export const setRegisterStateToFailed = () => ({
  type: HTTP_REGISTER_FAILED,
});

export const register = ({name, email, password, password2, history, }) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());
    try {
    let result = await httpClient.post(server.REGISTER_URL, {name, email, password, password2});
    if (result.data.message === "สมัคสมาชิกสำเร็จแล้ว" ) {
      dispatch(setRegisterStateToSuccess(result.data.message));
      alert(JSON.stringify(result.data))
      history.push("/login");
    } else {
      dispatch(setRegisterStateToFailed());
      alert(JSON.stringify(result.data))
    }
  } catch (error) {
    dispatch(setRegisterStateToFailed());
  }
};
}