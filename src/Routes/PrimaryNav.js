import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation'
import { Text, ScrollView, Image, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from '../screens/Login'
import SignUp from '../screens/Signup'
import Home from '../screens/Home'
class LoginScreen extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        login = this.props.login.bind(this)
    }
    login() {
        console.log(this)
        this.props.login()
    }
    render() {
        return <PrimaryNav/>
    }
}
let login
// Manifest of possible screens
const PrimaryNav = StackNavigator({
    LoginScreen: { 
        screen: props => <Login login={()=>login()} navigation={props.navigation}/>,
    },
    SignUp: { screen: SignUp },
}, {
        // Default config for all screens
        headerMode: 'none',
})

export default LoginScreen