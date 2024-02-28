import "../../css/Plantilla.css"
import logoImage from '../../picture/Logo.png';

function HeaderL() {
    return(
        <header>
        <div className="logo">
            <img src={logoImage} alt="Logo-software-tu-bodega" height="40PX" />
        </div>
        <a href="http://localhost:3000/"><h1>📦</h1></a>
    </header>
    )
}
export default HeaderL;
