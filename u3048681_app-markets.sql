-- MySQL dump 10.13  Distrib 8.0.25-15, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: u3048681_app-markets
-- ------------------------------------------------------
-- Server version	5.7.44-48

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
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
INSERT INTO `app_settings` VALUES (1,'appconfiguration','{\"app_name\":\"MARKETS.HOUSE\",\"url\":\"https://markets.house/?app=1\",\"appLanuguage\":null,\"isJavascriptEnable\":\"true\",\"isSplashScreen\":\"true\",\"isZoomFunctionality\":\"false\",\"navigationStyle\":\"sidedrawer\",\"header_style\":\"center\",\"is_walkthrough\":\"false\",\"is_webrtc\":\"false\",\"is_floating_button\":\"false\",\"floating_button_style\":\"regular\",\"is_pull_refresh\":\"true\",\"tab_style\":\"tab_with_title_icon\",\"bottom_navigation\":\"bottom_navigation_2\",\"walkthrough_style\":\"walkthrough_style_1\",\"clear_cookie\":\"false\",\"isExitPopupScreen\":\"true\",\"disable_header\":\"false\",\"disable_footer\":\"true\",\"app_logo\":\"https://markets-house.one-mag.ru/admin-2/upload/app_logo.png\",\"floating_button\":\"https://markets-house.one-mag.ru/admin-2/upload/floating_button.png\"}'),(2,'admob','{\"ads_type\":\"none\",\"admobBannerID\":\"\",\"admobIntentialID\":\"\",\"admobBannerIDIOS\":\"\",\"admobIntentialIDIOS\":\"\",\"facebookBannerID\":\"\",\"facebookIntentialID\":\"\",\"facebookBannerIDIOS\":\"\",\"facebookIntentialIDIOS\":\"\"}'),(3,'progressbar','{\"is_progressbar\":\"true\",\"loaderStyle\":\"Ring\"}'),(4,'theme','{\"themeStyle\":\"Custom\",\"customColor\":\"#ffffff\",\"gradientColor1\":null,\"gradientColor2\":null}'),(5,'about','{\"whatsAppNumber\":\"\",\"instagramUrl\":\"https://t.me/Kpdlbot\",\"twitterUrl\":\"\",\"facebookUrl\":null,\"callNumber\":\"+79996077655\",\"snapchat\":null,\"skype\":null,\"messenger\":null,\"youtube\":null,\"isShowAbout\":\"true\",\"copyright\":\"2025 © Markets.House\",\"description\":\"Наступило новое время: теперь дом и материалы можно приобрести в первом онлайн-маркетплейсе для строительства markets.house! \"}'),(6,'onesignal_configuration','{\"app_id\":\"eb156a25-e17d-4490-87a5-cd88fb240435\",\"rest_api_key\":\"Y2ViOGM0YzQtNDU0Ny00YzgxLTg0N2UtZmUxNmYyMDZhMGVk\"}'),(7,'splash_configuration','{\"first_color\":\"#ffffff\",\"second_color\":\"#ffffff\",\"title\":\"xx\",\"enable_title\":\"false\",\"title_color\":\"#ffffff\",\"enable_logo\":\"true\",\"enable_background\":\"false\",\"splash_logo_url\":\"https://markets-house.one-mag.ru/admin-2/upload/splash_logo.png\",\"splash_background_url\":\"https://markets-house.one-mag.ru/admin-2/upload/splash_background.png\"}'),(8,'exitpopup_configuration','{\"title\":\"Вы хотите закрыть приложение?\",\"positive_text\":\"Да\",\"negative_text\":\"Нет\",\"enable_image\":\"true\",\"exit_image_url\":\"https://markets-house.one-mag.ru/admin-2/upload/cancel.png\"}'),(9,'share_content','{\"share\":\"###\"}');
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floating_button`
--

DROP TABLE IF EXISTS `floating_button`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `floating_button` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floating_button`
--

