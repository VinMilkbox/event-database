-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: 172.21.0.2    Database: feed_service
-- ------------------------------------------------------
-- Server version	5.7.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_user`
--

DROP TABLE IF EXISTS `api_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_AC64A0BA7BA2F5EB` (`api_token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_user`
--

LOCK TABLES `api_user` WRITE;
/*!40000 ALTER TABLE `api_user` DISABLE KEYS */;
INSERT INTO `api_user` VALUES (1,'ASD41-25454-SASAD-344EA','127.0.0.1',1);
/*!40000 ALTER TABLE `api_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20201031103724','2020-12-13 16:37:59',172);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_menu`
--

DROP TABLE IF EXISTS `group_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_icon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `group_role` json DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_menu`
--

LOCK TABLES `group_menu` WRITE;
/*!40000 ALTER TABLE `group_menu` DISABLE KEYS */;
INSERT INTO `group_menu` VALUES (1,'Dashboard','/images/svg-icon/sidebar-menu/dashboard.svg',1,'{\"ROLE_ADMIN\": true}',1),(2,'Customers Manager','/css/icons/LivIconsEvo/svg/users.svg',1,'{\"ROLE_ADMIN\": true}',1),(3,'CMS Manager','/css/icons/LivIconsEvo/svg/morph-doc.svg',1,'{\"ROLE_ADMIN\": true}',1),(4,'System Settings','/css/icons/LivIconsEvo/svg/settings.svg',1,'{\"ROLE_ADMIN\": true}',1);
/*!40000 ALTER TABLE `group_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_menu`
--

DROP TABLE IF EXISTS `main_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `menu_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_route` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_icon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `menu_role` json DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_menu`
--

LOCK TABLES `main_menu` WRITE;
/*!40000 ALTER TABLE `main_menu` DISABLE KEYS */;
INSERT INTO `main_menu` VALUES (1,1,'Dashboard','/','/images/svg-icon/sidebar-menu/dashboard.svg',0,'{\"ROLE_ADMIN\": true}',1),(2,2,'Customers','/Customers/','/css/icons/LivIconsEvo/svg/users.svg',1,'{\"ROLE_ADMIN\": true}',1),(3,3,'CMS','/CMS/','/css/icons/LivIconsEvo/svg/bulb.svg',2,'{\"ROLE_ADMIN\": true}',1),(4,4,'Settings','/Settings/','/css/icons/LivIconsEvo/svg/settings.svg',9,'{\"ROLE_ADMIN\": true}',1);
/*!40000 ALTER TABLE `main_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menu`
--

DROP TABLE IF EXISTS `sub_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_url` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_icon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_menu_id` int(11) NOT NULL,
  `menu_role` json DEFAULT NULL,
  `priority` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menu`
--

LOCK TABLES `sub_menu` WRITE;
/*!40000 ALTER TABLE `sub_menu` DISABLE KEYS */;
INSERT INTO `sub_menu` VALUES (1,'Customers List','/Customers/List','si si-people',2,'{\"ROLE_ADMIN\": true}',1,1),(2,'Show Pages','/CMS/List','si si-docs',3,'{\"ROLE_ADMIN\": true}',2,1),(3,'Create Page','/CMS/Create','si si-pencil',3,'{\"ROLE_ADMIN\": true}',0,1),(5,'Menu Setup','/Settings/Menu','si-organization si',4,'{\"ROLE_ADMIN\": true}',0,1);
/*!40000 ALTER TABLE `sub_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menu_elemets`
--

DROP TABLE IF EXISTS `sub_menu_elemets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_menu_elemets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `menu_role` json NOT NULL,
  `sub_menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menu_elemets`
--

LOCK TABLES `sub_menu_elemets` WRITE;
/*!40000 ALTER TABLE `sub_menu_elemets` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_menu_elemets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1483A5E9F85E0677` (`username`),
  UNIQUE KEY `UNIQ_1483A5E9E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2y$13$p18laNoMtWxgjYMmmO/.t.W7n9gAdBQiblvRLlqjPA.gLU/qGeFI6','admin@gatewaynet.ltd',1);
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

-- Dump completed on 2020-12-20 16:15:18
