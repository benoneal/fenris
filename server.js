Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var server = require('react-dom/server');
var Helmet = _interopDefault(require('react-helmet'));
var reactRedux = require('react-redux');
var history = require('history');
var abab = require('abab');
var router = require('naglfar');
var router__default = _interopDefault(router);
var redux = require('redux');
var thunk = _interopDefault(require('redux-thunk'));
var logger = _interopDefault(require('redux-logger'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var Root = function Root(_ref) {
  var head = _ref.head,
      baseStyles = _ref.baseStyles,
      StyleComponent = _ref.StyleComponent,
      content = _ref.content,
      initialState = _ref.initialState,
      jsSource = _ref.jsSource;
  return React.createElement("html", head.htmlAttributes.toComponent(), React.createElement("head", null, head.title.toComponent(), head.meta.toComponent(), head.link.toComponent(), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/apple-touch-icon-57x57.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/apple-touch-icon-60x60.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/apple-touch-icon-72x72.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/apple-touch-icon-76x76.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/apple-touch-icon-114x114.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/apple-touch-icon-120x120.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/apple-touch-icon-144x144.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/apple-touch-icon-152x152.png"
  }), React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon-180x180.png"
  }), React.createElement("meta", {
    name: "apple-mobile-web-app-capable",
    content: "yes"
  }), React.createElement("meta", {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent"
  }), React.createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: head.title.toString()
  }), React.createElement("meta", {
    name: "mobile-web-app-capable",
    content: "yes"
  }), React.createElement("meta", {
    name: "theme-color",
    content: "#fff"
  }), React.createElement("meta", {
    name: "application-name",
    content: head.title.toString()
  }), React.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#fff"
  }), React.createElement("meta", {
    name: "msapplication-TileImage",
    content: "mstile-144x144.png"
  }), React.createElement("meta", {
    name: "msapplication-config",
    content: "browserconfig.xml"
  }), React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png"
  }), React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/android-chrome-192x192.png"
  }), React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png"
  }), React.createElement("link", {
    rel: "shortcut icon",
    href: "/favicon.ico"
  }), baseStyles && React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: baseStyles
    }
  }), StyleComponent && React.createElement(StyleComponent, null), initialState && React.createElement("meta", {
    "data-initial-state": initialState
  })), React.createElement("body", head.bodyAttributes.toComponent(), React.createElement("div", {
    id: "root",
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), head.script.toComponent(), React.createElement("script", {
    src: '/' + jsSource
  })));
};

var clientDev = typeof document !== 'undefined' && process.env.NODE_ENV !== 'production';
var toArray = function toArray(arg) {
  return Array.isArray(arg) ? arg : [arg];
};
var configureStore = (function (_ref) {
  var reducer = _ref.reducer,
      initialState = _ref.initialState,
      history = _ref.history,
      _ref$customMiddleware = _ref.customMiddleware,
      customMiddleware = _ref$customMiddleware === void 0 ? [] : _ref$customMiddleware,
      enableLogging = _ref.enableLogging;
  var middleware = [thunk, router__default(history)].concat(_toConsumableArray(toArray(customMiddleware)), [enableLogging && clientDev && logger]).filter(Boolean);
  var createStoreWithMiddleware = redux.applyMiddleware.apply(void 0, _toConsumableArray(middleware))(redux.createStore);
  return createStoreWithMiddleware.apply(void 0, _toConsumableArray([reducer, _objectSpread({}, initialState, {
    location: router.buildLocationState(history.location)
  }), enableLogging && clientDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()].filter(Boolean)));
});

var renderCache = {};
var renderHtml = function renderHtml(_ref) {
  var AppComponent = _ref.AppComponent,
      store = _ref.store,
      baseCss = _ref.baseCss,
      jsSource = _ref.jsSource,
      StyleComponent = _ref.StyleComponent;
  var body = server.renderToString(React.createElement(reactRedux.Provider, {
    store: store
  }, React.createElement(AppComponent, null)));
  var rootMarkup = server.renderToStaticMarkup(React.createElement(Root, {
    head: Helmet.renderStatic(),
    baseStyles: baseCss,
    StyleComponent: StyleComponent,
    content: body,
    initialState: abab.btoa(JSON.stringify(store.getState())),
    jsSource: jsSource
  }));
  return "<!doctype html>\n".concat(rootMarkup);
};
var resolveRoute = function resolveRoute(_ref2) {
  var path = _ref2.path,
      _ref2$cachePerUrl = _ref2.cachePerUrl,
      cachePerUrl = _ref2$cachePerUrl === void 0 ? false : _ref2$cachePerUrl,
      config = _objectWithoutProperties(_ref2, ["path", "cachePerUrl"]);
  if (cachePerUrl && renderCache[path]) { return renderCache[path]; }
  return router.resolveLocation(path, config.store.dispatch).then(function (_ref3) {
    var status = _ref3.status,
        url = _ref3.url;
    if (url) { return {
      status: status,
      url: url
    }; }
    var body = renderHtml(config);
    if (cachePerUrl) { renderCache[path] = {
      status: status,
      body: body
    }; }
    return {
      status: status,
      body: body
    };
  });
};
var renderRoute = (function (_ref4) {
  var reducer = _ref4.reducer,
      cachePerUrl = _ref4.cachePerUrl,
      config = _objectWithoutProperties(_ref4, ["reducer", "cachePerUrl"]);
  return function (_ref5) {
    var url = _ref5.url,
        initialState = _ref5.initialState;
    return resolveRoute(_objectSpread({}, config, {
      cachePerUrl: initialState ? false : cachePerUrl,
      path: url,
      store: configureStore({
        reducer: reducer,
        initialState: initialState,
        history: history.createMemoryHistory({
          initialEntries: [url]
        })
      })
    }));
  };
});

var randRange = function randRange() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var createSession = function createSession(_) {
  return intToStr(randRange(0, Number.MAX_SAFE_INTEGER));
};
var intToStr = function intToStr(n) {
  return n.toString(36);
};
var hashStr = function hashStr(str) {
  var h1 = 5381;
  var h2 = 52711;
  var i = (str += '').length;
  while (i--) {
    var _char = str.charCodeAt(i);
    h1 = h1 * 33 ^ _char;
    h2 = h2 * 33 ^ _char;
  }
  return intToStr((h1 >>> 0) * 4096 + (h2 >>> 0));
};
var csrfHash = function csrfHash(secret, session, expires) {
  return "".concat(hashStr(secret + session)).concat(hashStr(secret + expires)).concat(hashStr(secret + session + expires));
};
var isValidCSRF = function isValidCSRF(secret, session, csrf) {
  var _csrf$split = csrf.split('|'),
      _csrf$split2 = _slicedToArray(_csrf$split, 2),
      expires = _csrf$split2[0],
      hash = _csrf$split2[1];
  var current = Date.now() < parseInt(expires, 36);
  var reproducible = hash === csrfHash(secret, session, expires);
  return current && reproducible;
};
var validate = function validate(secret) {
  return function (session, csrf) {
    return csrf && session && isValidCSRF(secret, session, csrf);
  };
};
var create = function create(secret, ttl) {
  return function (session, csrf) {
    var expires = intToStr(Date.now() + ttl);
    session = session || createSession();
    csrf = csrf || "".concat(expires, "|").concat(csrfHash(secret, session, expires));
    return {
      session: session,
      csrf: csrf
    };
  };
};
var csrf = (function (secret) {
  var ttl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3600000;
  return {
    create: create(secret, ttl),
    validate: validate(secret)
  };
});

exports.csrfCreator = csrf;
exports.routeRenderer = renderRoute;
