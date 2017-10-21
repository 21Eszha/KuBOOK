import React, { } from 'react'
import {
	StatusBar,
	Easing,
	Animated,
	Dimensions
} from 'react-native'
import {
	StackNavigator,
	DrawerNavigator,
	TabBarBottom,
	TabNavigator
} from 'react-navigation'

const {width, height} = Dimensions.get('window')

import { connect } from 'react-redux'
import *as action from '../services/redux/action'
import DrawerItems from '../components/DrawerItems'
import Loading from '../screens/Loading'
import Home from '../screens/Home'
import Login from '../screens/Login'
import SignUp from '../screens/Signup'
import Category from '../screens/Category'
import ItemsList from '../screens/ItemsList'
import Verify from '../screens/Verify'

import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeStack = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'Home',
			headerLeft: <Icon 
			name='menu' 
			size={25} 
			color={'black'} 
			onPress={() => navigation.navigate('DrawerOpen')}
			style={{padding: 10}} />
		})
	},
	Category: {
		screen: Category
	},
	ItemsList: {
		screen: ItemsList
	}
}, {
		mode: 'modal',
		navigationOptions: {
			headerStyle: {
				paddingTop: StatusBar.currentHeight,
				height: 56 + StatusBar.currentHeight,
				backgroundColor: 'orange'
			},
			gesturesEnabled: false,
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 500,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing,
			},
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;

				const width = layout.initWidth
				const translateX = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [width, 0, 0],
				});

				const opacity = position.interpolate({
					inputRange: [index - 1, index - 0.99, index],
					outputRange: [0, 1, 1],
				});

				return { opacity, transform: [{ translateX }] };
			},
		}),
	})

const MainDrawer = DrawerNavigator({
	Main: {
		screen: HomeStack
	}
}, {
		contentComponent: (props) => <DrawerItems />,
		drawerWidth: width/2 + width/8
	})

const MainStack = StackNavigator({
	Splash: {
		screen: Loading
	},
	Login: {
		screen: Login
	},
	SignUp: {
		screen: SignUp
	},
	Verify: {
		screen: Verify
	},
	Home: {
		screen: MainDrawer,
	}
}, {
		headerMode: 'none',
		mode: 'modal',
		navigationOptions: {
			gesturesEnabled: false,
		},
		transitionConfig: () => ({
			transitionSpec: {
				duration: 500,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing,
			},
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;

				const width = layout.initWidth
				const translateX = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [width, 0, 0],
				});

				const opacity = position.interpolate({
					inputRange: [index - 1, index - 0.99, index],
					outputRange: [0, 1, 1],
				});

				return { opacity, transform: [{ translateX }] };
			},
		}),
	})



const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
		isLoading: state.isLoading,
		loginNavigator: state.loginNavigator,

	}
}

let Drawer = connect(mapStateToProps, action)(MainStack)

export default MainStack