# Deploying to Render

This guide will help you deploy your cron job to Render as a scheduled service.

## Prerequisites

1. **GitHub Repository**: Push your code to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Node.js Version**: Ensure you're using Node.js 18+ (specified in Dockerfile)

## Deployment Options

### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub**: Make sure your code is in a GitHub repository
2. **Connect to Render**:

   - Go to [render.com/dashboard](https://render.com/dashboard)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy**: Render will automatically deploy your cron job

### Option 2: Manual Setup

1. **Create New Cron Job**:

   - Go to [render.com/dashboard](https://render.com/dashboard)
   - Click "New +" → "Cron Job"

2. **Configure**:

   - **Name**: `web3-message-signer-health-check`
   - **Environment**: `Node`
   - **Build Command**: `yarn install`
   - **Start Command**: `yarn start`
   - **Schedule**: `*/15 * * * *` (every 15 minutes)

3. **Environment Variables**:
   ```
   ENDPOINT_URL=https://web3-message-signer-0dqt.onrender.com/health
   NODE_ENV=production
   REQUEST_TIMEOUT=30000
   MAX_RETRIES=3
   RETRY_DELAY=5000
   ```

## Environment Variables

| Variable          | Value                                                  | Description                           |
| ----------------- | ------------------------------------------------------ | ------------------------------------- |
| `ENDPOINT_URL`    | `https://web3-message-signer-0dqt.onrender.com/health` | Your health endpoint                  |
| `NODE_ENV`        | `production`                                           | Environment mode                      |
| `REQUEST_TIMEOUT` | `30000`                                                | Request timeout in milliseconds       |
| `MAX_RETRIES`     | `3`                                                    | Number of retry attempts              |
| `RETRY_DELAY`     | `5000`                                                 | Delay between retries in milliseconds |

## Cron Schedule Options

- **Every 15 minutes**: `*/15 * * * *` (default)
- **Every 5 minutes**: `*/5 * * * *`
- **Every hour**: `0 * * * *`
- **Every day at 2 AM**: `0 2 * * *`

## Monitoring

Once deployed, you can monitor your cron job:

1. **Logs**: View real-time logs in the Render dashboard
2. **Metrics**: Check execution history and success rates
3. **Alerts**: Set up notifications for failures

## Troubleshooting

### Common Issues

1. **Build Failures**: Ensure all dependencies are in `package.json`
2. **Timeout Errors**: Increase `REQUEST_TIMEOUT` if needed
3. **Permission Errors**: Check file permissions in your repository

### Debug Commands

```bash
# Test locally
yarn test

# Run locally
yarn start

# Check logs in Render dashboard
```

## Cost Considerations

- **Free Tier**: 750 hours/month (sufficient for every 15 minutes)
- **Paid Plans**: Start at $7/month for unlimited usage
- **Cron Jobs**: Typically use minimal resources

## Security

- Environment variables are encrypted in Render
- No sensitive data should be committed to the repository
- Use Render's built-in secrets management

## Next Steps

1. Deploy to Render
2. Monitor the first few executions
3. Set up alerts if needed
4. Consider adding more endpoints or schedules
