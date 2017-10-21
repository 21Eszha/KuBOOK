import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableNativeFeedback,
	StatusBar,
	Animated,
	AsyncStorage,
	Alert,
	Keyboard
} from 'react-native';

import {
	NavigationActions
} from 'react-navigation'

import * as firebase from 'firebase'

import Reactotron from 'reactotron-react-native'

import *as actions from '../services/redux/action'
import { connect } from 'react-redux'
import store from '../services/redux/store'
import { login } from '../services/redux/action'

import FloatInput from '../components/FloatInput.js';

const { width, height } = Dimensions.get("window")
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "Home"
		})
	]
})
export default class Login extends Component {
	state = {
		userName: '',
		password: ''
	}
	async login(email, pass) {
		
		try {
			await firebase.auth()
				.signInWithEmailAndPassword(email, pass);
	
			console.log("Logged In!");
	
			// Navigate to the Home page
			store.dispatch(login(true))
			this.props.navigation.dispatch(resetAction)
			AsyncStorage.setItem('isLogin', 'true').then(() => {
				console.log('success')
			}).catch(() => {
				console.log('fail')
			})
	
		} catch (error) {
			Reactotron.log(error.toString())
			Alert.alert('Attention', error.toString())
		}
	
	}
	componentWillMount() {
		this._animateIsTrans = new Animated.Value(0)
	}
	componentDidMount() {
		Animated.timing(this._animateIsTrans, {
			toValue: 1,
			duration: 300
		}).start();
	}
	render() {
		let animStyle = {
			slide: this._animateIsTrans.interpolate({
				inputRange: [0, 1],
				outputRange: [-width, 0]
			})
		}
		return (
			<Animated.View style={[styles.container/**, {transform: [{translateX: animStyle.slide}]}*/]}>
				<StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
				<View style={styles.logo}>
					<Text style={styles.logo_text}>
						KuBOOK
                    </Text>
				</View>
				<View style={styles.content}>
					<FloatInput
						label="Email"
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({userName: value})}
					/>
					<FloatInput
						label="Password"
						secure={true}
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({password: value})}
					/>
					<TouchableNativeFeedback
						onPress={() => console.log('test')}
						background={TouchableNativeFeedback.Ripple('black', false)}
					>
						<View style={{ alignSelf: 'flex-end', height: 22, marginBottom: 10 }}>
							<Text style={{ color: '#47525E' }}>
								Forget Password
                            </Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback
						onPress={() => {
							//Reactotron.log(this.state.userName, this.state.password)
							this.login(this.state.userName, this.state.password)
							Keyboard.dismiss()
						}}
						background={TouchableNativeFeedback.Ripple('white', false)}
					>
						<View style={styles.button}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>
								LOGIN
                            </Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback
						onPress={() => this.props.navigation.navigate('SignUp')}
						background={TouchableNativeFeedback.Ripple('black', false)}
					>
						<View style={{ alignSelf: 'center', height: 22, marginTop: 15 }}>
							<Text style={{ color: '#47525E' }}>
								Daftar
                            </Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: StatusBar.currentHeight
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
		width: width - 100,
		height: height - 400,
		justifyContent: 'center',
	},
	button: {
		width: 150,
		height: 48,
		backgroundColor: '#47525E',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	}
});
