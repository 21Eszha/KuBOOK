import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';

const { width, height } = Dimensions.get("window")

export default class Card extends Component {
    state = {
        imgUrl: '',
        title: '',
        details: ''
    }
    render() {
        const { title, details, imageUrl, onPress, ...props } = this.props;
        const prop = this.props
        return (
            <TouchableNativeFeedback {...prop}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                    />
                    <View style={styles.textBox}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.details}>{details}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        elevation: 1,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    image: {
        padding: 20,
        height: 200,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    textBox: {
        padding: 20
    },
    title: {
        fontSize: 20,
        color: 'black'
    },
    details: {
        fontSize: 14,
        color: 'grey'
    }
})