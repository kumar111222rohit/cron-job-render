const cron = require('node-cron')
const axios = require('axios')
const {DEFAULT_CONFIG} = require('./constants')

// Configuration
const config = DEFAULT_CONFIG

// Optional: Start health check server if PORT is set
if (process.env.PORT) {
  require('./health-server')
}

// Function to make HTTP request
async function hitEndpoint(retryCount = 0) {
  try {
    console.log(
      `[${new Date().toISOString()}] Making request to ${
        config.endpoint
      } (attempt ${retryCount + 1})`
    )

    const response = await axios.get(config.endpoint, {
      timeout: config.timeout,
      headers: {
        'User-Agent': 'Cron-Job-Render/1.0.0',
        'Content-Type': 'application/json'
      }
    })

    console.log(
      `[${new Date().toISOString()}] ✅ Success! Status: ${
        response.status
      }, Response time: ${response.headers['x-response-time'] || 'N/A'}`
    )

    // Log response data (truncated for readability)
    if (response.data) {
      const responseStr = JSON.stringify(response.data)
      const truncatedResponse =
        responseStr.length > 200
          ? responseStr.substring(0, 200) + '...'
          : responseStr
      console.log(
        `[${new Date().toISOString()}] Response data: ${truncatedResponse}`
      )
    }

    return true
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ❌ Error on attempt ${retryCount + 1}:`,
      error.message
    )

    if (retryCount < config.retries) {
      console.log(
        `[${new Date().toISOString()}] Retrying in ${
          config.retryDelay / 1000
        } seconds...`
      )
      setTimeout(() => {
        hitEndpoint(retryCount + 1)
      }, config.retryDelay)
    } else {
      console.error(
        `[${new Date().toISOString()}] ❌ Failed after ${
          config.retries + 1
        } attempts`
      )
    }

    return false
  }
}

// Function to start the cron job
function startCronJob() {
  console.log(`[${new Date().toISOString()}] 🚀 Starting cron job...`)
  console.log(
    `[${new Date().toISOString()}] 📅 Schedule: Every 15 minutes (${
      config.interval
    })`
  )
  console.log(`[${new Date().toISOString()}] 🎯 Endpoint: ${config.endpoint}`)
  console.log(`[${new Date().toISOString()}] ⏱️  Timeout: ${config.timeout}ms`)
  console.log(`[${new Date().toISOString()}] 🔄 Retries: ${config.retries}`)

  // Schedule the cron job
  const task = cron.schedule(
    config.interval,
    () => {
      hitEndpoint()
    },
    {
      scheduled: true,
      timezone: 'UTC'
    }
  )

  // Make an immediate call for testing
  console.log(`[${new Date().toISOString()}] 🧪 Making initial test call...`)
  hitEndpoint()

  return task
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(
    `[${new Date().toISOString()}] 🛑 Received SIGINT. Shutting down gracefully...`
  )
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log(
    `[${new Date().toISOString()}] 🛑 Received SIGTERM. Shutting down gracefully...`
  )
  process.exit(0)
})

// Start the cron job
if (require.main === module) {
  startCronJob()
}

module.exports = {startCronJob, hitEndpoint, config}
