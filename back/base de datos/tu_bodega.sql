-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-03-2024 a las 16:11:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
(1, 'Aurita', 'Niño', '1255789562', 'Aurita@gmail.com', '7226854', 'carrera 72 l Bis #44-55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre_empleado` varchar(45) DEFAULT NULL,
  `apellido_empleado` varchar(45) DEFAULT NULL,
  `password_empleado` varchar(100) DEFAULT NULL,
  `correo_empleado` varchar(80) DEFAULT NULL,
  `rol_empleados_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre_empleado`, `apellido_empleado`, `password_empleado`, `correo_empleado`, `rol_empleados_id`) VALUES
(1, 'jaime', 'mendez', '$2a$08$Pu5Dw.8VwRf/W83dtTegFOIL3zLZIX25eAiaGassHTUJzOgM6aijm', 'jaime@gmail.com', 1),
(2, 'camilo', 'castillo', '$2a$08$tce9vXo3h8gfHAXCGDNTIeIK1r8NnIXpEgQ9jErTRSmEocpO5Z3sG', 'camil-code@gmail.com', 1),
(3, 'Andres', 'Muñoz', '$2a$08$WHlcrj61CY5svqHdmHik1.QZXftO9GrG4f5mC9xRRBrbR/KQ/zOCi', 'andy@gmail.com', 1);

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
  `unidades_medida_id` int(11) DEFAULT NULL,
  `proveedores_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre_producto`, `descripcion_producto`, `precio_compra_producto`, `precio_venta_producto`, `unidades_producto`, `fecha_producto`, `unidades_medida_id`, `proveedores_id`) VALUES
(2, 'POKER', 'CERVEZA', 2500, 3000, 30, '2024-02-27', 1, 1),
(3, 'AGUILA', 'CERVEZA', 2500, 3000, 30, '2024-02-27', 1, 1),
(4, 'TEKATE', 'CERVEZA', 2500, 3000, 30, '2024-02-27', 1, 1),
(5, 'CORONA', 'CERVEZA', 2500, 4000, 30, '2024-02-27', 1, 1),
(6, 'PILSEN', 'CERVEZA', 3000, 4500, 20, '2024-02-27', 1, 1),
(7, 'CLUB COLOMBIA', 'CERVEZA', 3000, 4500, 20, '2024-02-27', 1, 1),
(8, 'Aguardiente', 'bebida alcoholica', 30000, 38450, 10, '2024-02-26', 1, 1);

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
(1, '860005224', 'Bavaria S.A', 'bavaria@dte.paperless.com.co', 'Carrera 53A # 127-35', '(601) 743 12 24'),
(2, '8903018845', 'Colombina S.A', 'nmunoz@colombina.com', 'Carrera 36 # 17 B 54', '	(601) 8773000');

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
(1, 'Administrador');

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
(1, 'Mililitros'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol_empleados`
--
ALTER TABLE `rol_empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
