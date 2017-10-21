import React, { Component } from 'react'

import {
	View,
	Picker,
	Text,
	FlatList,
	TouchableNativeFeedback,
	StyleSheet
} from 'react-native'

class ItemsList extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title
	})
	render() {
		const { title } = this.props.navigation.state.params
		return (
			<View style={styles.container}>
				<View style={styles.topBox}>
					<Text>Tanggal Peminjaman</Text>
					<Picker />
				</View>
				<View>
					<FlatList />
				</View>
				<TouchableNativeFeedback>
					<View>
						<Text>CHECK</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topBox: {
		flex: .3,
		backgroundColor: 'orange',
		padding: 10,
	},

})

export default ItemsList