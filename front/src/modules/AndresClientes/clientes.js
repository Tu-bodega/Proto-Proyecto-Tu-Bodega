import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Clientes.css";
import CrearCliente from './crearCliente';
import ListaClientes from './listaClientes.js';


function Clientes() {
    const open = (num) => {
        const mapeoContenedor = {
            1: "createClientes",
            2: "readClientes"
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
        <div className='boxClientes'>
            <nav className='navClientes'>
                <button onClick={() => { open(1) }} >Agregar Cliente</button>
                <button onClick={() => { open(2) }} >Lista de Clientes</button>
            </nav>
            <section className='moduleClientes'>
                <div id='createClientes' className='clientesCreate'>
                    <CrearCliente />
                </div>
                <div id='readClientes' className='clientesRead'>
                    <ListaClientes />
                </div>
            </section>
        </div>
    );
}

export default Clientes;