import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { login } from "../../services/authService";

export default function LoginProfesor({ cambiarVista }) {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const usuario = await login(
                nombre,
                password
            );

            if (usuario.rol.toUpperCase() !== "PROFESOR") {
                setError(
                    "Esta cuenta no pertenece a un profesor."
                );
                return;
            }

            // 1. Guardamos la información completa del usuario
            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            // 2. ⚡ OPCCIÓN B: Extraemos y guardamos el moduloId en localStorage
            // Revisa si en tu backend viene como moduloId, modulo_id o idModulo
            const idModulo = usuario.moduloId ?? usuario.modulo_id ?? usuario.idModulo;
            
            if (idModulo) {
                localStorage.setItem("moduloId", idModulo.toString());
            }

            navigate("/sistema");
        } catch {
            setError(
                "Nombre completo o contraseña incorrectos."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-form-heading">
                <span>Acceso Docente</span>
                <h2>
                    Bienvenido, <strong>Profesor</strong>
                </h2>
            </div>

            <form
                className="login-form-container"
                onSubmit={iniciarSesion}
            >
                <div className="login-field-group">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingrese su nombre completo"
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="login-field-group">
                    <label>Contraseña</label>
                    <div className="login-password-group">
                        <input
                            type={
                                mostrarPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese su contraseña"
                            required
                        />

                        <button
                            type="button"
                            className="login-password-toggle"
                            onClick={() =>
                                setMostrarPassword(!mostrarPassword)
                            }
                        >
                            {
                                mostrarPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>
                    </div>
                </div>

                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }

                <button
                    className="login-submit-button"
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Ingresando..."
                            : "Ingresar"
                    }
                </button>
            </form>

            <div className="login-form-footer">
                ¿No tienes cuenta?
                <button
                    type="button"
                    className="login-link-button"
                    onClick={cambiarVista}
                >
                    Regístrate aquí
                </button>
            </div>
        </>
    );
}