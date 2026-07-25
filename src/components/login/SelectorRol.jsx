import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

export default function SelectorRol({ rol, setRol }) {
    const cambiarRol = (nuevoRol) => {
        setRol(nuevoRol); // Mantiene el estado del rol sin forzar el reset a LOGIN
    };

    return (
        <div className="role-selector-container">
            <button
                type="button"
                className={`role-tab ${rol === "ESTUDIANTE" ? "active" : ""}`}
                onClick={() => cambiarRol("ESTUDIANTE")}
            >
                <FaUserGraduate className="role-tab-icon" />
                <span>Estudiante</span>
            </button>

            <button
                type="button"
                className={`role-tab ${rol === "PROFESOR" ? "active" : ""}`}
                onClick={() => cambiarRol("PROFESOR")}
            >
                <FaChalkboardTeacher className="role-tab-icon" />
                <span>Profesor</span>
            </button>
        </div>
    );
}