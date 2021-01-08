Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("react-dom/server"),n=require("react-helmet"),r=require("react-redux"),a=require("history"),l=require("abab"),o=require("naglfar"),i=require("redux"),c=require("redux-thunk"),u=require("redux-logger");function p(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var f=p(e),s=p(o),m=p(c),d=p(u),h=function(e){var t=e.head,n=e.baseStyles,r=e.StyleComponent,a=e.content,l=e.initialState,o=e.jsSource;return f.default.createElement("html",t.htmlAttributes.toComponent(),f.default.createElement("head",null,t.title.toComponent(),t.meta.toComponent(),t.link.toComponent(),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"57x57",href:"/apple-touch-icon-57x57.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"60x60",href:"/apple-touch-icon-60x60.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"72x72",href:"/apple-touch-icon-72x72.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"76x76",href:"/apple-touch-icon-76x76.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"114x114",href:"/apple-touch-icon-114x114.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"120x120",href:"/apple-touch-icon-120x120.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"144x144",href:"/apple-touch-icon-144x144.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"152x152",href:"/apple-touch-icon-152x152.png"}),f.default.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-touch-icon-180x180.png"}),f.default.createElement("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),f.default.createElement("meta",{name:"apple-mobile-web-app-status-bar-style",content:"black-translucent"}),f.default.createElement("meta",{name:"apple-mobile-web-app-title",content:t.title.toString()}),f.default.createElement("meta",{name:"mobile-web-app-capable",content:"yes"}),f.default.createElement("meta",{name:"theme-color",content:"#fff"}),f.default.createElement("meta",{name:"application-name",content:t.title.toString()}),f.default.createElement("meta",{name:"msapplication-TileColor",content:"#fff"}),f.default.createElement("meta",{name:"msapplication-TileImage",content:"mstile-144x144.png"}),f.default.createElement("meta",{name:"msapplication-config",content:"browserconfig.xml"}),f.default.createElement("link",{rel:"icon",type:"image/png",sizes:"192x192",href:"/android-chrome-192x192.png"}),f.default.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),f.default.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),f.default.createElement("link",{rel:"shortcut icon",href:"/favicon.ico"}),n&&f.default.createElement("style",{dangerouslySetInnerHTML:{__html:n}}),r&&f.default.createElement(r,null),l&&f.default.createElement("meta",{"data-initial-state":l})),f.default.createElement("body",t.bodyAttributes.toComponent(),f.default.createElement("div",{id:"root",dangerouslySetInnerHTML:{__html:a}}),t.script.toComponent(),f.default.createElement("script",{src:o})))},E="undefined"!=typeof document&&"production"!==process.env.NODE_ENV;function g(e){var t=e.reducer,n=e.initialState,r=e.history,a=e.customMiddleware;void 0===a&&(a=[]);var l,c=e.enableLogging,u=[m.default,s.default(r),...(l=a,Array.isArray(l)?l:[l]),c&&E&&d.default].filter(Boolean);return i.applyMiddleware(...u)(i.createStore)(...[t,Object.assign({},n,{location:o.buildLocationState(r.location)}),c&&E&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()].filter(Boolean))}function v(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}var x={},b=function(e){var a=e.path,i=e.cachePerUrl;void 0===i&&(i=!1);var c=v(e,["path","cachePerUrl"]);return i&&x[a]?x[a]:o.resolveLocation(a,c.store.dispatch).then((function(e){var o=e.status,u=e.url;if(u)return{status:o,url:u};var p=function(e){var a=e.AppComponent,o=e.store,i=e.baseCss,c=e.jsSource,u=e.StyleComponent,p=t.renderToString(f.default.createElement(r.Provider,{store:o},f.default.createElement(a,null)));return"<!doctype html>\n"+t.renderToStaticMarkup(f.default.createElement(h,{head:n.Helmet.renderStatic(),baseStyles:i,StyleComponent:u,content:p,initialState:l.btoa(JSON.stringify(o.getState())),jsSource:c}))}(c);return i&&(x[a]={status:o,body:p}),{status:o,body:p}}))};var y=function(e){return S((t=0,n=Number.MAX_SAFE_INTEGER,void 0===t&&(t=0),void 0===n&&(n=100),Math.floor(Math.random()*(n-t+1)+t)));var t,n},S=function(e){return e.toString(36)},_=function(e){for(var t=5381,n=52711,r=(e+="").length;r--;){var a=e.charCodeAt(r);t=33*t^a,n=33*n^a}return S(4096*(t>>>0)+(n>>>0))},k=function(e,t,n){return""+_(e+t)+_(e+n)+_(e+t+n)},w=function(e){return function(t,n){return n&&t&&function(e,t,n){var r=n.split("|"),a=r[0],l=r[1],o=Date.now()<parseInt(a,36),i=l===k(e,t,a);return o&&i}(e,t,n)}},C=function(e,t){return function(n,r){var a=S(Date.now()+t);return{session:n=n||y(),csrf:r=r||a+"|"+k(e,n,a)}}};exports.csrfCreator=function(e,t){return void 0===t&&(t=36e5),{create:C(e,t),validate:w(e)}},exports.routeRenderer=function(e){var t=e.reducer,n=e.cachePerUrl,r=v(e,["reducer","cachePerUrl"]);return function(e){var l=e.url,o=e.initialState;return b(Object.assign({},r,{cachePerUrl:!o&&n,path:l,store:g({reducer:t,initialState:o,history:a.createMemoryHistory({initialEntries:[l]})})}))}};
