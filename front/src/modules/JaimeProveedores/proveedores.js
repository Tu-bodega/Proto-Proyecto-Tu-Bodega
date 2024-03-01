import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Proveedores.css";
import CrearProveedores from './crearProveedores.js';

function Proveedores() {
    const open = (num) => {
        const mapeoContenedor = {
            1: "createProveedores",
            2: "readProveedores"
        }
        Object.values(mapeoContenedor).forEach(id => {
            document.getElementById(id).style.display = "none";

        });
        const selectedFormId = mapeoContenedor[num];
        if (selectedFormId) {
            document.getElementById(selectedFormId).style.display = "flex";
        }
    }
    return (
        <div className='boxProveedores'>
            <nav className='navProveedores'>
                <button onClick={() => { open(1) }} >Agregar Proveedor</button>
                <button onClick={() => { open(2) }} >Lista de Proveedores</button>
            </nav>
            <section className='moduleProveedores'>
                <div id='createProveedores'className='ProveedoresCreate'>
                    <   CrearProveedores/>
                </div>
                <div id='readProveedores'className='ProveedoresRead'>

                </div>
            </section>
        </div>
    );
}

export default Proveedores;