class HotKey {

  constructor(config) {

    this._domNode = config.domNode || null
    this._symbols = config.symbols || 3
    this._delay = config.delay || 1000
    this._timer = null
    this._record = false
    this._codes = []
    this._handlers = {}

    this.setRules(config.rules)

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

  on(key, handler) {

    const keys = Array.isArray(key) ? key : [ key ]

    this._handlers = keys.reduce((handlers, key) => {
      return Object.assign({}, handlers, { [key]: handler })
    }, this._handlers)

  }

  setRules(rules) {

    this._rules = rules.map(rule =>
      Object.assign({},
        rule,
        { codes: rule.codes.sort() }
      )
    )

  }

  getRules() {

    return this._rules

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

    const cmdKeyCodes = [
      91,  // chrome
      93,  // chrome
      224, // firefox
      17,  // opera
    ]

    if (cmdKeyCodes.indexOf(event.keyCode) > -1) {

      this._codes = []

    } else {

      this._codes = this._codes.filter(code => code != event.keyCode)

    }

  }

}

module.exports = HotKey
