import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProfilPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:4000/api/users/${userId}`)
            .then(response => {
                setUserInfo(response.data);
                setIsLoading(false);

            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
                setIsLoading(false);

            });
        }
    }, []);

    return (
        <div>
             {isLoading ? (
                <p>Chargement des informations...</p>
            ) : userInfo ? (
                <div>
                    <p>Nom : {userInfo.nom || <span style={{ color: 'gray' }}>Entrez votre nom</span>}</p>
                    <p>Prénom : {userInfo.prenom || <span style={{ color: 'gray' }}>Entrez votre prénom</span>}</p>
                    <p>Email : {userInfo.email || <span style={{ color: 'gray' }}>Entrez votre email</span>}</p>
                    <p>Tel : {userInfo.numero_tel || <span style={{ color: 'gray' }}>Entrez votre numéro de téléphone</span>}</p>
                    <p>Pseudo : {userInfo.pseudo || <span style={{ color: 'gray' }}>Entrez votre pseudo</span>}</p>
                    <p>Biographie : {userInfo.biographie || <span style={{ color: 'gray' }}>Entrez votre biographie</span>}</p>
                    <p>Cherche hébergement : {userInfo.cherche_hebergement || <span style={{ color: 'gray' }}>Entrez vos préférences d'hébergement</span>}</p>
                    <p>Propose hébergement : {userInfo.propose_hebergement || <span style={{ color: 'gray' }}>Entrez vos offres d'hébergement</span>}</p>
                    <p>Taille : {userInfo.taille || <span style={{ color: 'gray' }}>Entrez votre taille</span>}</p>
                    <p>Membre depuis le : {userInfo.createdAt || <span style={{ color: 'gray' }}>Indisponible</span>}</p>
                </div>
            ):(
                <p>Aucune information disponible. Veuillez entrer vos informations.</p>
            )}
        </div>
    );
};

export default ProfilPage;
