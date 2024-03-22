import "../../css/Salida.css"
import CrearSalida from "./crearSalida";

function Salidas() {
    const abrir = (num) => {
        const mapeoContenedores = {
            1: "createSalida"
        }
        Object.values(mapeoContenedores).forEach(id => {
            document.getElementById(id).style.display = "none";
        });
        const seleccionarId = mapeoContenedores[num];
        if (seleccionarId) {
            document.getElementById(seleccionarId).style.display = "flex"
        }
    };
    return (
        <div className='boxSalida'>
            <nav className='navSalida'>
                <button onClick={() => { abrir(1) }} style={{width:'100%'}}> Agregar Salida</button>
            </nav>
            <section className='moduleSalida'>
                <div id='createSalida' className='salidaCreate'>
                    <CrearSalida />
                </div>
            </section>
        </div>
    );
};
export default Salidas;