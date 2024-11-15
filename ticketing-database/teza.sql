-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: mart. 27, 2024 la 12:54 AM
-- Versiune server: 10.4.27-MariaDB
-- Versiune PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `teza`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'Incident'),
(2, 'Idee');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `department`
--

CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `departmentName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `department`
--

INSERT INTO `department` (`departmentId`, `departmentName`) VALUES
(1, 'MAI'),
(2, 'Primaria');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `group`
--

CREATE TABLE `group` (
  `groupId` int(11) NOT NULL,
  `groupName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `group`
--

INSERT INTO `group` (`groupId`, `groupName`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `subcategory`
--

CREATE TABLE `subcategory` (
  `subCategoryId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `subCategoryName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Eliminarea datelor din tabel `subcategory`
--

INSERT INTO `subcategory` (`subCategoryId`, `categoryId`, `subCategoryName`) VALUES
(1, 1, 'Internet|Spam|etc.');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `supportmember`
--

CREATE TABLE `supportmember` (
  `supportMemberId` int(11) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `supportMemberEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `ticket`
--

CREATE TABLE `ticket` (
  `ticketId` int(11) NOT NULL,
  `assignmentGroup` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `subcategory` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `ticketNumber` varchar(255) DEFAULT NULL,
  `shortDescription` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `anonym` tinyint(1) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `attachment` blob DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `supportMemberId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `IDNP` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexuri pentru tabele `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentId`);

--
-- Indexuri pentru tabele `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexuri pentru tabele `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subCategoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexuri pentru tabele `supportmember`
--
ALTER TABLE `supportmember`
  ADD PRIMARY KEY (`supportMemberId`),
  ADD KEY `groupId` (`groupId`);

--
-- Indexuri pentru tabele `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticketId`),
  ADD KEY `assignmentGroup` (`assignmentGroup`),
  ADD KEY `category` (`category`),
  ADD KEY `subcategory` (`subcategory`),
  ADD KEY `userId` (`userId`),
  ADD KEY `department` (`department`);

--
-- Indexuri pentru tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pentru tabele `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pentru tabele `group`
--
ALTER TABLE `group`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pentru tabele `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pentru tabele `supportmember`
--
ALTER TABLE `supportmember`
  MODIFY `supportMemberId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pentru tabele `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticketId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pentru tabele `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- Constrângeri pentru tabele `supportmember`
--
ALTER TABLE `supportmember`
  ADD CONSTRAINT `supportmember_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `group` (`groupId`);

--
-- Constrângeri pentru tabele `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`assignmentGroup`) REFERENCES `group` (`groupId`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`subcategory`) REFERENCES `subcategory` (`subCategoryId`),
  ADD CONSTRAINT `ticket_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
