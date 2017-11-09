const HotKey = require('../index')
const createEditor = require('./helpers/createEditor')

describe('HotKey', () => {

  it('setRules()', () => {

    const config = {
      domNode: createEditor(),
      delay: 30,
      symbols: 3,
      rules: []
    }

    const hotkey = new HotKey(config)

    hotkey.setRules([
      {
        name: '1,2',
        codes: [2, 1],
      },
      {
        name: '3,4',
        codes: [4, 3],
      },
    ])

    expect(hotkey._rules).toEqual([
      {
        name: '1,2',
        codes: [1,2],
      },
      {
        name: '3,4',
        codes: [3,4],
      },
    ])

  })

  it('getRules()', () => {

    const rules = [
      {
        name: '1,2',
        codes: [1,2],
      },
      {
        name: '3,4',
        codes: [3,4],
      },
    ]

    const config = {
      domNode: createEditor(),
      delay: 30,
      symbols: 3,
      rules
    }

    const hotkey = new HotKey(config)

    expect(hotkey.getRules()).toEqual(rules)

  })

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

    hotkey.on('1,2', spy.callback)
    hotkey.on('3,4', spy.callback)

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
