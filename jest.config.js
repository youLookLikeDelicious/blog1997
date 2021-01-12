module.exports = {
  verbose: true,
  notify: true,
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '.+mathquill\\.min\\.js$': 'raw-loader'
  },
  transformIgnorePatterns: [
    './node_modules/(?!@(blog1997|bit)/).*'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  coverageReporters: [
    'json', 'text'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.vue',
    'pages/**/*.vue',
    'slot/**/*.vue',
    'layouts/**/*.vue',
    'mixins/**/*.js',
    'middleware/**/*.js',
    'store/**/*.js',
    '!**/node_modules/**',
    '!components/common/back-drop.vue'
  ]
}
