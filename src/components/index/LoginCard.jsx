import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../../services/authService";

const LoginCard = () => {
    const navigate = useNavigate();

    // 1. Cambiamos 'correo' por 'nombre'
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rol, setRol] = useState("PROFESOR");

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 2. Enviamos el 'nombre' al servicio de autenticación
            const usuario = await login(nombre, password, rol);

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            switch (usuario.rol.toUpperCase()) {
                case "PROFESOR":
                    navigate("/sistema");
                    break;
                case "ESTUDIANTE":
                    navigate("/estudiante");
                    break;
                case "ADMIN":
                    navigate("/sistema");
                    break;
                default:
                    navigate("/");
            }
        } catch {
            setError(
                "Nombre o contraseña incorrectos."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-selector">
            <h5>Iniciar Sesión</h5>

            {/* Selección de rol */}
            <div className="role-tabs">
                <button
                    type="button"
                    className={
                        rol === "PROFESOR"
                            ? "role-tab active"
                            : "role-tab"
                    }
                    onClick={() => setRol("PROFESOR")}
                >
                    Profesor
                </button>

                <button
                    type="button"
                    className={
                        rol === "ESTUDIANTE"
                            ? "role-tab active"
                            : "role-tab"
                    }
                    onClick={() => setRol("ESTUDIANTE")}
                >
                    Estudiante
                </button>
            </div>

            <form
                className="login-form-inner visible"
                onSubmit={iniciarSesion}
            >
                {/* Campo Nombre en lugar de Correo electrónico */}
                <div className="field-group">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="field-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <button
                    className="btn-ingresar"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>

            <div className="login-link">
                ¿No tienes cuenta?
                <br />
                <Link to="/login">
                    Regístrate aquí
                </Link>
            </div>
        </div>
    );
};

export default LoginCard;