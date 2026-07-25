import "./../../styles/layout/header.css";

export default function Header() {

    return (

        <header className="header">

            <div className="header-container">

                <div className="header-brand">

                    <img
                        src="/img/filadelfia.png"
                        alt="Logo Filadelfia"
                        className="header-logo"
                    />

                    <div className="header-title">

                        <span className="header-small">

                            SISTEMA DE CALIFICACIONES

                        </span>

                        <h1>

                            Escuela Bíblica
                            <span> Filadelfia Beraca</span>

                        </h1>

                    </div>

                </div>

            </div>

        </header>

    );

}