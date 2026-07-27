import React from 'react';

export default function HistorialModal({
  open,
  onClose,
  estudiante,
  modulos,
  moduloSelect,
  setModuloSelect,
  matriculaSeleccionada,
  guardandoMatricula,
  actualizarMatricula,
  eliminarMatricula,
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
  guardandoHistorial,
  moduloActual
}) {
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

        {/* PANEL IZQUIERDO DEL MODAL */}
        <div className="perfil-left">
          <div className="big-avatar">
            <i className="bi bi-person-fill"></i>
          </div>
          <h2>{estudiante.nombre}</h2>
          <span className="student-id">ID: #{estudiante.id}</span>
          
          <div style={{ marginTop: '2rem', width: '100%', textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '6px', opacity: 0.9 }}>
              Módulo Asignado:
            </label>
            <select
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
                outline: 'none',
                marginBottom: '10px'
              }}
            >
              <option value="" disabled style={{ color: '#000' }}>Seleccione módulo</option>
              {modulos.map((m) => (
                <option key={m.id} value={m.id} style={{ color: '#000' }}>
                  {m.nombre}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={actualizarMatricula}
                disabled={guardandoMatricula}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  background: '#ffffff',
                  color: '#0f766e',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {guardandoMatricula ? 'Guardando...' : 'Cambiar'}
              </button>
              
              {matriculaSeleccionada && (
                <button
                  type="button"
                  onClick={eliminarMatricula}
                  disabled={guardandoMatricula}
                  style={{
                    padding: '6px 10px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#f87171',
                    border: '1px solid #f87171',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title="Quitar estudiante del módulo"
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO DEL MODAL */}
        <div className="perfil-right">
          <h3 className="modal-title">Calificaciones y Observaciones</h3>

          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem', fontWeight: 600 }}>
            Módulo actual evaluado: <span style={{ color: '#0d9488' }}>{moduloActual}</span>
          </div>

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

          {/* SECCIÓN NOTA FINAL Y COMENTARIO FINAL */}
          <div className="seccion-nota-final">
            <div className="card-nota-final">
              <span className="lbl-final">Nota Final</span>
              <span className={`val-final ${claseNotaFinal}`}>{notaFinal}</span>
            </div>

            <div className="wrapper-obs-final">
              <label className="lbl-obs-final">Comentario Nota Final</label>
              <input
                type="text"
                className="input-obs"
                placeholder="Observación general o cierre del módulo..."
                value={obsFinal}
                onChange={(e) => setObsFinal(e.target.value)}
              />
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="perfil-actions">
            <button
              type="button"
              className="btn-guardar"
              onClick={guardarHistorial}
              disabled={guardandoHistorial}
            >
              {guardandoHistorial ? 'Guardando cambios...' : 'Guardar Calificaciones'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}