import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import "../../styles/pages/sistema/EstudianteDashboard.css";

const EstudianteDashboard = (props) => {
  const [datosEstudiante, setDatosEstudiante] = useState({
    nombre: props.nombre || "Estudiante",
    modulo: props.modulo || "MÓDULO DE APRENDIZAJE",
    profesor: props.profesor || "Docente Asignado",
    notas: props.notas || { corte1: 0, corte2: 0, corte3: 0, final: 0 },
    comentarios: props.comentarios || { corte1: "", corte2: "", corte3: "", final: "" }
  });

  useEffect(() => {
    const usuarioStored = localStorage.getItem("usuario");
    const moduloIdStored = localStorage.getItem("moduloId");

    if (usuarioStored) {
      try {
        const usuario = JSON.parse(usuarioStored);

        // Formatear nombre de forma segura
        const nombreReal = typeof usuario.nombre === "object"
          ? (usuario.nombre?.nombre || usuario.nombre?.primerNombre || "Estudiante")
          : (usuario.nombre || props.nombre || "Estudiante");

        // Detección robusta de Módulo y Profesor
        const moduloObj = usuario.modulo || usuario.matricula?.modulo;
        let nombreModulo = 
          typeof moduloObj === "string" ? moduloObj : 
          (moduloObj?.nombre || usuario.nombreModulo || usuario.moduloNombre || props.modulo);

        let nombreProfesor = 
          typeof moduloObj?.profesor === "string" ? moduloObj.profesor : 
          (moduloObj?.profesor?.nombre || usuario.profesor || usuario.docente || props.profesor);

        setDatosEstudiante({
          nombre: String(nombreReal),
          modulo: nombreModulo || `MÓDULO #${moduloIdStored || ''}`,
          profesor: nombreProfesor || "Docente Asignado",
          notas: {
            corte1: usuario.corte1 ?? props.notas?.corte1 ?? 0,
            corte2: usuario.corte2 ?? props.notas?.corte2 ?? 0,
            corte3: usuario.corte3 ?? props.notas?.corte3 ?? 0,
            final: usuario.final ?? usuario.notaFinal ?? props.notas?.final ?? 0,
          },
          comentarios: {
            corte1: usuario.comentario1 ?? usuario.comentarios?.corte1 ?? props.comentarios?.corte1 ?? "",
            corte2: usuario.comentario2 ?? usuario.comentarios?.corte2 ?? props.comentarios?.corte2 ?? "",
            corte3: usuario.comentario3 ?? usuario.comentarios?.corte3 ?? props.comentarios?.corte3 ?? "",
            final: usuario.comentarioFinal ?? usuario.comentario_final ?? usuario.comentarios?.final ?? props.comentarios?.final ?? ""
          }
        });

        // Opcional por si tienes un endpoint para traer el nombre del módulo por su ID guardado en localStorage
        if (moduloIdStored && (!nombreModulo || nombreModulo.includes("MÓDULO"))) {
          fetch(`https://tu-backend.onrender.com/api/modulos/${moduloIdStored}`)
            .then(res => res.json())
            .then(modData => {
              if (modData) {
                setDatosEstudiante(prev => ({
                  ...prev,
                  modulo: modData.nombre || modData.titulo || prev.modulo,
                  profesor: modData.profesor?.nombre || modData.nombreProfesor || prev.profesor
                }));
              }
            })
            .catch(err => console.log("No se pudo cargar el detalle extra del módulo", err));
        }

      } catch (error) {
        console.error("Error al leer los datos del estudiante:", error);
      }
    }
  }, [props.nombre, props.modulo, props.profesor, props.notas, props.comentarios]);

  const { nombre, modulo, profesor, notas, comentarios } = datosEstudiante;

  const notaFinal = Number(notas?.final ?? 0.0);
  const esAprobado = notaFinal >= 3.0;
  const primerNombre = nombre.trim() ? nombre.split(" ")[0] : "Estudiante";

  return (
    <div className="estudiante-page">
      <div className="estudiante-card">
        
        {/* PANEL IZQUIERDO DECORATIVO */}
        <aside className="estudiante-deco-panel">
          <div className="brand-header">
            <h1>Filadelfia</h1>
            <h2>Beraca</h2>
            <p className="sub-tag">El Carlito · Sistema Académico</p>
          </div>

          <div className="quote-box">
            <p className="quote-text">
              "Instruye al niño en el camino que debe seguir, y cuando sea mayor no se apartará de él."
            </p>
            <span className="quote-author">PROVERBIOS 22:6</span>
          </div>
        </aside>

        {/* PANEL DERECHO DE INFORMACIÓN */}
        <main className="estudiante-content-panel">
          
          <div className="top-nav">
            <Link to="/login" className="back-link">
              ← Volver al ingreso
            </Link>
          </div>

          <div className="user-header">
            <div>
              <h3 className="u-fullname">{nombre}</h3>
              <span className="u-badge">Acceso Estudiantil</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutButton 
                style={{
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          <div className="module-info-box">
            <span className="module-code">{modulo}</span>
            {profesor && (
              <span className="teacher-name">
                <strong>Docente:</strong> {profesor}
              </span>
            )}
          </div>

          <h2 className="greeting-title">
            Hola, <span>{primerNombre}</span>
          </h2>

          {/* CORTES DE NOTAS */}
          <div className="cortes-list">
            
            {/* CORTE 1 */}
            <div className="corte-card">
              <div className="corte-badge badge-corte1">
                <span className="dot">•</span>
                <span>CORTE 1</span>
              </div>
              <div className="corte-nota">
                {Number(notas?.corte1 ?? 0).toFixed(1)}
              </div>
              <div className="corte-obs">
                <span className="obs-label">💬 OBSERVACIÓN CORTE 1</span>
                <p>{comentarios?.corte1 || "Sin observaciones"}</p>
              </div>
            </div>

            {/* CORTE 2 */}
            <div className="corte-card">
              <div className="corte-badge badge-corte2">
                <span className="dot">•</span>
                <span>CORTE 2</span>
              </div>
              <div className="corte-nota">
                {Number(notas?.corte2 ?? 0).toFixed(1)}
              </div>
              <div className="corte-obs">
                <span className="obs-label">💬 OBSERVACIÓN CORTE 2</span>
                <p>{comentarios?.corte2 || "Sin observaciones"}</p>
              </div>
            </div>

            {/* CORTE 3 */}
            <div className="corte-card">
              <div className="corte-badge badge-corte3">
                <span className="dot">•</span>
                <span>CORTE 3</span>
              </div>
              <div className="corte-nota">
                {Number(notas?.corte3 ?? 0).toFixed(1)}
              </div>
              <div className="corte-obs">
                <span className="obs-label">💬 OBSERVACIÓN CORTE 3</span>
                <p>{comentarios?.corte3 || "Sin observaciones"}</p>
              </div>
            </div>

            {/* NOTA FINAL & OBSERVACIÓN FINAL */}
            <div className={`corte-card final-card ${esAprobado ? 'aprobado' : 'reprobado'}`}>
              <div className="corte-badge badge-final">
                <span className="dot">•</span>
                <span>FINAL</span>
              </div>
              <div className="corte-nota">
                {notaFinal.toFixed(1)}
              </div>
              <div className="corte-obs">
                <span className="obs-label">🎗️ ESTADO Y OBSERVACIÓN FINAL</span>
                <p className="estado-texto" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {esAprobado ? "Módulo Aprobado ✨" : "Módulo Reprobado ⚠️"}
                </p>
                <p>{comentarios?.final || "Sin observaciones finales."}</p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default EstudianteDashboard;