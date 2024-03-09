import HeaderA from "../Admi/HeaderA.js";
import "../../css/Plantilla.css";
import "../../css/admi.css"
import Productos from "../DavidProductos/productos.js";
import Proveedores from "../JaimeProveedores/proveedores.js";

function Caja() {
    const iconBox = `<i class='bx bx-package'></i> `;
    const iconClose = `<i class='bx bxl-dropbox'></i> `;
    const openForm = (numBtn) => {
        // Mapeo de los números de botón a los IDs de los elementos
        const formDisplayMappings = {
            1: "andresClients",
            2: "jaimeProveedores",
            3: "davidProductos",
        };

        // Esconde todos los formularios
        Object.values(formDisplayMappings).forEach(id => {
            document.getElementById(id).style.display = "none";
            document.getElementById('user').innerHTML = `Caja ${iconBox}`;
        });

        // Si numBtn es 0, simplemente sal de la función para no mostrar ningún formulario
        if (numBtn === 0) {
            return;
        }

        // Muestra solo el formulario correspondiente al botón presionado
        const selectedFormId = formDisplayMappings[numBtn];
        if (selectedFormId) {
            document.getElementById(selectedFormId).style.display = "flex";
            document.getElementById('user').innerHTML = `Caja ${iconClose}`;
        }
    };


    return (
        <div className="containerDad">
            <HeaderA />
            <article className="containerInterfazeAdmi">
                {/* contenedor Aside lado izquierdo */}
                <aside >
                    <section className="nombreUsuario" >
                        <h2 id="user" onClick={() => openForm(0)} >Caja <i className='bx bx-package'></i></h2>
                    </section>
                    <section>
                        <button onClick={() => openForm(1)} className="btn-izq">
                            Clientes
                        </button>
                    </section>
                    <section>
                        <button onClick={() => openForm(2)} className="btn-izq">
                            Proveedores
                        </button>
                    </section>
                    <section>
                        <button onClick={() => openForm(3)} className="btn-izq">
                            Productos
                        </button>
                    </section>
                </aside>
                {/* contenedor Formularios de los botones lado derecho */}
                <section className="containerForms" >
                    {/*a qui cada uno importara la interfaz que le corresponde */}
                    <div id="andresClients" className="boxForm">
                        {/* formulario de andres */}
                    </div>
                    <div id="jaimeProveedores" className="boxForm">
                        <Proveedores/>
                    </div>
                    <div id="davidProductos" className="boxForm">
                        < Productos />
                    </div>
                </section>
            </article>
        </div>
    )
}

export default Caja;