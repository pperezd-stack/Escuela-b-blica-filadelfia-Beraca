import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "../styles/pages/ListaEstudiantes/ListaEstudiantes.css";

import ListaEstudiantesModal from "../components/estudiante/ListaEstudiantesModal";

const CARRUSEL_IMAGENES = [
  "/img/predica.jpg",
  "/img/unidos.jpg",
  "/img/bautismo.jpg",
  "/img/frase.jpg",
  "/img/compartir.jpg",
  "/img/grupo.jpg",
];

export default function ListaEstudiantes() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  /* ==========================
            ESTADOS
  ========================== */
  const [usuarios, setUsuarios] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [observaciones, setObservaciones] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [errorCarga, setErrorCarga] = useState(null);

  /* ==========================
     MÓDULO DEL PROFESOR (DETECCIÓN ROBUSTA)
  ========================== */
  const obtenerModuloProfesor = () => {
    const usuarioStored = localStorage.getItem("usuario") || localStorage.getItem("user");
    let userObj = null;

    if (usuarioStored) {
      try {
        userObj = JSON.parse(usuarioStored);
      } catch (e) {
        console.error("Error parseando usuario de localStorage:", e);
      }
    }

    if (userObj && String(userObj.rol || localStorage.getItem("rol") || "").toUpperCase() === "PROFESOR") {
      const idModulo = userObj.moduloId ?? userObj.modulo_id ?? userObj.idModulo;
      if (idModulo) {
        localStorage.setItem("moduloId", idModulo.toString());
      }
    }

    const posibleId = 
      localStorage.getItem("moduloId") || 
      localStorage.getItem("modulo_id") || 
      userObj?.moduloId || 
      userObj?.modulo_id || 
      userObj?.idModulo || 
      userObj?.modulo?.id;

    const posibleNombre = 
      localStorage.getItem("modulo") || 
      localStorage.getItem("moduloNombre") || 
      userObj?.moduloNombre ||
      userObj?.nombreModulo ||
      (typeof userObj?.modulo === "string" ? userObj.modulo : userObj?.modulo?.nombre);

    return { posibleId, posibleNombre, userObj };
  };

  const { posibleId, posibleNombre, userObj } = obtenerModuloProfesor();

  const moduloEncontrado = modulos.find((m) => {
    if (posibleId && Number(m.id) === Number(posibleId)) return true;
    if (posibleNombre && m.nombre?.trim().toLowerCase() === posibleNombre?.trim().toLowerCase()) return true;
    return false;
  });

  const moduloProfesorId = 
    moduloEncontrado?.id || 
    (posibleId && !isNaN(posibleId) ? parseInt(posibleId, 10) : null) || 
    (modulos.length > 0 ? modulos[0].id : null);

  const moduloProfesorNombre = 
    moduloEncontrado?.nombre || 
    posibleNombre || 
    (modulos.length > 0 ? modulos[0].nombre : "");

  const moduloProfesorLabel = moduloProfesorNombre 
    ? moduloProfesorNombre 
    : (moduloProfesorId ? `Módulo #${moduloProfesorId}` : "Seleccione un Módulo");

  /* ==========================
        MODAL & FORMULARIO
  ========================== */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [matriculaSeleccionada, setMatriculaSeleccionada] = useState(null);

  const [guardandoMatricula, setGuardandoMatricula] = useState(false);
  const [guardandoHistorial, setGuardandoHistorial] = useState(false);

  const [moduloSelect, setModuloSelect] = useState("");

  const [corte1, setCorte1] = useState("0.0");
  const [corte2, setCorte2] = useState("0.0");
  const [corte3, setCorte3] = useState("0.0");
  const [notaFinal, setNotaFinal] = useState("0.0");

  const [obsCorte1, setObsCorte1] = useState("");
  const [obsCorte2, setObsCorte2] = useState("");
  const [obsCorte3, setObsCorte3] = useState("");
  const [obsFinal, setObsFinal] = useState(""); // <--- Estado para el comentario de la nota final

  const [calificacionId, setCalificacionId] = useState(null);
  const [observacionId, setObservacionId] = useState(null);

  useEffect(() => {
    fetchInicial();
  }, []);

  useEffect(() => {
    if (moduloProfesorId) {
      setModuloSelect(String(moduloProfesorId));
    }
  }, [moduloProfesorId, modulos]);

  useEffect(() => {
    const n1 = parseFloat(corte1) || 0;
    const n2 = parseFloat(corte2) || 0;
    const n3 = parseFloat(corte3) || 0;

    setNotaFinal(((n1 + n2 + n3) / 3).toFixed(1));
  }, [corte1, corte2, corte3]);

  /* ==========================
     CARGAR INFORMACIÓN
  ========================== */
  const parseResponseSafe = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  const fetchInicial = async () => {
    try {
      const rolLocal = localStorage.getItem("rol") || "PROFESOR";
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const [
        resUsers,
        resCal,
        resObs,
        resModulos,
        resMatriculas,
      ] = await Promise.all([
        fetch(`${API_URL}/usuarios?rol=ESTUDIANTE`, { headers }),
        fetch(`${API_URL}/calificaciones?rol=${rolLocal}`, { headers }),
        fetch(`${API_URL}/observaciones?rol=${rolLocal}`, { headers }),
        fetch(`${API_URL}/modulos?rol=${rolLocal}`, { headers }),
        fetch(`${API_URL}/modulosEstudiante?rol=${rolLocal}`, { headers }),
      ]);

      const dataUsers = await parseResponseSafe(resUsers);
      const dataCal = await parseResponseSafe(resCal);
      const dataObs = await parseResponseSafe(resObs);
      const dataModulos = await parseResponseSafe(resModulos);
      const dataMatriculas = await parseResponseSafe(resMatriculas);

      if (Array.isArray(dataUsers)) setUsuarios(dataUsers);
      if (Array.isArray(dataCal)) setCalificaciones(dataCal);
      if (Array.isArray(dataObs)) setObservaciones(dataObs);
      if (Array.isArray(dataModulos)) setModulos(dataModulos);
      if (Array.isArray(dataMatriculas)) setMatriculas(dataMatriculas);

      if (!resUsers.ok || !resCal.ok || !resObs.ok || !resModulos.ok || !resMatriculas.ok) {
        setErrorCarga("Ocurrió un inconveniente al obtener algunos datos del servidor.");
      } else {
        setErrorCarga(null);
      }
    } catch (err) {
      console.error("Error en fetchInicial:", err);
      setErrorCarga("No fue posible conectar con el servidor backend.");
    }
  };

  const getCalificacionEstudiante = (estudianteId) => {
    return calificaciones.find((c) => {
      const mismoEstudiante = Number(c.estudiante_id ?? c.estudianteId) === Number(estudianteId);
      const mismoModulo = 
        (moduloProfesorId && Number(c.modulo_id ?? c.moduloId) === Number(moduloProfesorId)) ||
        (moduloProfesorNombre && String(c.modulo || c.nombreModulo).toLowerCase() === moduloProfesorNombre.toLowerCase());

      return mismoEstudiante && mismoModulo;
    });
  };

  /* ==========================
     MODAL FUNCIONES
  ========================== */
  const abrirPerfil = (estudiante) => {
    setSelectedEstudiante(estudiante);

    const matricula = matriculas.find((mat) => {
      const idEst = mat.estudiante_id ?? mat.estudianteId;
      return Number(idEst) === Number(estudiante.id);
    });

    setMatriculaSeleccionada(matricula || null);

    const recordCal = getCalificacionEstudiante(estudiante.id);
    const recordObs = observaciones.find(
      (o) => Number(o.estudiante_id ?? o.estudianteId) === Number(estudiante.id)
    );

    const idModuloAsignado = 
      recordCal?.modulo_id || 
      recordCal?.moduloId || 
      matricula?.modulo_id || 
      matricula?.moduloId || 
      moduloProfesorId || 
      (modulos[0]?.id ?? "");

    setModuloSelect(idModuloAsignado ? String(idModuloAsignado) : "");

    if (recordCal) {
      setCalificacionId(recordCal.id ?? null);
      setCorte1(recordCal.corte1?.toString() || "0.0");
      setCorte2(recordCal.corte2?.toString() || "0.0");
      setCorte3(recordCal.corte3?.toString() || "0.0");
      setNotaFinal(recordCal.notaFinal?.toString() || recordCal.nota_final?.toString() || "0.0");
    } else {
      setCalificacionId(null);
      setCorte1("0.0");
      setCorte2("0.0");
      setCorte3("0.0");
      setNotaFinal("0.0");
    }

    if (recordObs) {
      setObservacionId(recordObs.id ?? null);
      setObsCorte1(recordObs.comentario_corte1 || recordObs.comentarioCorte1 || "");
      setObsCorte2(recordObs.comentario_corte2 || recordObs.comentarioCorte2 || "");
      setObsCorte3(recordObs.comentario_corte3 || recordObs.comentarioCorte3 || "");
      setObsFinal(recordObs.comentario_final || recordObs.comentarioFinal || ""); // <--- Cargando comentario final
    } else {
      setObservacionId(null);
      setObsCorte1("");
      setObsCorte2("");
      setObsCorte3("");
      setObsFinal("");
    }

    setModalOpen(true);
  };

  const actualizarMatricula = async () => {
    if (!selectedEstudiante || !matriculaSeleccionada || !moduloSelect) return;
    setGuardandoMatricula(true);

    try {
      const rolLocal = localStorage.getItem("rol") || "PROFESOR";
      const respuesta = await fetch(
        `${API_URL}/modulosEstudiante/actualizar?rol=${rolLocal}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: matriculaSeleccionada.id,
            estudiante_id: selectedEstudiante.id,
            modulo_id: parseInt(moduloSelect, 10),
          }),
        }
      );

      const texto = await respuesta.text();
      if (!respuesta.ok) return alert("⚠️ " + texto);

      alert("✅ Módulo actualizado.");
      await fetchInicial();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("No fue posible actualizar la matrícula.");
    } finally {
      setGuardandoMatricula(false);
    }
  };

  const eliminarMatricula = async () => {
    if (!selectedEstudiante || !matriculaSeleccionada) return;
    if (!window.confirm(`¿Quitar a ${selectedEstudiante.nombre} del módulo?`)) return;

    setGuardandoMatricula(true);

    try {
      const rolLocal = localStorage.getItem("rol") || "PROFESOR";
      const respuesta = await fetch(
        `${API_URL}/modulosEstudiante/eliminar/${matriculaSeleccionada.id}?rol=${rolLocal}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) return alert("⚠️ " + (await respuesta.text()));

      alert("🗑️ Estudiante eliminado.");
      setModalOpen(false);
      await fetchInicial();
    } catch (err) {
      console.error(err);
      alert("Error eliminando matrícula.");
    } finally {
      setGuardandoMatricula(false);
    }
  };

  /* ==========================
     GUARDAR HISTORIAL
  ========================== */
  const guardarHistorial = async () => {
    if (!selectedEstudiante) return alert("Selecciona un estudiante válido.");

    const idModuloNum = parseInt(moduloSelect || moduloProfesorId || (modulos[0]?.id ?? 1), 10);

    if (isNaN(idModuloNum) || idModuloNum <= 0) {
      return alert("⚠️ Error: El módulo seleccionado no es válido o no ha cargado.");
    }

    const parsedCorte1 = parseFloat(corte1) || 0.0;
    const parsedCorte2 = parseFloat(corte2) || 0.0;
    const parsedCorte3 = parseFloat(corte3) || 0.0;
    const parsedNotaFinal = parseFloat(notaFinal) || 0.0;

    const payloadCalificaciones = {
      ...(calificacionId ? { id: calificacionId } : {}),
      estudianteId: parseInt(selectedEstudiante.id, 10),
      estudiante_id: parseInt(selectedEstudiante.id, 10),
      moduloId: idModuloNum,
      modulo_id: idModuloNum,
      corte1: parsedCorte1,
      corte2: parsedCorte2,
      corte3: parsedCorte3,
      notaFinal: parsedNotaFinal,
      nota_final: parsedNotaFinal
    };

    const payloadObservaciones = {
      ...(observacionId ? { id: observacionId } : {}),
      estudianteId: parseInt(selectedEstudiante.id, 10),
      estudiante_id: parseInt(selectedEstudiante.id, 10),
      moduloId: idModuloNum,
      modulo_id: idModuloNum,
      comentarioCorte1: obsCorte1 || "",
      comentario_corte1: obsCorte1 || "",
      comentarioCorte2: obsCorte2 || "",
      comentario_corte2: obsCorte2 || "",
      comentarioCorte3: obsCorte3 || "",
      comentario_corte3: obsCorte3 || "",
      comentarioFinal: obsFinal || "", // <--- Incluido en el payload enviando a la API
      comentario_final: obsFinal || ""  // <--- Incluido por compatibilidad de nombres de columnas
    };

    setGuardandoHistorial(true);

    try {
      const rolLocal = localStorage.getItem("rol") || "PROFESOR";
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const endpointObs = observacionId 
        ? `${API_URL}/observaciones/actualizar?rol=${rolLocal}`
        : `${API_URL}/observaciones/crear?rol=${rolLocal}`;

      const methodObs = observacionId ? "PUT" : "POST";

      const [resCal, resObs] = await Promise.all([
        fetch(`${API_URL}/calificaciones/crear?rol=${rolLocal}`, {
          method: "POST",
          headers,
          body: JSON.stringify(payloadCalificaciones),
        }),
        fetch(endpointObs, {
          method: methodObs,
          headers,
          body: JSON.stringify(payloadObservaciones),
        }),
      ]);

      const textCal = await resCal.text();
      const textObs = await resObs.text();

      if (!resCal.ok || !resObs.ok) {
        alert(`⚠️ Error del Servidor al guardar:\n${!resCal.ok ? 'Calificaciones: ' + textCal : ''}\n${!resObs.ok ? 'Observaciones: ' + textObs : ''}`);
        return;
      }

      alert("✨ Notas e historial guardados correctamente.");
      setModalOpen(false);
      fetchInicial();
    } catch (err) {
      console.error("Error en petición guardarHistorial:", err);
      alert("Error de conexión al guardar historial.");
    } finally {
      setGuardandoHistorial(false);
    }
  };

  /* ==========================
     FILTRO DE ESTUDIANTES
  ========================== */
  const estudiantesFiltrados = usuarios.filter((u) => {
    const rolUsuario = String(u.rol || "").toLowerCase();
    if (rolUsuario === "profesor" || rolUsuario === "admin") return false;

    const termino = busqueda.toLowerCase().trim();
    if (!termino) return true;

    return (
      u.nombre?.toLowerCase().includes(termino) ||
      u.id?.toString().includes(termino)
    );
  });

  return (
    <div className="login-card">
      {/* PANEL IZQUIERDO */}
      <div className="deco-panel">
        <div id="carruselDeco" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {CARRUSEL_IMAGENES.map((src, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                <img src={src} alt={`Escuela Bíblica ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="deco-content">
          <div className="deco-logo">
            <div className="sup">Escuela Bíblica</div>
            <h1>Filadelfia<br /><span>Beraca</span></h1>
            <div className="sub">El Carito · Sistema Académico</div>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="form-panel">
        <div className="form-scroll">
          <a
            href="/sistema"
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/sistema");
            }}
          >
            <i className="bi bi-arrow-left"></i> Volver al panel
          </a>

          <div className="user-bar">
            <div>
              <div className="u-name">Profesor</div>
              <div className="u-role">Acceso Docente</div>
            </div>
            <a href="/" className="btn-logout-sm"><i className="bi bi-box-arrow-right"></i> Salir</a>
          </div>

          {errorCarga && (
            <div className="info-box" style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#4e1cb9", marginBottom: 16 }}>
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{errorCarga}</span>
            </div>
          )}

          <div className="form-heading">
            <div className="form-heading-text">
              <h2>Lista de <em>Estudiantes</em></h2>
              <div className="modulo-profesor-info">
                <i className="bi bi-journal-bookmark"></i> {moduloProfesorLabel}
              </div>
            </div>
          </div>

          {/* BUSCADOR */}
          <div className="search-row">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="search-count">{estudiantesFiltrados.length} estudiantes</span>
          </div>

          {/* LISTA DE ESTUDIANTES */}
          <div className="student-list-container" style={{ marginTop: '15px' }}>
            {estudiantesFiltrados.length > 0 ? (
              <div className="list-group">
                {estudiantesFiltrados.map((estudiante) => {
                  const cal = getCalificacionEstudiante(estudiante.id);

                  return (
                    <div
                      key={estudiante.id}
                      onClick={() => abrirPerfil(estudiante)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        marginBottom: '8px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s ease',
                      }}
                      className="student-list-item"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <i className="bi bi-person-badge" style={{ fontSize: '1.5rem', color: '#0d9488' }}></i>
                        <div>
                          <strong style={{ display: 'block', color: '#1f2937' }}>{estudiante.nombre}</strong>
                          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>ID: #{estudiante.id}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block' }}>Nota Final</span>
                          <strong style={{ color: cal ? '#0f766e' : '#9ca3af' }}>
                            {cal?.notaFinal || cal?.nota_final || "0.0"}
                          </strong>
                        </div>
                        <i className="bi bi-chevron-right" style={{ color: '#9ca3af' }}></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="no-data">No hay estudiantes registrados en el sistema.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL PARA EDICIÓN DE NOTAS */}
      <ListaEstudiantesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        estudiante={selectedEstudiante}
        modulos={modulos}
        moduloSelect={moduloSelect}
        setModuloSelect={setModuloSelect}
        matriculaSeleccionada={matriculaSeleccionada}
        guardandoMatricula={guardandoMatricula}
        actualizarMatricula={actualizarMatricula}
        eliminarMatricula={eliminarMatricula}
        corte1={corte1}
        setCorte1={setCorte1}
        corte2={corte2}
        setCorte2={setCorte2}
        corte3={corte3}
        setCorte3={setCorte3}
        notaFinal={notaFinal}
        obsCorte1={obsCorte1}
        setObsCorte1={setObsCorte1}
        obsCorte2={obsCorte2}
        setObsCorte2={setObsCorte2}
        obsCorte3={obsCorte3}
        setObsCorte3={setObsCorte3}
        obsFinal={obsFinal}         // <--- Prop pass para el comentario final
        setObsFinal={setObsFinal}   // <--- Prop pass para actualizar el comentario final
        guardarHistorial={guardarHistorial}
        guardandoHistorial={guardandoHistorial}
        moduloActual={moduloProfesorLabel}
      />
    </div>
  );
}