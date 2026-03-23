#!/bin/bash
mysql -u u984810592_svs -p'sCARFACE@aMISHA@1804' u984810592_svs_cne <<'SQL'
UPDATE workshops 
SET attendanceQRToken = UUID() 
WHERE status = 'active' 
  AND (attendanceQRToken = '' OR attendanceQRToken IS NULL);

SELECT id, title, status, attendanceQRToken FROM workshops WHERE status = 'active';
SQL
