import { PersonCircle, Envelope, ShieldCheck } from "react-bootstrap-icons";

export default function StudentProfile({ usuario }) {

    if (!usuario) {

        return (

            <div className="student-card">

                <h3>Información del estudiante</h3>

                <p>Cargando información...</p>

            </div>

        );

    }

    return (

        <section className="student-card">

            <div className="student-profile-header">

                <div className="student-avatar">

                    <PersonCircle size={90} />

                </div>

                <div>

                    <h2>{usuario.nombre}</h2>

                    <span className="student-role">

                        {usuario.rol}

                    </span>

                </div>

            </div>

            <div className="student-profile-info">

                <div className="student-info-item">

                    <Envelope />

                    <span>{usuario.correo}</span>

                </div>

                <div className="student-info-item">

                    <ShieldCheck />

                    <span>

                        Estado: Activo

                    </span>

                </div>

                <div className="student-info-item">

                    <strong>ID:</strong>

                    <span>{usuario.id}</span>

                </div>

            </div>

        </section>

    );

}