import React, { Component } from 'react'

import * as firebase from 'firebase'

import MainStack from './Routes/router'
import { Provider } from 'react-redux'
import store from './services/redux/store'

var config = {
	apiKey: "AIzaSyA7KU3loqQONZY9BWo_keaaX1Z2Zx_r4IA",
	authDomain: "kubook-9aec7.firebaseapp.com",
	databaseURL: "https://kubook-9aec7.firebaseio.com",
	projectId: "kubook-9aec7",
	storageBucket: "kubook-9aec7.appspot.com",
	messagingSenderId: "963832088583"
}
firebase.initializeApp(config)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<MainStack />
			</Provider>
		)
	}
}