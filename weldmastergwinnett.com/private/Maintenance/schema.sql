CREATE TABLE `article` (
  `articleId` int(11) NOT NULL AUTO_INCREMENT,
  `sectionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `articleType` enum('thread','comment','sample','merch','inventory') NOT NULL,
  `displayName` varchar(100) DEFAULT 'Anonymous',
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mediaSrc` text DEFAULT NULL,
  PRIMARY KEY (`articleId`)
);

CREATE TABLE `flags` (
  `countryId` varchar(2) NOT NULL,
  `countryName` varchar(100) NOT NULL,
  PRIMARY KEY (`countryId`)
);

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `part_number` varchar(100) NOT NULL,
  `quantity_on_hand` int(11) DEFAULT 0,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ledger` (
  `ledgerId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `ipAddress` varchar(45) NOT NULL,
  `actionType` enum('create_thread','create_comment','create_sample','login','flag','report','other') NOT NULL,
  `submissionHash` char(64) DEFAULT NULL,
  `status` enum('accepted','rejected') DEFAULT 'accepted',
  `rejectionReason` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ledgerId`)
);

CREATE TABLE `reports` (
  `reportId` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reportId`)
);

CREATE TABLE `samples` (
  `articleId` int(11) NOT NULL,
  `process` enum('MIG','TIG','Stick','Spray','Flux') NOT NULL,
  `material` enum('Mild-Steel','Stainless','Aluminium') NOT NULL,
  `joint` enum('Tee','Lap','Butt','Corner') NOT NULL,
  `thickness` enum('0.0625','0.125','0.250','0.375') NOT NULL,
  `countryId` char(2) NOT NULL DEFAULT 'US',
  PRIMARY KEY (`articleId`)
);

CREATE TABLE `torque_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `baro` float DEFAULT NULL,
  `clt` float DEFAULT NULL,
  `rpm` int(11) DEFAULT NULL,
  `fuel_cc_min` float DEFAULT NULL,
  `iat` float DEFAULT NULL,
  `maf` float DEFAULT NULL,
  `ign` float DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isBanned` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`userId`)
);


SELECT 
    table_name,
    column_name,
    column_type,
    is_nullable,
    column_default,
    extra
FROM information_schema.columns
WHERE table_schema = 'samwu1_weldmaster'
ORDER BY table_name, ordinal_position;
