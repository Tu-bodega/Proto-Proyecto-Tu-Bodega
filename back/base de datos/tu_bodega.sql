-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2024 a las 00:57:23
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
(1, 'Nelson', 'Castillo', '1027545796', 'stic1227@hotmail.com', '3158651478', 'carrera 72 k Bis # 42'),
(2, 'Flor', 'Duque', '69854604', 'exito1224@hotmail.com', '3186634932', 'calle 65G # 20-30'),
(3, 'David', 'Ortega', '4354545424', 'davido@hotmail.com', '3145795121', 'calle 12'),
(5, 'juan Pérez', 'Gómez', '123456789', 'juanperez@gmail.com', '3216549876', 'Calle 123, Ciudad Ficticia'),
(6, 'María Rodríguez', 'López', '987654321', 'maria.rodriguez@hotmail.com', '7894561230', 'Avenida 456, Pueblo Imaginario'),
(7, 'Carlos Sánchez', 'García', '456789123', 'csanchez@yahoo.com', '6543210987', 'Calle Principal, Villa Irreal'),
(8, 'Laura Martínez', 'Díaz', '321987654', 'lauram@gmail.com', '9876543210', 'Carrera 789, Ciudad de Ensueño'),
(9, 'Alejandro Gutiérrez', 'Torres', '654123789', 'alejandro_gtz@gmail.com', '5678901234', 'Callejón de los Sueños, Poblado Feliz'),
(10, 'Sofía Ramírez', 'Vargas', '987321654', 'sofiaram@yahoo.com', '8901234567', 'Avenida de las Estrellas, Villa Encantada'),
(11, 'Manuel López', 'Pérez', '147258369', 'manuel.lopez@hotmail.com', '6789012345', 'Calle Real, Ciudad de la Imaginación'),
(12, 'Daniela González', 'Rodríguez', '369258147', 'dani.gonzalez@gmail.com', '9012345678', 'Avenida del Sol, Pueblo Feliz'),
(13, 'Pedro Vásquez', 'Fernández', '258369147', 'pvasquez@yahoo.com', '3456789012', 'Calle del Recuerdo, Villa Soñada'),
(14, 'Ana Herrera', 'Castro', '369147258', 'anita@gmail.com', '0123456789', 'Carrera 678, Pueblo de Ens');

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
(3, 'David', 'Garcia', '$2a$08$l5THnzWW4QQ/lMJyngLG/.ZnIjuKAoM3kB6.G69LK2.M0D3O5Mmju', 'david@gmail.com', 2),
(4, 'Jaime', 'Mendez', '$2a$08$fbhDg3VJ7yT/9H5QArKKS.oEGhnwdmM21m9rEZf35nh9j3V3FfeN6', 'jaime@gmail.com', 2),
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
(19, 'lisa', 'simpson', '$2a$08$M.DAVz.m/HLPzQR8XNw1ye2BS6SdCWPVwW2NdIUc2qxI.EctIpooq', 'lisa@gmail.com', 2),
(20, 'Kristopher', 'Romero', '$2a$08$J72BxFffqjMioe/2WIfV8OfINLeM5KTknuXQKmRLu30oVnwhD7xCi', 'kr@gmail.com', 2),
(21, 'Adriana', 'Diaz', '$2a$08$CPOTwXE1nG8d9/aUggqC/e3SeZnIGN6mjeCdCULQHRMV.ZE1UO32W', 'ad@gmail.com', 2),
(22, 'Juan Camilo', 'Blanco Diaz', '$2a$08$2VHBFOW85rpLZMVIwFrEBuPTt.3ZKlU5qWIRIUO2alYTN63RaNbXe', 'juan@gmail.com', 2),
(23, 'Santiago', 'Blanco Diaz', '$2a$08$Q4iTjKO5webnPqe6GgJNt.AWmWtgK.myGO23cGkG.u8pSG1yNJSii', 'Santy@gmail.com', 2),
(24, 'Camilo', 'Molina', '$2a$08$91xu293tMoMMZIJNyHSuEOcKzvmmINX.Pc0.trsPCrEqqkDHoQswi', 'moli@gmail.com', 2),
(25, 'Felipe', 'Mondragon', '$2a$08$uar.NKh7dCz3CZahOE37GOUYFV4AZB9R.4MCMTlupGtZ4sCc0A4Sy', 'mon@gmail.com', 2),
(26, 'Ronald', 'Banguero', '$2a$08$xI4mu2czFEqhf6.qivgkDORB60KUI5UuSKC8gOyC3SOCT3RKsovRq', 'ronal@gmail.com', 2),
(27, 'Jorge', 'Parra', '$2a$08$/MFkDtC.kHfUEberpxjW0uDzm.4q2Ls1alXBwptONe.I/HRZrpFb.', 'george@gmail.com', 2),
(28, 'David', 'Galindo', '$2a$08$vqJz5g4RuTP6l6yqfdrQ6eAHToUcv4DnhMLZHXHH5ZvSN6ObKZeWO', 'davidi@gmail.com', 2),
(29, 'Daniel', 'Perez', '$2a$08$7pW5.Wf4Ao3zznxXUCaYTeo4LtQt3cSYRyG9LmF/R6XHzzlwKU/eO', 'dani@gmail.com', 2),
(30, 'Andrés', 'muñoz', '$2a$08$0yl5Ps6OAuWEtsDquJYWfudmoxOOvzxp.uRQnfp0Vem32ZrEFy15K', '91andresmunoz@gmail.com', 1);

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
(1, 'POKER', 'CERVEZA NACIONAL', 2500, 3000, 52, '2024-03-12', 'uploads\\1710343587241-poker.jpeg', 1, 1),
(2, 'TEKATE', 'CERVEZA IMPORTADA', 2000, 3000, 83, '2024-03-12', 'uploads\\1710344763680-tekate.jpeg', 1, 1),
(3, 'AGUARDIENTE NECTAR', 'AGUARDIENTE NACIONAL', 30000, 60000, 77, '2024-03-12', 'uploads\\1710356248291-aguardiente.jpeg', 2, 1),
(4, 'arroz', 'arroz', 3500, 4000, 37, '2024-04-06', 'uploads\\1712432216879-roa.webp', 3, 3),
(5, 'pasta dental', 'pasta colgate', 5000, 6000, 495, '2024-04-06', 'uploads\\1712432542333-OIP.jpeg', 3, 1),
(6, 'Café colombiano', 'Café de alta calidad cultivado en las regiones montañosas de Colombia, conocido por su aroma y sabor', 50000, 70000, 85, '2024-04-06', 'uploads\\1712442743903-producto_6f39714233947cf95835f8b27312da641e39f6531698851853 (1).jpeg', 4, 3),
(7, 'Queso Gourmet', 'Queso tipo manchego, madurado por 6 meses, sabor intenso.', 80000, 120000, 89, '2024-04-06', 'uploads\\1712442818970-queso_manchego_anejo-362x430 (1).jpg', 4, 4),
(8, 'Salsa de Tomate Artesanal', 'Salsa de tomate casera, elaborada con tomates orgánicos y especias naturales.', 20000, 30000, 81, '2024-04-06', 'uploads\\1712442913004-Salsa_de_tomate_550g (1).png', 2, 5),
(9, 'Mermelada de Frutas Tropicales', 'Mermelada artesanal, elaborada con frutas tropicales frescas y azúcar orgánica.', 15000, 25000, 117, '2024-04-06', 'uploads\\1712443017697-Mermelada-Tropical (1).jpg', 3, 6),
(10, 'Snacks de Plátano Maduro', 'Chips de plátano maduro, horneados y sazonados con sal marina.', 10000, 15000, 150, '2024-04-06', 'uploads\\1712443170161-b220150922060909 (1).png', 3, 7),
(11, 'Leche de Coco Orgánica', 'Leche de coco natural, sin aditivos ni conservantes, ideal para recetas veganas.', 25000, 35000, 40, '2024-04-06', 'uploads\\1712443290802-Crema-de-Coco-en-Polvo-Organica-1 (1).jpg', 2, 8),
(12, ' Arepas de Maíz Blanco', 'Arepas de maíz blanco, pre-cocidas y listas para calentar.', 5000, 10000, 190, '2024-04-02', 'uploads\\1712443389285-7708700168831_28 (1).jpg', 3, 9),
(13, 'Miel de Abeja Pura', 'Miel de abeja pura, recolectada en colmenas orgánicas, sin filtrar ni procesar.', 30000, 45000, 287, '2024-04-07', 'uploads\\1712443577450-61a5514f34d8e2dd4183f674-7PMDDB9B-img_product_1 (1).jpg', 1, 10),
(14, 'Ajiaco en Lata', 'Ajiaco tradicional enlatado, listo para calentar y servir.', 12000, 18000, 61, '2024-04-13', 'uploads\\1712443671346-latas-changuas-y-ajiacos-600x600 (1).jpg', 3, 11),
(15, 'Yogurth Natural Orgánico', 'Yogurth natural orgánico, elaborado con leche fresca y cultivos probióticos.', 8000, 12000, 154, '2024-04-10', 'uploads\\1712443771380-81gYP3nJA5L._SL1500_ (1).jpg', 4, 12);

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
(1, '860005224', 'Bavaria S.E', 'bavaria@dte.paperless.com.co', 'Carrera 53A # 127-35', '6017431224'),
(2, '8903018845', 'Colombina S.A', 'nmunoz@colombina.com', 'Carrera 36 # 17 B 54', '6018773000'),
(3, '423432424', 'roa', 'roa@gmail.com', 'calle23424', '714121212'),
(4, '800123456-1', ' Alimentos Naturales S.A.S', 'info@alimentosnaturales.com', 'Carrera 45 # 67-89, Bogotá', '12345678'),
(5, '810987654-2', 'Distribuidora Gastronómica Colombiana S.A.', 'ventas@distribuidoragastronomica.com', 'Calle 23 # 56-78, Medellín', '43456789'),
(6, '820654321-3', 'Proveeduría Alimentaria Andina S.A.S.', 'contacto@proveeduriaandina.com', 'Avenida 10 # 34-56, Cali', '24567890'),
(7, ' 830147258-4', 'Delicias Tropicales Ltda.', 'info@deliciastropicales.com', 'Carrera 12 # 45-67, Barranquilla', '55678901'),
(8, '840369258-5', 'Productos Naturales del Caribe S.A.', 'ventas@productoscaribe.com', 'Calle 78 # 90-12, Cartagena', '56789012'),
(9, '850258369-6', 'Abastecedora de Alimentos del Pacífico S.A.S.', 'contacto@abastecedoraalimentos.com', 'Carrera 56 # 78-90, Buenaventura', '27890123'),
(10, '860369147-7', 'Comestibles La Cordillera S.A.', 'ventas@lacordillera.com', 'Avenida 34 # 56-78, Manizales', '68901234'),
(11, '870654987-8', 'Exportadora de Frutas Tropicales S.A.', 'exportaciones@frutastropicales.com', 'Calle 90 # 12-34, Pereira', '69012345'),
(12, '880789654-9', 'Importadora de Especias Colombianas Ltda.', 'info@especiascolombianas.com', 'Carrera 67 # 89-01, Armenia', '60123456'),
(13, '890456321-0', 'Procesadora de Productos Lácteos Andinos S.A.', 'contacto@productosandinos.com', 'Avenida 56 # 78-90, Tunja', '81234567');

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
-- Estructura de tabla para la tabla `salidas`
--

