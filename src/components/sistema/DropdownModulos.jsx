import modulos from "../../data/modulos";

const DropdownModulos=()=>{

    return(

        <div className="dropdown-menu-custom">

            {

                modulos.map(modulo=>(

                    <a

                        key={modulo.id}

                        href={modulo.enlace}

                        target="_blank"

                        rel="noreferrer"

                    >

                        {modulo.nombre}

                    </a>

                ))

            }

        </div>

    );

};

export default DropdownModulos;