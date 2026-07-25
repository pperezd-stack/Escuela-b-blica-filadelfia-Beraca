import { useEffect, useState } from "react";

import {

    obtenerEstudiantes,

    obtenerModulos

} from "../services/profesorService";

const useProfesor = (profesorId) => {

    const [estudiantes, setEstudiantes] = useState([]);

    const [modulos, setModulos] = useState([]);

    useEffect(() => {

        if(profesorId){

            cargarDatos();

        }

    }, [profesorId]);

    const cargarDatos = async () => {

        try{

            const estudiantesBD =

                await obtenerEstudiantes(profesorId);

            const modulosBD =

                await obtenerModulos();

            setEstudiantes(estudiantesBD);

            setModulos(modulosBD);

        }

        catch(error){

            console.error(error);

        }

    };

    return{

        estudiantes,

        modulos,

        cargarDatos

    };

};

export default useProfesor;