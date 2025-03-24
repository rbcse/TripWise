import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import PlanTrip from "./components/trips/PlanTrip";
import ReadMore from "./components/trips/ReadMore";
import Profile from "./components/user/Profile";
import RestaurantReadMore from "./components/trips/RestaurantReadMore";
const App = () => {

    return <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/tripWise-admin-login" element={<AdminLogin/>} />
            <Route path="/tripWise-admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/plan-trip" element={<PlanTrip/>} />
            <Route path="/readmore" element={<ReadMore/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/restaurant-readmore" element={<RestaurantReadMore/>} />
        </Routes>
    </Router>

}

export default App;