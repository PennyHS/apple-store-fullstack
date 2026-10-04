import NavBar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import ProductViewer from "../components/ProductViewer.jsx";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import Showcase from "../components/Showcase.jsx";
import Performance from "../components/Performance.jsx";
import Features from "../components/Features.jsx";
import Highlights from "../components/Highlights.jsx";
import Footer from "../components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger)

const MacbookPage = () => {
    return (
        <main className="macbook-page">
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            <Features />
            <Highlights />
            <Footer />
        </main>
    )
}

export default MacbookPage