LOCK TABLES `floating_button` WRITE;
/*!40000 ALTER TABLE `floating_button` DISABLE KEYS */;
/*!40000 ALTER TABLE `floating_button` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `left_header_icon`
--

DROP TABLE IF EXISTS `left_header_icon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `left_header_icon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `left_header_icon`
--

LOCK TABLES `left_header_icon` WRITE;
/*!40000 ALTER TABLE `left_header_icon` DISABLE KEYS */;
INSERT INTO `left_header_icon` VALUES (1,'Back Button 1','ic_back1','ic_back1.png','event',NULL,0,'2021-04-09 02:19:17','2021-04-09 02:19:17'),(2,'Back Button 2','ic_back2','ic_back2.png','event',NULL,0,'2021-04-09 02:19:27','2021-04-09 02:19:27'),(3,'Home','ic_home','ic_home.png','event',NULL,1,'2021-04-09 02:20:00','2021-04-09 02:20:00'),(4,'Profile','ic_profile','ic_profile.png','url','https://rudesignshop.ru/',0,'2021-04-09 02:20:29','2021-04-09 02:20:29'),(5,'Close','ic_close','ic_close.png','event',NULL,0,'2021-04-09 02:20:30','2021-04-09 02:20:30'),(6,'Search','ic_search','ic_search.png','url','https://rudesignshop.ru/',0,'2021-04-09 02:20:36','2021-04-09 02:20:36'),(7,'Add','ic_add','ic_add.png','url','https://rudesignshop.ru/',0,'2021-04-09 02:20:51','2021-04-09 02:20:51');
/*!40000 ALTER TABLE `left_header_icon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `parent_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (40,'Главная','bottom_navigation','1748356770-icons8-Ð³Ð»Ð°Ð²Ð½Ð°Ñ-100.png','https://markets.house',1,0),(41,'Каталог','bottom_navigation','1748356922-icons8-Ð¿Ð¾ÑÑ‹Ð»ÐºÐ°-100 (1).png','https://markets.house/shop',1,0),(42,'Магазины','bottom_navigation','1748356908-icons8-Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½-100.png','https://markets.house/store-listing',1,0),(43,'Карта','bottom_navigation','1748356971-icons8-Ñ‚ÐµÑÑ‚Ð¾Ð²Ñ‹Ð¹-Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚-100.png','https://markets.house/karta-obektov',1,0),(45,'ÐžÑ‚ÑÐ»ÐµÐ´Ð¸Ñ‚ÑŒ Ð·Ð°ÐºÐ°Ð·','sidedrawer','1750226387-icons8-order-completed-100.png','https://markets.house/order-tracking/?app=1',1,0),(46,'Ð£Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ ÑÑ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾Ð¼','sidedrawer','1750226279-icons8-build-64.png','https://markets.house/?app=1',1,0),(47,'ÐœÐ°Ð³Ð°Ð·Ð¸Ð½Ñ‹','sidedrawer','1750227528-icons8-Ð¼Ð°Ð³Ð°Ð·Ð¸Ð½-100.png','https://markets.house/store-listing/?app=1',1,0),(48,'Ð’Ñ‹Ð¿ÑƒÑÐº ÐšÐ­ÐŸ','sidedrawer','1749908305-ic-more.png','https://markets.house/?app=1',1,0),(49,'ÐœÐ¾Ð¹ Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚','sidedrawer','1750241842-icons8-Ñ‚ÐµÑÑ‚Ð¾Ð²Ñ‹Ð¹-Ð°ÐºÐºÐ°ÑƒÐ½Ñ‚-100.png','https://markets.house/my-account/?app=1',1,0),(50,'ÐšÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ñ','sidedrawer','1749963256-icons8-????????????-?????????-100.png','',1,0),(51,'Онлайн ипотека','sidedrawer','1749963271-icons8-безопасность-проверена-100.png','https://markets.house/mortgage-online/?app=1',1,50),(52,'Онлайн трансляция','sidedrawer','1749963300-icons8-безопасность-проверена-100.png','https://markets.house/rtsp/?app=1',1,50),(53,'Контакты','sidedrawer','1749963481-icons8-безопасность-проверена-100.png','https://markets.house/contacts/?app=1',1,50),(54,'Аренда площадей','sidedrawer','1749963533-icons8-безопасность-проверена-100.png','https://markets.house/space-rental/?app=1',1,50),(55,'Для строителей','sidedrawer','1749963581-icons8-безопасность-проверена-100.png','https://markets.house/for-builders/?app=1',1,50),(56,'Информация и документы','sidedrawer','1749963661-icons8-соглашение-100.png','',1,0),(57,'Политика конфиденциальности','sidedrawer','1749963699-icons8-соглашение-100.png','https://markets.house/privacy-and-data-processing-policy/?app=1',1,56),(58,'Политика возврата','sidedrawer','1749963749-icons8-соглашение-100.png','https://markets.house/refund-policy/?app=1',1,56),(59,'Действия при возникновении проблем с оплатой','sidedrawer','1749963807-icons8-соглашение-100.png','https://markets.house/problems-with-payment/?app=1',1,56),(60,'Условия использования','sidedrawer','1749963860-icons8-соглашение-100.png','https://markets.house/terms-of-service/?app=1',1,56),(61,'Договор-оферта для покупателей','sidedrawer','1749963923-icons8-соглашение-100.png','https://markets.house/legal-offer-customers/?app=1',1,56),(62,'Договор-оферта для продавцов','sidedrawer','1749963973-icons8-соглашение-100.png','https://markets.house/legal-offer-sellers/?app=1',1,56),(63,'Условия предоставления сервиса «Безопасная сделка»','sidedrawer','1749964027-icons8-соглашение-100.png','https://markets.house/safe-transaction-terms-of-service/?app=1',1,56),(64,'','','default.png','',0,0),(65,'','','default.png','',0,0),(66,'','','default.png','',0,0),(67,'','','default.png','',0,0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `right_header_icon`
--

DROP TABLE IF EXISTS `right_header_icon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `right_header_icon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `right_header_icon`
--

LOCK TABLES `right_header_icon` WRITE;
/*!40000 ALTER TABLE `right_header_icon` DISABLE KEYS */;
INSERT INTO `right_header_icon` VALUES (1,'Reload','ic_reload','ic_reload.png','event',NULL,0,'2020-06-07 18:28:42','2020-06-07 18:28:42'),(2,'Search','ic_search','ic_search.png','url','https://markets.house/my-account/?app=1',0,'2020-06-07 18:48:16','2020-06-07 18:48:16'),(3,'Cart','ic_cart','ic_cart.png','url','https://link.ru/',0,'2021-04-09 02:11:40','2021-04-09 02:11:40'),(4,'Settings','ic_settings','ic_settings.png','url','https://link.ru/',0,'2021-04-09 07:33:15','2021-04-09 07:33:17'),(5,'Share','ic_share','ic_share.png','event',NULL,0,'2020-06-07 18:46:42','2020-06-07 18:46:42'),(6,'Close','ic_close','ic_close.png','event',NULL,0,'2021-04-09 02:10:36','2021-04-09 02:10:36'),(7,'Profile','ic_profile','ic_profile.png','url','https://markets.house/my-account/?app=1',0,'2021-04-09 02:11:54','2021-04-09 02:11:54'),(8,'Message','ic_message','ic_message.png','url','https://link.ru/',0,'2021-04-09 02:12:47','2021-04-09 02:12:47'),(9,'Notification','ic_notification','ic_notification.png','url','https://link.ru/',0,'2021-04-09 02:13:11','2021-04-09 02:13:11'),(10,'Favourite','ic_favourite','ic_favourite.png\r\n','url','https://link.ru/',0,'2021-06-24 14:01:26',NULL),(11,'Add','ic_add','ic_add.png','url','https://link.ru/',0,'2021-06-24 14:01:26',NULL),(12,'List','ic_list','ic_list.png','url','https://link.ru/',0,'2021-06-24 14:03:34',NULL),(13,'Filter','ic_filter','ic_filter.png','url','https://link.ru/',0,'2021-06-24 14:03:34',NULL),(14,'Chat','ic_chat','ic_chat.png','url','https://link.ru/',0,'2021-06-24 14:04:24',NULL),(15,'About','ic_about','ic_about.png','url','https://link.ru/',0,'2021-06-24 14:04:24',NULL),(16,'QR Code','ic_qr_code','ic_qr_code.png','event',NULL,0,'2022-07-25 02:10:36',NULL);
/*!40000 ALTER TABLE `right_header_icon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabs`
--

DROP TABLE IF EXISTS `tabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabs`
--

LOCK TABLES `tabs` WRITE;
/*!40000 ALTER TABLE `tabs` DISABLE KEYS */;
INSERT INTO `tabs` VALUES (1,'Дом','ic_home.png','https://saratov.rudesignshop.ru/?app=1',1),(2,'Одежда','ic_search.png','https://rudesignshop.ru/fashion/?app=1',1),(3,'Поиск','ic_profile.png','https://rudesignshop.ru/search/?app=1',1),(4,'Wishlist','ic_heart.png','https://www.google.com/',0);
/*!40000 ALTER TABLE `tabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_agent`
--

DROP TABLE IF EXISTS `user_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_agent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `android` text,
  `ios` text,
  `status` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_agent`
--

LOCK TABLES `user_agent` WRITE;
/*!40000 ALTER TABLE `user_agent` DISABLE KEYS */;
INSERT INTO `user_agent` VALUES (1,'Web Browser','Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36','Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',1);
/*!40000 ALTER TABLE `user_agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@example.com','21232f297a57a5a743894a0e4a801fc3','Admin','Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walkthrough`
--

DROP TABLE IF EXISTS `walkthrough`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `walkthrough` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walkthrough`
--

LOCK TABLES `walkthrough` WRITE;
/*!40000 ALTER TABLE `walkthrough` DISABLE KEYS */;
INSERT INTO `walkthrough` VALUES (7,'XX','XX','1749877817-Screenshot (2).png',1),(8,'xx','xx','1749877831-Screenshot (3).png',1),(9,'xx','xx','1749877844-Screenshot (4).png',1);
/*!40000 ALTER TABLE `walkthrough` ENABLE KEYS */;
UNLOCK TABLES;
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11  2:54:02
