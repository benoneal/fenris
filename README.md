
# Fenris

A production-ready library for rendering universal apps developed to solve the problems of an actual production application. 

Uses `naglfar` and `sleipnir` modules, exposing their functionality to drastically speed up app development. 

- Server-side rendering
- React view
- Redux-based router (naglfar)
- Powerful thunk-driven action creators (sleipnir)
- Express server
- CSS-in-JS hooks (library agnostic)
- Client and server caching of data and rendered html
- Hot reloading in development
- Full control of rendered html through `react-helmet`
- BelowTheFold component for ssr optimization

Fenris has no opinion/implementation for: 

- Linting
- Regular CSS
- Testing

## How to use

Install via `npm i -S fenris` or `yarn add fenris`.

App actions example

```js
import {createAction} from 'fenris'
import {fetchUsers, fetchUser} from './api'

export const getUsers = createAction('GET_USERS', {
  async: fetchUsers,
  handler: (state, {payload: list}) => ({
    ...state,
    list: list.map((user) => ({name: user.name, id: user.id}))
  }),
  initialState: {list: []}
})

export const getUser = createAction('GET_USER', {
  async: ({id}) => fetchUser(id),
  handler: (state, {payload: user}) => ({
    ...state,
    user
  })
})
```

App api example

```js
import {cachedGet} from 'fenris'

export const fetchUsers = () => cachedGet('http://jsonplaceholder.typicode.com/users')
export const fetchUser = (id) => cachedGet(`http://jsonplaceholder.typicode.com/users/${id}`)
```

App routes example

```js
import {routeFragment, routeRedirect} from 'fenris'
import {
  getUser,
  getUsers
} from './actions'

routeRedirect('/user', '/')

export const HomeRoute = routeFragment('/', getUsers)
export const UserRoute = routeFragment('/user/:id', getUser)
export const NotFoundRoute = routeFragment(404)
```

App example

```js
import React from 'react'
import Helmet from 'react-helmet'
import {Link} from 'fenris'
import Home from './pages/Home'
import User from './pages/User'
import NoMatch from './pages/NoMatch'
import {HomeRoute, UserRoute, NotFoundRoute} from './routes' 

const App = ({ children }) => (
  <div>
    <Helmet
      title="My App"
      titleTemplate="%s - My App"
      meta={[
        { 'char-set': 'utf-8' },
        { name: 'description', content: 'My super dooper dope app' },
      ]}
    />
    <nav>
      <ul>
        <li><Link to="/" prefetchData>Users</Link></li>
      </ul>
    </nav>
    <HomeRoute><Home /></HomeRoute>
    <UserRoute><User /></UserRoute>
    <NotFoundRoute><NoMatch /></NotFoundRoute>
  </div>
)

export default App
```

Client entry example

```js
import launchClient from 'fenris'
import App from './App'

launchClient(App)

if (module.hot) module.hot.accept('./App', () => launchClient(App))
  
``` 

Server example

```js
import launchServer from 'fenris/server'
import AppComponent from './App'

export default (port, config) => {
  launchServer({AppComponent, port, config})
}
```

Server entry example (for npm start)

```js
import config from './webpack.config.js'
import serve from './src/server'

serve(process.env.PORT, config[0])
```

Example webpack.config.js

```js
const path = require('path')
const webpack = require('webpack')
const MinifierPlugin = require('babili-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const faviconConfig = require('./favicon.config.js')
const babelConfig = require('./babelrc.js')
const appConfig = require('./config')

const DIST = path.join(__dirname, 'dist')
const PRODUCTION = process.env.NODE_ENV === 'production'

const filterFalsy = (arr) => arr.filter(e => e)
const plugins = filterFalsy([
  new webpack.optimize.OccurrenceOrderPlugin(),
  !PRODUCTION && new webpack.HotModuleReplacementPlugin(),
  !PRODUCTION && new webpack.NamedModulesPlugin(),
  !PRODUCTION && new webpack.NoEmitOnErrorsPlugin(),
  PRODUCTION && new MinifierPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  })
])

const loaders = (config) => [
  {
    test: /\.js?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: babelConfig(config),
  },
  {
    test: /\.(jpg|png)/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /src/,
    loader: 'file-loader'
  },
  {
    test: /\.svg/,
    exclude: /assets/,
    loader: 'raw-loader'
  }
]

const clientConfig = {
  target: 'web',
  devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
  entry: filterFalsy([
    !PRODUCTION && 'react-hot-loader/patch',
    !PRODUCTION && `webpack-hot-middleware/client`,
    './src/index.js',
  ]),
  output: {
    path: DIST,
    filename: PRODUCTION ? 'app.min.js' : 'app.js',
    publicPath: '/'
  },
  plugins: plugins.concat(new FaviconsWebpackPlugin(faviconConfig)),
  module: {
    rules: loaders()
  }
}

const serverConfig = {
  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: true
  },
  externals: [nodeExternals({
    whitelist: PRODUCTION ? [ 'react', 'react-dom/server' ] : []
  })],
  entry: './index.js',
  output: {
    path: DIST,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins.concat(new webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false,
  })),
  module: {
    rules: loaders({server: true})
  }
}

module.exports = [clientConfig, serverConfig]
```
