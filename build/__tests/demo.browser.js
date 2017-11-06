const HotKey = require('../index')

describe('Demo on test page', () => {

  fit('HotKey', () => {

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
