const path = require('path')
const srcDir = path.resolve(__dirname, 'src')

/* this file is to customize webpack configurations of cra */

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@': srcDir, // alias @ as src root dir and we can use import xxx from '@/xxx/xxx'
    }
  }

  if (config.mode === 'production') {
    config.module.rules.forEach(rule => {
      if (!rule.oneOf) return
      rule.oneOf.find(loaderModule => {
        if (
          loaderModule.loader &&
          loaderModule.loader.indexOf('babel-loader') > -1 &&
          '.tsx'.match(loaderModule.test)
        ) {
          // remove data-cy attributes in prodiction env
          loaderModule.options.plugins.push([
            'react-remove-properties',
            {
              properties: ['data-cy']
            }
          ])
          return true
        }
        return false
      })
    })
  }

  return config
}
