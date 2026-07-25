import API from "./api";

/* ==========================================
   OBTENER TODAS
========================================== */

export const obtenerTodas = async () => {

    const response = await API.get("/calificaciones");

    return response.data;

};

/* ==========================================
   OBTENER POR ESTUDIANTE
========================================== */

export const obtenerPorEstudiante = async (id) => {

    const response = await API.get(

        `/calificaciones/estudiante/${id}`

    );

    return response.data;

};

/* ==========================================
   GUARDAR
========================================== */

export const guardar = async (calificacion) => {

    const response = await API.post(

        "/calificaciones",

        calificacion

    );

    return response.data;

};

/* ==========================================
   ACTUALIZAR
========================================== */

export const actualizar = async (

    id,

    calificacion

) => {

    const response = await API.put(

        `/calificaciones/${id}`,

        calificacion

    );

    return response.data;

};

/* ==========================================
   ELIMINAR
========================================== */

export const eliminar = async (id) => {

    const response = await API.delete(

        `/calificaciones/${id}`

    );

    return response.data;

};