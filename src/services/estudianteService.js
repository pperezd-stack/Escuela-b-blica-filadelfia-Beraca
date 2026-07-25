import API from "./api";

/* ==========================================
   OBTENER DATOS DEL ESTUDIANTE
========================================== */

export const obtenerDatosEstudiante = async (nombre) => {

    const response = await API.get(

        `/estudiantes/${encodeURIComponent(nombre)}`

    );

    return response.data;

};

/* ==========================================
   OBTENER TODOS
========================================== */

export const obtenerTodos = async () => {

    const response = await API.get("/estudiantes");

    return response.data;

};

/* ==========================================
   OBTENER POR ID
========================================== */

export const obtenerPorId = async (id) => {

    const response = await API.get(

        `/estudiantes/${id}`

    );

    return response.data;

};