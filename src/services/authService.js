import API from "./api";

export const login = async (nombre, password) => {

    const response = await API.post("/auth/login", {

        nombre,
        password

    });

    return response.data;

};