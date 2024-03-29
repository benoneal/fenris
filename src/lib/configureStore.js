import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import router, {reducer as naglfar, buildLocationState} from 'naglfar'

const clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production'
const toArray = arg => Array.isArray(arg) ? arg : [arg]
const compose = (first, ...fns) => (state, action) =>
  fns.reduce((res, fn) => fn(res, action), first(state, action))

export default ({
  reducer,
  initialState,
  history,
  customMiddleware = [],
  enableLogging
}) => {
  const middleware = [
    thunk,
    router(history),
    ...toArray(customMiddleware),
    (enableLogging && clientDev) && logger
  ].filter(Boolean)
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  return createStoreWithMiddleware(...[
    compose(reducer, naglfar),
    {...initialState, location: buildLocationState(history.location)},
    (enableLogging && clientDev) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ].filter(Boolean))
}
