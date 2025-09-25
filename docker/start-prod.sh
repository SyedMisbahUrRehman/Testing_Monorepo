#!/bin/sh

# Start backend in background, then start nginx in foreground
cd /app/backend || exit 1

# If backend exposes a start:prod script, run it; otherwise try node dist
if [ -f package.json ]; then
  if grep -q "start:prod" package.json; then
    npm run start:prod &
  else
    node dist/index.js &
  fi
else
  node dist/index.js &
fi

# Start nginx in foreground
nginx -g "daemon off;"


