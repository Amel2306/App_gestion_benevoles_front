import React, { useState } from 'react';
import './LoginSignup.css'
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from "react-router-dom";


import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {

    const [action,setAction] = useState("Connexion");

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
            axiosInstance.post(`authentification/login`, { email, password })
                .then(response => {
                    const userId = response.data.existingUser.id
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId',userId);
                    localStorage.setItem('isAuthenticated',true);
                    
                    const userRole = response.data.existingUser.role;
                    console.log(userRole)
                    if(userRole !== null){
                        localStorage.setItem('userRole', userRole);
                    }else{
                        localStorage.setItem('userRole', "bénévole");
                    }
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
            const randomNum = Math.floor(Math.random() * 1000);
            const pseudo = `${prenom}.${nom.charAt(0)}${randomNum}`;
            console.log(axiosInstance.baseURL);
            axiosInstance.post('authentification/signup', { nom,prenom,email,pseudo, password })
                .then(response => {
                    const userId = response.data.newUser.id
                    localStorage.setItem('userId',userId);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isAuthenticated',true);

                    const userRole = response.data.existingUser.role;
                    localStorage.setItem('userRole', userRole);

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
