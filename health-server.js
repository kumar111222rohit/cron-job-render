const http = require('http')
const {DEFAULT_CONFIG} = require('./constants')

// Simple health check server for monitoring the cron job
const server = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(
      JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        config: {
          endpoint: DEFAULT_CONFIG.endpoint,
          interval: DEFAULT_CONFIG.interval,
          timeout: DEFAULT_CONFIG.timeout,
          retries: DEFAULT_CONFIG.retries
        }
      })
    )
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({error: 'Not found'}))
  }
})

const PORT = process.env.PORT || 3000

// Only start the server if this file is run directly
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Health check server running on port ${PORT}`)
  })
}

module.exports = server
