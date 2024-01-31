import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';


import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const ProfilPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userHebergements, setUserHebergements] = useState(null);


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axiosInstance.get(`users/${userId}`)
            .then(response => {
                setUserInfo(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
                setIsLoading(false);
            });
            axiosInstance.get(`hebergement/user/1`)
            .then(response => {
                console.log(response)
                setUserHebergements(response.data);
                console.log(userHebergements);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de l\'hebergement :', error);
            });
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    const toggleVisibility = (hebergementId, currentVisibility) => {
        if (currentVisibility === 1) {
            axiosInstance.put(`hebergement/invisible/${hebergementId}`)
            .then(response => {
                console.log("L'hébergement a été rendu invisible avec succès.");
                // Mettre à jour l'état local userHebergements
                setUserHebergements(prevState => {
                    const updatedHebergements = prevState.map(hebergement => {
                        if (hebergement.id === hebergementId) {
                            return { ...hebergement, visible: 0 };
                        }
                        return hebergement;
                    });
                    return updatedHebergements;
                });
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de la visibilité de l\'hébergement :', error);
            });
        } else {
            axiosInstance.put(`hebergement/visible/${hebergementId}`)
            .then(response => {
                console.log("L'hébergement a été rendu visible avec succès.");
                setUserHebergements(prevState => {
                    const updatedHebergements = prevState.map(hebergement => {
                        if (hebergement.id === hebergementId) {
                            return { ...hebergement, visible: 1 };
                        }
                        return hebergement;
                    });
                    return updatedHebergements;
                });
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de la visibilité de l\'hébergement :', error);
            });
        }
    };

    return (
        <div>
            <div className="flex justify-center py-5 px-9 ">
                <div className="rounded-lg bg-opacity-85 bg-white p-8 text-center shadow-lg">
                    <figure className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-fill text-white " viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                        </svg>
                    </figure>
                    <h2 className="text-2xl font-bold text-indigo-900 ">{userInfo?.pseudo || `${userInfo?.prenom}.${userInfo?.nom.charAt(0)}`}</h2>
                    <p className="mb-8 text-gray-300 ">{userInfo?.biographie || <span style={{ color: 'gray' }}>Entrez votre biographie</span>}</p>
                    <div className="flex items-center justify-center">
                        <a href="#" className="rounded-full bg-indigo-900 px-4 py-2 text-white hover:bg-indigo-500  ">
                            <PencilIcon className="h-6 w-6 mr-2 inline-block" />
                            Modifier
                        </a>
                        <a href="#" className="ml-8 rounded-full bg-fuchsia-700 px-4 py-2  text-white hover:bg-fuchsia-500">
                            <TrashIcon className="h-6 w-6 mr-2 inline-block" />
                            Supprimer
                        </a>
                    </div>
                </div>
            
            <div className="px-9">
                {!isLoading && userInfo && (
                    <div className='flex flex-col '>
                       <ul className=" bg-opacity-85 font-medium text-indigo-900 bg-white border border-gray-400 rounded-lg">
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Nom :</span>
                            <span className='pl-10'>{userInfo.nom || <span style={{ color: 'gray' }}>Entrez votre nom</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Prénom :</span>
                            <span>{userInfo.prenom || <span style={{ color: 'gray' }}>Entrez votre prénom</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Email :</span>
                            <span>{userInfo.email || <span style={{ color: 'gray' }}>Entrez votre email</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Tel :</span>
                            <span>{userInfo.numero_tel || <span style={{ color: 'gray' }}>Entrez votre numéro de téléphone</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Pseudo :</span>
                            <span>{userInfo.pseudo || <span style={{ color: 'gray' }}>Entrez votre pseudo</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 border-b border-gray-400">
                            <span>Cherche hébergement :</span>
                            <span className='pl-40'>{userInfo.cherche_hebergement || <span style={{ color: 'gray' }}>Entrez vos préférences d'hébergement</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-2 border-b border-gray-400">
                            <span>Taille :</span>
                            <span>{userInfo.taille || <span style={{ color: 'gray' }}>Entrez votre taille</span>}</span>
                        </li>
                        <li className="flex justify-between pl-10 pr-10 py-3 rounded-b-lg">
                        <span>Membre depuis le :</span>
                                <span>{userInfo.createdAt ? formatDate(userInfo.createdAt) : <span style={{ color: 'gray' }}>Indisponible</span>}</span>
                        </li>
                    </ul>
                    </div>
                )}
            </div>
            </div>
        
            <div className="flex justify-center">
    <div className="rounded-lg bg-opacity-85 bg-white p-8 shadow-lg m-4 mr-20 ml-20">
        <h2 className="text-2xl font-bold text-indigo-900">Proposer un hébergement</h2>
        
        <div className='flex flex-wrap justify-center'>
            {userHebergements && userHebergements.map((hebergement, index) => (   
                <div key={index} className="rounded-lg bg-opacity-85 bg-white p-8 shadow-lg m-4">
                    <div className='pl-2'>
                        <div className='inline-flex items-center'>
                            <h3 className="text-xl font-semibold">{hebergement.ville}</h3>
                            <label className="ml-3 relative inline-flex items-center cursor-pointer">
                            <input 
                                    type="checkbox" 
                                    checked={hebergement.visible === 1}
                                    onChange={() => toggleVisibility(hebergement.id, hebergement.visible)}
                                    className="sr-only peer"
                                />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-800"></div>
                            </label>
                        </div>
                        <p>{hebergement.adresse}, {hebergement.code_postale}</p>
                        <p>Nombre de places : {hebergement.nb_places}</p>
                        <p>Hebergement publié le : {hebergement.createdAt ? formatDate(hebergement.createdAt) : <span className="text-gray-500">Indisponible</span>}</p>
                    </div>
                    </div>
))}
</div>
</div>
</div>
    </div>  
        
    );
};

export default ProfilPage;
