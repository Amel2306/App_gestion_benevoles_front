import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/information">Informations</Link>
                </li>
                <li>
                    <Link to="/calendrier">Calendrier</Link>
                </li>
                <li>
                    <Link to="/hebergement">Hebergement</Link>
                </li>
                <li>
                    <Link to="/profil">Profil</Link>
                </li>
                <li>
                    <Link to="/">Se connecter</Link>
                </li>
                <li>
                    <Link to="/">Se déconnecter</Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default Navbar;
