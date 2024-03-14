-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2024 a las 02:13:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

create database tu_bodega;
use tu_bodega;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tu_bodega`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(45) DEFAULT NULL,
  `apellido_cliente` varchar(45) DEFAULT NULL,
  `documento_cliente` varchar(45) DEFAULT NULL,
  `correo_cliente` varchar(80) DEFAULT NULL,
  `telefono_cliente` varchar(45) DEFAULT NULL,
  `direccion_cliente` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre_cliente`, `apellido_cliente`, `documento_cliente`, `correo_cliente`, `telefono_cliente`, `direccion_cliente`) VALUES
(1, 'Aurita', 'Niño', '1255789562', 'Aurita@gmail.com', '7226854', 'carrera 72 l Bis #44-55'),
(2, 'aura', 'niños', '1155789562', 'lurita@gmail.com', '7226852', 'carrera 72 l Bis #44-55'),
(3, 'copo', 'castillo', '1233489852', 'copo@gmail.com', '76585121', 'calle falsa 123'),
(4, 'carla', 'castaño', '1233489855', 'calra@gmail.com', '7110362', 'calle456'),
(5, 'Carlos', 'huran', '587765489', 'carlo@gmail.com', '7605425', 'calle 754'),
(6, 'pedro', 'sanchez', '157654892', 'piedra@gmail.com', '3148526587', 'calle123456'),
(7, 'mariela', 'duque', '7651742451', 'mairela@gmail.com', '6614758', 'calle9000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre_empleado` varchar(45) DEFAULT NULL,
  `apellido_empleado` varchar(45) DEFAULT NULL,
  `password_empleado` varchar(200) DEFAULT NULL,
  `correo_empleado` varchar(80) DEFAULT NULL,
  `rol_empleados_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre_empleado`, `apellido_empleado`, `password_empleado`, `correo_empleado`, `rol_empleados_id`) VALUES
