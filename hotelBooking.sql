-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: fsd08webservices.mysql.database.azure.com    Database: hotelbooking
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `BookingId` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `RoomId` int NOT NULL,
  `CheckInDate` date NOT NULL,
  `CheckOutDate` date NOT NULL,
  `BookingStatus` enum('Confirmed','Pending') DEFAULT 'Pending',
  `BookingBill` decimal(10,2) DEFAULT '0.00',
  `PaymentStatus` enum('Paid','Unpaid') DEFAULT 'Unpaid',
  PRIMARY KEY (`BookingId`),
  KEY `RoomId` (`RoomId`),
  KEY `bookings_ibfk_1` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `data` longblob,
  `mimeType` varchar(45) NOT NULL,
  `roomtype` enum('Single Bed Room','Double Beds Room','Suite Room','Executive Suite Room') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hotelrooms`
--

DROP TABLE IF EXISTS `hotelrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotelrooms` (
  `RoomId` int NOT NULL,
  `RoomType` enum('Single Bed Room','Double Beds Room','Suite Room','Executive Suite Room') DEFAULT NULL,
  `PricePerNight` decimal(10,2) DEFAULT NULL,
  `RoomStatus` enum('Ready','Occupied','Cleaning') DEFAULT 'Ready',
  PRIMARY KEY (`RoomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `Role` enum('customer','Admin') DEFAULT 'customer',
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `UserEmail` varchar(100) NOT NULL,
  `UserAddress` varchar(200) DEFAULT NULL,
  `UserTel` varchar(20) DEFAULT NULL,
  `UserTier` enum('normal','silver','gold','vip') DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UserEmail_UNIQUE` (`UserEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13 18:00:31
