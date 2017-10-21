import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation'
import { Text, ScrollView, Image, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from '../screens/Login'
import SignUp from '../screens/Signup'
import Home from '../screens/Home'
import Category from '../screens/Category'
import ItemsList from '../screens/ItemsList'
import Test from '../screens/Test'


class MainScreen extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        logout = this.props.logout.bind(this)
    }
    render() {
        return <MainDrawer/>
    }
}
let logout
const MainStack = StackNavigator({
    Home: {
        screen: props => <Home navigation={props.navigation} />,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerLeft: <Icon name='menu' size={30} color="#47525E" style={{ margin: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
            headerTitleStyle: {
                color: '#47525E'
            }
        })
    },
    Category: {
        screen: Category,
        navigationOptions: ({ navigation }) => ({
            title: 'Category',
            headerTitleStyle: {
                color: '#47525E'
            }
        })
	},
	Test: {
		screen: Test
	},
	ItemsList: {
        screen: ItemsList,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                color: '#47525E'
            }
        })
    }
}, {
        // Default config for all screens
        //headerMode: 'none',
    })

const MainDrawer = DrawerNavigator({
    Home: {
        screen: MainStack,
        navigationOptions: ({ navigation }) => ({
            drawerIcon: ({ tintColor }) => (
                <Icon name="home" size={25} color={tintColor} />
            )
        })
    }
}, {
        initialRouteName: 'Home',
        contentComponent: props =>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Image
                        source={{ uri: "https://facebook.github.io/react/img/logo_og.png" }}
                        style={{
                            padding: 20,
                            height: 200,
                            marginBottom: 20
                        }}
                    />
                    <DrawerItems {...props} style={{ padding: 5 }} />
                </ScrollView>
                <TouchableNativeFeedback
                    onPress={() => {logout()}}
                    background={TouchableNativeFeedback.Ripple('white', false)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', bottom: 0, backgroundColor: '#D91E18', padding: 10, margin: 5 }}>
                        <Icon name="power-settings-new" size={25} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>
                            Log Out
                            </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

    })

export default MainScreen