import './App.css';
import Home from "./screen/Home"
import Login from "./screen/Login"
import Signup from "./screen/Signup"
import MyTrip from "./screen/MyTrip.js"
import Payments from "./screen/Payments.js"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
  
        <Router>
            <div>
                <Routes>
                <Route exact path="/" element={<Home/>}  />
                <Route exact path="/Login" element={<Login/>}  />
                <Route exact path="/Signup" element={<Signup/>}  />
                <Route exact path="/MyTrip" element={<MyTrip/>}  />
                <Route exact path="/Payments" element={<Payments/>}  />
                </Routes>
            </div>
        </Router>
 
  );
}

export default App;
