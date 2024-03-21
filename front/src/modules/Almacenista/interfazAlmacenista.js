import HeaderA from "../Admi/HeaderA.js";
import "../../css/Plantilla.css";
import "../../css/admi.css"
import Productos from "../DavidProductos/productos.js";
import Proveedores from "../JaimeProveedores/proveedores.js";
import Clientes from "../AndresClientes/clientes.js";
import Salidas from "../Salida/Cards.js";

function Almacenista() {
    const iconBox = `<i class='bx bx-package'></i> `;
    const iconClose = `<i class='bx bxl-dropbox'></i> `;


    const openForm = (numBtn) => {
        const formDisplayMappings = {
            1: { formId: "Clientes", btnClass: "btn-clientes" },
            2: { formId: "jaimeProveedores", btnClass: "btn-proveedores" },
            3: { formId: "davidProductos", btnClass: "btn-productos" },
            4: { formId: "salida", btnClass: "btn-salida" },
        };

        // Esconde todos los formularios y quita el estilo activo de todos los botones
        Object.values(formDisplayMappings).forEach(({ formId, btnClass }) => {
            document.getElementById(formId).style.display = "none";
            document.querySelectorAll(`.btn-izq`).forEach(btn => btn.classList.remove('btn-activo'));
        });

        document.getElementById('user').innerHTML = `Almacenista ${iconBox}`;

        if (numBtn === 0) {
            return;
        }

        const { formId, btnClass } = formDisplayMappings[numBtn];
        if (formId) {
            document.getElementById(formId).style.display = "flex";
            document.getElementById('user').innerHTML = `Almacenista ${iconClose}`;
            // Aplica el estilo activo al botón presionado
            document.querySelector(`.${btnClass}`).classList.add('btn-activo');
        }
    };


    return (
        <div className="containerDad">
            <HeaderA />
            <article className="containerInterfazeAdmi">
                {/* contenedor Aside lado izquierdo */}
                <aside >
                    <section className="nombreUsuario" >
                        <h2 id="user" onClick={() => openForm(0)} >Almacenista <i className='bx bx-package'></i></h2>
                    </section>
                    <section>
                        <button onClick={() => openForm(1)} className="btn-izq btn-clientes">
                            Clientes
                        </button>
                    </section>
                    <section>
                        <button onClick={() => openForm(2)} className="btn-izq btn-proveedores">
                            Proveedores
                        </button>
                    </section>
                    <section>
                        <button onClick={() => openForm(3)} className="btn-izq btn-productos">
                            Productos
                        </button>
                    </section>
                    <section>
                        <button onClick={() => openForm(4)} className="btn-izq btn-productos">
                            Salida
                        </button>
                    </section>
                </aside>
                {/* contenedor Formularios de los botones lado derecho */}
                <section className="containerForms" >
                    {/*a qui cada uno importara la interfaz que le corresponde */}
                    <div id="Clientes" className="boxForm">
                        <Clientes />
                    </div>
                    <div id="jaimeProveedores" className="boxForm">
                        <Proveedores />
                    </div>
                    <div id="davidProductos" className="boxForm">
                        < Productos />
                    </div>
                    <div id="salida" className="boxForm">
                        <Salidas />
                    </div>
                </section>
            </article>
        </div>
    )
}

export default Almacenista;