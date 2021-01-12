require('babel-plugin-require-context-hook/register')()

const tests = require.context('./', true)

tests.keys().forEach(tests)
