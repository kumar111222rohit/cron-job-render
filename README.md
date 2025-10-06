# Cron Job Render

A simple Node.js cron job that hits your endpoint every 15 minutes with automatic retry logic and detailed logging.

## Quick Start

1. **Set your endpoint URL:**

   ```bash
   export ENDPOINT_URL="https://your-api-endpoint.com/api/endpoint"
   ```

2. **Start the cron job:**
   ```bash
   yarn start
   ```

## Features

- 🕐 **Scheduled Execution**: Runs every 15 minutes
- 🔄 **Automatic Retries**: Retries failed requests up to 3 times
- 📝 **Detailed Logging**: Timestamped logs for all activities
- ⚙️ **Configurable**: Easy configuration via environment variables
- 🛡️ **Error Handling**: Graceful error handling and recovery
- 🧪 **Test Mode**: Makes an immediate test call on startup

## Configuration

The cron job can be configured using environment variables:

| Variable       | Description           | Default                                                |
| -------------- | --------------------- | ------------------------------------------------------ |
| `ENDPOINT_URL` | Your API endpoint URL | `https://web3-message-signer-0dqt.onrender.com/health` |

## Schedule

- **Frequency**: Every 15 minutes
- **Cron Expression**: `*/15 * * * *`
- **Timezone**: UTC

## Example Output

```
[2024-01-15T10:00:00.000Z] 🚀 Starting cron job...
[2024-01-15T10:00:00.000Z] 📅 Schedule: Every 15 minutes (*/15 * * * *)
[2024-01-15T10:00:00.000Z] 🎯 Endpoint: https://your-api-endpoint.com/api/endpoint
[2024-01-15T10:00:00.000Z] ⏱️  Timeout: 30000ms
[2024-01-15T10:00:00.000Z] 🔄 Retries: 3
[2024-01-15T10:00:00.000Z] 🧪 Making initial test call...
[2024-01-15T10:00:00.000Z] Making request to https://your-api-endpoint.com/api/endpoint (attempt 1)
[2024-01-15T10:00:00.500Z] ✅ Success! Status: 200, Response time: N/A
```

## Stopping the Job

Press `Ctrl+C` to gracefully stop the cron job.

## Dependencies

- `node-cron`: For scheduling
- `axios`: For HTTP requests

## License

MIT
