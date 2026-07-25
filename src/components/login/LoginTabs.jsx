import { useState } from "react";

import LoginProfesor from "./LoginProfesor";
import LoginEstudiante from "./LoginEstudiante";

export default function LoginTabs() {

    const [tipoUsuario, setTipoUsuario] = useState("profesor");

    return (

        <section className="login-tabs">

            <div className="login-tabs-header">

                <h2>

                    Bienvenido a la Plataforma Beraca

                </h2>

                <p>

                    Seleccione el tipo de usuario para iniciar sesión.

                </p>

            </div>

            <div className="login-tabs-buttons">

                <button
                    type="button"
                    className={
                        tipoUsuario === "profesor"
                            ? "login-tabs-button active"
                            : "login-tabs-button"
                    }
                    onClick={() => setTipoUsuario("profesor")}
                >

                    Profesor

                </button>

                <button
                    type="button"
                    className={
                        tipoUsuario === "estudiante"
                            ? "login-tabs-button active"
                            : "login-tabs-button"
                    }
                    onClick={() => setTipoUsuario("estudiante")}
                >

                    Estudiante

                </button>

            </div>

            <div className="login-tabs-content">

                {

                    tipoUsuario === "profesor"

                        ? <LoginProfesor />

                        : <LoginEstudiante />

                }

            </div>

        </section>

    );

}