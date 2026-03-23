-- Migration: Add attendance_spot table for standalone QR-based attendance tracking
-- Run this migration to add the attendance_spot table

CREATE TABLE IF NOT EXISTS `attendance_spot` (
  `id` VARCHAR(191) NOT NULL,
  `workshopId` VARCHAR(191) NOT NULL,
  `mncUID` VARCHAR(20) NOT NULL,
  `mobileNumber` VARCHAR(15) NOT NULL,
  `markedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ipAddress` VARCHAR(50) NOT NULL DEFAULT '',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_workshop_mnc` (`workshopId`, `mncUID`),
  INDEX `idx_workshopId` (`workshopId`),
  CONSTRAINT `fk_attendance_spot_workshop`
    FOREIGN KEY (`workshopId`) REFERENCES `workshops` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
