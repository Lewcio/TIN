CREATE SCHEMA IF NOT EXISTS `tin-f1`;

CREATE TABLE IF NOT EXISTS `tin-f1`.`Track` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(50) NOT NULL,
    `length` DECIMAL(4, 3) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `track_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-f1`.`Team` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `nationality` VARCHAR(50) NOT NULL,
    `dateOfCreate` DATE NOT NULL,
    `colors` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `team_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-f1`.`Driver` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `dateOfBirth` DATE NOT NULL,
    `nationality` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `driver_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-f1`.`Contract` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `dateFrom` DATE NOT NULL,
    `dateTo` DATE NULL,
    `driver_id` INT UNSIGNED NOT NULL,
    `team_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `contract_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `tin-f1`.`Driver` (`_id`),
    CONSTRAINT `team_fk` FOREIGN KEY (`team_id`) REFERENCES `tin-f1`.`Team` (`_id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-f1`.`Race` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `date` DATE NOT NULL,
    `laps` INT NOT NULL,
    `track_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `race_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `track_id` FOREIGN KEY (`track_id`) REFERENCES `tin-f1`.`Track` (`_id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tin-f1`.`User` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `user_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-f1`.`Track` (`_id`, `location`, `length`) VALUES
    (1, 'Circuit de Spa-Francorchamps', 7.004),
    (2, 'Hungaroring', 4.381),
    (3, 'Autódromo Internacional Nelson Piquet', 5.031)
;

INSERT IGNORE INTO `tin-f1`.`Team` (`_id`, `name`, `nationality`, `dateOfCreate`, `colors`) VALUES
    (1, 'Scuderia Ferrari', 'Włochy', '1929-01-01', 'czerwony'),
    (2, 'McLaren', 'Anglia', '1966-01-01', 'pomarańczowy'),
    (3, 'Mercedes', 'Anglia', '1954-01-01', 'srebrny')
;

INSERT IGNORE INTO `tin-f1`.`Driver` (`_id`, `firstName`, `lastName`, `dateOfBirth`, `nationality`) VALUES
    (1, 'Charles', 'Leclerc', '1997-10-16', 'Monaco'),
    (2, 'Daniel', 'Ricciardo', '1989-07-01', 'Australia'),
    (3, 'Lewis', 'Hamilton', '1985-01-07', 'Anglia')
;

INSERT IGNORE INTO `tin-f1`.`Race` (`_id`, `name`, `date`, `laps`, `track_id`) VALUES
    (1, 'Grand Prix Belgii', '2021-08-29', 44, 1),
    (2, 'Grand Prix Węgier', '2021-07-25', 70, 2),
    (3, 'Grand Prix von Mexiko', '2021-10-31', 71, 3)
;

INSERT IGNORE INTO `tin-f1`.`Contract` (`_id`, `driver_id`, `team_id`, `dateFrom`, `dateTo`) VALUES
    (1, 1, 1, '2019-01-01', '2024-12-31'),
    (2, 2, 2, '2021-01-01', '2023-12-31'),
    (3, 3, 2, '2017-01-01', '2012-12-31'),
    (4, 3, 3, '2013-01-01', null)
;

INSERT IGNORE INTO `tin-f1`.`User` (`_id`, `login`, `password`) VALUES
    (1, 'admin', '$2a$08$vswIVEV4TPoXzlA8mtnh8uSxV7nG8Bi36fZ2eEcOm5mw2snIqnM9y')
;