![alt tag](https://raw.githubusercontent.com/sterjakovigor/hot-key/master/logo.jpg)

Listens hotkeys events in browser.

```bash
  npm i hot-key
```

## How to use?

```javascript
const HotKey = require('hot-key')

const config = {

  // target node
  domNode: document.querySelector('.editor'),

  // delay after which pressing becomes non-active
  delay: 1000,

  // maximum number of combinations
  symbols: 3,

  // combinations rules
  rules: [
    {
      name: 'ctrl+z',
      codes: [17, 90],
    },
    {
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


// create object
const hotKey = new HotKey(config)

// assign events
hotKey.on('ctrl+z', (event) => {

  console.log('history back')

})

hotKey.on('cmd+z', (event) => {

  console.log('history back')

})

// or like this
hotKey.on(['ctrl+shift+z', 'cmd+shift+z'], (event) => {

  console.log('history forward')

})

// also you can extend rules on the fly like this:
hotKey.setRules([
  ...hotKey.getRules()
  {
    name: 'cmd+a',
    codes: [91, 65],
  },
])

// start listen keyup and keydown events
hotKey.start()

// stop listen events
hotKey.stop()


```
