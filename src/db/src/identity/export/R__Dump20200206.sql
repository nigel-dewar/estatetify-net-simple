-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 192.168.1.7    Database: realestate_api_dev_migrations
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Dumping data for table `__efmigrationshistory`
--
--
-- Dumping data for table `agencies`
--

LOCK TABLES `agencies` WRITE;
/*!40000 ALTER TABLE `agencies` DISABLE KEYS */;
INSERT INTO `agencies` VALUES ('00192d8b-a84a-4b72-8e9b-dc2cc756f245','2e45030b-c22a-4807-a5da-bddd9be51895','LJ Hooker','LJ Hooker Runcorn','RUNCORN','lj-hooker.jpg',4113);
/*!40000 ALTER TABLE `agencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `agency_companies`
--

LOCK TABLES `agency_companies` WRITE;
/*!40000 ALTER TABLE `agency_companies` DISABLE KEYS */;
INSERT INTO `agency_companies` VALUES ('0875e13e-906f-41c2-a197-159ab021a740','RayWhite','ray-white.jpg','#FEE536'),('2e45030b-c22a-4807-a5da-bddd9be51895','LJ Hooker','lj-hooker.jpg','#000000'),('9e57a71d-2712-4761-b7ba-d5895c96d334','@Realty','realty.jpg','#1F1F1F'),('ebd7e5ba-7bae-401c-9308-faa078cb5034','Remax','remax.jpg','#fff'),('fcb78c7a-3765-434d-82fa-87e6ed8f160a','YONG','yong.jpg','#E4322C');
/*!40000 ALTER TABLE `agency_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `agents`
--

LOCK TABLES `agents` WRITE;
/*!40000 ALTER TABLE `agents` DISABLE KEYS */;
INSERT INTO `agents` VALUES ('0012a7af-3f3f-4398-9e08-27500c9381e7','19b6f9db-c994-43ba-bf6a-e787593e5b58','G89-393922',NULL,NULL);
/*!40000 ALTER TABLE `agents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'Alarm System',_binary '\0'),(2,'Intercom',_binary '\0'),(3,'Ensuite',_binary '\0'),(4,'Study',_binary '\0'),(5,'Dishwasher',_binary '\0'),(6,'Built-in wardrobes',_binary '\0');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `listing_permissions`
--

LOCK TABLES `listing_permissions` WRITE;
/*!40000 ALTER TABLE `listing_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `listing_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES ('000d455a-72ce-4b22-a625-4c2d280a395c','002d9b6a-2d89-480c-b9f7-8a52277b6204','2020-02-06 19:01:18.275557','2020-02-16 19:01:18.275690',_binary '',5858482.000000000000000000000000000000,'Buy',_binary '\0','Sue Jane','19b6f9db-c994-43ba-bf6a-e787593e5b58',_binary '',_binary '\0',NULL,'0012a7af-3f3f-4398-9e08-27500c9381e7');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `postcodes`
--

LOCK TABLES `postcodes` WRITE;
/*!40000 ALTER TABLE `postcodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `postcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES ('002d9b6a-2d89-480c-b9f7-8a52277b6204','5 Maynard Place','5-maynard-place-berserker-4113','RUNCORN','runcorn-4113','QLD',NULL,NULL,'Short Desc of property in Runcorn','Beautiful property in Runcorn, its very nice etc etc',4,2,2,894.000000000000000000000000000000,4113,_binary '',_binary '',_binary '\0',_binary '\0',5858482.000000000000000000000000000000,0.000000000000000000000000000000,1,'2020-02-06 19:01:18.273544',NULL);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `property_features`
--

LOCK TABLES `property_features` WRITE;
/*!40000 ALTER TABLE `property_features` DISABLE KEYS */;
/*!40000 ALTER TABLE `property_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `property_permissions`
--

LOCK TABLES `property_permissions` WRITE;
/*!40000 ALTER TABLE `property_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `property_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `property_types`
--

LOCK TABLES `property_types` WRITE;
/*!40000 ALTER TABLE `property_types` DISABLE KEYS */;
INSERT INTO `property_types` VALUES (1,'House'),(2,'Apartment'),(3,'Unit'),(4,'Villa'),(5,'Townhouse'),(6,'Acreage');
/*!40000 ALTER TABLE `property_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role_claims`
--

LOCK TABLES `role_claims` WRITE;
/*!40000 ALTER TABLE `role_claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `simpleclaim`
--

LOCK TABLES `simpleclaim` WRITE;
/*!40000 ALTER TABLE `simpleclaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `simpleclaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `staff_members`
--

LOCK TABLES `staff_members` WRITE;
/*!40000 ALTER TABLE `staff_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `staff_roles`
--

LOCK TABLES `staff_roles` WRITE;
/*!40000 ALTER TABLE `staff_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'Renter'),(2,'Owner'),(3,'Agent'),(4,'Agency'),(5,'AgencyCompany');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('19b6f9db-c994-43ba-bf6a-e787593e5b58','sue@live.com','Sue','Jane',NULL,NULL,_binary '',4,NULL),('56ae0e82-6a90-4796-8f59-c430b7d00203','nigeldewar@live.com','Nigel','Dewar',NULL,NULL,_binary '',2,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-06 20:10:13
