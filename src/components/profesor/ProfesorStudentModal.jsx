import React from "react";

const ProfesorStudentModal = ({
    estudiante,
    open,
    onClose,
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
                {/* BOTÓN CERRAR (X) CORREGIDO */}
                <button 
                    type="button" 
                    className="close-modal" 
                    onClick={onClose}
                    style={{ cursor: 'pointer', zIndex: 10 }}
                >
                    &times;
                </button>

                {/* PANEL IZQUIERDO */}
                <div className="perfil-left">
                    <div className="big-avatar">
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <h2>{estudiante.nombre}</h2>
                    {/* Se removió el ID tal como lo pediste */}
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
                                    <textarea
                                        className="input-obs"
                                        placeholder="Comentario corte 1..."
                                        rows="2"
                                        value={obsCorte1}
                                        onChange={(e) => setObsCorte1(e.target.value)}
                                        style={{ resize: 'vertical', width: '100%', padding: '6px' }}
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
                                    <textarea
                                        className="input-obs"
                                        placeholder="Comentario corte 2..."
                                        rows="2"
                                        value={obsCorte2}
                                        onChange={(e) => setObsCorte2(e.target.value)}
                                        style={{ resize: 'vertical', width: '100%', padding: '6px' }}
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
                                    <textarea
                                        className="input-obs"
                                        placeholder="Comentario corte 3..."
                                        rows="2"
                                        value={obsCorte3}
                                        onChange={(e) => setObsCorte3(e.target.value)}
                                        style={{ resize: 'vertical', width: '100%', padding: '6px' }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* SECCIÓN NOTA FINAL Y COMENTARIO FINAL */}
                    <div className="seccion-nota-final" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '15px' }}>
                        <div className="card-nota-final" style={{ minWidth: '110px', textAlign: 'center' }}>
                            <span className="lbl-final">Nota Final</span>
                            <span className={`val-final ${claseNotaFinal}`}>
                                {notaFinal || "0.0"}
                            </span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#374151' }}>
                                Observación Final
                            </label>
                            <textarea
                                className="input-obs"
                                placeholder="Escribe un comentario final para el estudiante..."
                                rows="2"
                                value={obsFinal}
                                onChange={(e) => setObsFinal(e.target.value)}
                                style={{ width: '100%', padding: '8px', resize: 'vertical', borderRadius: '6px', border: '1px solid #d1d5db' }}
                            />
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="perfil-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
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