CREATE TABLE `salidas` (
  `id` int(11) NOT NULL,
  `fecha_salida` date DEFAULT NULL,
  `clientes_id` int(11) DEFAULT NULL,
  `empleados_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `salidas`
--

INSERT INTO `salidas` (`id`, `fecha_salida`, `clientes_id`, `empleados_id`) VALUES
(1, '2024-03-22', 1, 1),
(2, '2024-03-22', 1, 1),
(3, '2024-03-22', 3, 1),
(4, '2024-03-22', 2, 1),
(5, '2024-04-06', 3, 1),
(6, '2024-04-06', 13, 30),
(7, '2024-04-06', 5, 30),
(8, '2024-04-06', 10, 30),
(9, '2024-04-06', 11, 30),
(10, '2024-04-06', 3, 30),
(11, '2024-04-06', 14, 30),
(12, '2024-04-06', 1, 30),
(13, '2024-04-06', 6, 30),
(14, '2024-04-07', 12, 30),
(15, '2024-04-06', 2, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_vs_productos`
--

CREATE TABLE `salida_vs_productos` (
  `salidas_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL,
  `Unidades` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `salida_vs_productos`
--

INSERT INTO `salida_vs_productos` (`salidas_id`, `productos_id`, `Unidades`) VALUES
(1, 1, 10),
(1, 2, 10),
(1, 3, 10),
(2, 1, 1),
(3, 1, 5),
(3, 2, 6),
(3, 3, 11),
(4, 1, 4),
(5, 4, 4),
(6, 13, 6),
(6, 11, 5),
(6, 12, 6),
(6, 7, 2),
(6, 6, 10),
(6, 15, 16),
(7, 6, 2),
(7, 7, 1),
(7, 15, 4),
(7, 12, 3),
(7, 9, 2),
(7, 11, 2),
(7, 13, 2),
(7, 1, 1),
(8, 7, 2),
(8, 1, 3),
(8, 8, 14),
(9, 2, 1),
(9, 14, 18),
(9, 7, 4),
(9, 6, 1),
(10, 1, 24),
(10, 3, 2),
(11, 13, 5),
(11, 5, 4),
(11, 4, 3),
(11, 8, 1),
(11, 12, 1),
(11, 10, 1),
(11, 6, 1),
(12, 11, 4),
(12, 4, 6),
(12, 5, 1),
(13, 11, 19),
(14, 8, 1),
(15, 8, 3),
(15, 9, 1),
(15, 6, 1),
(15, 7, 2),
(15, 15, 1),
(15, 14, 1);

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
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_salida_clientes_idx` (`clientes_id`) USING BTREE,
  ADD KEY `fk_salida_empleados1_idx` (`empleados_id`) USING BTREE;

--
-- Indices de la tabla `salida_vs_productos`
--
ALTER TABLE `salida_vs_productos`
  ADD KEY `fk_salida_has_productos_productos1_idx` (`productos_id`) USING BTREE,
  ADD KEY `fk_salida_has_productos_salidas1_idx` (`salidas_id`) USING BTREE;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rol_empleados`
--
ALTER TABLE `rol_empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_proveedores1` FOREIGN KEY (`proveedores_id`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_productos_unidades_medida1` FOREIGN KEY (`unidades_medida_id`) REFERENCES `unidades_medida` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `fk_salidas_clientes` FOREIGN KEY (`clientes_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_salidas_empleados1` FOREIGN KEY (`empleados_id`) REFERENCES `empleados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salida_vs_productos`
--
ALTER TABLE `salida_vs_productos`
  ADD CONSTRAINT `fk_salida_has_productos_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_salida_has_productos_salidas1` FOREIGN KEY (`salidas_id`) REFERENCES `salidas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
