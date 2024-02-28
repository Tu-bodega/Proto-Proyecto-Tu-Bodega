import "../../css/Plantilla.css";
import "../../css/admi.css"

function Aside() {
    return (
        <aside id="aside">
            <section className="nombreUsuario" >
                <h2 id="user">Administrador</h2>
            </section>
            <section>
                <button className="btn-izq" >
                    Usuarios
                </button>
            </section>
            <section>
                <button className="btn-izq" >
                    Clientes
                </button>
            </section>
            <section>
                <button className="btn-izq" >
                    Proveedores
                </button>
            </section>
            <section>
                <button className="btn-izq" >
                    Productos
                </button>
            </section>
            {/*             <section>
            <button class="btn-izq" onclick="contenedorFormulario('off')">Facturas</button>
            </section>
            <section>
                nit.345534653454-5 
            </section> */}
        </aside>
    )
};

export default Aside;

