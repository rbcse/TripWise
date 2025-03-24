import Navbar from "../Navbar";
import Hero from "./Hero";
import Faqs from "./faqs";
import Footer from "../Footer";
import Feedback from "./Feedback";
const Home = () => {
    return <div className="flex justify-center items-center w-full flex-col">
        <Navbar/>
        <Hero/>
        <Faqs/>
        <Feedback/>
        <Footer/>
    </div>
}

export default Home;