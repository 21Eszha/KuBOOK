import React, { Component } from 'react'
import {
	Animated,
	View,
	Text,
	StyleSheet,
	StatusBar,
	AsyncStorage
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import *as actions from '../services/redux/action'
import { connect } from 'react-redux'
import store from '../services/redux/store'

import Reactotron from 'reactotron-react-native'

import * as firebase from 'firebase'

import { storeLoginNavigator, storeData } from '../services/redux/action'
const resetAction1 = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "Home"
		})
	]
})
const resetAction2 = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "Login"
		})
	]
})
class Loading extends Component {
	constructor() {
		super();
	}
	componentWillMount() {
		this._animateIsTrans1 = new Animated.Value(0)
		this._animateIsTrans2 = new Animated.Value(0)
		this._animateIsTrans3 = new Animated.Value(0)
		this._animateIsTrans4 = new Animated.Value(0)
	}
	// componentDidMount() {
	// 	store.dispatch(storeLoginNavigator(this.props.navigation))
	// 	this.animate1()
	// 	setTimeout(() => this.animate2(), 10)
	// 	setTimeout(() => this.animate3(), 50)
	// 	setTimeout(() => this.animate4(), 100)
	// 	try {
	// 		AsyncStorage.getItem('isLogin', (err, result) => {
	// 			console.log(result, err)
	// 			if (result == 'true') {
	// 				setTimeout(() => {
	// 					this.props.loading(false)
	// 					this.props.loginNavigator.dispatch(resetAction1)
	// 				}, 1500)
	// 			}
	// 			else {
	// 				setTimeout(() => {
	// 					this.props.loading(false)
	// 					this.props.loginNavigator.dispatch(resetAction2)
	// 				}, 1500)
	// 			}
	// 		}).catch((err) => { })
	// 	} catch (error) {
	// 		// Error retrieving data
	// 	}
	// }

	async componentDidMount() {
		store.dispatch(storeLoginNavigator(this.props.navigation))
		this.animate1()
		setTimeout(() => this.animate2(), 10)
		setTimeout(() => this.animate3(), 50)
		setTimeout(() => this.animate4(), 100)

		try {

			// Get User Credentials
			let user = await firebase.auth().currentUser
			Reactotron.log('this',user)
			if (user) {
				setTimeout(() => {
					this.props.loading(false)
					this.props.loginNavigator.dispatch(resetAction1)
				}, 1500)
			} else {
				setTimeout(() => {
					this.props.loading(false)
					this.props.loginNavigator.dispatch(resetAction2)
				}, 1500)
			}


		} catch (error) {
			console.log(error);
		}

	}

	animate1() {
		this._animateIsTrans1.setValue(0);
		Animated.spring(this._animateIsTrans1, {
			toValue: 1,
			friction: 7
		}).start(() => {
			this.animate1(),
				setTimeout(() => this.animate2(), 10),
				setTimeout(() => this.animate3(), 50),
				setTimeout(() => this.animate4(), 100)
		})
	}
	animate2() {
		this._animateIsTrans2.setValue(0);
		Animated.spring(this._animateIsTrans2, {
			toValue: 1,
			friction: 7
		}).start()
	}
	animate3() {
		this._animateIsTrans3.setValue(0);
		Animated.spring(this._animateIsTrans3, {
			toValue: 1,
			friction: 7
		}).start()
	}
	animate4() {
		this._animateIsTrans4.setValue(0);
		Animated.spring(this._animateIsTrans4, {
			toValue: 1,
			friction: 7
		}).start()
	}
	render() {
		const bounce1 = this._animateIsTrans1.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, -25, 1]
		})
		const bounce2 = this._animateIsTrans2.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, -25, 1]
		})
		const bounce3 = this._animateIsTrans3.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, -25, 1]
		})
		const bounce4 = this._animateIsTrans4.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, -25, 1]
		})
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={'white'} barStyle='dark-content' translucent={true} />
				<View style={{ flexDirection: 'row', margin: 50 }}>
					<Animated.View style={[styles.dots, { transform: [{ translateY: bounce1 }] }]}></Animated.View>
					<Animated.View style={[styles.dots, { transform: [{ translateY: bounce2 }] }]}></Animated.View>
					<Animated.View style={[styles.dots, { transform: [{ translateY: bounce3 }] }]}></Animated.View>
					<Animated.View style={[styles.dots, { transform: [{ translateY: bounce4 }] }]}></Animated.View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	dots: {
		backgroundColor: '#FFC82C',
		borderRadius: 12.5,
		width: 25,
		height: 25,
		margin: 5

	}
})

function mapStateToProps({ loginNavigator }) {
	return {
		loginNavigator: loginNavigator
	}
}

export default connect(mapStateToProps, actions)(Loading)