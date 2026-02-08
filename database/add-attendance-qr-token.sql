-- Add attendanceQRToken field to workshops table
-- This allows each workshop to have a permanent attendance QR code

ALTER TABLE `workshops` 
ADD COLUMN `attendanceQRToken` VARCHAR(500) NOT NULL DEFAULT '' AFTER `spotRegistrationQRToken`;
