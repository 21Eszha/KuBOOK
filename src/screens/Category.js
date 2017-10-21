import React, { Component } from 'react'
import {
	View,
	FlatList,
	StyleSheet
} from 'react-native'
import Card from '../components/Card'
import { connect } from 'react-redux'
import *as actions from '../services/redux/action'
import Reactotron from 'reactotron-react-native'
class Category extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	})
	constructor() {
		super()
	}
	render() {
		const { params } = this.props.navigation.state;
		return (
			<View>
				<FlatList
					style={styles.content}
					data={params.datas}
					renderItem={({ item }) =>
						<Card
							key={item.title}
							onPress={() => this.props.mainNavigator.navigate('ItemsList', { title: item.title })}
							title={item.title}
							details={item.details} />
					}
					keyExtractor={(item) => item.title}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	content: {
		margin: 10,
		padding: 10,
		paddingBottom: 10
	},
})

function mapStateToProps({ mainNavigator }) {
	return {
		mainNavigator: mainNavigator
	}
}

export default connect(mapStateToProps, actions)(Category)