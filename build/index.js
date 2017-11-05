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
