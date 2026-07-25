import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaMapMarkerAlt
} from "react-icons/fa";
import { login } from "../../services/authService";

export default function LoginPanel() {
    const navigate = useNavigate();

    const [rol, setRol] = useState("PROFESOR");
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
            // Se envía 'nombre' en lugar de correo
            const usuario = await login(nombre, password, rol);
            localStorage.setItem("usuario", JSON.stringify(usuario));

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
            setError("Nombre o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-panel-container">
            {/* Ubicación Map Card */}
            <div className="location-card">
                <FaMapMarkerAlt className="location-icon" />
                <div className="location-info">
                    <span>Ubicación: <strong>Corregimiento el Carrito</strong></span>
                    <a
                        href="https://maps.app.goo.gl/FpS35dnuP8LnBunGA"
                        target="_blank"
                        rel="noreferrer"
                    >
                        🗺️ Ver en mapa
                    </a>
                </div>
            </div>

            <h2 className="login-title">Iniciar Sesión</h2>

            {/* Selector de Rol estilo Pestaña (Tabs) */}
            <div className="role-selector-tabs">
                <button
                    type="button"
                    className={`tab-btn ${rol === "PROFESOR" ? "active" : ""}`}
                    onClick={() => setRol("PROFESOR")}
                >
                    <FaChalkboardTeacher /> PROFESOR
                </button>
                <button
                    type="button"
                    className={`tab-btn ${rol === "ESTUDIANTE" ? "active" : ""}`}
                    onClick={() => setRol("ESTUDIANTE")}
                >
                    <FaUserGraduate /> ESTUDIANTE
                </button>
            </div>

            {/* Formulario */}
            <form className="login-form-inner" onSubmit={iniciarSesion}>
                <div className="field-group">
                    <label>NOMBRE COMPLETO</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingresa tu nombre"
                        required
                    />
                </div>

                <div className="field-group">
                    <label>CONTRASEÑA</label>
                    <div className="password-wrapper">
                        <input
                            type={mostrarPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                            {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    className="btn-ingresar"
                    disabled={loading}
                >
                    {loading ? "INGRESANDO..." : "INGRESAR"}
                </button>

                <p className="login-link">
                    ¿No tienes cuenta?{" "}
                    <Link
                        to={
                            rol === "PROFESOR"
                                ? "/login?rol=profesor&vista=registro"
                                : "/login?rol=estudiante&vista=registro"
                        }
                    >
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}