import "../../css/Salida.css"
import CrearSalida from "./crearSalida";

function Salidas() {

    return (
        <div className='boxSalida'>
            <section className='moduleSalida'>
                <div id='createSalida' className='salidaCreate'>
                    <CrearSalida />
                </div>
            </section>
        </div>
    );
};
export default Salidas;