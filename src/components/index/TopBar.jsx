import "../../styles/topbar.css";

export default function TopBar() {

    return (

        <header className="top-bar">

            <div className="top-bar-content">

                <div className="top-bar-title">

                    <img
                        src="/img/filadelfia.png"
                        alt="Filadelfia"
                        className="logo"
                    />

                    <div>

                        <div className="label-small">
                            SISTEMA DE CALIFICACIONES
                        </div>

                        <div className="label-main">
                            Escuela Bíblica <span>Filadelfia Beraca</span>
                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}