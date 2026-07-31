import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import "../../styles/pages/sistema/EstudianteDashboard.css";

const EstudianteDashboard = (props) => {
  const API_URL = "https://escuela-beraca-1.onrender.com";

  const [datosEstudiante, setDatosEstudiante] = useState({
    nombre: props.nombre || "Estudiante",
    modulo: props.modulo || "Cargando módulo...",
    profesor: props.profesor || "Cargando docente...",
    notas: props.notas || { corte1: 0, corte2: 0, corte3: 0, final: 0 },
    comentarios: props.comentarios || { corte1: "", corte2: "", corte3: "", final: "" }
  });

  useEffect(() => {
    const usuarioStored = localStorage.getItem("usuario");
    const moduloIdStored = localStorage.getItem("moduloId");

    if (usuarioStored) {
      try {
        const usuario = JSON.parse(usuarioStored);

        const nombreReal = typeof usuario.nombre === "object"
          ? (usuario.nombre?.nombre || usuario.nombre?.primerNombre || "Estudiante")
          : (usuario.nombre || props.nombre || "Estudiante");

        setDatosEstudiante(prev => ({
          ...prev,
          nombre: String(nombreReal)
        }));

        // 1. Obtener nombre del módulo y del profesor (Ruta corregida a /modulos/{id})
        if (moduloIdStored) {
          fetch(`${API_URL}/modulos/${moduloIdStored}`)
            .then(res => res.json())
            .then(modData => {
              if (modData && modData.nombre) {
                setDatosEstudiante(prev => ({
                  ...prev,
                  modulo: modData.nombre || modData.titulo || "Módulo Académico",
                  profesor: modData.profesor?.nombre || modData.nombreProfesor || "Docente Asignado"
                }));
              }
            })
            .catch(err => console.error("Error al cargar el módulo:", err));
        }

        const estudianteId = usuario.id;
        if (estudianteId) {
          // 2. Traer calificaciones reales
          fetch(`${API_URL}/calificaciones?rol=ESTUDIANTE&estudianteId=${estudianteId}`)
            .then(res => res.json())
            .then(dataList => {
              if (Array.isArray(dataList) && dataList.length > 0) {
                const cal = dataList.find(c => Number(c.modulo_id) === Number(moduloIdStored)) || dataList[0];
                
                if (cal) {
                  setDatosEstudiante(prev => ({
                    ...prev,
                    notas: {
                      corte1: cal.corte1 ?? 0,
                      corte2: cal.corte2 ?? 0,
                      corte3: cal.corte3 ?? 0,
                      final: cal.final ?? cal.notaFinal ?? 0,
                    }
                  }));
                }
              }
            })
            .catch(err => console.log("Error al cargar calificaciones", err));

          // 3. Traer observaciones reales
          fetch(`${API_URL}/observaciones?rol=ESTUDIANTE`)
            .then(res => res.json())
            .then(obsList => {
              if (Array.isArray(obsList) && obsList.length > 0) {
                const obsEstudiante = obsList.find(o => Number(o.estudiante_id) === Number(estudianteId) && Number(o.modulo_id) === Number(moduloIdStored)) || obsList[0];

                if (obsEstudiante) {
                  setDatosEstudiante(prev => ({
                    ...prev,
                    comentarios: {
                      corte1: obsEstudiante.corte1 ?? obsEstudiante.observacion1 ?? "",
                      corte2: obsEstudiante.observacion2 ?? obsEstudiante.observacion2 ?? "",
                      corte3: obsEstudiante.observacion3 ?? obsEstudiante.observacion3 ?? "",
                      final: obsEstudiante.final ?? obsEstudiante.observacionFinal ?? ""
                    }
                  }));
                }
              }
            })
            .catch(err => console.log("Error al cargar observaciones", err));
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
                className="btn-cerrar-sesion"
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