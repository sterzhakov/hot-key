const context = require.context('../../build', true, /\.browser.js$/)
context.keys().forEach(context)
