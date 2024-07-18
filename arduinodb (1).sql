-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 06:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arduinodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `arduino`
--

CREATE TABLE `arduino` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `plant_id_1` int(11) DEFAULT NULL,
  `plant_id_2` int(11) DEFAULT NULL,
  `plant_id_3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `arduino`
--

INSERT INTO `arduino` (`id`, `device_id`, `plant_id_1`, `plant_id_2`, `plant_id_3`) VALUES
(1, 1, 1, 2, 3),
(2, 2, 4, 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `environmental_data`
--

CREATE TABLE `environmental_data` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `uv_radiation` int(11) DEFAULT NULL,
  `uv_radiation_max` int(11) DEFAULT NULL,
  `uv_radiation_min` int(11) DEFAULT NULL,
  `light` int(11) DEFAULT NULL,
  `light_max` int(11) DEFAULT NULL,
  `light_min` int(11) DEFAULT NULL,
  `air_temperature` float DEFAULT NULL,
  `air_temperature_max` float DEFAULT NULL,
  `air_temperature_min` float DEFAULT NULL,
  `air_humidity` int(11) DEFAULT NULL,
  `air_humidity_max` int(11) DEFAULT NULL,
  `air_humidity_min` int(11) DEFAULT NULL,
  `soil_humidity` int(11) DEFAULT NULL,
  `soil_humidity_max` int(11) DEFAULT NULL,
  `soil_humidity_min` int(11) DEFAULT NULL,
  `measurement_date` datetime DEFAULT NULL,
  `measurement_date_max` datetime DEFAULT NULL,
  `measurement_date_min` datetime DEFAULT NULL,
  `plant_ID` int(11) DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `environmental_data`
--

INSERT INTO `environmental_data` (`id`, `device_id`, `uv_radiation`, `uv_radiation_max`, `uv_radiation_min`, `light`, `light_max`, `light_min`, `air_temperature`, `air_temperature_max`, `air_temperature_min`, `air_humidity`, `air_humidity_max`, `air_humidity_min`, `soil_humidity`, `soil_humidity_max`, `soil_humidity_min`, `measurement_date`, `measurement_date_max`, `measurement_date_min`, `plant_ID`, `cnt`) VALUES
(1, 1, 300, 320, 280, 1500, 1600, 1400, 25.5, 27, 24, 60, 65, 55, 30, 35, 25, '2024-07-18 10:00:00', '2024-07-18 12:00:00', '2024-07-18 08:00:00', 1, 1),
(2, 2, 280, 300, 260, 1400, 1500, 1300, 24.5, 26, 23, 55, 60, 50, 28, 33, 23, '2024-07-18 11:00:00', '2024-07-18 13:00:00', '2024-07-18 09:00:00', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `environmental_data_avg`
--

CREATE TABLE `environmental_data_avg` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `uv_radiation` int(11) DEFAULT NULL,
  `light` int(11) DEFAULT NULL,
  `air_temperature` float DEFAULT NULL,
  `air_humidity` int(11) DEFAULT NULL,
  `soil_humidity` int(11) DEFAULT NULL,
  `measurement_date` datetime DEFAULT NULL,
  `plant_ID` int(11) DEFAULT NULL,
  `uv_radiation_max` int(11) DEFAULT NULL,
  `uv_radiation_min` int(11) DEFAULT NULL,
  `light_max` int(11) DEFAULT NULL,
  `light_min` int(11) DEFAULT NULL,
  `air_temperature_max` float DEFAULT NULL,
  `air_temperature_min` float DEFAULT NULL,
  `air_humidity_max` int(11) DEFAULT NULL,
  `air_humidity_min` int(11) DEFAULT NULL,
  `soil_humidity_max` int(11) DEFAULT NULL,
  `soil_humidity_min` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `environmental_data_avg`
--

INSERT INTO `environmental_data_avg` (`id`, `device_id`, `uv_radiation`, `light`, `air_temperature`, `air_humidity`, `soil_humidity`, `measurement_date`, `plant_ID`, `uv_radiation_max`, `uv_radiation_min`, `light_max`, `light_min`, `air_temperature_max`, `air_temperature_min`, `air_humidity_max`, `air_humidity_min`, `soil_humidity_max`, `soil_humidity_min`) VALUES
(1, 1, 300, 1500, 25.5, 60, 30, '2024-07-18 10:00:00', 1, 320, 280, 1600, 1400, 27, 24, 65, 55, 35, 25),
(2, 2, 280, 1400, 24.5, 55, 28, '2024-07-18 11:00:00', 2, 300, 260, 1500, 1300, 26, 23, 60, 50, 33, 23);

-- --------------------------------------------------------

--
-- Table structure for table `global_param`
--

CREATE TABLE `global_param` (
  `id` int(11) NOT NULL,
  `intelval_in` int(11) DEFAULT NULL,
  `intelval_log` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_param`
--

INSERT INTO `global_param` (`id`, `intelval_in`, `intelval_log`) VALUES
(1, 10, '00:05:00'),
(2, 15, '00:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `lastupdate`
--

CREATE TABLE `lastupdate` (
  `id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `LastUpdate` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastupdate`
--

INSERT INTO `lastupdate` (`id`, `device_id`, `LastUpdate`) VALUES
(1, 1, '10:00:00'),
(2, 2, '11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `plant`
--

CREATE TABLE `plant` (
  `id` int(11) NOT NULL,
  `row` int(11) DEFAULT NULL,
  `col` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plant`
--

INSERT INTO `plant` (`id`, `row`, `col`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arduino`
--
ALTER TABLE `arduino`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `environmental_data`
--
ALTER TABLE `environmental_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`);

--
-- Indexes for table `environmental_data_avg`
--
ALTER TABLE `environmental_data_avg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `global_param`
--
ALTER TABLE `global_param`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plant`
--
ALTER TABLE `plant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arduino`
--
ALTER TABLE `arduino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `environmental_data`
--
ALTER TABLE `environmental_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `environmental_data_avg`
--
ALTER TABLE `environmental_data_avg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `global_param`
--
ALTER TABLE `global_param`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plant`
--
ALTER TABLE `plant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
