module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage',
        'corejs': 2,
        'targets': {
          'browsers': ['last 2 versions', 'safari >= 7', 'IE >=9']
        }
      }
    ]
  ],
  'plugins': ['require-context-hook']
}
