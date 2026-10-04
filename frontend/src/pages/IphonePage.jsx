import Navbar from "../iphone/components/Navbar.jsx";
import Hero from "../iphone/components/Hero.jsx";
import Highlights from "../iphone/components/Highlights.jsx";
import Model from "../iphone/components/Model.jsx";
import Features from "../iphone/components/Features.jsx";
import HowItWorks from "../iphone/components/HowItWorks.jsx";
import Footer from "../iphone/components/Footer.jsx";

const IphonePage = () => {
    return (
        <main className="iphone-page bg-black">
            <Navbar />
            <Hero />
            <Highlights />
            <Model />
            <Features />
            <HowItWorks />
            <Footer />
        </main>
    )
}

export default IphonePage
