/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const context = __webpack_require__(1)
context.keys().forEach(context)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./__tests/demo.browser.js": 5,
	"./__tests/index.browser.js": 2
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const HotKey = __webpack_require__(4)
const createEditor = __webpack_require__(3)

describe('HotKey', () => {

  it('detect rules', (done) => {

    const config = {
      domNode: createEditor(),
      delay: 30,
      symbols: 3,
      rules: [
        {
          name: '1,2',
          codes: [1,2],
        },
        {
          name: '3,4',
          codes: [3,4],
        },
      ]
    }

    const spy = { callback: () => {} }

    spyOn(spy, 'callback')

    const hotkey = new HotKey(config)

    hotkey.on(['1,2','3,4'], spy.callback)

    hotkey.handleKeydown({ keyCode: 3 })

    setTimeout(() => {

      hotkey.handleKeydown({ keyCode: 4 })

      hotkey.handleKeyup({ keyCode: 4 })
      hotkey.handleKeyup({ keyCode: 3 })

      expect(spy.callback.calls.count()).toBe(1)
      expect(
        spy.callback.calls.argsFor(0)[0].rule
      ).toEqual(config.rules[1])

      done()

    }, 10)


  })

  it('detect rules multiple times', (done) => {

    const config = {
      domNode: createEditor(),
      delay: 30,
      symbols: 3,
      rules: [
        {
          name: '1,2',
          codes: [1,2],
        },
        {
          name: '3,4',
          codes: [3,4],
        },
      ]
    }

    const spy = { callback: () => {} }

    spyOn(spy, 'callback')

    const hotkey = new HotKey(config)

    hotkey.on(['1,2','3,4'], spy.callback)

    hotkey.handleKeydown({ keyCode: 1 })
    hotkey.handleKeydown({ keyCode: 2 })

    hotkey.handleKeyup({ keyCode: 1 })
    hotkey.handleKeyup({ keyCode: 2 })

    setTimeout(() => {

      hotkey.handleKeydown({ keyCode: 3 })
      hotkey.handleKeydown({ keyCode: 4 })

      expect(spy.callback.calls.count()).toBe(2)
      expect(
        spy.callback.calls.argsFor(0)[0].rule
      ).toEqual(
        config.rules[0]
      )
      expect(
        spy.callback.calls.argsFor(1)[0].rule
      ).toEqual(
        config.rules[1]
      )

      done()

    }, 10)


  })


})


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = () => {

  const domNode = document.createElement('div')

  domNode.setAttribute('contenteditable', true)

  return domNode

}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class HotKey {

  constructor(config) {

    this._domNode = config.domNode || null
    this._symbols = config.symbols || 3
    this._delay = config.delay || 1000
    this._timer = null
    this._record = false
    this._codes = []
    this._handlers = {}

    this._rules = config.rules.map(rule =>
      Object.assign({}, rule, { codes: rule.codes.sort() })
    )

    this.handleKeydown = this.handleKeydown.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)

  }

  start() {

    this._domNode.addEventListener('keydown', this.handleKeydown)
    this._domNode.addEventListener('keyup', this.handleKeyup)

  }

  stop() {

    this._domNode.removeEventListener('keydown', this.handleKeydown)
    this._domNode.removeEventListener('keyup', this.handleKeyup)

  }

  on(keys, handler) {

    this._handlers = keys.reduce((handlers, key) => {
      return Object.assign({}, handlers, { [key]: handler })
    }, this._handlers)

  }

  handleKeydown(event) {

    clearTimeout(this._timer)

    this._record = true

    this._timer = setTimeout(() => {

      this._record = false

      this._codes = []

    }, this._delay)

    if (
      this._record &&
      this._codes.indexOf(event.keyCode) == -1
    ) {

      this._codes = [
        ...this._codes.slice(-this._symbols + 1),
        event.keyCode
      ].sort()

    }

    const rule = this._rules.find((rule) => {

      return rule.codes.every((code, index) => {

        return code == this._codes[index]

      })

    })

    if (rule && rule.name && this._handlers[rule.name]) {

      event.rule = rule

      this._handlers[rule.name](event)

    }

  }

  handleKeyup(event) {

    this._codes = this._codes.filter(code => code != event.keyCode)

  }

}

module.exports = HotKey


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const HotKey = __webpack_require__(4)

describe('Demo on test page', () => {

  it('HotKey', () => {

    const config = {
      domNode: document.querySelector('.editor'),
      delay: 1000,
      symbols: 3,
      rules: [
        {
          name: 'ctrl+z',
          codes: [17, 90],
        },        {
          name: 'ctrl+shift+z',
          codes: [17, 16, 90],
        },
        {
          name: 'cmd+z',
          codes: [91, 90],
        },
        {
          name: 'cmd+shift+z',
          codes: [91, 16, 90],
        },
      ]
    }

    const hotkey = new HotKey(config)

    hotkey.on(['ctrl+z', 'cmd+z'], (event) => {

      event.preventDefault()

      console.log('history back')

    })

    hotkey.on(['ctrl+shift+z', 'cmd+shift+z'], (event) => {

      event.preventDefault()

      console.log('history forward')

    })

    hotkey.start()

    // hotkey.stop()

    expect().toBeUndefined()

  })

})


/***/ })
/******/ ]);