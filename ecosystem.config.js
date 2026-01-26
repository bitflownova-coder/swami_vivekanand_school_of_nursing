module.exports = {
  apps: [{
    name: 'svs-nursing-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
