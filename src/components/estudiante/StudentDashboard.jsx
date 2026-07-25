import Header from "../layout/Header";
import Footer from "../layout/Footer";

import StudentProfile from "./StudentProfile";
import StudentModule from "./StudentModule";
import StudentGrades from "./StudentGrades";
import StudentObservations from "./StudentObservations";
import StudentStatistics from "./StudentStatistics";

export default function StudentDashboard({ usuario }) {

    return (

        <>

            <Header />

            <main className="student-dashboard">

                <section className="student-section">

                    <StudentProfile usuario={usuario} />

                </section>

                <section className="student-section">

                    <StudentModule usuario={usuario} />

                </section>

                <section className="student-section">

                    <StudentGrades usuario={usuario} />

                </section>

                <section className="student-section">

                    <StudentObservations usuario={usuario} />

                </section>

                <section className="student-section">

                    <StudentStatistics usuario={usuario} />

                </section>

            </main>

            <Footer />

        </>

    );

}