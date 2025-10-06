#!/usr/bin/env node

// Test script to verify the cron job setup
const {hitEndpoint, config} = require('./index.js')
const {ENDPOINTS} = require('./constants')

console.log('🧪 Testing cron job setup...\n')

console.log('Configuration:')
console.log(`- Endpoint: ${config.endpoint}`)
console.log(`- Available endpoints: ${Object.values(ENDPOINTS).join(', ')}`)
console.log(`- Timeout: ${config.timeout}ms`)
console.log(`- Retries: ${config.retries}`)
console.log(`- Retry Delay: ${config.retryDelay}ms\n`)

console.log('Making test request...')
hitEndpoint()
  .then(success => {
    if (success) {
      console.log('\n✅ Test completed successfully!')
      console.log('Your cron job is ready to run. Use "yarn start" to begin.')
    } else {
      console.log(
        '\n❌ Test failed. Check your endpoint URL and network connection.'
      )
    }
  })
  .catch(error => {
    console.error('\n❌ Test error:', error.message)
  })
