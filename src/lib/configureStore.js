/* eslint-disable global-require */
import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import router, {buildLocationState} from 'naglfar'
import reducer, {getInitialState, middleware as sleipnirMiddleware} from 'sleipnir'

const {isArray} = Array
const clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production'
const toArray = (arg) => isArray(arg) ? arg : [arg]

export default (history, initialState, customMiddleware = [], enableLogging) => {
  const middleware = [sleipnirMiddleware, router(history), ...toArray(customMiddleware), (enableLogging && clientDev) && logger].filter(Boolean)
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const store = createStoreWithMiddleware(...[
    reducer, 
    getInitialState({...initialState, location: buildLocationState(history.location)}), 
    (enableLogging && clientDev) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ].filter(Boolean))

  return store
}
