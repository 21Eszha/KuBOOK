import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableNativeFeedback,
	StatusBar,
	Picker,
	Alert,
	Keyboard,
	ScrollView
} from 'react-native';

import { NavigationActions } from 'react-navigation'

import FloatInput from '../components/FloatInput.js'

import * as firebase from 'firebase'

const { width, height } = Dimensions.get("window")

import Reactotron from 'reactotron-react-native'

import *as actions from '../services/redux/action'
import { connect } from 'react-redux'
import store from '../services/redux/store'

const resetAction1 = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "Login"
		})
	]
})

class Verify extends Component {
	constructor() {
		super()
		this.state = {
			as: '',
			userName: '',
			email: '',
			password: '',
			rePassword: ''
		}
		console.ignoredYellowBox = [
			'Setting a timer'
		]
	}

	async verify() {
		try {
			firebase.auth().currentUser.sendEmailVerification().then(function () {
				Reactotron.log('Email send')
				Alert.alert('Attention', 'Email Send')
			}, function (error) {
				Reactotron.log(error.toString())
			});
		} catch (err) {
			Reactotron.log(err.toString())
			Alert.alert('Attention', err.toString())
		}
	}
	async logout() {

		try {

			await firebase.auth().signOut()

			// Navigate to login view
			store.dispatch(login(false))
			AsyncStorage.setItem('isLogin', 'false').then(() => {
				console.log('success')
			}).catch(() => {
				console.log('fail')
			})
			this.props.loginNavigator.dispatch(resetAction1)

		} catch (error) {
			console.log(error)
		}

	}
	render() {
		return (
			<ScrollView scrollEnabled={false} style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={styles.container}>
					<StatusBar backgroundColor="white" barStyle="dark-content" />
					<View style={styles.logo}>
						<Text style={styles.logo_text}>
							KuBOOK
                    </Text>
					</View>
					<Text style={{ fontSize: 25, color: 'black' }}>Please Verify Your Email</Text>
					<View style={styles.content}>
						<TouchableNativeFeedback
							onPress={() => {
								this.verify()
							}}
							background={TouchableNativeFeedback.Ripple('white', false)}
						>
							<View style={styles.button}>
								<Text style={{ color: 'white', fontWeight: 'bold' }}>
									Verify Email
                            </Text>
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback
							onPress={() => {
								Alert.alert('Attention', 'Please re-login')
								this.logout()
							}}
							background={TouchableNativeFeedback.Ripple('white', false)}
						>
							<View style={styles.button}>
								<Text style={{ color: 'white', fontWeight: 'bold' }}>
									Already Verify
                            </Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width,
		height: height,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: StatusBar.currentHeight,
	},
	logo: {
		margin: 30,
		width: 150,
		height: 150,
		backgroundColor: '#FFC82C',
		borderRadius: 75,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo_text: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#47525E'
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	button: {
		width: 150,
		height: 48,
		backgroundColor: '#47525E',
		justifyContent: 'center',
		alignItems: 'center',
		//alignSelf: 'center',
		margin: 10
	}
});

function mapStateToProps(state) {
	return {
		loginNavigator: state.loginNavigator
	}
}

export default connect(mapStateToProps, actions)(Verify)