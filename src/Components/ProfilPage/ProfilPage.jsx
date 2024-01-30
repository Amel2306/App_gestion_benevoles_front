import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProfilPage = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:4000/api/users/${userId}`)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
            });
        }
    }, []);

    return (
        <div>
            <h1>Hello User!</h1>
            {userInfo && (
                <div>
                    <p>Nom : {userInfo.nom}</p>
                    <p>Prénom : {userInfo.prenom}</p>
                    <p>Email : {userInfo.email}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilPage;
