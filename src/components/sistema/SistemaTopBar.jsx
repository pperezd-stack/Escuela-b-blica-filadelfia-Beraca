import { useState } from "react";

import DropdownModulos from "./DropdownModulos";

const SistemaTopbar = ({ rol, modulo }) => {

    const [abrir,setAbrir]=useState(false);

    if(rol.toUpperCase()==="ESTUDIANTE"){

        return(

            <div className="top-bar">

                <div className="top-bar-title">

                    📘 Módulo:

                    <strong>

                        {modulo}

                    </strong>

                </div>

            </div>

        );

    }

    return(

        <div className="top-bar">

            <button

                className="top-bar-button"

                onClick={()=>setAbrir(!abrir)}

            >

                📚 Módulos

            </button>

            {

                abrir &&

                <DropdownModulos/>

            }

        </div>

    );

};

export default SistemaTopbar;