-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `streetNumberName` VARCHAR(255) NOT NULL,
    `cityTown` VARCHAR(50) NOT NULL,
    `province` ENUM('AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT') NOT NULL DEFAULT 'ON',
    `postal` VARCHAR(9) NOT NULL,
    `locID` VARCHAR(10) NULL,
    `assignment` ENUM('EMERGENCY', 'HIGH_RISK', 'LABOR_DISPUTE', 'LOSS_PREVENTION', 'STATIC_SERVICE') NOT NULL DEFAULT 'EMERGENCY',
    `assignmentType` ENUM('ACCESS_CONTROL', 'ADMIN_CLERKING', 'FIRE', 'FLOOD', 'TERMINATION', 'THEFT', 'VANDALISM') NOT NULL DEFAULT 'FIRE',
    `withVehicle` BOOLEAN NOT NULL DEFAULT true,
    `details` TEXT NOT NULL,
    `estHours` INTEGER NOT NULL DEFAULT 168,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `fileNumber` VARCHAR(10) NULL,
    `schedulerURL` VARCHAR(255) NULL,
    `clName` VARCHAR(100) NOT NULL,
    `clCompany` VARCHAR(100) NOT NULL,
    `clPhone` VARCHAR(15) NOT NULL,
    `clEmail` VARCHAR(255) NOT NULL,
    `clAddress` VARCHAR(255) NULL,
    `clSSFNs` VARCHAR(100) NULL,
    `clPrefix` VARCHAR(20) NULL,
    `prName` VARCHAR(100) NULL,
    `prCompany` VARCHAR(100) NULL,
    `prPhone` VARCHAR(15) NULL,
    `prEmail` VARCHAR(255) NULL,
    `prAddress` VARCHAR(255) NULL,
    `prSSFNs` VARCHAR(100) NULL,
    `latitude` VARCHAR(12) NULL,
    `longitude` VARCHAR(12) NULL,
    `tempManager` VARCHAR(15) NULL,
    `assignedToUserId` VARCHAR(255) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Site_assignedToUserId_idx`(`assignedToUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(25) NULL,
    `lastName` VARCHAR(25) NULL,
    `title` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(15) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('WEBUSER', 'WEBADMIN', 'ADMIN', 'EXEC') NOT NULL DEFAULT 'WEBUSER',
    `emailVerified` DATETIME(3) NULL,
    `hashedPassword` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
