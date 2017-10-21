export const LOGIN = 'login'
export const LOADING = 'loading'
export const STORE_DATA = 'storeData'
export const STORE_LOGIN_NAVIGATOR = 'storeLoginNavigator'
export const STORE_MAIN_NAVIGATOR = 'storeMainNavigator'

export const login = (isLogin) => {
	return {
		type: LOGIN,
		isLogin
	}
}

export const loading = (isLoading) => {
	return {
		type: LOADING,
		isLoading
	}
}

export const storeData = (data) => {
	return {
		type: STORE_DATA,
		data
	}
}

export const storeLoginNavigator = (navigator) => {
	return {
		type: STORE_LOGIN_NAVIGATOR,
		navigator
	}
}
export const storeMainNavigator = (navigator) => {
	return {
		type: STORE_MAIN_NAVIGATOR,
		navigator
	}
}