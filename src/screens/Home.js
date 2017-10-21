import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	FlatList,
	Dimensions,
	StatusBar,
	Animated
} from 'react-native';

import Card from '../components/Card'
import HeaderButton from '../components/HeaderButton'
const { width, height } = Dimensions.get("window")
var datas = require('../data.json')

import * as firebase from 'firebase'

import Reactotron from 'reactotron-react-native'

import *as actions from '../services/redux/action'
import { connect } from 'react-redux'
import store from '../services/redux/store'
import { storeMainNavigator, storeData, login } from '../services/redux/action'

class Home extends Component {
	componentWillMount() {

	}
	componentDidMount() {
		store.dispatch(storeMainNavigator(this.props.navigation))
		store.dispatch(store.dispatch(login(true)))
	}
	render() {

		return (
			<View style={[styles.container]}>
				<StatusBar translucent={true} backgroundColor="#0003" />
				{/* <View>
                    <HeaderButton
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    />
                    <Text style={{ alignSelf: 'center', top: -12, color: 'black', fontSize: 20 }}>Home</Text>
                </View> */}
				<FlatList
					style={styles.content}
					data={datas}
					renderItem={({ item }) =>
						<Card
							key={item.title}
							title={item.title}
							details={item.details}
							imageUrl={item.imageUrl}
							onPress={() => this.props.mainNavigator.navigate('Category', { datas: item.categories, title: item.title })} />}
					keyExtractor={(item) => item.title}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5
	},
	content: {
		//marginTop: 10,
		padding: 5,
		paddingBottom: 10
	},
	logo: {
		flex: 1
	},
})

function mapStateToProps({ mainNavigator }) {
	return {
		mainNavigator: mainNavigator
	}
}

export default connect(mapStateToProps, actions)(Home)