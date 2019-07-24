Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var router = require('naglfar');
var router__default = _interopDefault(router);
var React = _interopDefault(require('react'));
var reactDom = require('react-dom');
var reactRedux = require('react-redux');
var history = require('history');
var redux = require('redux');
var thunk = _interopDefault(require('redux-thunk'));
var logger = _interopDefault(require('redux-logger'));

var isBrowser = typeof module === 'undefined' && self && !self.module && typeof window !== 'undefined' && typeof document !== 'undefined' && document.nodeType === 9;
var BelowTheFold = function BelowTheFold(_ref) {
  var children = _ref.children;
  return isBrowser && React.createElement(React.Fragment, null, children);
};

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

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

var rehydrateState = function rehydrateState(_) {
  try {
    return JSON.parse(atob(document.querySelectorAll('[data-initial-state]')[0].dataset.initialState));
  } catch (e) {
    return {};
  }
};
var renderClient = function renderClient(_ref) {
  var AppComponent = _ref.AppComponent,
      reducer = _ref.reducer,
      customMiddleware = _ref.customMiddleware,
      _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? process.env.NODE_ENV !== 'production' : _ref$enableLogging;
  var store = configureStore({
    reducer: reducer,
    initialState: rehydrateState(),
    history: history.createBrowserHistory(),
    customMiddleware: customMiddleware,
    enableLogging: enableLogging
  });
  reactDom.hydrate(React.createElement(reactRedux.Provider, {
    store: store
  }, React.createElement(AppComponent, null)), document.getElementById('root'));
};

Object.keys(router).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return router[k];
    }
  });
});
exports.BelowTheFold = BelowTheFold;
exports.renderClient = renderClient;
