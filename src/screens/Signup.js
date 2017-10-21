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

import FloatInput from '../components/FloatInput.js'

import * as firebase from 'firebase'

const { width, height } = Dimensions.get("window")

import Reactotron from 'reactotron-react-native'

export default class SignUp extends Component {
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

	setUserName(userId, username) {

		let userNamePath = "/user/" + userId + "/details"

		return firebase.database().ref(username).set({
			username: username
		})

	}
	async signUp(email, pass) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, pass)

			Reactotron.log('account created')
			let user = await firebase.auth().currentUser
			this.setUserName(user.uid, this.state.userName)

			// this.props.navigation.navigate('Splash')
		} catch (err) {
			Reactotron.log(err.toString())
			Alert.alert('Attention', err.toString())
		}
	}
	render() {
		return (
			<ScrollView scrollEnabled={false} style={{flex: 1, backgroundColor: 'white'}}>
				<View style={styles.container}>
					<StatusBar backgroundColor="white" barStyle="dark-content" />
					<View style={styles.logo}>
						<Text style={styles.logo_text}>
							KuBOOK
                    </Text>
					</View>
					<View style={styles.content}>
						<FloatInput
							label="Username"
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							onChangeText={(value) => this.setState({ userName: value })}
						/>
						<FloatInput
							label="Email"
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							onChangeText={(value) => this.setState({ email: value })}
						/>
						<FloatInput
							label="Password"
							secure={true}
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							onChangeText={(value) => this.setState({ password: value })}
						/>
						<FloatInput
							label="Password"
							secure={true}
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							onChangeText={(value) => this.setState({ rePassword: value })}

						/>
						<View style={{ height: 40, borderBottomWidth: 1, borderBottomColor: '#aaa', marginTop: 10, marginBottom: 20 }}>
							<Picker
								selectedValue={this.state.as}
								onValueChange={(itemValue, itemIndex) => this.setState({ as: itemValue })}
								mode="dropdown"
							>
								<Picker.Item label="User" color='#47525E' value="user" />
								<Picker.Item label="Vendor" color='#47525E' value="vendor" />
							</Picker>
						</View>
						<TouchableNativeFeedback
							onPress={() => {
								if (this.state.password === this.state.rePassword) {
									this.signUp(this.state.email, this.state.password)
								} else {
									Alert.alert('Attention', 'Password mismatch')
								}
								Keyboard.dismiss()
							}}
							background={TouchableNativeFeedback.Ripple('white', false)}
						>
							<View style={styles.button}>
								<Text style={{ color: 'white', fontWeight: 'bold' }}>
									DAFTAR
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
