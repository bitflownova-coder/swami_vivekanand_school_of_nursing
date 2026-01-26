# Deployment Guide - SVS Nursing School Website

## Server Configuration (Optimized for 100-200 Concurrent Users)

### Cloud Startup Plan Resources:
- **RAM**: 4 GB
- **CPU**: 2 cores
- **Storage**: 100 GB NVMe
- **Concurrent Users**: 100-200 (optimized)

### Application Settings:
- **Node.js Version**: 20 LTS
- **Passenger Instances**: 2-3 (auto-scaling)
- **Memory per Instance**: 1024 MB
- **Request Queue**: 150 requests
- **Max Requests per Instance**: 1000

---

## How to Deploy Updates

### Method 1: Git Deployment (Recommended)

#### 1. Make changes locally and test
```powershell
cd "d:\swami vivekanand school of nursing"
npm run dev  # Test locally
```

#### 2. Commit and push to GitHub
```powershell
git add .
git commit -m "Your update message"
git push
```

#### 3. Pull on server via SSH
```powershell
ssh -p 65002 u984810592@72.61.252.200
cd domains/svsnursing.org/public_html
git pull
mkdir -p tmp
touch tmp/restart.txt
exit
```

#### 4. Wait 2-3 minutes for Passenger to rebuild

---

## Resource Monitoring

### Check if app is running:
```bash
ps aux | grep next-server | grep -v grep
```

### Check memory usage:
```bash
free -h
```

### Check latest errors:
```bash
tail -50 domains/svsnursing.org/public_html/stderr.log
```

### Clear log files (if they grow too large):
```bash
cd domains/svsnursing.org/public_html
> stderr.log
> stdout.log
```

---

## Preventing Resource Maxout

### Current Optimizations in Place:

1. **Passenger Configuration** (`.htaccess`):
   - `PassengerMaxPoolSize 2` - Max 2 app instances
   - `PassengerMaxInstances 3` - Auto-scale up to 3
   - `PassengerMaxRequests 1000` - Restart after 1000 requests (prevents memory leaks)
   - `PassengerMaxRequestQueueSize 150` - Queue up to 150 requests

2. **Node.js Settings**:
   - `UV_THREADPOOL_SIZE 4` - 4 threads (prevents thread creation errors)
   - `NODE_OPTIONS "--max-old-space-size=1024"` - 1GB memory limit per instance
   - `cpus: 2` in next.config.js - Use both CPU cores

3. **Next.js Optimizations**:
   - `workerThreads: false` - Disabled to prevent thread errors on Hostinger
   - `swcMinify: true` - Faster minification
   - `compress: true` - Gzip compression
   - `productionBrowserSourceMaps: false` - No source maps in production

---

## Troubleshooting

### If website shows 503:
1. Check if Node.js is running: `ps aux | grep next-server`
2. If not running, check `stderr.log` for errors
3. Restart: `mkdir -p tmp && touch tmp/restart.txt`

### If API routes fail:
1. Check `.env` file exists with DATABASE_URL
2. Test database connection:
   ```bash
   mysql -h localhost -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne -e 'SHOW TABLES;'
   ```

### If resources hit 100%:
1. Check for crash loops in `stderr.log`
2. Ensure `.next` folder exists (build completed)
3. Clear old builds: `rm -rf .next && touch tmp/restart.txt`
4. Contact Hostinger support to reset resource counter

---

## Important Files

### `.env` (Database & Auth):
```
DATABASE_URL="mysql://u984810592_svs:sCARFACE%40aMISHA%401804@localhost:3306/u984810592_svs_cne"
NODE_ENV=production
NEXTAUTH_URL=https://svsnursing.org
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
```

### Admin Credentials:
- **Admin Portal**: `/cne/admin`
  - Username: `svsnursing`
  - Password: `SVSNursing@2025`

- **Desk Portal**: `/cne/desk`
  - Username: `desk`
  - Password: `desk123`

---

## Performance Expectations

### With Current Setup (100-200 Concurrent Users):
- ✅ **Response Time**: 200-500ms average
- ✅ **Memory Usage**: 400-800 MB per instance (2-3 instances = ~1.5-2.5 GB total)
- ✅ **CPU Usage**: 20-40% average, 60-80% peak
- ✅ **Database Connections**: 10-20 concurrent queries

### Warning Signs:
- ❌ Memory consistently above 3.5 GB → Reduce MaxInstances
- ❌ CPU consistently above 90% → Enable caching
- ❌ Response time > 2 seconds → Check database queries
- ❌ Resource usage spikes to 100% → Check `stderr.log` for errors

---

## Contact Information

- **GitHub Repo**: https://github.com/bitflownova-coder/swami_vivekanand_school_of_nursing
- **Live Site**: https://svsnursing.org
- **Hostinger SSH**: ssh -p 65002 u984810592@72.61.252.200
