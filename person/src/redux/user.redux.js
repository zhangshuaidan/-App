import Axios from "axios";
import { getRedirectPath } from '../util';
// const REGISTER_SUCCESS ="REGISTER_SUCCESS"
// const LOGIN_SUCESS='LOGIN_SUCESS'
const AUTH_SUCCESS ='AUTH_SUCCESS'
const LOGOUT ='LOGOUT'
const ERROR_MSG ='ERROR_MSG'
const LOAD_DATA ='LOAD_DATA'

const initState={
    redirectTo:"",
    // isAuth:false,
    msg:"",
    user:"",
    // pwd:"",
    type:""
     
}



// reducer
export function user(state = initState,action) {
    // console.log("state====>",state)
    // console.log("action====>",action);
switch (action.type) {
    case AUTH_SUCCESS:
        return { ...state, msg: "", redirectTo: getRedirectPath(action.payload),...action.payload}
    // case LOGIN_SUCESS:
    //     return { ...state, msg: "", redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
    case LOAD_DATA:
        return{...state,...action.payload}
    case ERROR_MSG:
    return {...state,isAuth:false,msg:action.msg}
    case LOGOUT:
        return { ...initState, redirectTo:"/login"}
    default:
        return state 
}
}
function authSuccess(obj) {

    const {pwd,...data}=obj
    return { type: AUTH_SUCCESS,payload:data}
}
// function registerSuccess(data) {
//     return { type: REGISTER_SUCCESS,payload:data}
//   }
// function loginSuccess(data) {
//     return { type: LOGIN_SUCESS, payload:data}
//   }
function errorMSG(msg) {
    return {msg,type:ERROR_MSG}
}

export function logoutSubmit() {
    return {type:LOGOUT}
}


export function loadData(userinfo) {
    // console.log(userinfo);
    return {type:LOAD_DATA,payload:userinfo }
}
export function update(data){
return dispatch=>{
    Axios.post('/user/update',data)
    .then(res=>{
        if (res.status == 200 && res.data.code == 0) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMSG(res.data.msg))
        }
    }

    )
}
}
export function login({user,pwd}) {
    if (!user||!pwd) {
        return errorMSG('用户名密码必须输入')
    } 
    return dispatch => {
        // console.log("123")
        Axios.post("/user/login", { user, pwd})
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    // console.log(res.data.data)
                    // dispatch(registerSuccess({ user, pwd, type }))
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMSG(res.data.msg))
                }
            })
    }
}



export function register({user,pwd,repeatpwd,type}) {
    if (!user||!pwd||!type) {
        return errorMSG("用户名密码必须输入")
    }
    
    if (pwd!=repeatpwd) {
        return errorMSG("密码和确认密码不同")
    }
    return dispatch=>{
        Axios.post("/user/register", { user, pwd, type })
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess({user,pwd,type}))
                } else {
                    dispatch(errorMSG(res.data.msg))
                }
            })
    }

}