import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const DemandeAccommodation = ({ accommodationId }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (accommodationId) {
            axiosInstance.get(`/demanderlogement/`)
                .then(response => {
                    const filteredRequests = response.data.filter(request => request.hebergementId === accommodationId);
                    setRequests(filteredRequests);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des demandes pour cet hébergement :', error);
                });
        }
    }, [accommodationId]);

    const [userPseudos, setUserPseudos] = useState({});

    useEffect(() => {
        const fetchUserPseudos = async () => {
            const promises = requests.map(request => {
                return axiosInstance.get(`users/${request.userId}`)
                    .then(response => {
                        return { userId: request.userId, pseudo: response.data.pseudo };
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération du pseudo de l\'utilisateur :', error);
                        return { userId: request.userId, pseudo: 'Utilisateur inconnu' };
                    });
            });

            const pseudos = await Promise.all(promises);
            const userPseudosObject = pseudos.reduce((acc, curr) => {
                acc[curr.userId] = curr.pseudo;
                return acc;
            }, {});

            setUserPseudos(userPseudosObject);
        };

        if (requests.length > 0) {
            fetchUserPseudos();
        }
    }, [requests]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleAccept = (requestId) => {
        // Logique pour accepter la demande avec l'ID requestId
    };

    const handleDelete = (requestId) => {
        // Logique pour supprimer la demande avec l'ID requestId
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <h2 className="text-2xl font-bold text-indigo-900">Demandes pour cet hébergement :</h2>
            <ul className='flex'>
                {requests.map((request, index) => (
                    <li key={index} className="rounded-lg bg-opacity-85 bg-white p-8 shadow-lg ml-4">
                        <div className='flex'>
                            <p>Statut : {request.statut}</p>
                            <p>Créé le : {request.createdAt ? formatDate(request.updatedAt) : <span style={{ color: 'gray' }}>Indisponible</span>}</p>
                            <p>Utilisateur : {userPseudos[request.userId]}</p>
                            <button onClick={() => handleAccept(request.id)}>Accepter</button>
                            <button onClick={() => handleDelete(request.id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DemandeAccommodation;
