// 合并所有的reducers  并且返回 
import { combineReducers } from 'redux';
import {user} from './redux/user.redux';
import { chatuser} from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'
// import {counter} from './index.redux'
// import {au  th} from './Auth.redux'

export default combineReducers({ user, chatuser, chat});