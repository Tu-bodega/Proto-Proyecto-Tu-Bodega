import HeaderL from "./HeaderL.js";
import FormLogin from "../Login/FormLogin.js";
import "../../css/Login.css"


function Login() {
    return (
        <div className="contenedorLogin">
            <HeaderL/>
            <FormLogin/>
        </div>
        
    );
}

export default Login;
