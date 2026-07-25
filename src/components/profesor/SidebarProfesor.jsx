import { NavLink } from "react-router-dom";

const SidebarProfesor = () => {

    return (

        <aside className="bg-light border-end vh-100 p-3">

            <h5 className="mb-4">

                Profesor

            </h5>

            <nav className="nav flex-column">

                <NavLink

                    to="/profesor"

                    className="nav-link"

                >

                    Estudiantes

                </NavLink>

                <NavLink

                    to="/modulos-profesor"

                    className="nav-link"

                >

                    Módulos

                </NavLink>

                <NavLink

                    to="/sistema"

                    className="nav-link"

                >

                    Inicio

                </NavLink>

            </nav>

        </aside>

    );

};

export default SidebarProfesor;