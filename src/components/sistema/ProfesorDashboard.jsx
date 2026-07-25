import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/pages/sistema/profesorDashboard.css";

const ProfesorDashboard = ({ nombre: nombreProp }) => {
    const navigate = useNavigate();
    const [nombreDocente, setNombreDocente] = useState("");

    useEffect(() => {
        if (nombreProp && typeof nombreProp === "string") {
            setNombreDocente(nombreProp);
            return;
        }

        const userStored = localStorage.getItem("usuario");
        if (userStored) {
            try {
                const parsedUser = JSON.parse(userStored);
                
                const valNombre = typeof parsedUser.nombre === "object"
                    ? (parsedUser.nombre?.nombre || parsedUser.nombre?.primerNombre || "Profesor")
                    : (parsedUser.nombre || "Profesor");

                setNombreDocente(String(valNombre));
            } catch {
                setNombreDocente("Profesor");
            }
        } else {
            setNombreDocente("Profesor");
        }
    }, [nombreProp]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    // Aseguramos la conversión antes del .split()
    const nombreString = typeof nombreDocente === "string" ? nombreDocente : String(nombreDocente || "Profesor");
    const primerNombre = nombreString.trim() ? nombreString.split(" ")[0] : "Profesor";

    return (
        <div className="profesor-dashboard-container">
            {/* Título y Saludo */}
            <section className="dashboard-title">
                <span className="badge-panel">PANEL DOCENTE</span>
                <h2>
                    Bienvenido, <strong>{primerNombre}</strong>
                </h2>
            </section>

            {/* Lista de estudiantes */}
            <section className="profesor-options">
                <Link to="/lista-estudiantes" className="option-card-single">
                    <span className="arrow-icon">→</span>
                    <div>
                        <h5>Ver lista de estudiantes</h5>
                        <p>Consulta y gestiona todos los alumnos</p>
                    </div>
                </Link>
            </section>

            {/* Botón Salir */}
            <div className="logout-container">
                <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="btn-salir"
                >
                    Salir
                </button>
            </div>
        </div>
    );
};

export default ProfesorDashboard;