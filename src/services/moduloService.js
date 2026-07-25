const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/* ==========================================
   OBTENER TODOS LOS MÓDULOS
========================================== */

export async function obtenerTodos() {

    const respuesta = await fetch(`${API_BASE_URL}/modulos`);

    if (!respuesta.ok) {

        throw new Error(await respuesta.text());

    }

    return await respuesta.json();

}

/* ==========================================
   ALIAS
========================================== */

export const listarModulos = obtenerTodos;

/* ==========================================
   CREAR MÓDULO
========================================== */

export async function guardar(modulo) {

    const respuesta = await fetch(`${API_BASE_URL}/modulos`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(modulo)

    });

    if (!respuesta.ok) {

        throw new Error(await respuesta.text());

    }

    return await respuesta.json();

}

/* ==========================================
   ACTUALIZAR MÓDULO
========================================== */

export async function actualizar(id, modulo) {

    const respuesta = await fetch(`${API_BASE_URL}/modulos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(modulo)

    });

    if (!respuesta.ok) {

        throw new Error(await respuesta.text());

    }

    return await respuesta.json();

}

/* ==========================================
   ELIMINAR MÓDULO
========================================== */

export async function eliminar(id) {

    const respuesta = await fetch(`${API_BASE_URL}/modulos/${id}`, {

        method: "DELETE"

    });

    if (!respuesta.ok) {

        throw new Error(await respuesta.text());

    }

    return true;

}