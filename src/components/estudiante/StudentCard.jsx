import {
    FaUserGraduate,
    FaChevronRight
} from "react-icons/fa";

const StudentCard = ({
    estudiante,
    onClick
}) => {

    return (

        <div
            className="student-card"
            onClick={() => onClick(estudiante)}
        >

            <div className="student-card-top">

                <div className="student-avatar">
                    <FaUserGraduate />
                </div>

                <h3>
                    {estudiante.nombre}
                </h3>

                <span className="student-code">
                    ID #{estudiante.id}
                </span>

            </div>

            <div className="student-card-bottom">

                <div>

                    <small>Módulo</small>

                    <strong>
                        {estudiante.modulo?.nombre || "Sin asignar"}
                    </strong>

                </div>

                <span className="student-status">

                    Activo

                </span>

            </div>

            <div className="student-arrow">

                <FaChevronRight />

            </div>

        </div>

    );

};

export default StudentCard;