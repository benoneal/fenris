/* eslint-disable global-require */
import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import router from 'naglfar'
import reducer, {middleware as sleipnirMiddleware} from 'sleipnir'

const clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production'

export default (history, initialState) => {
  const middleware = [sleipnirMiddleware, router(history), clientDev && logger].filter(x => x)
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const store = createStoreWithMiddleware(...[
    reducer, 
    initialState, 
    clientDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ].filter(x => x))

  return store
}
