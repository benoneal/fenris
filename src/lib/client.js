import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import configureStore from './configureStore'

const rehydrateState = _ => {
  try {
    return JSON.parse(atob(document.querySelectorAll('[data-initial-state]')[0].dataset.initialState))
  } catch (e) {
    return {}
  }
}

export const renderClient = ({
  AppComponent,
  reducer,
  customMiddleware,
  enableLogging = process.env.NODE_ENV !== 'production'
}) => {
  const store = configureStore({
    reducer,
    initialState: rehydrateState(),
    history: createBrowserHistory(),
    customMiddleware,
    enableLogging
  })

  hydrate(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    document.getElementById('root')
  )
}
