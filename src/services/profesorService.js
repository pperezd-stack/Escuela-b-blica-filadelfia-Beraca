import API from "./api";

/*
====================================
ESTUDIANTES
====================================
*/

export const obtenerEstudiantes = async (profesorId) => {

    const response = await API.get(
        `/profesor/${profesorId}/estudiantes`
    );

    return response.data;

};

/*
====================================
MÓDULO DEL PROFESOR
====================================
*/

export const obtenerModuloProfesor = async (profesorId) => {

    const response = await API.get(
        `/profesor/${profesorId}/modulo`
    );

    return response.data;

};

/*
====================================
TODOS LOS MÓDULOS
====================================
*/

export const obtenerModulos = async () => {

    const response = await API.get("/modulos");

    return response.data;

};

/*
====================================
CARGAR DATOS DEL PROFESOR
====================================
*/

export const cargarEstudiantesBD = async () => {

    const [

        usuarios,

        calificaciones,

        observaciones

    ] = await Promise.all([

        API.get("/usuarios"),

        API.get("/calificaciones"),

        API.get("/observaciones")

    ]);

    return {

        estudiantes: usuarios.data,

        calificaciones: calificaciones.data,

        observaciones: observaciones.data

    };

};

/*
====================================
CARGAR MATRÍCULAS
====================================
*/

export const cargarMatriculasBD = async () => {

    const response = await API.get("/modulosEstudiante");

    return response.data;

};

/*
====================================
ACTUALIZAR MATRÍCULA
====================================
*/

export const actualizarMatriculaBD = async (

    matriculaId,

    estudianteId,

    moduloId

) => {

    const response = await API.put(

        "/modulosEstudiante/actualizar",

        {

            id: matriculaId,

            estudiante_id: estudianteId,

            modulo_id: Number(moduloId)

        }

    );

    return response.data;

};

/*
====================================
ELIMINAR MATRÍCULA
====================================
*/

export const eliminarMatriculaBD = async (

    matriculaId

) => {

    const response = await API.delete(

        `/modulosEstudiante/eliminar/${matriculaId}`

    );

    return response.data;

};

/*
====================================
CAMBIAR MÓDULO
====================================
*/

export const cambiarModulo = async (

    estudianteId,

    moduloId

) => {

    const response = await API.put(

        `/profesor/cambiarModulo/${estudianteId}/${moduloId}`

    );

    return response.data;

};

/*
====================================
GUARDAR CALIFICACIÓN
====================================
*/

export const guardarCalificacion = async (calificacion) => {

    const response = await API.post(

        "/calificaciones/crear",

        calificacion

    );

    return response.data;

};

/*
====================================
ACTUALIZAR CALIFICACIÓN
====================================
*/

export const actualizarCalificacion = async (calificacion) => {

    const response = await API.put(

        "/calificaciones/actualizar",

        calificacion

    );

    return response.data;

};

/*
====================================
GUARDAR OBSERVACIÓN
====================================
*/

export const guardarObservacion = async (observacion) => {

    const response = await API.post(

        "/observaciones/crear",

        observacion

    );

    return response.data;

};

/*
====================================
ACTUALIZAR OBSERVACIÓN
====================================
*/

export const actualizarObservacion = async (observacion) => {

    const response = await API.put(

        "/observaciones/actualizar",

        observacion

    );

    return response.data;

};

/*
====================================
GUARDAR HISTORIAL
====================================
*/

export const guardarHistorialAcademico = async (

    estudianteId,

    datos

) => {

    await cambiarModulo(

        estudianteId,

        datos.moduloId

    );

    const calificacion = {

        id: datos.calificacionId,

        estudiante: {

            id: estudianteId

        },

        modulo: {

            id: datos.moduloId

        },

        corte1: datos.corte1,

        corte2: datos.corte2,

        corte3: datos.corte3,

        notaFinal: datos.notaFinal

    };

    if (datos.calificacionId) {

        await actualizarCalificacion(calificacion);

    } else {

        await guardarCalificacion(calificacion);

    }

    const observacion = {

        id: datos.observacionId,

        estudiante: {

            id: estudianteId

        },

        modulo: {

            id: datos.moduloId

        },

        comentarioCorte1: datos.comentarioCorte1,

        comentarioCorte2: datos.comentarioCorte2,

        comentarioCorte3: datos.comentarioCorte3,

        fecha: new Date().toISOString()

    };

    if (datos.observacionId) {

        await actualizarObservacion(observacion);

    } else {

        await guardarObservacion(observacion);

    }

    return true;

};

/*
====================================
GUARDAR HISTORIAL (HOOK)
====================================
*/

export const guardarHistorialAcademicoAPI = async (

    calificacion,

    observacion

) => {

    if (calificacion.id) {

        await actualizarCalificacion(calificacion);

    } else {

        await guardarCalificacion(calificacion);

    }

    if (observacion.id) {

        await actualizarObservacion(observacion);

    } else {

        await guardarObservacion(observacion);

    }

    return true;

};