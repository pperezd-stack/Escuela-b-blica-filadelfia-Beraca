import { JournalCheck } from "react-bootstrap-icons";

export default function StudentGrades({ calificacion }) {

    if (!calificacion) {

        return (

            <section className="student-card">

                <h3>Calificaciones</h3>

                <p>No existen calificaciones registradas.</p>

            </section>

        );

    }

    return (

        <section className="student-card">

            <h3 className="student-card-title">

                <JournalCheck />

                <span>Calificaciones</span>

            </h3>

            <div className="table-responsive">

                <table className="table student-table">

                    <thead>

                        <tr>

                            <th>Corte 1</th>
                            <th>Corte 2</th>
                            <th>Corte 3</th>
                            <th>Nota Final</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>{calificacion.corte1}</td>

                            <td>{calificacion.corte2}</td>

                            <td>{calificacion.corte3}</td>

                            <td>

                                <strong>

                                    {calificacion.notaFinal}

                                </strong>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

    );

}