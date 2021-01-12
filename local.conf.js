const nightwatchConfig = {
  src_folders: [ 'tests/e2e/specs' ],

  selenium: {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 443,
    'proxy': 'http://PROXY_USERNAME:PROXY_PASSWORD@proxy-host:proxy-port'
  },

  common_capabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USER,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'name': 'Bstack-[Nightwatch] Parallel Test'
  },

  test_settings: {
    default: {
      'browserstack.local': true
    },
    chrome: {
      desiredCapabilities: {
        browser: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: 'firefox'
      }
    },
    safari: {
      desiredCapabilities: {
        browser: 'safari'
      }
    },
    ie: {
      desiredCapabilities: {
        browser: 'internet explorer'
      }
    }
  }
}

// Code to support common capabilites
for (const i in nightwatchConfig.test_settings) {
  const config = nightwatchConfig.test_settings[i]
  config.selenium_host = nightwatchConfig.selenium.host
  config.selenium_port = nightwatchConfig.selenium.port
  config.desiredCapabilities = config.desiredCapabilities || {}
  for (const j in nightwatchConfig.common_capabilities) {
    config.desiredCapabilities[j] = config.desiredCapabilities[j] || nightwatchConfig.common_capabilities[j]
  }
}

module.exports = nightwatchConfig
