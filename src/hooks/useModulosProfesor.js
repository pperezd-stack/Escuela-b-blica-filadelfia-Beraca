import { useEffect, useState } from "react";

import {
    cargarEstudiantesBD,
    guardarHistorialAcademicoAPI
} from "../services/profesorService";

import {
    MODULOS_DISPONIBLES
} from "../utils/constantes";

const useModulosProfesor = () => {

    const [listaGlobal, setListaGlobal] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

    // 🔑 OBTENER EL MÓDULO ACTUAL DEL PROFESOR DESDE EL LOCALSTORAGE
    const obtenerModuloProfesorSesion = () => {
        const usuarioStored = localStorage.getItem("usuario") || localStorage.getItem("user");
        let userObj = null;

        if (usuarioStored) {
            try {
                userObj = JSON.parse(usuarioStored);
            } catch (e) {
                console.error("Error parseando usuario:", e);
            }
        }

        const idMod = 
            localStorage.getItem("moduloId") || 
            localStorage.getItem("modulo_id") || 
            userObj?.moduloId || 
            userObj?.modulo_id || 
            userObj?.modulo?.id ||
            1; 

        const nombreMod = 
            localStorage.getItem("modulo") || 
            localStorage.getItem("moduloNombre") || 
            userObj?.moduloNombre ||
            userObj?.nombreModulo ||
            (typeof userObj?.modulo === "string" ? userObj.modulo : userObj?.modulo?.nombre) ||
            MODULOS_DISPONIBLES[idMod];

        return {
            id: parseInt(idMod, 10),
            nombre: nombreMod
        };
    };

    const moduloActual = obtenerModuloProfesorSesion();

    const [datos, setDatos] = useState({
        modulo: moduloActual.nombre || MODULOS_DISPONIBLES[1],
        corte1: "0.0",
        corte2: "0.0",
        corte3: "0.0",
        notaFinal: "0.0",
        comentario1: "",
        comentario2: "",
        comentario3: ""
    });

    useEffect(() => {
        obtenerDatos();
    }, []);

    useEffect(() => {
        const texto = buscador.toLowerCase().trim();

        setEstudiantes(
            listaGlobal.filter(
                e =>
                    e.nombre.toLowerCase().includes(texto) ||
                    e.codigo.toLowerCase().includes(texto)
            )
        );
    }, [buscador, listaGlobal]);

    useEffect(() => {
        const c1 = parseFloat(datos.corte1) || 0;
        const c2 = parseFloat(datos.corte2) || 0;
        const c3 = parseFloat(datos.corte3) || 0;

        setDatos(prev => ({
            ...prev,
            notaFinal: (((c1 + c2 + c3) / 3)).toFixed(1)
        }));
    }, [datos.corte1, datos.corte2, datos.corte3]);

    const obtenerDatos = async () => {
        try {
            const {
                estudiantes,
                calificaciones,
                observaciones
            } = await cargarEstudiantesBD();

            const moduloSesion = obtenerModuloProfesorSesion();

            const lista = estudiantes
                .map(alumno => {
                    const nota = calificaciones.find(
                        c =>
                            c.estudiante_id === alumno.id ||
                            c.estudianteId === alumno.id
                    );

                    const obs = observaciones.find(
                        o =>
                            o.estudiante_id === alumno.id ||
                            o.estudianteId === alumno.id
                    );

                    const idModuloNota = nota?.modulo_id ?? nota?.moduloId;
                    const nombreModuloNota = MODULOS_DISPONIBLES[idModuloNota] || nota?.modulo;

                    const moduloAsignado = nombreModuloNota || moduloSesion.nombre || MODULOS_DISPONIBLES[moduloSesion.id] || "Módulo General";

                    return {
                        id: alumno.id,
                        nombre: alumno.nombre,
                        codigo: alumno.correo || "",
                        moduloIdReal: idModuloNota || moduloSesion.id || 1,
                        modulo: moduloAsignado,
                        corte1: nota?.corte1 ?? "0.0",
                        corte2: nota?.corte2 ?? "0.0",
                        corte3: nota?.corte3 ?? "0.0",
                        notaFinal: nota?.notaFinal ?? nota?.nota_final ?? "0.0",
                        comentario1: obs?.comentario_corte1 ?? obs?.comentarioCorte1 ?? "",
                        comentario2: obs?.comentario_corte2 ?? obs?.comentarioCorte2 ?? "",
                        comentario3: obs?.comentario_corte3 ?? obs?.comentarioCorte3 ?? "",
                        calificacionId: nota?.id,
                        observacionId: obs?.id
                    };
                })
                .filter(alumno => {
                    if (!moduloSesion.id && !moduloSesion.nombre) return true;
                    
                    const coincideId = moduloSesion.id && Number(alumno.moduloIdReal) === Number(moduloSesion.id);
                    const coincideNombre = moduloSesion.nombre && alumno.modulo.toLowerCase() === moduloSesion.nombre.toLowerCase();

                    return coincideId || coincideNombre;
                });

            setListaGlobal(lista);
            setEstudiantes(lista);
        } catch (error) {
            console.error("Error al obtener datos del profesor:", error);
        }
    };

    const abrirModal = (estudiante) => {
        setEstudianteSeleccionado(estudiante);
        setDatos({
            modulo: estudiante.modulo,
            corte1: estudiante.corte1,
            corte2: estudiante.corte2,
            corte3: estudiante.corte3,
            notaFinal: estudiante.notaFinal,
            comentario1: estudiante.comentario1,
            comentario2: estudiante.comentario2,
            comentario3: estudiante.comentario3
        });
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setEstudianteSeleccionado(null);
    };

    const guardarCambios = async () => {
        if (!estudianteSeleccionado) return;

        const moduloId = Math.max(
            1,
            MODULOS_DISPONIBLES.indexOf(datos.modulo) !== -1 
                ? MODULOS_DISPONIBLES.indexOf(datos.modulo) 
                : (estudianteSeleccionado.moduloIdReal || 1)
        );

        const modeloCalificacion = {
            id: estudianteSeleccionado.calificacionId,
            estudianteId: estudianteSeleccionado.id,
            estudiante_id: estudianteSeleccionado.id,
            moduloId,
            modulo_id: moduloId,
            corte1: parseFloat(datos.corte1) || 0,
            corte2: parseFloat(datos.corte2) || 0,
            corte3: parseFloat(datos.corte3) || 0,
            notaFinal: parseFloat(datos.notaFinal) || 0,
            nota_final: parseFloat(datos.notaFinal) || 0
        };

        const modeloObservacion = {
            id: estudianteSeleccionado.observacionId,
            estudianteId: estudianteSeleccionado.id,
            estudiante_id: estudianteSeleccionado.id,
            moduloId,
            modulo_id: moduloId,
            comentarioCorte1: datos.comentario1 !== undefined && datos.comentario1 !== null ? String(datos.comentario1) : "",
            comentario_corte1: datos.comentario1 !== undefined && datos.comentario1 !== null ? String(datos.comentario1) : "",
            comentarioCorte2: datos.comentario2 !== undefined && datos.comentario2 !== null ? String(datos.comentario2) : "",
            comentario_corte2: datos.comentario2 !== undefined && datos.comentario2 !== null ? String(datos.comentario2) : "",
            comentarioCorte3: datos.comentario3 !== undefined && datos.comentario3 !== null ? String(datos.comentario3) : "",
            comentario_corte3: datos.comentario3 !== undefined && datos.comentario3 !== null ? String(datos.comentario3) : ""
        };

        try {
            await guardarHistorialAcademicoAPI(
                modeloCalificacion,
                modeloObservacion
            );

            cerrarModal();
            await obtenerDatos();
            alert("Historial guardado correctamente.");
        } catch (error) {
            console.error(error);
            alert("No fue posible guardar.");
        }
    };

    return {
        buscador,
        setBuscador,
        estudiantes,
        modalAbierto,
        estudianteSeleccionado,
        datos,
        setDatos,
        abrirModal,
        cerrarModal,
        guardarCambios,
        modulos: MODULOS_DISPONIBLES,
        moduloActualNombre: datos.modulo
    };
};

export default useModulosProfesor;