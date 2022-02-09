-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.18 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ecomwebapp
DROP DATABASE IF EXISTS `ecomwebapp`;
CREATE DATABASE IF NOT EXISTS `ecomwebapp` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `ecomwebapp`;

-- Dumping structure for table ecomwebapp.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecomwebapp.gender
DROP TABLE IF EXISTS `gender`;
CREATE TABLE IF NOT EXISTS `gender` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecomwebapp.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STAMP_DATETIME` timestamp NULL DEFAULT NULL,
  `PRODUCE_ID` int(11) DEFAULT NULL,
  `STATUS` enum('Y','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  `ADDRESS` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`ID`),
  KEY `FK_checkout_produce` (`PRODUCE_ID`),
  CONSTRAINT `FK_checkout_produce` FOREIGN KEY (`PRODUCE_ID`) REFERENCES `produce` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecomwebapp.produce
DROP TABLE IF EXISTS `produce`;
CREATE TABLE IF NOT EXISTS `produce` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `GENDER` int(11) DEFAULT NULL,
  `CATEGORY` int(11) DEFAULT NULL,
  `SIZE` int(11) DEFAULT NULL,
  `PRICE` float DEFAULT NULL,
  `NUMBER` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_produce_gender` (`GENDER`),
  KEY `FK_produce_category` (`CATEGORY`),
  KEY `FK_produce_size` (`SIZE`),
  CONSTRAINT `FK_produce_category` FOREIGN KEY (`CATEGORY`) REFERENCES `category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_produce_gender` FOREIGN KEY (`GENDER`) REFERENCES `gender` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_produce_size` FOREIGN KEY (`SIZE`) REFERENCES `size` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecomwebapp.size
DROP TABLE IF EXISTS `size`;
CREATE TABLE IF NOT EXISTS `size` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
