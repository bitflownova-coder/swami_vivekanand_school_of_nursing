# SVS Nursing Website - MySQL2 Migration Complete

## ✅ Changes Made

### 1. Database Layer Migration
- **Removed:** Prisma ORM (`@prisma/client`, `prisma`)
- **Added:** MySQL2 direct connection (`mysql2@3.16.0`)
- **Created:** `lib/db.ts` - MySQL2 connection pool
- **Created:** `database/schema.sql` - Complete MySQL schema

### 2. Dependencies Updated

**Added:**
- mysql2: ^3.16.0
- bcrypt: ^5.1.1
- express-session: ^1.17.3
- express-rate-limit: ^7.1.5
- multer: ^1.4.5-lts.1
- cors: ^2.8.5
- dotenv: ^16.3.1
- mongoose: ^8.0.3
- uuid: ^9.0.1
- nodemon: ^3.0.2 (dev)

**Removed:**
- @prisma/client
- prisma

### 3. Environment Configuration

**Old (.env):**
```env
DATABASE_URL=mysql://user:password@host:port/database
MONGODB_URI=...
```

**New (.env):**
```env
DB_HOST=72.61.252.200
DB_PORT=3306
DB_USER=u984810592_svs
DB_PASSWORD=sCARFACE@aMISHA@1804
DB_NAME=u984810592_svs_cne

ADMIN_USERNAME=svsnursing
ADMIN_PASSWORD=SVSNursing@2025

DESK_USERNAME=desk
DESK_PASSWORD=desk123

SESSION_SECRET=svs-nursing-super-secret-key-2025-production
```

### 4. Deployment Configuration

**PM2 Configuration (ecosystem.config.js):**
- Name: `svs-nursing-website`
- Mode: Fork (instead of cluster)
- Memory: 1G (increased from 400M)
- Enhanced logging and auto-restart

**Deployment Scripts:**
- `deploy.sh` - Linux/Mac deployment
- `deploy.bat` - Windows deployment

Both scripts:
1. Build Next.js app (`npm run build`)
2. Create tarball (excludes node_modules, .git, logs, cache)
3. Upload via SCP to Hostinger
4. SSH to server, extract, install deps
5. Run MySQL schema migrations
6. Restart PM2 process

### 5. Database Schema

**Tables Created:**
- `workshops` - CNE workshop information
- `registrations` - Workshop registrations with form numbers
- `attendances` - Attendance tracking with QR tokens

**File:** `database/schema.sql`

## 🚀 Deployment Instructions

### Production Deployment (Hostinger)

**Windows:**
```cmd
cd d:\Bitflow_softwares\CNE\SVS_CNE\swami_vivekanand_school_of_nursing
deploy.bat
```

**Linux/Mac:**
```bash
cd /path/to/swami_vivekanand_school_of_nursing
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment Steps

1. **Build locally:**
```bash
npm run build
```

2. **Upload to server:**
```bash
scp -P 65002 -r .next public package.json ecosystem.config.js .env database u984810592@72.61.252.200:~/domains/svsnursing.org/public_html/
```

3. **SSH to server:**
```bash
ssh -p 65002 u984810592@72.61.252.200
cd domains/svsnursing.org/public_html
```

4. **Setup environment:**
```bash
export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH
npm install --production
```

5. **Initialize database:**
```bash
mysql -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne < database/schema.sql
```

6. **Start with PM2:**
```bash
mkdir -p logs
pm2 stop svs-nursing-website 2>/dev/null
pm2 delete svs-nursing-website 2>/dev/null
pm2 start ecosystem.config.js
pm2 save
```

7. **Verify:**
```bash
pm2 status
pm2 logs svs-nursing-website
```

## 🔧 Next Steps - API Migration

**Important:** The API routes still use Prisma syntax. You need to update all API files in `app/api/cne/` to use MySQL2 instead of Prisma.

### Example Migration Pattern

**Before (Prisma):**
```typescript
import prisma from '@/lib/prisma';

const workshops = await prisma.workshop.findMany();
```

**After (MySQL2):**
```typescript
import db from '@/lib/db';

const [workshops] = await db.query('SELECT * FROM workshops');
```

### API Files to Update:
- `app/api/cne/workshop/route.ts`
- `app/api/cne/registration/route.ts`
- `app/api/cne/admin/*/route.ts` (all admin endpoints)
- `app/api/cne/desk/*/route.ts` (all desk endpoints)

## 📊 Tech Stack (Updated)

**Frontend:**
- Next.js 16.0.10
- React 18.3.1
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Radix UI Components

**Backend:**
- Node.js 20.19.4
- MySQL2 3.16.0 (direct SQL queries)
- bcrypt 5.1.1
- express-session 1.17.3
- express-rate-limit 7.1.5
- multer 1.4.5 (file uploads)
- xlsx 0.18.5 (Excel export)

**Deployment:**
- Hostinger Shared Hosting
- PM2 Process Manager
- Node.js 20 (via /opt/alt/alt-nodejs20)

## 🔐 Credentials

**Database:**
- Host: 72.61.252.200:3306
- User: u984810592_svs
- Password: sCARFACE@aMISHA@1804
- Database: u984810592_svs_cne

**CNE Admin:**
- Username: svsnursing
- Password: SVSNursing@2025

**CNE Desk:**
- Username: desk
- Password: desk123

## 📝 File Structure Changes

```
swami_vivekanand_school_of_nursing/
├── lib/
│   ├── db.ts (NEW - MySQL2 connection)
│   └── prisma.ts (DELETE - no longer needed)
├── database/
│   └── schema.sql (NEW - MySQL schema)
├── prisma/
│   └── schema.prisma (DEPRECATED - for reference only)
├── .env (UPDATED - new format)
├── .env.example (UPDATED - new format)
├── package.json (UPDATED - MySQL2 deps)
├── ecosystem.config.js (UPDATED - PM2 config)
├── deploy.sh (NEW - deployment script)
└── deploy.bat (NEW - deployment script)
```

## ⚠️ Important Notes

1. **Prisma files are NOT deleted** - kept for reference during API migration
2. **API routes still need updating** - they currently won't work until migrated to MySQL2
3. **Database schema** - Run `database/schema.sql` on first deployment
4. **Environment variables** - Different format than Prisma (DB_HOST vs DATABASE_URL)
5. **Connection pooling** - MySQL2 pool configured with 10 connections max

## 🎯 What Works Now

- ✅ Dependencies installed
- ✅ Environment configured
- ✅ Database schema ready
- ✅ PM2 configuration ready
- ✅ Deployment scripts ready
- ✅ Frontend pages (all Next.js/React pages unchanged)

## ❌ What Needs Work

- ❌ API routes need MySQL2 migration (currently use Prisma syntax)
- ❌ Database queries need to be rewritten
- ❌ Auth middleware needs MySQL2 integration
- ❌ File upload handling needs testing

## 🚀 Ready to Deploy

The infrastructure is ready. Once you migrate the API routes from Prisma to MySQL2, you can deploy using:

```bash
deploy.bat
```

Then visit: https://svsnursing.org

---

**Created:** January 26, 2025
**Stack:** Next.js + MySQL2 + PM2 + Hostinger
