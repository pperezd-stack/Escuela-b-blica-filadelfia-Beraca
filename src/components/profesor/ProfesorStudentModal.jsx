import React, { useEffect, useState } from "react";

const ProfesorStudentModal = ({
    estudiante,
    open,
    modulos,
    onClose,
    moduloSelect,
    setModuloSelect,
    corte1,
    setCorte1,
    corte2,
    setCorte2,
    corte3,
    setCorte3,
    notaFinal,
    obsCorte1,
    setObsCorte1,
    obsCorte2,
    setObsCorte2,
    obsCorte3,
    setObsCorte3,
    obsFinal,
    setObsFinal,
    guardarHistorial,
    guardandoHistorial
}) => {
    if (!open || !estudiante) return null;

    const numNotaFinal = parseFloat(notaFinal) || 0;
    const claseNotaFinal = numNotaFinal >= 3.0 ? "aprobado" : "reprobado";

    return (
        <div className="perfil-overlay" onClick={onClose}>
            <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
                {/* BOTÓN CERRAR */}
                <button className="close-modal" onClick={onClose}>
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
                            value={moduloSelect}
                            onChange={(e) => setModuloSelect(e.target.value)}
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
                                        value={corte1}
                                        onChange={(e) => setCorte1(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 1..."
                                        value={obsCorte1}
                                        onChange={(e) => setObsCorte1(e.target.value)}
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
                                        value={corte2}
                                        onChange={(e) => setCorte2(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 2..."
                                        value={obsCorte2}
                                        onChange={(e) => setObsCorte2(e.target.value)}
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
                                        value={corte3}
                                        onChange={(e) => setCorte3(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-obs"
                                        placeholder="Comentario corte 3..."
                                        value={obsCorte3}
                                        onChange={(e) => setObsCorte3(e.target.value)}
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
                                {notaFinal || "0.0"}
                            </span>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="perfil-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
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
                            onClick={guardarHistorial}
                            disabled={guardandoHistorial}
                        >
                            {guardandoHistorial ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfesorStudentModal;