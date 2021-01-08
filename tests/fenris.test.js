import React from 'react'
import {renderToString} from 'react-dom/server'
import {Helmet} from "react-helmet"
import {useSelector} from 'react-redux'
import {BelowTheFold, registerRoute, renderClient} from '../src/'
import {csrfCreator, routeRenderer} from '../src/server'

const AppComponent = () => {
  const test = useSelector(({test}) => test)
  return <h1>{test}</h1>
}

const StyleComponent = () => <style>{`.sc {color: black;}`}</style>

describe('Fenris', () => {
  beforeAll(() => {
    Helmet.canUseDOM = false
    global.XMLHttpRequest = class XMLHttpRequest {
      open(method, url) {this.url = url}
      setRequestHeader(k, v) {}
      getAllResponseHeaders() {return 'test-header test-value'}
      set onload(fn) {this.load = fn}
      send(data) {
        this.status = 200
        this.responseText = this.url + (data && data.length)
        this.load()
      }
    }
  })

  it('BelowTheFold renders nothing on the server', () => {
    const rendered = renderToString(<BelowTheFold><h1>Test</h1></BelowTheFold>)
    expect(rendered).toBe('')
  })

  it('creates csrf creator and validator from secret', () => {
    const {create, validate} = csrfCreator('test_secret')
    const {session, csrf} = create()
    expect(csrf).toEqual(expect.any(String))
    expect(session).toEqual(expect.any(String))
    expect(create(session).session).toBe(session)
    expect(validate(session, csrf)).toBe(true)
    expect(validate(session, create().csrf)).toBe(false)
    expect(validate(create().session, csrf)).toBe(false)
  })

  it('renders routes on the server', async () => {
    registerRoute('/test')
    const renderRoute = routeRenderer({
      reducer: x => x,
      AppComponent,
      StyleComponent,
      baseCss: '.t {color: red;}',
      jsSource: '/script.js',
    })
    const {body, status} = await renderRoute({url: '/test', initialState: {test: 123}})
    expect(status).toBe(200)
    expect(body).toContain('<style>.t {color: red;}</style>')
    expect(body).toContain('<style>.sc {color: black;}</style>')
    expect(body).toContain('data-initial-state="eyJ0ZXN0IjoxMjMsImxvY2F0aW9uIjp7InBhdGhuYW1lIjoi')
    expect(body).toContain('<div id="root"><h1>123</h1></div>')
    expect(body).toContain('<script src="/script.js"></script>')
  })
})
