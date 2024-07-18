-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2024 at 06:24 PM
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
(1, 101, 1, 2, 3),
(2, 102, 1, 2, 3),
(3, 103, 7, 8, 9);

-- --------------------------------------------------------

--
-- Table structure for table `environmental_data`
--

CREATE TABLE `environmental_data` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `uv_radiation` smallint(6) DEFAULT NULL,
  `light` smallint(6) DEFAULT NULL,
  `air_temperature` float DEFAULT NULL,
  `air_humidity` tinyint(4) DEFAULT NULL,
  `soil_humidity` smallint(6) DEFAULT NULL,
  `measurement_date` datetime DEFAULT NULL,
  `plant_ID` int(11) DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `environmental_data`
--

INSERT INTO `environmental_data` (`id`, `device_id`, `uv_radiation`, `light`, `air_temperature`, `air_humidity`, `soil_humidity`, `measurement_date`, `plant_ID`, `cnt`) VALUES
(1, 1, 5, 300, 22.5, 55, 120, '2024-07-01 12:00:00', 1, 1),
(2, 2, 6, 320, 24, 60, 130, '2024-07-01 12:30:00', 2, 2),
(3, 3, 4, 280, 23.5, 50, 110, '2024-07-01 13:00:00', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `environmental_data_avg`
--

CREATE TABLE `environmental_data_avg` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `uv_radiation` smallint(6) DEFAULT NULL,
  `light` smallint(6) DEFAULT NULL,
  `air_temperature` float DEFAULT NULL,
  `air_humidity` tinyint(4) DEFAULT NULL,
  `soil_humidity` smallint(6) DEFAULT NULL,
  `measurement_date` datetime DEFAULT NULL,
  `plant_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `environmental_data_avg`
--

INSERT INTO `environmental_data_avg` (`id`, `device_id`, `uv_radiation`, `light`, `air_temperature`, `air_humidity`, `soil_humidity`, `measurement_date`, `plant_ID`) VALUES
(1, 1, 5, 300, 22.5, 55, 120, '2024-07-01 12:00:00', 1),
(2, 2, 6, 320, 24, 60, 130, '2024-07-01 12:30:00', 2),
(3, 3, 4, 280, 23.5, 50, 110, '2024-07-01 13:00:00', 3);

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
(1, 10, '00:10:00'),
(2, 20, '00:20:00'),
(3, 30, '00:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `lastupdate`
--

CREATE TABLE `lastupdate` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `LastUpdate` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastupdate`
--

INSERT INTO `lastupdate` (`id`, `device_id`, `LastUpdate`) VALUES
(1, 1, '12:00:00'),
(2, 2, '12:30:00'),
(3, 3, '13:00:00');

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
(3, 2, 1),
(4, 2, 2);

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
-- Indexes for table `lastupdate`
--
ALTER TABLE `lastupdate`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `environmental_data`
--
ALTER TABLE `environmental_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `environmental_data_avg`
--
ALTER TABLE `environmental_data_avg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `global_param`
--
ALTER TABLE `global_param`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lastupdate`
--
ALTER TABLE `lastupdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `plant`
--
ALTER TABLE `plant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
