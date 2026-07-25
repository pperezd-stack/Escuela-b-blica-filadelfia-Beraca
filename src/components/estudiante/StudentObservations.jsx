import { ChatSquareText } from "react-bootstrap-icons";

export default function StudentObservations({ observacion }) {

    if (!observacion) {

        return (

            <section className="student-card">

                <h3>Observaciones</h3>

                <p>No existen observaciones registradas.</p>

            </section>

        );

    }

    return (

        <section className="student-card">

            <h3 className="student-card-title">

                <ChatSquareText />

                <span>Observaciones del Profesor</span>

            </h3>

            <div className="observaciones-grid">

                <div className="observacion-item">

                    <h5>Corte 1</h5>

                    <p>

                        {observacion.comentarioCorte1 || "Sin observaciones."}

                    </p>

                </div>

                <div className="observacion-item">

                    <h5>Corte 2</h5>

                    <p>

                        {observacion.comentarioCorte2 || "Sin observaciones."}

                    </p>

                </div>

                <div className="observacion-item">

                    <h5>Corte 3</h5>

                    <p>

                        {observacion.comentarioCorte3 || "Sin observaciones."}

                    </p>

                </div>

            </div>

            <div className="student-date">

                <strong>Fecha del registro:</strong>

                {" "}

                {observacion.fecha}

            </div>

        </section>

    );

}