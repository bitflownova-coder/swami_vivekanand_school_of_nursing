-- SVS Nursing - Complete Database Schema
-- MySQL Database for Swami Vivekanand School of Nursing

-- Create workshops table
CREATE TABLE IF NOT EXISTS `workshops` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `dayOfWeek` VARCHAR(10) NOT NULL,
  `venue` VARCHAR(500) NOT NULL,
  `venueLink` VARCHAR(500) NOT NULL DEFAULT '',
  `fee` DOUBLE NOT NULL DEFAULT 0,
  `credits` DOUBLE NOT NULL DEFAULT 0,
  `maxSeats` INT NOT NULL DEFAULT 500,
  `currentRegistrations` INT NOT NULL DEFAULT 0,
  `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
  `spotRegistrationEnabled` BOOLEAN NOT NULL DEFAULT FALSE,
  `spotRegistrationLimit` INT NOT NULL DEFAULT 50,
  `currentSpotRegistrations` INT NOT NULL DEFAULT 0,
  `spotRegistrationQRToken` VARCHAR(500) NOT NULL DEFAULT '',
  `attendanceQRToken` VARCHAR(500) NOT NULL DEFAULT '',
  `paymentQRCode` LONGTEXT NULL,
  `upiId` VARCHAR(100) NOT NULL DEFAULT '',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create registrations table
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` VARCHAR(191) NOT NULL,
  `workshopId` VARCHAR(191) NOT NULL,
  `formNumber` INT NOT NULL,
  `fullName` VARCHAR(100) NOT NULL,
  `mncUID` VARCHAR(50) NOT NULL,
  `mncRegistrationNumber` VARCHAR(50) NOT NULL,
  `mobileNumber` VARCHAR(15) NOT NULL,
  `paymentUTR` VARCHAR(100) NULL DEFAULT NULL,
  `paymentScreenshot` LONGTEXT NULL DEFAULT NULL,
  `paymentStatus` VARCHAR(20) NOT NULL DEFAULT 'pending',
  `paymentMethod` VARCHAR(20) NOT NULL DEFAULT 'gateway',
  `registrationType` VARCHAR(20) NOT NULL DEFAULT 'online',
  `attendanceStatus` VARCHAR(20) NOT NULL DEFAULT 'applied',
  `downloadCount` INT NOT NULL DEFAULT 0,
  `submittedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_workshop_mnc` (`workshopId`, `mncUID`),
  UNIQUE KEY `unique_workshop_form` (`workshopId`, `formNumber`),
  INDEX `idx_mncUID` (`mncUID`),
  INDEX `idx_mobileNumber` (`mobileNumber`),
  INDEX `idx_workshopId` (`workshopId`),
  INDEX `idx_paymentStatus` (`paymentStatus`),
  FOREIGN KEY (`workshopId`) REFERENCES `workshops`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create payment_transactions table (ICICI Orange PG audit trail)
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

-- Create attendances table
CREATE TABLE IF NOT EXISTS `attendances` (
  `id` VARCHAR(191) NOT NULL,
  `workshopId` VARCHAR(191) NOT NULL,
  `registrationId` VARCHAR(191) NOT NULL,
  `mncUID` VARCHAR(50) NOT NULL,
  `mncRegistrationNumber` VARCHAR(50) NOT NULL DEFAULT '',
  `studentName` VARCHAR(100) NOT NULL,
  `qrToken` VARCHAR(500) NOT NULL,
  `markedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_workshop_registration` (`workshopId`, `registrationId`),
  INDEX `idx_workshopId` (`workshopId`),
  INDEX `idx_qrToken` (`qrToken`),
  INDEX `idx_registrationId` (`registrationId`),
  FOREIGN KEY (`workshopId`) REFERENCES `workshops`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`registrationId`) REFERENCES `registrations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
