import "../../css/Usuarios.css";
import CrearUsuario from "./crearUsuarios.js";
import ListarUsuarios from "./listaUsuarios.js";

function Usuarios() {
    const abrir = (num)=>{
        const mapeoContenedores = {
            1: "createUser",
            2: "readUser"
        }
        Object.values(mapeoContenedores).forEach(id=>{
            document.getElementById(id).style.display="none";
        });
        const seleccionarId = mapeoContenedores[num];
        if(seleccionarId){
            document.getElementById(seleccionarId).style.display = "flex"
        }
    };
    return(
        <div className='boxUsers'>
            <nav className='navUser'>
                <button onClick={()=>{abrir(1)}}>Agregar Usuario</button>
                <button onClick={()=>{abrir(2)}}>Lista de Usuarios</button>
            </nav>
            <section className='moduleUser'>
                <div id='createUser' className='userCreate'>
                    <CrearUsuario/>
                </div>
                <div id='readUser' className='userRead'>
                    <ListarUsuarios/>
                </div>
            </section>
        </div>
    );
};

export default Usuarios;

