import API from "./api";

/* ==========================================
   OBTENER TODAS
========================================== */

export const obtenerTodas = async () => {

    const response = await API.get("/observaciones");

    return response.data;

};

/* ==========================================
   OBTENER POR ESTUDIANTE
========================================== */

export const obtenerPorEstudiante = async (id) => {

    const response = await API.get(

        `/observaciones/estudiante/${id}`

    );

    return response.data;

};

/* ==========================================
   GUARDAR
========================================== */

export const guardar = async (observacion) => {

    const response = await API.post(

        "/observaciones",

        observacion

    );

    return response.data;

};

/* ==========================================
   ACTUALIZAR
========================================== */

export const actualizar = async (

    id,

    observacion

) => {

    const response = await API.put(

        `/observaciones/${id}`,

        observacion

    );

    return response.data;

};

/* ==========================================
   ELIMINAR
========================================== */

export const eliminar = async (id) => {

    const response = await API.delete(

        `/observaciones/${id}`

    );

    return response.data;

};