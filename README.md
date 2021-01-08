
# Fenris

A helper library for rendering universal react+redux apps.

Uses `naglfar` for server/client view routing, and exports all module methods.

- Server-side rendering
- CSRF protection via signed expiring csrf token
- Redux-based router (`naglfar`)
- Server agnostic
- SSR CSS-in-JS hook
- Client and server caching of data and rendered html
- Full control of rendered html through `react-helmet`
- BelowTheFold component for SSR optimization

## How to use

Install via `npm i fenris`.

App routes example

```js
import {routeFragment, routeRedirect} from 'fenris'
import {getUsers, getUser} from './actions'

routeRedirect('/user', '/')

export const HomeRoute = routeFragment('/', getUsers)
export const UserRoute = routeFragment('/user/:id', getUser)
export const NotFoundRoute = routeFragment(404)
```

App example

```js
import React from 'react'
import {Helmet} from "react-helmet"
import {Link} from 'fenris'
import Home from './pages/Home'
import User from './pages/User'
import NoMatch from './pages/NoMatch'
import {HomeRoute, UserRoute, NotFoundRoute} from './routes'

const App = ({ children }) => (
  <>
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
  </>
)

export default App
```

Client entry example

```js
import {renderClient} from 'fenris'
import AppComponent from './App'
import reducer from '/store'

renderClient({AppComponent, reducer})
```

Koa server example with CSRF

```js
import Koa from 'koa'
import Router from 'koa-router'
import {routeRenderer, csrfCreator} from 'fenris/server'
import AppComponent from './App'
import reducer from './store'
import baseCss from './style.css'

const app = new Koa()
app.keys = ['cookie_secret']

const {create, validate} = csrfCreator('csrf_secret', 3600000)
const csrfMiddleware = (ctx, next) => {
  const sessionCookie = ctx.cookies.get('x-session', {signed:true})
  if (['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    const {session, csrf} = create(sessionCookie)
    ctx.cookies.set('x-session', session, {signed: true})
    // you can inject any initialState into redux via middleware
    // and doing so prevents caching the rendered body
    ctx.initialState = {csrf}
    return next()
  } else {
    if (!validate(sessionCookie, ctx.body.csrf)) ctx.throw(403, 'Invalid CSRF token')
    return next()
  }
}
app.use(csrfMiddleware)

const router = new Router()
const renderRoute = routeRenderer({
  reducer,
  AppComponent,
  baseCss,
  jsSource: 'script.js',
})
router.get('*', ctx => renderRoute(ctx).then({status, url, body}) => {
  if (url) ctx.status(status).redirect(url)
  ctx.status(status).body = body
})

app.listen(3000, _ => console.log('Server listening on port 3000'))
```
