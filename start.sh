#!/bin/bash

# Example script to run the cron job with your health endpoint
echo "🚀 Starting cron job for web3-message-signer health endpoint..."

# Set the endpoint (optional - it's already the default)
export ENDPOINT_URL="https://web3-message-signer-0dqt.onrender.com/health"

# Optional: Customize other settings
# export CRON_SCHEDULE="*/5 * * * *"  # Every 5 minutes instead of 15
# export REQUEST_TIMEOUT="60000"      # 60 seconds timeout
# export MAX_RETRIES="5"              # 5 retries instead of 3

echo "📅 Schedule: Every 15 minutes"
echo "🎯 Endpoint: $ENDPOINT_URL"
echo "⏱️  Timeout: ${REQUEST_TIMEOUT:-30000}ms"
echo "🔄 Retries: ${MAX_RETRIES:-3}"
echo ""

# Start the cron job
yarn start
