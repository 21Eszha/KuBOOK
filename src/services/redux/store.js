import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import Reactotron from 'reactotron-react-native'

export default Reactotron.createStore(reducer, applyMiddleware())