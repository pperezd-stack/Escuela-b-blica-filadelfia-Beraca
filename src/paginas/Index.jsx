import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import LoginPanel from "../components/index/LoginPanel";
import Carousel from "../components/common/Carousel";

import { homeSlides } from "../data/carouselData";

import "../styles/pages/index.css";

export default function Index() {
return (
<> <Header />

```
        <main className="main-card">
            <section className="card-body-area">

                <div className="left-panel">
                    <LoginPanel />
                </div>

                <div className="right-panel">
                    <Carousel slides={homeSlides} />
                </div>

            </section>
        </main>

        <Footer />
    </>
);

}
