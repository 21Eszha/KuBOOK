import { combineReducers } from 'redux'
import { LOADING, LOGIN, STORE_DATA, STORE_LOGIN_NAVIGATOR, STORE_MAIN_NAVIGATOR } from './action'

function isLoading(state=true, action){
	if(action.type === LOADING){
		return action.isLoading
	}
	return state
}

function isLogin(state=false, action){
	if(action.type === LOGIN){
		return action.isLogin
	}
	return state
}

function data(state = null, action){
	if(action.type === STORE_DATA){
		return action.data
	}
	return state
}

function loginNavigator(state= null, action){
	if(action.type === STORE_LOGIN_NAVIGATOR){
		return action.navigator
	}
	return state
}

function mainNavigator(state= null, action){
	if(action.type === STORE_MAIN_NAVIGATOR){
		return action.navigator
	}
	return state
}

export default combineReducers({
	isLoading,
	isLogin,
	data,
	loginNavigator,
	mainNavigator

})