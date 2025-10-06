// Constants for the cron job
const ENDPOINTS = {
  HEALTH: 'https://web3-message-signer-0dqt.onrender.com/health',
  TEST: 'https://httpbin.org/get' // Fallback test endpoint
}

const CRON_SCHEDULES = {
  EVERY_15_MINUTES: '*/15 * * * *',
  EVERY_5_MINUTES: '*/5 * * * *',
  EVERY_HOUR: '0 * * * *'
}

const DEFAULT_CONFIG = {
  endpoint: process.env.ENDPOINT_URL || ENDPOINTS.HEALTH,
  interval: process.env.CRON_SCHEDULE || CRON_SCHEDULES.EVERY_15_MINUTES,
  timeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
  retries: parseInt(process.env.MAX_RETRIES) || 3,
  retryDelay: parseInt(process.env.RETRY_DELAY) || 5000
}

module.exports = {
  ENDPOINTS,
  CRON_SCHEDULES,
  DEFAULT_CONFIG
}
