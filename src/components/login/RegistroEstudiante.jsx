import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import { registrarEstudiante } from "../../services/usuarioService";

export default function RegistroEstudiante({ volver }) {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [moduloId, setModuloId] = useState("");

    // 🟢 Módulos cargados dinámicamente desde el backend
    const [modulos, setModulos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // 🟢 Cargar los módulos reales desde el backend al montar el componente
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
            setError("Debes seleccionar un módulo.");
            return;
        }

        if (password !== confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            await registrarEstudiante({
                nombre,
                password,
                rol: "ESTUDIANTE",
                moduloId: Number(moduloId)
            });

            setMensaje("Estudiante registrado correctamente.");

            setTimeout(() => {
                volver();
            }, 1500);

        } catch {
            setError("No fue posible registrar el estudiante.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-form-heading">
                <span>Registro Estudiantil</span>
                <h2>
                    Crear cuenta
                    <strong> Estudiante</strong>
                </h2>
            </div>

            <form
                className="login-form-container"
                onSubmit={registrar}
            >
                {/* Nombre completo */}
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

                {/* Contraseña */}
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

                {/* Confirmar contraseña */}
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
                            onClick={() =>
                                setMostrarConfirmacion(!mostrarConfirmacion)
                            }
                        >
                            {
                                mostrarConfirmacion
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </button>
                    </div>
                </div>

                {/* Módulo */}
                <div className="login-field-group">
                    <label>Módulo</label>
                    <select
                        value={moduloId}
                        onChange={(e) => setModuloId(e.target.value)}
                        required
                    >
                        <option value="">
                            Seleccione un módulo
                        </option>
                        {
                            modulos.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.nombre}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {
                    error && (
                        <div className="login-alert-error">
                            {error}
                        </div>
                    )
                }

                {
                    mensaje && (
                        <div className="login-alert-success">
                            {mensaje}
                        </div>
                    )
                }

                <button
                    type="submit"
                    className="login-submit-button"
                    disabled={loading}
                >
                    {
                        loading
                            ? "Registrando..."
                            : "Registrar Estudiante"
                    }
                </button>
            </form>

            <div className="login-form-footer">
                ¿Ya tienes cuenta?
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