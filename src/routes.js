import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ProfilPage from './Components/ProfilPage/ProfilPage';
import Calendrier from './Components/Calendrier/Calendrier';
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
import ListeDemandesActivites from './Components/Informations/ListeDemandesActivites';
import ImporterCSV from './Components/Dashboard/ImporterCSV.jsx';
import GestionDemandes from './Components/Dashboard/GestionDemandes.jsx';
import GestionUtilisateur from './Components/Dashboard/GestionUtilisateur.jsx';
import ListeJeux from './Components/Jeux/ListeJeux';
import DetailsJeu from './Components/Jeux/DetailsJeu';

import { NavbarWithMegaMenu } from './Components/Navbar/Navbar.jsx';


const Routess = () => {
    return (
        <Router>
            <div>
            <NavbarWithMegaMenu />
                <Routes>
                    <Route path="/"  element={<LoginSignup/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/profil/" element={<ProfilPage/>} />
                    <Route path="/profil/:user_id" element={<ProfilPage/>} />
                    <Route path="/calendrier" element={<Calendrier/>} />
                    <Route path="/hebergement" element={<Hebergement/>} />
                    
                    <Route path="/animation_jeu" element={<AnimationJeu />} />
                    <Route path="/vente_-_restauration" element={<VenteRestauration />} />
                    <Route path="/acceuil" element={<Acceuil />} />
                    <Route path="/cuisine" element={<Cuisine />} />
                    <Route path="/tambola" element={<Tambola />} />
                    <Route path="/forum_association" element={<ForumAssociation />} />
                    <Route path="/calendrier_post" element={<CalendrierPost />} />
                    <Route path="/calendrier_espace_animation" element={<CalendrierEspaceAnimation />} />

                    <Route path="/liste_demandes_activites" element={<ListeDemandesActivites />} />

                    <Route path="/calendrier_espace_animation" element={<CalendrierEspaceAnimation />} />
                    <Route path="/importer_un_csv" element={<ImporterCSV />} />
                    <Route path="/gestion_des_demandes" element={<GestionDemandes />} />
                    <Route path="/gestion_utilisateur" element={<GestionUtilisateur />} />
                    <Route path="/jeux" element={<ListeJeux />} />
                    <Route path="/jeuDetails/:jeuId" element={<DetailsJeu />} />


                </Routes>
            </div>
        </Router>
    );
};
export default Routess;
