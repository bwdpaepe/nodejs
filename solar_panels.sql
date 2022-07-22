-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: solar_panels
-- ------------------------------------------------------
-- Server version	8.0.26

--
-- DATABASE set-up
--
DROP DATABASE IF EXISTS solar_panels;
CREATE DATABASE solar_panels;
USE solar_panels;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES ('7f28c5f9-d711-4cd6-ac15-d13d71abff80','Thomas Aelbrecht'),('7f28c5f9-d711-4cd6-ac15-d13d71abff81','Pieter Van Der Helst'),('7f28c5f9-d711-4cd6-ac15-d13d71abff82','Karine Samyn');
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
CREATE TABLE `production` (
  `id` char(36) NOT NULL,
  `month` varchar(9) NOT NULL,
  `year` int NOT NULL,
  `production` float(24) NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_production_user` (`user_id`),
  CONSTRAINT `fk_production_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_month_year_unique` (`month`, `year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
INSERT INTO `production` VALUES (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff84',
    "January",
    2018,
    87,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    "January",
    2019,
    103,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff86',
    "January",
    2020,
    85,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff87',
    "February",
    2018,
    335,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff88',
    "February",
    2019,
    281,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff89',
    "February",
    2020,
    161,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff90',
    "March",
    2018,
    292,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff91',
    "March",
    2019,
    284,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff92',
    "March",
    2020,
    403,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff93',
    "April",
    2018,
    477,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff94',
    "April",
    2019,
    479,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff95',
    "April",
    2020,
    592,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff96',
    "May",
    2018,
    603,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff97',
    "May",
    2019,
    618,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff98',
    "May",
    2020,
    662,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff99',
    "June",
    2018,
    586,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
    "June",
    2019,
    548,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
    "June",
    2020,
    508,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff03',
    "July",
    2018,
    635,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff04',
    "July",
    2019,
    551,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff05',
    "July",
    2020,
    541,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff06',
    "August",
    2018,
    475,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff07',
    "August",
    2019,
    507,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff08',
    "August",
    2020,
    478,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff09',
    "September",
    2018,
    445,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff10',
    "September",
    2019,
    370,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff11',
    "September",
    2020,
    392,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff12',
    "October",
    2018,
    338,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff13',
    "October",
    2019,
    228,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff14',
    "October",
    2020,
    206,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff15',
    "November",
    2018,
    184,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff16',
    "November",
    2019,
    169,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff17',
    "November",
    2020,
    154,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff18',
    "December",
    2018,
    97,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff19',
    "December",
    2019,
    64,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff20',
    "December",
    2020,
    87,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )
;
UNLOCK TABLES;

--
-- Table structure for table `installation`
--

DROP TABLE IF EXISTS `installation`;
CREATE TABLE `installation` (
  `id` char(36) NOT NULL,
  `number_of_panels` int NOT NULL,
  `orientation` varchar(3) NOT NULL,
  `type_of_panels` varchar(255) NOT NULL,
  `slope_of_roof` int NOT NULL,
  `total_power` int NOT NULL,
  `inverter` varchar(255) NOT NULL,
  `initial_cost_installation` float(24) NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_installation_user` (`user_id`),
  CONSTRAINT `fk_installation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `installation`
--

LOCK TABLES `installation` WRITE;
INSERT INTO `installation` VALUES ('7f28c5f9-aaaa-4cd6-ac15-d13d71abff80',10,"WSW","Sunpower",45,4000,"Huawei",4444.44,'7f28c5f9-d711-4cd6-ac15-d13d71abff80');
UNLOCK TABLES;

--
-- Table structure for table `consumption`
--

DROP TABLE IF EXISTS `consumption`;
CREATE TABLE `consumption` (
  `id` char(36) NOT NULL,
  `month` varchar(9) NOT NULL,
  `year` int NOT NULL,
  `consumption` float(24) NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_consumption_user` (`user_id`),
  CONSTRAINT `fk_consumption_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_month_year_unique` (`month`, `year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `consumption`
--

LOCK TABLES `consumption` WRITE;
INSERT INTO `consumption` VALUES (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff84',
    "January",
    2018,
    87,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    "January",
    2019,
    103,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff86',
    "January",
    2020,
    85,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff87',
    "February",
    2018,
    335,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff88',
    "February",
    2019,
    281,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff89',
    "February",
    2020,
    161,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff90',
    "March",
    2018,
    292,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff91',
    "March",
    2019,
    284,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff92',
    "March",
    2020,
    403,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff93',
    "April",
    2018,
    477,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff94',
    "April",
    2019,
    479,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff95',
    "April",
    2020,
    592,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff96',
    "May",
    2018,
    603,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff97',
    "May",
    2019,
    618,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff98',
    "May",
    2020,
    662,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff99',
    "June",
    2018,
    586,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff01',
    "June",
    2019,
    548,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff02',
    "June",
    2020,
    508,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff03',
    "July",
    2018,
    635,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff04',
    "July",
    2019,
    551,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff05',
    "July",
    2020,
    541,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff06',
    "August",
    2018,
    475,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff07',
    "August",
    2019,
    507,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff08',
    "August",
    2020,
    478,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff09',
    "September",
    2018,
    445,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff10',
    "September",
    2019,
    370,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff11',
    "September",
    2020,
    392,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff12',
    "October",
    2018,
    338,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff13',
    "October",
    2019,
    228,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff14',
    "October",
    2020,
    206,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff15',
    "November",
    2018,
    184,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff16',
    "November",
    2019,
    169,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff17',
    "November",
    2020,
    154,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  )

  ,

  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff18',
    "December",
    2018,
    97,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff19',
    "December",
    2019,
    64,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  ),
  (
    '7f28c5f9-d711-4cd6-ac15-d13d71abff20',
    "December",
    2020,
    87,
    '7f28c5f9-d711-4cd6-ac15-d13d71abff80'
  );
UNLOCK TABLES;

-- Dump completed on 2021-10-25 12:23:58
