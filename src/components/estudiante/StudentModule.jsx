import { BookHalf, PersonWorkspace } from "react-bootstrap-icons";

export default function StudentModule({ matricula }) {

    if (!matricula) {
        return (
            <section className="student-card">

                <h3>Módulo Académico</h3>

                <p>No tienes un módulo asignado.</p>

            </section>
        );
    }

    return (

        <section className="student-card">

            <h3 className="student-card-title">

                <BookHalf />

                <span>Módulo Académico</span>

            </h3>

            <div className="student-module">

                <div className="student-module-item">

                    <strong>Módulo</strong>

                    <span>

                        {matricula.modulo?.nombre}

                    </span>

                </div>

                <div className="student-module-item">

                    <strong>Profesor</strong>

                    <span>

                        <PersonWorkspace />

                        {" "}

                        {matricula.modulo?.profesor?.nombre ?? "Sin asignar"}

                    </span>

                </div>

                <div className="student-module-item">

                    <strong>Estado</strong>

                    <span className="badge bg-success">

                        Activo

                    </span>

                </div>

            </div>

        </section>

    );

}