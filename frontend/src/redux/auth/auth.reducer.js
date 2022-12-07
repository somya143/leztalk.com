import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actiontypes"


const token = localStorage.getItem("token")
const initialState = {
    isAuth : !!token,
    token: token,
    isLoading: false,
    isError: false,
    message: ""
}

export const authReducer = (state=initialState , {type,payload}) => {
switch(type){
    case REGISTER_REQUEST: {
        return {
            ...state,
            isError: false,
            isLoading: true
        }
    }
    case REGISTER_SUCCESS:{
        return{
            ...state,
            isError: false,
            isLoading: false,
            message: "Register successful"
        }
    }
    case REGISTER_FAILURE: {
        return {
            ...state,
            isError: true,
            isLoading: false,
            message : "Register failed , User already exists"
        }
    }
    case LOGIN_REQUEST :{
        return {
            ...state,
            isLoading: true,
            isError : false
        }
    }
    case LOGIN_SUCCESS : {
        localStorage.setItem("token" , payload)
        return {
            ...state,
            isLoading: false,
            isError: false,
            isAuth:true,
            token: payload
        }
    }
    case LOGIN_FAILED : {
        return {
            ...state,
            isLoading: false,
            isError: true,
            message: payload
        }
    }
    case LOGOUT : {
        return{
            ...state,
            isLoading: true,
            isError: false,
            token:"",
        }
    }
    default:{
    return state
    }
}
}
