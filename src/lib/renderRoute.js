import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import Helmet from 'react-helmet'
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history'
import {btoa} from 'abab'
import {resolveLocation} from 'naglfar'
import Root from './Root'
import configureStore from './configureStore'

const renderCache = {}

const renderHtml = ({AppComponent, store, baseCss, jsSource, StyleComponent}) => {
  const body = renderToString(
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )

  const rootMarkup = renderToStaticMarkup(
    <Root
      head={Helmet.renderStatic()}
      baseStyles={baseCss}
      StyleComponent={StyleComponent}
      content={body}
      initialState={btoa(JSON.stringify(store.getState()))}
      jsSource={jsSource}
    />
  )

  return `<!doctype html>\n${rootMarkup}`
}

const resolveRoute = ({path, cachePerUrl = false, ...config}) => {
  if (cachePerUrl && renderCache[path]) return renderCache[path]
  return resolveLocation(path, config.store.dispatch)
    .then(({status, url}) => {
      if (url) return {status, url}
      const body = renderHtml(config)
      if (cachePerUrl) renderCache[path] = {status, body}
      return {status, body}
    })
}

export default ({reducer, cachePerUrl, ...config}) => ({url, initialState}) =>
  resolveRoute({
    ...config,
    cachePerUrl: initialState ? false : cachePerUrl,
    path: url,
    store: configureStore({
      reducer,
      initialState,
      history: createMemoryHistory({initialEntries: [url]}),
    })
  })
