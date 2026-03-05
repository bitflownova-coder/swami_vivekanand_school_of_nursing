-- Migration: ICICI Orange Payment Gateway Integration
-- Run this script on existing databases to add payment gateway support
-- Existing registrations (manual UPI) remain untouched

-- 1. Add payment columns to registrations table
ALTER TABLE `registrations`
  ADD COLUMN `paymentStatus` VARCHAR(20) NOT NULL DEFAULT 'success' AFTER `paymentScreenshot`,
  ADD COLUMN `paymentMethod` VARCHAR(20) NOT NULL DEFAULT 'manual' AFTER `paymentStatus`;

-- NOTE: Existing rows get paymentStatus='success' and paymentMethod='manual' 
-- because they were already submitted with manual UTR verification.

-- 2. Make paymentUTR and paymentScreenshot nullable for gateway payments
ALTER TABLE `registrations`
  MODIFY COLUMN `paymentUTR` VARCHAR(100) NULL DEFAULT NULL,
  MODIFY COLUMN `paymentScreenshot` LONGTEXT NULL DEFAULT NULL;

-- 3. Add index on paymentStatus for filtering
ALTER TABLE `registrations`
  ADD INDEX `idx_paymentStatus` (`paymentStatus`);

-- 4. Create payment_transactions table for full audit trail
CREATE TABLE IF NOT EXISTS `payment_transactions` (
  `id` VARCHAR(191) NOT NULL,
  `registrationId` VARCHAR(191) NOT NULL,
  `workshopId` VARCHAR(191) NOT NULL,
  `merchantTxnNo` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'initiated',
  `iciciResponseCode` VARCHAR(20) NULL DEFAULT NULL,
  `iciciResponseDesc` TEXT NULL DEFAULT NULL,
  `iciciPaymentId` VARCHAR(50) NULL DEFAULT NULL,
  `iciciTxnId` VARCHAR(50) NULL DEFAULT NULL,
  `paymentMode` VARCHAR(20) NULL DEFAULT NULL,
  `paymentSubInstType` VARCHAR(100) NULL DEFAULT NULL,
  `tranCtx` VARCHAR(200) NULL DEFAULT NULL,
  `secureHashSent` VARCHAR(200) NOT NULL,
  `secureHashReceived` VARCHAR(200) NULL DEFAULT NULL,
  `rawRequest` TEXT NOT NULL,
  `rawResponse` TEXT NULL DEFAULT NULL,
  `initiatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completedAt` DATETIME NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_merchantTxnNo` (`merchantTxnNo`),
  INDEX `idx_registrationId` (`registrationId`),
  INDEX `idx_workshopId` (`workshopId`),
  INDEX `idx_status` (`status`),
  INDEX `idx_initiatedAt` (`initiatedAt`),
  FOREIGN KEY (`registrationId`) REFERENCES `registrations`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`workshopId`) REFERENCES `workshops`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
