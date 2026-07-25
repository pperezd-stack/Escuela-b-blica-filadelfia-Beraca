import "../../styles/pages/ListaEstudiantes/StudentGrid.css";
const StudentGrid = ({ estudiantes, onSeleccionar }) => {
    return (
        <div className="student-grid">
            {estudiantes.map((estudiante) => (
                <div
                    key={estudiante.id}
                    className="student-card"
                    onClick={() => onSeleccionar(estudiante)}
                >
                    <div className="student-card-top">

                        <div className="student-avatar">
                            <i className="bi bi-person-fill"></i>
                        </div>

                        <h3>{estudiante.nombre}</h3>

                        <span className="student-code">
                            {estudiante.codigo || `EST-${estudiante.id}`}
                        </span>

                    </div>

                    <div className="student-card-bottom">

                        <p className="student-module">
                            {estudiante.modulo || "Sin módulo"}
                        </p>

                        <span className="student-link">
                            Ver historial
                            <i className="bi bi-chevron-right"></i>
                        </span>

                    </div>

                </div>
            ))}
        </div>
    );
};

export default StudentGrid;