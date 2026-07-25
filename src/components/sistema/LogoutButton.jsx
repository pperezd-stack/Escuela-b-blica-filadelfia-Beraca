import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <button

            className="salir-btn"

            onClick={cerrarSesion}

        >

            <i className="bi bi-box-arrow-right"></i>

            {" "}Cerrar sesión

        </button>

    );

};

export default LogoutButton;