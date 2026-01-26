# Quick API Reference - MySQL2 Migration

## All API Endpoints (21 Total)

### Workshop Management
```
GET    /api/cne/workshop                 - List workshops (filter by status)
POST   /api/cne/workshop                 - Create workshop
GET    /api/cne/workshop/[id]            - Get workshop by ID
PUT    /api/cne/workshop/[id]            - Update workshop
DELETE /api/cne/workshop/[id]            - Delete workshop
```

### Registration Portal
```
POST   /api/cne/registration             - Submit registration
GET    /api/cne/registration             - List registrations
POST   /api/cne/registration/view        - View registration (MNC UID + Mobile)
POST   /api/cne/registration/increment-download - Track certificate downloads
```

### Admin Portal
```
POST   /api/cne/admin/login              - Admin authentication
POST   /api/cne/admin/logout             - Admin logout
GET    /api/cne/admin/check-session      - Verify admin session
GET    /api/cne/admin/stats              - Dashboard statistics
GET    /api/cne/admin/registrations      - Manage registrations (search/filter/paginate)
```

### Desk Portal
```
POST   /api/cne/desk/login               - Desk authentication
POST   /api/cne/desk/logout              - Desk logout
GET    /api/cne/desk/check-session       - Verify desk session
POST   /api/cne/desk/mark-attendance     - Mark attendance via QR
POST   /api/cne/desk/spot-register       - Spot registration
GET    /api/cne/desk/spot-qr/[id]        - Generate spot registration QR
GET    /api/cne/desk/attendance-qr/[id]  - Generate attendance QR (30s refresh)
POST   /api/cne/desk/verify-spot-token   - Verify spot QR token
GET    /api/cne/desk/spot-stats/[id]     - Spot registration statistics
GET    /api/cne/desk/attendance-stats/[id] - Attendance statistics
GET    /api/cne/desk/recent-attendance/[id] - Recent 10 attendance records
```

## Common Query Patterns

### SELECT
```typescript
const [rows] = await db.query<RowDataPacket[]>(
  'SELECT * FROM workshops WHERE id = ?',
  [id]
);
const workshop = rows[0];
```

### INSERT
```typescript
const id = uuidv4();
await db.query<ResultSetHeader>(
  'INSERT INTO workshops (id, title, ...) VALUES (?, ?, ...)',
  [id, title, ...]
);
```

### UPDATE
```typescript
await db.query<ResultSetHeader>(
  'UPDATE workshops SET title = ? WHERE id = ?',
  [newTitle, id]
);
```

### DELETE
```typescript
const [result] = await db.query<ResultSetHeader>(
  'DELETE FROM workshops WHERE id = ?',
  [id]
);
console.log(result.affectedRows); // Check if deleted
```

### COUNT
```typescript
const [result] = await db.query<RowDataPacket[]>(
  'SELECT COUNT(*) as count FROM registrations WHERE workshopId = ?',
  [workshopId]
);
const total = result[0].count;
```

### JOIN
```typescript
const [rows] = await db.query<RowDataPacket[]>(
  `SELECT r.*, w.title as workshopTitle, w.date as workshopDate
   FROM registrations r
   JOIN workshops w ON r.workshopId = w.id
   WHERE r.id = ?`,
  [registrationId]
);
```

## Error Codes

### MySQL Error Codes
- `ER_DUP_ENTRY` - Duplicate unique key (use for duplicate registration check)
- `ER_NO_REFERENCED_ROW` - Foreign key violation
- `ER_LOCK_WAIT_TIMEOUT` - Lock timeout (retry query)

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

### Admin
```typescript
// .env
ADMIN_USERNAME=svsnursing
ADMIN_PASSWORD=SVSNursing@2025

// Cookie
cne_admin_session=authenticated (30 min)
```

### Desk
```typescript
// .env
DESK_USERNAME=desk
DESK_PASSWORD=desk123

// Cookie
desk_session=authenticated (12 hours)
```

## Deployment Commands

```bash
# Build
npm run build

# Deploy (Windows)
deploy.bat

# Deploy (Linux)
./deploy.sh

# Manual SSH
ssh u984810592@72.61.252.200 -p 65002

# PM2 Commands
pm2 list
pm2 restart svs-nursing-website
pm2 logs svs-nursing-website
pm2 monit

# Database Access
mysql -u u984810592_svs -p u984810592_svs_cne
```

## Testing Endpoints

```bash
# Get all workshops
curl https://svsnursing.org/api/cne/workshop

# Get active workshops
curl https://svsnursing.org/api/cne/workshop?status=active

# Admin login
curl -X POST https://svsnursing.org/api/cne/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"svsnursing","password":"SVSNursing@2025"}'

# Get stats
curl https://svsnursing.org/api/cne/admin/stats?workshopId=all
```

## All Features Working ✅

1. ✅ Workshop creation and management
2. ✅ Online registration with file upload
3. ✅ Registration validation (duplicates, capacity)
4. ✅ Admin dashboard with statistics
5. ✅ Search and filter registrations
6. ✅ Desk portal authentication
7. ✅ Spot registration with QR
8. ✅ Attendance marking with QR
9. ✅ Real-time statistics
10. ✅ Certificate download tracking
11. ✅ IP address logging
12. ✅ Session management
