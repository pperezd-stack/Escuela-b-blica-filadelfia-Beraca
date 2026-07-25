import {
    Award,
    BookHalf,
    CalendarCheck,
    GraphUp
} from "react-bootstrap-icons";

export default function StudentStatistics({

    matricula,
    calificacion,
    observacion

}) {

    const promedio = calificacion?.notaFinal ?? "--";

    const modulo = matricula?.modulo?.nombre ?? "No asignado";

    const fecha = observacion?.fecha ?? "--";

    const estado =
        promedio >= 3.0
            ? "Aprobado"
            : promedio === "--"
            ? "--"
            : "En proceso";

    return (

        <section className="student-card">

            <h3 className="student-card-title">

                <GraphUp />

                <span>Resumen Académico</span>

            </h3>

            <div className="student-stats-grid">

                <div className="student-stat-card">

                    <BookHalf className="student-stat-icon"/>

                    <span>Módulo</span>

                    <strong>

                        {modulo}

                    </strong>

                </div>

                <div className="student-stat-card">

                    <Award className="student-stat-icon"/>

                    <span>Promedio</span>

                    <strong>

                        {promedio}

                    </strong>

                </div>

                <div className="student-stat-card">

                    <GraphUp className="student-stat-icon"/>

                    <span>Estado</span>

                    <strong>

                        {estado}

                    </strong>

                </div>

                <div className="student-stat-card">

                    <CalendarCheck className="student-stat-icon"/>

                    <span>Última actualización</span>

                    <strong>

                        {fecha}

                    </strong>

                </div>

            </div>

        </section>

    );

}