import API from "./api";

/* ==========================================
   OBTENER TODOS
========================================== */

export const obtenerTodos = async () => {

    const response = await API.get(

        "/modulosEstudiante"

    );

    return response.data;

};

/* ==========================================
   OBTENER POR ESTUDIANTE
========================================== */

export const obtenerPorEstudiante = async (

    estudianteId

) => {

    const response = await API.get(

        `/modulosEstudiante/estudiante/${estudianteId}`

    );

    return response.data;

};

/* ==========================================
   GUARDAR MATRÍCULA
========================================== */

export const guardar = async (datos) => {

    const response = await API.post(

        "/modulosEstudiante",

        datos

    );

    return response.data;

};

/* Alias para el registro */

export const crearEstudianteModulo = guardar;

/* ==========================================
   ACTUALIZAR
========================================== */

export const actualizar = async (

    id,

    datos

) => {

    const response = await API.put(

        `/modulosEstudiante/${id}`,

        datos

    );

    return response.data;

};

/* ==========================================
   CAMBIAR MÓDULO
========================================== */

export const cambiarModulo = async (

    estudianteId,

    moduloId

) => {

    const response = await API.put(

        `/modulosEstudiante/cambiar`,

        {

            estudianteId,

            moduloId

        }

    );

    return response.data;

};