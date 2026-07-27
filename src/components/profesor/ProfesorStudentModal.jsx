import React, { useEffect, useState } from "react";

const proseforStudentModal = ({
    estudiante,
    visible,
    modulos,
    onCerrar,
    onGuardar
}) => {
    const [formulario, setFormulario] = useState({
        moduloId: "",
        corte1: "",
        corte2: "",
        corte3: "",
        notaFinal: "",
        comentarioCorte1: "",
        comentarioCorte2: "",
        comentarioCorte3: ""
    });

    useEffect(() => {
        if (!estudiante) return;
        setFormulario({
            moduloId: estudiante.modulo?.id || "",
            corte1: estudiante.calificacion?.corte1 || "",
            corte2: estudiante.calificacion?.corte2 || "",
            corte3: estudiante.calificacion?.corte3 || "",
            notaFinal: estudiante.calificacion?.notaFinal || "",
            comentarioCorte1: estudiante.observacion?.comentarioCorte1 || "",
            comentarioCorte2: estudiante.observacion?.comentarioCorte2 || "",
            comentarioCorte3: estudiante.observacion?.comentarioCorte3 || ""
        });
    }, [estudiante]);

    useEffect(() => {
        calcularNotaFinal();
    }, [
        formulario.corte1,
        formulario.corte2,
        formulario.corte3
    ]);

    const cambiarValor = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const calcularNotaFinal = () => {
        const c1 = parseFloat(formulario.corte1) || 0;
        const c2 = parseFloat(formulario.corte2) || 0;
        const c3 = parseFloat(formulario.corte3) || 0;

        const promedio = ((c1 + c2 + c3) / 3).toFixed(2);

        setFormulario(prev => ({
            ...prev,
            notaFinal: promedio
        }));
    };

    const guardar = () => {
        onGuardar(estudiante.id, formulario);
    };

    if (!visible || !estudiante) return null;

    const numNotaFinal = parseFloat(formulario.notaFinal) || 0;
    const claseNotaFinal = numNotaFinal >= 3.0 ? "aprobado" : "reprobado";

    return (
        <div className="perfil-overlay" onClick={onCerrar}>
            <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
                {/* BOTÓN CERRAR */}
                <button className="close-modal" onClick={onCerrar}>
                    &times;
                </button>

                {/* PANEL IZQUIERDO */}
                <div className="perfil-left">
                    <div className="big-avatar">
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <h2>{estudiante.nombre}</h2>
                    <span className="student-id">ID: #{estudiante.id}</span>
                    
                    <div style={{ marginTop: '2rem', width: '100%', textAlign: 'left' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '6px', opacity: 0.9 }}>
                            Módulo
                        </label>
                        <select
                            className="form-select"
                            name="moduloId"
                            value={formulario.moduloId}
                            onChange={cambiarValor}
                            style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'rgba(0,0,0,0.2)',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        >
                            <option value="" disabled style={{ color: '#000' }}>
                                Seleccione...
                            </option>
                            {modulos.map(modulo => (
                                <option
                                    key={modulo.id}
                                    value={modulo.id}
                                    style={{ color: '#000' }}
                                >
                                    {modulo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* PANEL DERECHO */}
                <div className="perfil-right">
                    <h3 className="modal-title">Calificaciones y Observaciones</h3>

                    <table className="tabla-notas">
                        <thead>
                            <tr>
                                <th>Corte</th>
                                <th>Nota</th>
                                <th>Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* CORTE 1 */}
                            <tr>
                                <td><strong>Corte 1</strong></td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="input-nota"
                                        name="corte1"
                                        value={formulario.corte1}
                                        onChange={cambiarValor}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 1..."
                                        name="comentarioCorte1"
                                        value={formulario.comentarioCorte1}
                                        onChange={cambiarValor}
                                    />
                                </td>
                            </tr>

                            {/* CORTE 2 */}
                            <tr>
                                <td><strong>Corte 2</strong></td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="input-nota"
                                        name="corte2"
                                        value={formulario.corte2}
                                        onChange={cambiarValor}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 2..."
                                        name="comentarioCorte2"
                                        value={formulario.comentarioCorte2}
                                        onChange={cambiarValor}
                                    />
                                </td>
                            </tr>

                            {/* CORTE 3 */}
                            <tr>
                                <td><strong>Corte 3</strong></td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        className="input-nota"
                                        name="corte3"
                                        value={formulario.corte3}
                                        onChange={cambiarValor}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 3..."
                                        name="comentarioCorte3"
                                        value={formulario.comentarioCorte3}
                                        onChange={cambiarValor}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* SECCIÓN NOTA FINAL */}
                    <div className="seccion-nota-final">
                        <div className="card-nota-final">
                            <span className="lbl-final">Nota Final</span>
                            <span className={`val-final ${claseNotaFinal}`}>
                                {formulario.notaFinal || "0.0"}
                            </span>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="perfil-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCerrar}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '10px',
                                border: '1px solid #cbd5e1',
                                background: '#f1f5f9',
                                color: '#475569',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn-guardar"
                            onClick={guardar}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default proseforStudentModal;