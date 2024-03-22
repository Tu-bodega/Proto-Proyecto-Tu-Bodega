import "../../css/Plantilla.css";
import logoImage from '../../picture/Logo.png';
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function HeaderA() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const salir = () => {
        logout(); // Cambia el estado a autenticado
        navigate('/'); // Redirecciona al usuario a la ruta de administrador
    }
    return (
        <header>
            <div className="logo">
                <img src={logoImage} alt="Logo-software-tu-bodega" height="40PX" />
            </div>
            <h1 className="tipoUsuario">{`Hola ${usuario}`} 🤖</h1>
            <div>
                <h1 className="btn-salida" onClick={salir}>
                    <i className="bx bx-exit" />
                </h1>
            </div>
        </header>
    )
}


export default HeaderA;