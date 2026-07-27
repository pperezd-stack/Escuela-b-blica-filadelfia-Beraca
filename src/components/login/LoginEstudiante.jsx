import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { login } from "../../services/authService";

export default function LoginEstudiante({ cambiarVista }) {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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

            if (usuario.rol.toUpperCase() !== "ESTUDIANTE") {
                setError(
                    "Esta cuenta pertenece a un profesor."
                );
                return;
            }

            // Consultar matrículas y calificaciones para asociar el módulo y profesor del estudiante
            let datosExtra = {};
            try {
                const rolLocal = usuario.rol || "ESTUDIANTE";
                const [resMatriculas, resCalificaciones, resObservaciones] = await Promise.all([
                    fetch(`${API_URL}/modulosEstudiante?rol=${rolLocal}`),
                    fetch(`${API_URL}/calificaciones?rol=${rolLocal}`),
                    fetch(`${API_URL}/observaciones?rol=${rolLocal}`)
                ]);

                const matriculas = resMatriculas.ok ? await resMatriculas.json() : [];
                const calificaciones = resCalificaciones.ok ? await resCalificaciones.json() : [];
                const observaciones = resObservaciones.ok ? await resObservaciones.json() : [];

                // Buscar la matrícula del estudiante actual
                const miMatricula = matriculas.find(
                    (m) => Number(m.estudiante_id ?? m.estudianteId) === Number(usuario.id)
                );

                // Buscar sus calificaciones
                const miCalificacion = calificaciones.find(
                    (c) => Number(c.estudiante_id ?? c.estudianteId) === Number(usuario.id)
                );

                // Buscar sus observaciones
                const miObservacion = observaciones.find(
                    (o) => Number(o.estudiante_id ?? o.estudianteId) === Number(usuario.id)
                );

                if (miMatricula) {
                    datosExtra.modulo = miMatricula.modulo || miMatricula.modulo_nombre || "MÓDULO DE APRENDIZAJE";
                }

                if (miCalificacion) {
                    datosExtra.corte1 = miCalificacion.corte1;
                    datosExtra.corte2 = miCalificacion.corte2;
                    datosExtra.corte3 = miCalificacion.corte3;
                    datosExtra.final = miCalificacion.notaFinal ?? miCalificacion.nota_final;
                }

                if (miObservacion) {
                    datosExtra.comentarios = {
                        corte1: miObservacion.comentario_corte1 || miObservacion.comentarioCorte1 || "",
                        corte2: miObservacion.comentario_corte2 || miObservacion.comentarioCorte2 || "",
                        corte3: miObservacion.comentario_corte3 || miObservacion.comentarioCorte3 || ""
                    };
                }
            } catch (err) {
                console.error("No se pudieron enriquecer los datos del estudiante:", err);
            }

            // Combinar el usuario con su módulo, profesor y notas
            const usuarioCompleto = { ...usuario, ...datosExtra };

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioCompleto)
            );

            navigate("/estudiante");
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
                <span>Acceso Estudiantil</span>
                <h2>
                    Bienvenido, <strong>Estudiante</strong>
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
                        <div className="login-alert-error">
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