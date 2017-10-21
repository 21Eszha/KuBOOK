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
	Keyboard
} from 'react-native';

import FloatInput from '../components/FloatInput.js'

import * as firebase from 'firebase'

const { width, height } = Dimensions.get("window")

import Reactotron from 'reactotron-react-native'

export default class SignUp extends Component {
	state = {
		as: '',
		userName: '',
		email: '',
		password: '',
		rePassword: ''
	}

	async signUp(email, pass) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, pass)

			Reactotron.log('account created')
		} catch (err) {
			Reactotron.log(err.toString())
		}
	}

	render() {
		return (
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
						onChangeText={(value) => this.setState({userName: value})}
					/>
					<FloatInput
						label="Email"
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({email: value})}
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
					<FloatInput
						label="Password"
						secure={true}
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({rePassword: value})}

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
							if(this.state.password===this.state.rePassword){
								this.signUp(this.state.email, this.state.password)
							}else{
								Alert.alert('Attention', 'Password mismatch')
							}
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
		marginTop: 30,
		marginBottom: 10,
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
