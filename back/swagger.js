import swaggerJSDOC from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// configuraciones
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API🌐 software Tu Bodega📦",
            version: "1.0.0",
            description: `Bienvenidos a nuestra plataforma de gestión empresarial, diseñada para optimizar la administración de su negocio.
                Con un enfoque en la gestión de empleados, productos, proveedores y clientes, nuestra solución ofrece una experiencia de gestión eficiente y segura.
                Priorizamos la claridad, la usabilidad y la escalabilidad desde el inicio, incorporando activamente el feedback de nuestra comunidad para mejorar constantemente.
                Funcionalidades destacadas🧑🏼‍💻:

                - Gestión de Empleados: Con encriptación de contraseñas para seguridad.
                - Control de Productos: Gestiona tu inventario fácilmente.
                - Administración de Proveedores y Clientes: Mantén registros actualizados con operaciones sencillas.

                Nuestra plataforma es fruto de un esfuerzo colaborativo, invitando a todos a contribuir a su evolución. Para más información y cómo involucrarte,
                explora nuestro repositorio y documentación.

                Enlaces de interés:`,


                contact: {
                    name: "Equipo Tu Bodega",
                    url: "https://github.com/Camil-Coder",
                    email: "camil-code@gmail.com",
                },
        },

        servers: [
            {
                url: "http://localhost:3001",
                description: "documentacion de mi API Tu bodega 📦",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Asume que tus rutas están en la carpeta 'routes' dentro de 'src'
};

const swaggerSpec = swaggerJSDOC(options);
const swaggerJSDOCs = (app, port) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `version 1 de la documentacion en http://localhost:${port}/api-docs`
    );
};


export default swaggerJSDOCs;