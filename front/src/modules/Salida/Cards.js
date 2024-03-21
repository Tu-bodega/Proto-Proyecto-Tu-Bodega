import "../../css/Salida.css"
import CrearSalida from "./crearSalida";

function Salidas() {
    const abrir = (num) => {
        const mapeoContenedores = {
            1: "createSalida",
            2: "readSalida"
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
                <button onClick={() => { abrir(1) }}> Agregar Salida</button>
                <button onClick={() => { abrir(2) }}>Registros de Salidas</button>
            </nav>
            <section className='moduleSalida'>
                <div id='createSalida' className='salidaCreate'>
                    <CrearSalida />
                </div>
                <div id='readSalida' className='salidaRead'>

                </div>
            </section>
        </div>
    );
};
export default Salidas;