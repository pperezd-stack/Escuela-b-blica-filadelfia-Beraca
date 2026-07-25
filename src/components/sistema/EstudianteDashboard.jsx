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
    comentarios: props.comentarios || { corte1: "", corte2: "", corte3: "" }
  });

  useEffect(() => {
    // Si no vienen props directas, leemos la sesión de localStorage
    const usuarioStored = localStorage.getItem("usuario");

    if (usuarioStored) {
      try {
        const usuario = JSON.parse(usuarioStored);

        // Formatear nombre de forma segura
        const nombreReal = typeof usuario.nombre === "object"
          ? (usuario.nombre?.nombre || usuario.nombre?.primerNombre || "Estudiante")
          : (usuario.nombre || props.nombre || "Estudiante");

        setDatosEstudiante({
          nombre: String(nombreReal),
          modulo: usuario.modulo || usuario.nombreModulo || props.modulo || "MÓDULO DE APRENDIZAJE",
          profesor: usuario.profesor || usuario.nombreProfesor || props.profesor || "Docente Asignado",
          notas: {
            corte1: usuario.corte1 ?? props.notas?.corte1 ?? 0,
            corte2: usuario.corte2 ?? props.notas?.corte2 ?? 0,
            corte3: usuario.corte3 ?? props.notas?.corte3 ?? 0,
            final: usuario.final ?? props.notas?.final ?? 0,
          },
          comentarios: {
            corte1: usuario.comentario1 ?? usuario.comentarios?.corte1 ?? props.comentarios?.corte1 ?? "",
            corte2: usuario.comentario2 ?? usuario.comentarios?.corte2 ?? props.comentarios?.corte2 ?? "",
            corte3: usuario.comentario3 ?? usuario.comentarios?.corte3 ?? props.comentarios?.corte3 ?? "",
          }
        });
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
            <LogoutButton />
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

            {/* NOTA FINAL & ESTADO */}
            <div className={`corte-card final-card ${esAprobado ? 'aprobado' : 'reprobado'}`}>
              <div className="corte-badge badge-final">
                <span className="dot">•</span>
                <span>FINAL</span>
              </div>
              <div className="corte-nota">
                {notaFinal.toFixed(1)}
              </div>
              <div className="corte-obs">
                <span className="obs-label">🎗️ ESTADO DEL MÓDULO</span>
                <p className="estado-texto">
                  {esAprobado ? "Módulo Aprobado ✨" : "Módulo Reprobado ⚠️"}
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default EstudianteDashboard;