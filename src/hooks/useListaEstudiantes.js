import { useState, useEffect } from "react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function useListaEstudiantes() {

    // ===========================
    // Estados principales
    // ===========================

    const [usuarios, setUsuarios] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [observaciones, setObservaciones] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [matriculas, setMatriculas] = useState([]);

    const [busqueda, setBusqueda] = useState("");
    const [errorCarga, setErrorCarga] = useState(null);

    // ===========================
    // Datos del profesor
    // ===========================

    const moduloProfesorId =
        parseInt(localStorage.getItem("moduloId"), 10) || null;

    const moduloProfesorLabel =
        modulos.find(m => m.id === moduloProfesorId)?.nombre ||
        "Sin módulo asignado";

    // ===========================
    // Estados del Modal
    // ===========================

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedEstudiante, setSelectedEstudiante] =
        useState(null);

    const [matriculaSeleccionada, setMatriculaSeleccionada] =
        useState(null);

    const [guardandoMatricula, setGuardandoMatricula] =
        useState(false);

    const [guardandoHistorial, setGuardandoHistorial] =
        useState(false);

    // ===========================
    // Estados del formulario
    // ===========================

    const [moduloSelect, setModuloSelect] =
        useState(moduloProfesorId || "");

    const [corte1, setCorte1] = useState("0.0");
    const [corte2, setCorte2] = useState("0.0");
    const [corte3, setCorte3] = useState("0.0");

    const [notaFinal, setNotaFinal] =
        useState("0.0");

    const [obsCorte1, setObsCorte1] =
        useState("");

    const [obsCorte2, setObsCorte2] =
        useState("");

    const [obsCorte3, setObsCorte3] =
        useState("");

    const [calificacionId, setCalificacionId] =
        useState(null);

    const [observacionId, setObservacionId] =
        useState(null);

    // ===========================
    // Carga inicial
    // ===========================

    useEffect(() => {

        fetchInicial();

    }, []);

    // ===========================
    // Calcular promedio
    // ===========================

    useEffect(() => {

        const n1 = parseFloat(corte1) || 0;
        const n2 = parseFloat(corte2) || 0;
        const n3 = parseFloat(corte3) || 0;

        setNotaFinal(
            ((n1 + n2 + n3) / 3).toFixed(1)
        );

    }, [corte1, corte2, corte3]);

    // ===========================
    // Obtener información
    // ===========================

    const fetchInicial = async () => {

        try {

            const rolLocal =
                localStorage.getItem("rol") || "PROFESOR";

            const [

                resUsers,
                resCal,
                resObs,
                resModulos,
                resMatriculas

            ] = await Promise.all([

                fetch(`${API_BASE_URL}/usuarios`),

                fetch(`${API_BASE_URL}/calificaciones?rol=${rolLocal}`),

                fetch(`${API_BASE_URL}/observaciones?rol=${rolLocal}`),

                fetch(`${API_BASE_URL}/modulos`),

                fetch(`${API_BASE_URL}/modulosEstudiante?rol=${rolLocal}`)

            ]);

            if (resUsers.ok)
                setUsuarios(await resUsers.json());

            if (resCal.ok)
                setCalificaciones(await resCal.json());

            if (resObs.ok)
                setObservaciones(await resObs.json());

            if (resModulos.ok)
                setModulos(await resModulos.json());

            if (resMatriculas.ok)
                setMatriculas(await resMatriculas.json());

            if (

                !resUsers.ok ||

                !resCal.ok ||

                !resObs.ok ||

                !resModulos.ok ||

                !resMatriculas.ok

            ) {

                setErrorCarga(
                    "Algunos datos no pudieron cargarse."
                );

            } else {

                setErrorCarga(null);

            }

        } catch (error) {

            console.error(error);

            setErrorCarga(
                "No fue posible conectar con el servidor."
            );

        }

    };

    // ===========================
    // Funciones auxiliares
    // ===========================

    const getCalificacionEstudiante = (estudianteId) => {

        return calificaciones.find(c => {

            const mismoEstudiante =

                c.estudiante_id === estudianteId ||

                c.estudianteId === estudianteId;

            const idModulo =
                c.modulo_id ?? c.moduloId;

            return (

                mismoEstudiante &&

                Number(idModulo) === moduloProfesorId

            );

        });

    };

    const estaMatriculado = (estudianteId) => {

        return matriculas.some(m => {

            const idEst =
                m.estudiante_id ?? m.estudianteId;

            const idMod =
                m.modulo_id ?? m.moduloId;

            return (

                idEst === estudianteId &&

                Number(idMod) === moduloProfesorId

            );

        });

    };

    const estudiantesFiltrados = usuarios.filter(u => {

        if (u.rol === "profesor")
            return false;

        if (!estaMatriculado(u.id))
            return false;

        const texto =
            busqueda.toLowerCase().trim();

        if (!texto)
            return true;

        return (

            u.nombre?.toLowerCase().includes(texto)

            ||

            u.id?.toString().includes(texto)

        );

    })

        // ===========================
    // Buscar calificación del estudiante
    // ===========================

    const getCalificacionEstudiante = (estudianteId) => {

        return calificaciones.find(c => {

            const mismoEstudiante =

                (c.estudiante_id === estudianteId ||
                 c.estudianteId === estudianteId);

            const idModulo =

                c.modulo_id ?? c.moduloId;

            return (

                mismoEstudiante &&

                Number(idModulo) === moduloProfesorId

            );

        });

    };

    // ===========================
    // Verificar matrícula
    // ===========================

    const estaMatriculadoEnModuloProfesor = (estudianteId) => {

        return matriculas.some(mat => {

            const idEst =
                mat.estudiante_id ?? mat.estudianteId;

            const idMod =
                mat.modulo_id ?? mat.moduloId;

            return (

                idEst === estudianteId &&

                Number(idMod) === moduloProfesorId

            );

        });

    };

    // ===========================
    // Lista filtrada
    // ===========================

    const estudiantesFiltrados = usuarios.filter(u => {

        if (u.rol === "profesor")
            return false;

        if (!estaMatriculadoEnModuloProfesor(u.id))
            return false;

        const termino = busqueda.toLowerCase().trim();

        if (!termino)
            return true;

        return (

            u.nombre
                ?.toLowerCase()
                .includes(termino)

            ||

            u.id
                ?.toString()
                .includes(termino)

        );

    });
    return {

    usuarios,
    calificaciones,
    observaciones,
    modulos,
    matriculas,

    busqueda,
    setBusqueda,

    estudiantesFiltrados,

    moduloProfesorId,
    moduloProfesorLabel,

    errorCarga,

    modalOpen,
    setModalOpen,

    selectedEstudiante,

    matriculaSeleccionada,

    guardandoMatricula,

    guardandoHistorial,

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

    abrirPerfil,

    actualizarMatricula,

    eliminarMatricula,

    guardarHistorial,

    fetchInicial

};
}

