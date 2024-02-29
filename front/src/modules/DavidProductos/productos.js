import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Productos.css"
import CrearProductos from './crearProductos.js';


function Productos() {
    const open = (num) => {
        const mapeoContenedor = {
            1: "createProduct",
            2: "readProduct"
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
        <div className='boxProduct'>
            <nav className='navProduct'>
                <button onClick={() => { open(1) }} >Agregar Productos</button>
                <button onClick={() => { open(2) }} >Lista de Productos</button>
            </nav>
            <section className='moduleProduct'>
                <div id='createProduct'className='productCreate'>
                    <CrearProductos />
                </div>
                <div id='readProduct' className='productRead'>
                    
                </div>
            </section>
        </div>
    );
}

export default Productos;