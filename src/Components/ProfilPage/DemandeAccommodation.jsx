import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";


const DemandeAccommodation = ({ accommodationId , onClose}) => {
    const [requests, setRequests] = useState([]);
    const [accommodation, setAccommodation] = useState(null);
    // Nombre de demandes acceptées
    const [acceptedRequestsCount, setAcceptedRequestsCount] = useState(0); 


    useEffect(() => {
        if (accommodationId) {
            axiosInstance.get(`/demanderlogement/`)
                .then(response => {
                    const filteredRequests = response.data.filter(request => request.hebergementId === accommodationId);
                    setRequests(filteredRequests);
                    const acceptedCount = filteredRequests.filter(request => request.statut === 'accepte').length;
                    setAcceptedRequestsCount(acceptedCount);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des demandes pour cet hébergement :', error);
                    
                });
        }
    }, [accommodationId]);

    useEffect(() => {
        if (accommodationId) {
            axiosInstance.get(`/hebergement/${accommodationId}`)
                .then(response => {
                    setAccommodation(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations sur l\'hébergement :', error);
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

    const handleAccept = (userId, hebergementId) => {
        axiosInstance.put(`demanderlogement/hebergement/${hebergementId}/${userId}`, { statut: 'accepte' })
            .then(response => {
                setRequests(prevRequests => {
                    const updatedRequests = prevRequests.map(request => {
                        if (request.userId === userId && request.hebergementId === hebergementId) {
                            return { ...request, statut: 'accepte' };
                        } else {
                            return request;
                        }
                    });
                    const acceptedCount = updatedRequests.filter(request => request.statut === 'accepte').length;
                    setAcceptedRequestsCount(acceptedCount);
                    return updatedRequests;
                });
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du statut de la demande :', error);
            });
    };
    
    const handleReject = (userId, hebergementId) => {
        axiosInstance.put(`demanderlogement/hebergement/${hebergementId}/${userId}`, { statut: 'refuse' })
            .then(response => {
                setRequests(prevRequests => {
                    const updatedRequests = prevRequests.map(request => {
                        if (request.userId === userId && request.hebergementId === hebergementId) {
                            return { ...request, statut: 'refuse' };
                        } else {
                            return request;
                        }
                    });
                    const acceptedCount = updatedRequests.filter(request => request.statut === 'accepte').length;
                    setAcceptedRequestsCount(acceptedCount);
                    return updatedRequests;
                });
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du statut de la demande :', error);
            });
    };
    
    
    

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-indigo-900">Demandes pour cet hébergement :</h2>
                <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2" onClick={onClose}>
                    <XMarkIcon className="h-5 w-5 inline-block" />
                </button>
            </div>
            <ul className="mt-4">
                {requests.map((request, index) => (
                    <li key={index} className="mb-4 rounded-full shadow-lg">
                        <div className={`p-6 flex items-center rounded-full justify-between ${
                        request.statut === 'accepte' ? 'bg-lime-100' :
                        request.statut === 'refuse' ? 'bg-fuchsia-100' : 'bg-gray-200'
                    }`}>
                            <div className='ml-5'>
                                <p className="text-lg font-semibold">{userPseudos[request.userId]}</p>
                                <p>{request.createdAt ? formatDate(request.updatedAt) : <span className="text-gray-500">Indisponible</span>}</p>
                            </div>
                            <div>
                            <button
                                    onClick={() => handleAccept(request.userId, request.hebergementId)}
                                    className={`px-4 py-2 rounded-full ${
                                        (request.statut === 'accepte' || acceptedRequestsCount >= accommodation?.nb_places) ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-500'
                                    } text-white`}
                                    disabled={(request.statut === 'accepte' || acceptedRequestsCount >= accommodation?.nb_places)}
                                >
                                    Accepter
                                </button>
                                <button
                                    onClick={() => handleReject(request.userId, request.hebergementId)}
                                    className={`ml-2 px-4 py-2 ${
                                        request.statut === 'refuse' ? 'bg-gray-400 cursor-not-allowed' : 'bg-fuchsia-700 hover:bg-fuchsia-600'
                                    } rounded-full text-white`}
                                    disabled={request.statut === 'refuse'}
                                >
                                    Refuser
                                </button>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DemandeAccommodation;