(1, 'Camilo', 'Castillo', '$2a$08$tce9vXo3h8gfHAXCGDNTIeIK1r8NnIXpEgQ9jErTRSmEocpO5Z3sG', 'camil-code@gmail.com', 1),
(2, 'Andres', 'Muños', '$2a$08$UFxG3V1oxa1FdAdlr90pfOkPzo8tAfQCVJMWokk4mqBf3UljhuGC.', 'andy@gmail.com', 2),
(3, 'David', 'Garcia', '$2a$08$etVGOo/GuMX.LvvkuyG.i.phYPfcuALRsD0eamXNPLYL2Efkdcm1m', 'david@gmail.com', 2),
(4, 'Jaime', 'Mendez', '$2a$08$KQ59rkyMz12fdOa86pNjBOT9QJ9F8jmW2Nc3a4tBRIzY1/JQFZqYS', 'jaime@gmail.com', 2),
(6, 'raton', 'perro', '$2a$08$Us7l6lPnf3swwo6ltKQFt.fF5JQxuTWt67dIf0SlFz/ENSviQV.A2', 'perro@gmail.com', 2),
(7, 'marco', 'zuleta', '$2a$08$LyZzmpo4.4hOj/4NZoChF.KlW/bZj.1cDMvFdCwIdHOB9RbfLRnhm', 'mark@gmail.com', 2),
(8, 'raul', 'cespedes', '$2a$08$W7QA0p69uPoPYrZsjUWMk.SvZHdzQ00g92Z86zawRVgFfZY3AwlN6', 'reces@gmail.com', 2),
(9, 'homero', 'simpson', '$2a$08$1.Q/pfXEq5XVJGpY7FKm9Ok9LHu1ezmqI7D8MEfDuN8KIec4xIXda', 'simpo@gmail.com', 2),
(10, 'mario', 'lopez', '$2a$08$wqvXMz15EOPmbiAmWAOfv.v3B1gP/8xY8ATc2sjBRSZl4nAS77mHa', 'mario@gmail.com', 2),
(11, 'susana', 'lopez', '$2a$08$0N0ssiBordOp9IOjQKrJEuQWOOYgwBLpoeG79EgANRinMvqfKoxGG', 'susa@gmail.com', 2),
(12, 'yiyi', 'castro', '$2a$08$gj2a701l3aSCuyQ/clm2EuiSpzxjAtSq.mKVAN5ogGASO9KSAPgQ6', 'yiy@gmail.com', 2),
(13, 'copó', 'castillo', '$2a$08$G6XMTaXdG9HW6nuRcSnVzuCzqFmxUtG/IfQKcjk2HRsJz6fqhxDdO', 'copo@gmail.com', 2),
(14, 'Stanly', 'march', '$2a$08$ulY5Fef5aLd3l5TYMMk8.Ozud/6vf2VFTFmPUsALzvHmPwJ2hwSUe', 'stanley@gmail.con', 2),
(15, 'elza', 'pato', '$2a$08$IR9qnB85Niw5DJdpBizm8eMmVm5cpEMVWYUdjacqBteZqPtRyiGz.', 'elzapato@gmail.com', 2),
(16, 'patricia', 'teran', '$2a$08$UvSHc6i0KtrONwUQEIHpIun6EjTQgY0cRgLTTxGudbXmrv22DAgUi', 'pato@gmail.com', 2),
(17, 'raul', 'mesa', '$2a$08$qyuqyC52nMVjfRCtVoxHwufnQF8sNzMcXTtkz/I.ymHTWLnY4JOnu', 'raul@gmail.com', 2),
(18, 'miriam', 'solano', '$2a$08$S2mR9misdZGHsj8poacz2.G1J.s4Debw532umiWc6BK3bhUOLfYFK', 'mir@gmail.com', 2),
(19, 'lisa', 'simpson', '$2a$08$M.DAVz.m/HLPzQR8XNw1ye2BS6SdCWPVwW2NdIUc2qxI.EctIpooq', 'lisa@gmail.com', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id` int(11) NOT NULL,
  `fecha_factura` date DEFAULT NULL,
  `iva_factura` varchar(45) DEFAULT NULL,
  `clientes_id` int(11) DEFAULT NULL,
  `supermercado_id` int(11) NOT NULL,
  `empleados_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_vs_productos`
--

CREATE TABLE `facturas_vs_productos` (
  `id` int(11) NOT NULL,
  `facturas_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre_producto` varchar(45) DEFAULT NULL,
  `descripcion_producto` varchar(100) DEFAULT NULL,
  `precio_compra_producto` decimal(10,0) DEFAULT NULL,
  `precio_venta_producto` decimal(10,0) DEFAULT NULL,
  `unidades_producto` int(11) DEFAULT NULL,
  `fecha_producto` date DEFAULT NULL,
  `ruta_imagen` varchar(200) NOT NULL,
  `unidades_medida_id` int(11) DEFAULT NULL,
  `proveedores_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre_producto`, `descripcion_producto`, `precio_compra_producto`, `precio_venta_producto`, `unidades_producto`, `fecha_producto`, `ruta_imagen`, `unidades_medida_id`, `proveedores_id`) VALUES
(1, 'POKER', 'CERVEZA NACIONAL', 2500, 3000, 90, '2024-03-12', 'uploads\\1710343587241-poker.jpeg', 1, 1),
(2, 'TEKATE', 'CERVEZA IMPORTADA', 2000, 3000, 60, '2024-03-12', 'uploads\\1710344763680-tekate.jpeg', 1, 1),
(4, 'AGUARDIENTE NECTAR', 'AGUARDIENTE NACIONAL', 30000, 60000, 10, '2024-03-12', 'uploads\\1710356248291-aguardiente.jpeg', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nit_proveedor` varchar(45) DEFAULT NULL,
  `nombre_proveedor` varchar(45) DEFAULT NULL,
  `correo_proveedor` varchar(80) DEFAULT NULL,
  `direccion_proveedor` text DEFAULT NULL,
  `telefono_proveedor` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nit_proveedor`, `nombre_proveedor`, `correo_proveedor`, `direccion_proveedor`, `telefono_proveedor`) VALUES
(1, '860005224', 'Bavaria S.A', 'bavaria@dte.paperless.com.co', 'Carrera 53A # 127-35', '6017431224'),
(2, '8903018845', 'Colombina S.A', 'nmunoz@colombina.com', 'Carrera 36 # 17 B 54', '6018773000'),
(3, '12345678363', 'ponqui', 'ponki@gmail.com', 'carrera 45', '765812');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_empleados`
--

CREATE TABLE `rol_empleados` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rol_empleados`
--

INSERT INTO `rol_empleados` (`id`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Almacenistas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supermercado`
--

CREATE TABLE `supermercado` (
  `id` int(11) NOT NULL,
  `nit_supermercado` varchar(45) DEFAULT NULL,
  `nombre_supermercado` varchar(45) DEFAULT NULL,
  `direccion_supermercado` text DEFAULT NULL,
  `telefono_supermercado` varchar(45) DEFAULT NULL,
  `correo_supermercado` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `supermercado`
--

INSERT INTO `supermercado` (`id`, `nit_supermercado`, `nombre_supermercado`, `direccion_supermercado`, `telefono_supermercado`, `correo_supermercado`) VALUES
(1, '860.051.170-2', 'mini–Bodega S. A', 'carrera72 k bis #42-58', '(601) 5640610', 'tuBodega@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_medida`
--

CREATE TABLE `unidades_medida` (
  `id` int(11) NOT NULL,
  `nombre_unidaded_medida` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `unidades_medida`
--

INSERT INTO `unidades_medida` (`id`, `nombre_unidaded_medida`) VALUES
(1, '(ml)'),
(2, 'Litros'),
(3, 'Gramos'),
(4, 'Kilogramos');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_cliente_UNIQUE` (`correo_empleado`),
  ADD UNIQUE KEY `password_empleado_UNIQUE` (`password_empleado`),
  ADD KEY `fk_empleados_rol_empleados1_idx` (`rol_empleados_id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_facturas_clientes_idx` (`clientes_id`),
  ADD KEY `fk_facturas_supermercado1_idx` (`supermercado_id`),
  ADD KEY `fk_facturas_empleados1_idx` (`empleados_id`);

--
-- Indices de la tabla `facturas_vs_productos`
--
ALTER TABLE `facturas_vs_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_facturas_has_productos_productos1_idx` (`productos_id`),
  ADD KEY `fk_facturas_has_productos_facturas1_idx` (`facturas_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos_unidades_medida1_idx` (`unidades_medida_id`),
  ADD KEY `fk_productos_proveedores1_idx` (`proveedores_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol_empleados`
--
ALTER TABLE `rol_empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `supermercado`
--
ALTER TABLE `supermercado`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_cliente_UNIQUE` (`correo_supermercado`);

--
-- Indices de la tabla `unidades_medida`
--
ALTER TABLE `unidades_medida`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas_vs_productos`
--
ALTER TABLE `facturas_vs_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rol_empleados`
--
ALTER TABLE `rol_empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `supermercado`
--
ALTER TABLE `supermercado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `unidades_medida`
--
ALTER TABLE `unidades_medida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_empleados_rol_empleados1` FOREIGN KEY (`rol_empleados_id`) REFERENCES `rol_empleados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `fk_facturas_clientes` FOREIGN KEY (`clientes_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_empleados1` FOREIGN KEY (`empleados_id`) REFERENCES `empleados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_supermercado1` FOREIGN KEY (`supermercado_id`) REFERENCES `supermercado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturas_vs_productos`
--
ALTER TABLE `facturas_vs_productos`
  ADD CONSTRAINT `fk_facturas_has_productos_facturas1` FOREIGN KEY (`facturas_id`) REFERENCES `facturas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_has_productos_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_proveedores1` FOREIGN KEY (`proveedores_id`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_productos_unidades_medida1` FOREIGN KEY (`unidades_medida_id`) REFERENCES `unidades_medida` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
