import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { registrarProfesor } from "../../services/usuarioService";

export default function RegistroProfesor({ volver }) {
    const navigate = useNavigate();

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [moduloId, setModuloId] = useState(""); 

    // Módulos cargados dinámicamente desde el backend
    const [modulos, setModulos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Cargar los módulos reales desde el backend al montar el componente
    useEffect(() => {
        axios.get("https://escuela-beraca-1.onrender.com/modulos")
            .then((res) => setModulos(res.data))
            .catch((err) => console.error("Error al cargar módulos:", err));
    }, []);

    const registrar = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        if (!moduloId) {
            setError("Debes seleccionar un módulo asignado.");
            return;
        }

        if (password !== confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            const nuevoUsuario = {
                nombre: nombre,
                password: password,
                rol: "PROFESOR",
                moduloId: Number(moduloId)
            };

            const respuesta = await registrarProfesor(nuevoUsuario);

            localStorage.setItem("usuario", JSON.stringify(respuesta));
            localStorage.setItem("rol", "PROFESOR");

            setMensaje("Profesor registrado correctamente. Redirigiendo...");

            setTimeout(() => {
                navigate("/sistema");
            }, 1000);

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("No fue posible registrar el profesor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-form-heading">
                <span>Registro Docente</span>
                <h2>
                    Crear cuenta <strong>Profesor</strong>
                </h2>
            </div>

            <form className="login-form-container" onSubmit={registrar}>
                {/* 1. NOMBRE COMPLETO */}
                <div className="login-field-group">
                    <label>Nombre completo</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre completo"
                        required
                    />
                </div>

                {/* 2. CONTRASEÑA */}
                <div className="login-field-group">
                    <label>Contraseña</label>
                    <div className="login-password-group">
                        <input
                            type={mostrarPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese una contraseña"
                            required
                        />
                        <button
                            type="button"
                            className="login-password-toggle"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                            {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* 3. CONFIRMAR CONTRASEÑA */}
                <div className="login-field-group">
                    <label>Confirmar contraseña</label>
                    <div className="login-password-group">
                        <input
                            type={mostrarConfirmacion ? "text" : "password"}
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            placeholder="Repita la contraseña"
                            required
                        />
                        <button
                            type="button"
                            className="login-password-toggle"
                            onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
                        >
                            {mostrarConfirmacion ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* 4. MÓDULO ASIGNADO */}
                <div className="login-field-group">
                    <label>Módulo Asignado</label>
                    <select
                        value={moduloId}
                        onChange={(e) => setModuloId(e.target.value)}
                        className="login-input-select"
                        required
                    >
                        <option value="">Seleccione un módulo</option>
                        {modulos
                            .filter((mod, index, self) => index === self.findIndex((m) => m.nombre === mod.nombre))
                            .map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nombre}
                                </option>
                            ))}
                    </select>
                </div>

                {error && <div className="login-alert-error">{error}</div>}
                {mensaje && <div className="login-alert-success">{mensaje}</div>}

                <button
                    type="submit"
                    className="login-submit-button"
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Registrar Profesor"}
                </button>
            </form>

            <div className="login-form-footer">
                ¿Ya tienes cuenta?{" "}
                <button
                    type="button"
                    className="login-link-button"
                    onClick={volver}
                >
                    Inicia sesión
                </button>
            </div>
        </>
    );
}