import axios from "axios";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actiontypes";

export const registerUser = (cred) => async(dispatch) => {
dispatch({ type: REGISTER_REQUEST});
try {
    let response = await axios.post("http://localhost:8080/users/signup",cred);
    dispatch({ type: REGISTER_SUCCESS , payload: response.data});
    console.log(response.data)
    return response.data;
} catch (error) {
    dispatch({ type: REGISTER_FAILURE , payload: error.message})
}
}

export const loginUser = (cred) => async(dispatch) => {
dispatch({ type: LOGIN_REQUEST });
try {
    let response = await axios.post("http://localhost:8080/users/login" , cred);
    dispatch({ type: LOGIN_SUCCESS , payload: response.data});
    console.log(response.data)
    return response.data;
} catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: error.message })
}
}

export const logoutUser = (dispatch) => {
    
    dispatch({ type: LOGOUT})
}