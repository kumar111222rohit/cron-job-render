# Cron Job Configuration

## Environment Variables

Set the following environment variable to configure your endpoint:

```bash
export ENDPOINT_URL="https://your-api-endpoint.com/api/endpoint"
```

## Default Configuration

If no `ENDPOINT_URL` is set, the cron job will use `https://web3-message-signer-0dqt.onrender.com/health` as the default endpoint.

## Schedule

The cron job runs every 15 minutes using the cron expression: `*/15 * * * *`

## Features

- ✅ HTTP GET requests every 15 minutes
- ✅ Automatic retry on failure (3 retries with 5-second delays)
- ✅ Request timeout (30 seconds)
- ✅ Detailed logging with timestamps
- ✅ Graceful shutdown handling
- ✅ Configurable via environment variables
- ✅ Initial test call on startup

## Usage

1. Set your endpoint URL:

   ```bash
   export ENDPOINT_URL="https://your-api-endpoint.com/api/endpoint"
   ```

2. Start the cron job:

   ```bash
   yarn start
   ```

3. The job will:
   - Make an immediate test call
   - Schedule regular calls every 15 minutes
   - Log all activities with timestamps
   - Retry failed requests automatically

## Customization

You can modify the configuration in `index.js`:

- `interval`: Change the cron schedule (default: `*/15 * * * *`)
- `timeout`: Adjust request timeout (default: 30000ms)
- `retries`: Number of retry attempts (default: 3)
- `retryDelay`: Delay between retries (default: 5000ms)
