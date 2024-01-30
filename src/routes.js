import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ProfilPage from './Components/ProfilPage/ProfilPage';
import Calendrier from './Components/Calendrier/Calendrier';
import Information from './Components/Information/Information';
import Hebergement from './Components/Hebergement/Hebergement.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import { NavbarWithMegaMenu } from './Components/Navbar/Navbar2.jsx';




const Routess = () => {
    return (
        <Router>
            <div>
            <NavbarWithMegaMenu />
                <Routes>
                    <Route path="/"  element={<LoginSignup/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/profil" element={<ProfilPage/>} />
                    <Route path="/calendrier" element={<Calendrier/>} />
                    <Route path="/information" element={<Information/>} />
                    <Route path="/hebergement" element={<Hebergement/>} />
                </Routes>
            </div>
        </Router>
    );
};
export default Routess;
