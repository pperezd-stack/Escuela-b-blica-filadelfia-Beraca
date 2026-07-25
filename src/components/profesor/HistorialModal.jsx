const HistorialModal = ({
    visible,
    estudiante,
    datos,
    setDatos,
    modulos,
    onCerrar,
    onGuardar
}) => {

    if (!visible || !estudiante) return null;

    const actualizar = (campo, valor) => {
        setDatos({
            ...datos,
            [campo]: valor
        });
    };

    return (

        <div
            className="perfil-overlay open"
            onClick={onCerrar}
        >

            <div
                className="perfil-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* PANEL IZQUIERDO */}

                <div className="perfil-left">

                    <div className="big-avatar">
                        👤
                    </div>

                    <h3>
                        {estudiante.nombre}
                    </h3>

                    <div className="p-code">
                        Código: {estudiante.codigo}
                    </div>

                    <div className="p-modulo">

                        <span>
                            Asignar módulo
                        </span>

                        <select
                            value={datos.modulo}
                            onChange={(e) =>
                                actualizar(
                                    "modulo",
                                    e.target.value
                                )
                            }
                        >
                            {
                                modulos.map((m) => (
                                    <option
                                        key={m}
                                        value={m}
                                    >
                                        {m}
                                    </option>
                                ))
                            }
                        </select>

                    </div>

                </div>

                {/* PANEL DERECHO */}

                <div className="perfil-right">

                    <button
                        className="close-btn"
                        onClick={onCerrar}
                    >
                        ✕
                    </button>

                    <h4>

                        Calificaciones del

                        <span>

                            {" "}Módulo

                        </span>

                    </h4>

                    <table className="notas-mini">

                        <thead>

                            <tr>

                                <th>Corte 1</th>

                                <th>Corte 2</th>

                                <th>Corte 3</th>

                                <th>Final</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>

                                    <input
                                        className="input-nota"
                                        value={datos.corte1}
                                        onChange={(e)=>
                                            actualizar(
                                                "corte1",
                                                e.target.value
                                            )
                                        }
                                    />

                                </td>

                                <td>

                                    <input
                                        className="input-nota"
                                        value={datos.corte2}
                                        onChange={(e)=>
                                            actualizar(
                                                "corte2",
                                                e.target.value
                                            )
                                        }
                                    />

                                </td>

                                <td>

                                    <input
                                        className="input-nota"
                                        value={datos.corte3}
                                        onChange={(e)=>
                                            actualizar(
                                                "corte3",
                                                e.target.value
                                            )
                                        }
                                    />

                                </td>

                                <td>

                                    <input
                                        className="input-nota"
                                        value={datos.notaFinal}
                                        readOnly
                                    />

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    <div className="obs-section">

                        <h4 className="obs-section-title">

                            Observaciones

                            <span>

                                {" "}por corte

                            </span>

                        </h4>

                        {/* CORTE 1 */}

                        <div className="obs-corte-block">

                            <div className="obs-corte-label">

                                Corte 1

                            </div>

                            <textarea

                                className="obs-textarea"

                                value={datos.comentario1}

                                onChange={(e)=>

                                    actualizar(

                                        "comentario1",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        {/* CORTE 2 */}

                        <div className="obs-corte-block">

                            <div className="obs-corte-label">

                                Corte 2

                            </div>

                            <textarea

                                className="obs-textarea"

                                value={datos.comentario2}

                                onChange={(e)=>

                                    actualizar(

                                        "comentario2",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        {/* CORTE 3 */}

                        <div className="obs-corte-block">

                            <div className="obs-corte-label">

                                Corte 3

                            </div>

                            <textarea

                                className="obs-textarea"

                                value={datos.comentario3}

                                onChange={(e)=>

                                    actualizar(

                                        "comentario3",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                    </div>

                    <button

                        className="btn-guardar-cambios"

                        onClick={onGuardar}

                    >

                        Guardar Historial Académico

                    </button>

                </div>

            </div>

        </div>

    );

};

export default HistorialModal;