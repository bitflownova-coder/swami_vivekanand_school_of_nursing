#!/bin/bash
# Build script that bypasses thread creation issues

export UV_THREADPOOL_SIZE=4
export UV_USE_IO_URING=0
export NODE_OPTIONS="--max-old-space-size=1024"

echo "Starting Next.js build..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed!"
    exit 1
fi
