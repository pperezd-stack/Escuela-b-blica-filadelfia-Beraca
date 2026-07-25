import React from "react";

const StudentTable = ({ estudiantes, onSeleccionar }) => {

    if (!estudiantes || estudiantes.length === 0) {

        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center">

                    <h5>No hay estudiantes registrados</h5>

                </div>
            </div>
        );

    }

    return (

        <div className="card shadow-sm border-0">

            <div className="card-header bg-white">

                <h5 className="mb-0">

                    Estudiantes del módulo

                </h5>

            </div>

            <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                    <tr>

                        <th>ID</th>

                        <th>Nombre</th>

                        <th>Correo</th>

                        <th>Rol</th>

                        <th></th>

                    </tr>

                    </thead>

                    <tbody>

                    {estudiantes.map(estudiante => (

                        <tr key={estudiante.id}>

                            <td>

                                {estudiante.id}

                            </td>

                            <td>

                                {estudiante.nombre}

                            </td>

                            <td>

                                {estudiante.correo}

                            </td>

                            <td>

                                {estudiante.rol}

                            </td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onSeleccionar(estudiante)}
                                >

                                    Administrar

                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default StudentTable;