-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tu_bodega
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tu_bodega
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tu_bodega` DEFAULT CHARACTER SET utf8 ;
USE `tu_bodega` ;

-- -----------------------------------------------------
-- Table `tu_bodega`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_cliente` VARCHAR(45) NULL,
  `apellido_cliente` VARCHAR(45) NULL,
  `documento_cliente` VARCHAR(45) NULL,
  `correo_cliente` VARCHAR(80) NULL,
  `telefono_cliente` VARCHAR(45) NULL,
  `direccion_cliente` TEXT(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`rol_empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`rol_empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_empleado` VARCHAR(45) NULL,
  `apellido_empleado` VARCHAR(45) NULL,
  `password_empleado` VARCHAR(45) NULL,
  `correo_empleado` VARCHAR(80) NULL,
  `rol_empleados_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_cliente_UNIQUE` (`correo_empleado` ASC) ,
  INDEX `fk_empleados_rol_empleados1_idx` (`rol_empleados_id` ASC) ,
  UNIQUE INDEX `password_empleado_UNIQUE` (`password_empleado` ASC) ,
  CONSTRAINT `fk_empleados_rol_empleados1`
    FOREIGN KEY (`rol_empleados_id`)
    REFERENCES `tu_bodega`.`rol_empleados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nit_proveedor` VARCHAR(45) NULL,
  `nombre_proveedor` VARCHAR(45) NULL,
  `correo_proveedor` VARCHAR(80) NULL,
  `direccion_proveedor` TEXT(200) NULL,
  `telefono_proveedor` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`supermercado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`supermercado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nit_supermercado` VARCHAR(45) NULL,
  `nombre_supermercado` VARCHAR(45) NULL,
  `direccion_supermercado` TEXT(200) NULL,
  `telefono_supermercado` VARCHAR(45) NULL,
  `correo_supermercado` VARCHAR(80) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_cliente_UNIQUE` (`correo_supermercado` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`unidades_medida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`unidades_medida` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_unidaded_medida` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(45) NULL,
  `descripcion_producto` VARCHAR(100) NULL,
  `precio_compra_producto` DECIMAL(10,0) NULL,
  `precio_venta_producto` DECIMAL(10,0) NULL,
  `unidades_producto` INT(11) NULL,
  `fecha_producto` DATE NULL,
  `unidades_medida_id` INT NULL,
  `proveedores_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_productos_unidades_medida1_idx` (`unidades_medida_id` ASC) ,
  INDEX `fk_productos_proveedores1_idx` (`proveedores_id` ASC) ,
  CONSTRAINT `fk_productos_unidades_medida1`
    FOREIGN KEY (`unidades_medida_id`)
    REFERENCES `tu_bodega`.`unidades_medida` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_proveedores1`
    FOREIGN KEY (`proveedores_id`)
    REFERENCES `tu_bodega`.`proveedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`facturas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_factura` DATE NULL,
  `iva_factura` VARCHAR(45) NULL,
  `clientes_id` INT NULL,
  `supermercado_id` INT NOT NULL,
  `empleados_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_facturas_clientes_idx` (`clientes_id` ASC) ,
  INDEX `fk_facturas_supermercado1_idx` (`supermercado_id` ASC) ,
  INDEX `fk_facturas_empleados1_idx` (`empleados_id` ASC) ,
  CONSTRAINT `fk_facturas_clientes`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `tu_bodega`.`clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturas_supermercado1`
    FOREIGN KEY (`supermercado_id`)
    REFERENCES `tu_bodega`.`supermercado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturas_empleados1`
    FOREIGN KEY (`empleados_id`)
    REFERENCES `tu_bodega`.`empleados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_bodega`.`facturas_vs_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_bodega`.`facturas_vs_productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `facturas_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  INDEX `fk_facturas_has_productos_productos1_idx` (`productos_id` ASC) ,
  INDEX `fk_facturas_has_productos_facturas1_idx` (`facturas_id` ASC) ,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_facturas_has_productos_facturas1`
    FOREIGN KEY (`facturas_id`)
    REFERENCES `tu_bodega`.`facturas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_facturas_has_productos_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `tu_bodega`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



