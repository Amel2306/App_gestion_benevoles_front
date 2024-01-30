import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ProfilPage from './Components/ProfilPage/ProfilPage';
import Calendrier from './Components/Calendrier/Calendrier';
import Information from './Components/Information/Information';
import Hebergement from './Components/Hebergement/Hebergement.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import Acceuil from './Components/Informations/Acceuil.jsx'
import AnimationJeu from './Components/Informations/AnimationJeu.jsx'
import CalendrierEspaceAnimation from './Components/Informations/CalendrierEspaceAnimation.jsx';
import CalendrierPost from './Components/Informations/CalendrierPost.jsx'
import Cuisine from './Components/Informations/Cuisine.jsx'
import ForumAssociation from './Components/Informations/ForumAssociation.jsx'
import Tambola from './Components/Informations/Tambola.jsx'
import VenteRestauration from './Components/Informations/VenteRestauration.jsx'

import { NavbarWithMegaMenu } from './Components/Navbar/Navbar.jsx';


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
                    
                    <Route path="/animation_jeu" element={<AnimationJeu />} />
                    <Route path="/vente_-_restauration" element={<VenteRestauration />} />
                    <Route path="/acceuil" element={<Acceuil />} />
                    <Route path="/cuisine" element={<Cuisine />} />
                    <Route path="/tambola" element={<Tambola />} />
                    <Route path="/forum_association" element={<ForumAssociation />} />
                    <Route path="/calendrier_post" element={<CalendrierPost />} />
                    <Route path="/calendrier_espace_animation" element={<CalendrierEspaceAnimation />} />
                </Routes>
            </div>
        </Router>
    );
};
export default Routess;
