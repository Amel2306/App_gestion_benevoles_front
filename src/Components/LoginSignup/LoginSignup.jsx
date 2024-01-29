import React, { useState } from 'react';
import './LoginSignup.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    const [action,setAction] = useState("Inscription");

    const [prenom, setprenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom,setNom] = useState("");

    const navigate = useNavigate();

    const handleActionChange = () => {
        setAction(action === 'Inscription' ? 'Connexion' : 'Inscription');
    };
    
    const handleLoginSignup = () => {
        if (action === 'Connexion') {
            axios.post('http://localhost:4000/api/authentification/login', { email, password })
                .then(response => {
                    const userId = response.data.existingUser.id
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId',userId);
                    
                    //vérification de la présence du token
                    const token = localStorage.getItem('token');
                    if (token) {
                        console.log('Le token est présent :', token);
                    } else {
                        console.log('Aucun token trouvé dans le local storage');
                    }

                    navigate("/home");
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            axios.post('http://localhost:4000/api/authentification/signup', { nom,prenom,email, password })
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);

                     //vérification de la présence du token
                     const token = localStorage.getItem('token');
                     if (token) {
                         console.log('Le token est présent :', token);
                     } else {
                         console.log('Aucun token trouvé dans le local storage');
                     }
                    navigate("/home");
                    window.location.reload();

                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Connexion"?<div></div>:<div className="inputs" ><div className="input">
                <img src={user_icon} alt="" />
                    <input type="text" placeholder="Prénom d'utilisateur" value={prenom} onChange={(e) => setprenom(e.target.value)}/>
                </div>
                <div className="input">
                <img src={user_icon} alt="" />
                    <input type="text" placeholder="Nom d'utilisateur" value={nom} onChange={(e) => setNom(e.target.value)}/>
                </div></div>}
                
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            {action==="Connexion"?<div className="forgot-password">Pas encore de compte ? <span onClick={handleActionChange}>S'inscrire</span></div>:<div className="forgot-password">Déjà un compte ? <span onClick={handleActionChange}>Se connecter</span></div>}
            <div className="submit-container">
            {action==="Connexion" ?<div className="submit" onClick={() => { handleLoginSignup() }}>Se connecter</div>: <div className="submit" onClick={() => { handleLoginSignup() }}>S'inscrire</div>}
            </div>
        </div>
    );
};

export default LoginSignup;
