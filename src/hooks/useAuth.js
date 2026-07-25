import { useNavigate } from "react-router-dom";

import {

    obtenerUsuario,

    guardarUsuario,

    cerrarSesion

} from "../utils/storage";

const useAuth = () => {

    const navigate = useNavigate();

    const usuario = obtenerUsuario();

    const login = (datosUsuario) => {

        guardarUsuario(datosUsuario);

    };

    const logout = () => {

        cerrarSesion();

        navigate("/");

    };

    return {

        usuario,

        login,

        logout

    };

};

export default useAuth;