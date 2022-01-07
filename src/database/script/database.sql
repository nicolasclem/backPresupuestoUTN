-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heroku_81ed85f7daec5c0
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heroku_81ed85f7daec5c0
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_81ed85f7daec5c0` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `heroku_81ed85f7daec5c0` ;

-- -----------------------------------------------------
-- Table `Alkemy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_81ed85f7daec5c0`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_81ed85f7daec5c0`.`types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_81ed85f7daec5c0`.`types` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_81ed85f7daec5c0`.`operations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_81ed85f7daec5c0`.`operations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `amount` INT NOT NULL,
  `date` DATE NOT NULL,
  `id_type` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`id_user` ASC) ,
  INDEX `id_type_idx` (`id_type` ASC),
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `heroku_81ed85f7daec5c0`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_type`
    FOREIGN KEY (`id_type`)
    REFERENCES `heroku_81ed85f7daec5c0`.`types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
