import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/reducers'

const rootReducer = combineReducers(reducers)
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store