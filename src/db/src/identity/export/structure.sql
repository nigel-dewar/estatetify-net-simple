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
-- Table structure for table `agencies`
--

DROP TABLE IF EXISTS `agencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencies` (
  `Id` varchar(255) NOT NULL,
  `AgencyCompanyId` varchar(255) DEFAULT NULL,
  `AgencyCompanyName` longtext,
  `AgencyOfficeName` longtext,
  `Locality` longtext,
  `LogoImageUrl` longtext,
  `PostCode` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_agencies_AgencyCompanyId` (`AgencyCompanyId`),
  CONSTRAINT `FK_agencies_agency_companies_AgencyCompanyId` FOREIGN KEY (`AgencyCompanyId`) REFERENCES `agency_companies` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agency_companies`
--

DROP TABLE IF EXISTS `agency_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency_companies` (
  `Id` varchar(255) NOT NULL,
  `Name` longtext,
  `LogoImageUrl` longtext,
  `BrandColor` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agents` (
  `Id` varchar(255) NOT NULL,
  `UserId` longtext,
  `LicenceNumber` longtext,
  `AgencyId` varchar(255) DEFAULT NULL,
  `StaffId` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_agents_AgencyId` (`AgencyId`),
  CONSTRAINT `FK_agents_agencies_AgencyId` FOREIGN KEY (`AgencyId`) REFERENCES `agencies` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `Id` varchar(255) NOT NULL,
  `Type` longtext,
  `Value` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  `Outdoor` bit(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `Id` varchar(255) NOT NULL,
  `MainImage` bit(1) NOT NULL,
  `ImageUrl` longtext,
  `PropertyId` varchar(255) DEFAULT NULL,
  `ThumbnailUrl` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_images_PropertyId` (`PropertyId`),
  CONSTRAINT `FK_images_properties_PropertyId` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `Id` varchar(255) NOT NULL,
  `PropertyId` varchar(255) DEFAULT NULL,
  `DateCreated` datetime(6) NOT NULL,
  `DateListingExpires` datetime(6) NOT NULL,
  `Active` bit(1) NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `ListingType` longtext,
  `IsPremium` bit(1) NOT NULL,
  `UserName` longtext,
  `UserId` longtext,
  `IsListedByAgent` bit(1) NOT NULL,
  `IsPrivateSeller` bit(1) NOT NULL,
  `AgencyId` varchar(255) DEFAULT NULL,
  `AgentId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_listings_AgencyId` (`AgencyId`),
  KEY `IX_listings_AgentId` (`AgentId`),
  KEY `IX_listings_PropertyId` (`PropertyId`),
  CONSTRAINT `FK_listings_agencies_AgencyId` FOREIGN KEY (`AgencyId`) REFERENCES `agencies` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_listings_agents_AgentId` FOREIGN KEY (`AgentId`) REFERENCES `agents` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_listings_properties_PropertyId` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permission_claims`
--

DROP TABLE IF EXISTS `permission_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_claims` (
  `PermissionId` varchar(255) NOT NULL,
  `ClaimId` varchar(255) NOT NULL,
  PRIMARY KEY (`PermissionId`,`ClaimId`),
  KEY `IX_permission_claims_ClaimId` (`ClaimId`),
  CONSTRAINT `FK_permission_claims_claims_ClaimId` FOREIGN KEY (`ClaimId`) REFERENCES `claims` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_permission_claims_permissions_PermissionId` FOREIGN KEY (`PermissionId`) REFERENCES `permissions` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `Id` varchar(255) NOT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `ResourceId` longtext,
  `Resource` longtext,
  `AgencyId` longtext,
  `ClaimId` varchar(255) DEFAULT NULL,
  `ListingId` varchar(255) DEFAULT NULL,
  `PropertyId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_permissions_ClaimId` (`ClaimId`),
  KEY `IX_permissions_ListingId` (`ListingId`),
  KEY `IX_permissions_PropertyId` (`PropertyId`),
  KEY `IX_permissions_UserId` (`UserId`),
  CONSTRAINT `FK_permissions_claims_ClaimId` FOREIGN KEY (`ClaimId`) REFERENCES `claims` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_permissions_listings_ListingId` FOREIGN KEY (`ListingId`) REFERENCES `listings` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_permissions_properties_PropertyId` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_permissions_users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `postcodes`
--

DROP TABLE IF EXISTS `postcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postcodes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Code` int(11) NOT NULL,
  `Locality` longtext,
  `State` longtext,
  `Long` longtext,
  `Lat` longtext,
  `DeliveryCentre` longtext,
  `Type` longtext,
  `Status` longtext,
  `Suburb` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `Id` varchar(255) NOT NULL,
  `Name` longtext,
  `Slug` varchar(255) DEFAULT NULL,
  `Suburb` longtext,
  `SuburbSlug` longtext,
  `State` longtext,
  `Thumbnail` longtext,
  `MainImage` longtext,
  `ShortDescription` longtext,
  `Description` longtext,
  `Bedrooms` int(11) NOT NULL,
  `Bathrooms` int(11) NOT NULL,
  `ParkingSpaces` int(11) NOT NULL,
  `LandSize` decimal(65,30) NOT NULL,
  `PostCode` int(11) NOT NULL,
  `IsActive` bit(1) NOT NULL,
  `IsForSale` bit(1) NOT NULL,
  `IsForRent` bit(1) NOT NULL,
  `IsForAuction` bit(1) NOT NULL,
  `BuyPrice` decimal(65,30) NOT NULL,
  `RentPrice` decimal(65,30) NOT NULL,
  `PropertyTypeId` int(11) NOT NULL,
  `AvailableDate` datetime(6) NOT NULL,
  `AgentId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_properties_Slug` (`Slug`),
  KEY `IX_properties_AgentId` (`AgentId`),
  KEY `IX_properties_PropertyTypeId` (`PropertyTypeId`),
  CONSTRAINT `FK_properties_agents_AgentId` FOREIGN KEY (`AgentId`) REFERENCES `agents` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_properties_property_types_PropertyTypeId` FOREIGN KEY (`PropertyTypeId`) REFERENCES `property_types` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_features`
--

DROP TABLE IF EXISTS `property_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_features` (
  `PropertyId` varchar(255) NOT NULL,
  `FeatureId` int(11) NOT NULL,
  PRIMARY KEY (`PropertyId`,`FeatureId`),
  KEY `IX_property_features_FeatureId` (`FeatureId`),
  CONSTRAINT `FK_property_features_features_FeatureId` FOREIGN KEY (`FeatureId`) REFERENCES `features` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_property_features_properties_PropertyId` FOREIGN KEY (`PropertyId`) REFERENCES `properties` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_types`
--

DROP TABLE IF EXISTS `property_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_types` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_claims`
--

DROP TABLE IF EXISTS `role_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_claims` (
  `Id` varchar(255) NOT NULL,
  `RoleId` longtext,
  `Value` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `Id` varchar(255) NOT NULL,
  `Name` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_members`
--

DROP TABLE IF EXISTS `staff_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_members` (
  `Id` varchar(255) NOT NULL,
  `UserId` longtext,
  `AgencyCompanyId` varchar(255) DEFAULT NULL,
  `Active` bit(1) NOT NULL,
  `AgentId` longtext,
  `AgentId1` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_staff_members_AgencyCompanyId` (`AgencyCompanyId`),
  KEY `IX_staff_members_AgentId1` (`AgentId1`),
  CONSTRAINT `FK_staff_members_agency_companies_AgencyCompanyId` FOREIGN KEY (`AgencyCompanyId`) REFERENCES `agency_companies` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_staff_members_agents_AgentId1` FOREIGN KEY (`AgentId1`) REFERENCES `agents` (`Id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_roles`
--

DROP TABLE IF EXISTS `staff_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_roles` (
  `StaffId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  PRIMARY KEY (`StaffId`,`RoleId`),
  KEY `IX_staff_roles_RoleId` (`RoleId`),
  CONSTRAINT `FK_staff_roles_roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_staff_roles_staff_members_StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff_members` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` varchar(255) NOT NULL,
  `Email` longtext,
  `FirstName` longtext,
  `LastName` longtext,
  `PhoneNumber` longtext,
  `Mobile` longtext,
  `HasLoggedIn` bit(1) NOT NULL,
  `UserTypeId` int(11) NOT NULL,
  `AgentId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_users_AgentId` (`AgentId`),
  KEY `IX_users_UserTypeId` (`UserTypeId`),
  CONSTRAINT `FK_users_agents_AgentId` FOREIGN KEY (`AgentId`) REFERENCES `agents` (`Id`) ON DELETE RESTRICT,
  CONSTRAINT `FK_users_user_types_UserTypeId` FOREIGN KEY (`UserTypeId`) REFERENCES `user_types` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-07 19:19:53
