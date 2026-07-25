export default function StudentCard(props) {
    // Soporta si te pasan 'estudiante' o si te pasan las propiedades directas
    const estudiante = props.estudiante || props;

    if (!estudiante || (!estudiante.nombre && !estudiante.id)) return null;

    return (
        <div
            className="stu-card"
            onClick={() => onOpen && onOpen(estudiante)}
        >
            <div className="stu-card-top">
                <div className="stu-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>

                <h4>{estudiante.nombre || "Sin nombre"}</h4>

                <span className="stu-code">
                    CÓD: {estudiante.id ?? "N/A"}
                </span>
            </div>

            <div className="stu-card-bottom">
                <span className="badge-estado badge-activo">
                    Activo
                </span>
            </div>
        </div>
    );
}