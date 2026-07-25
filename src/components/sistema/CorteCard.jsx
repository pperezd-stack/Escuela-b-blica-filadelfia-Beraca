const CorteCard = ({

    numero,

    nota,

    comentario

}) => {

    return (

        <div className="corte-card">

            <h3>

                CORTE {numero}

            </h3>

            <div className="nota">

                {nota}

            </div>

            <p className="comentario">

                {

                    comentario ||

                    "Aún no hay comentario del profesor."

                }

            </p>

        </div>

    );

};

export default CorteCard;