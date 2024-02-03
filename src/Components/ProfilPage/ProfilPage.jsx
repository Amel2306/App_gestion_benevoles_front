import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ModifyProfilePage from './ModifyProfilPage.jsx'
import './ModifyProfilPage.css'
import ModifyAccommodationPage from './ModifyAccomodationPage.jsx';
import AddAccommodationPage from './AddAccomodationPage.jsx';
import DeletePage from './DeletePage.jsx';
import DeleteAccommodationPage from './DeleteAccommodationPage.jsx';
import DemandeAccomodationPage from './DemandeAccommodation.jsx';



import { TrashIcon, PencilIcon, MapPinIcon, UserGroupIcon, CalendarDaysIcon, PlusIcon, EyeIcon } from "@heroicons/react/24/solid";

const ProfilPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userHebergements, setUserHebergements] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAccommodation, setIsEditingAccommodation] = useState(false);
    const [accommodationIdToEdit, setAccommodationIdToEdit] = useState(null);
    const [isAddingAccommodation, setIsAddingAccommodation] = useState(false);
    const [isDeleting,setIsDeleting] = useState(false);
    const [isDeletingAccomodation,setIsDeletingAccomodation] = useState(false);
    const [accommodationIdToRemove, setAccommodationIdToRemove] = useState(null);
    const [isDemande,setIsDemande] = useState(false);
    const [accommodationIdDemandes,setAccommodationIdDemandes] = useState(false);


    

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
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
                    setUserHebergements(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations de l\'hebergement :', error);
                });
        }
    };

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

    const toggleChercheHebergement = (cherche_hebergement_toggle) => {
        
        const updatedUserInfo = {...userInfo, cherche_hebergement: cherche_hebergement_toggle === 1 ? 0 : 1};

        axiosInstance.put(`users/${userInfo.id}`, updatedUserInfo)
        .then(response => {
            console.log("État de recherche d'hébergement mis à jour avec succès.");
            setUserInfo(response.data); 
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'état de recherche d\'hébergement :', error);
        });
        console.log(userInfo)

    };
    
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        fetchUserInfo();
    };

    const handleEditAccommodation = (accommodationId) => {
        setAccommodationIdToEdit(accommodationId);
        setIsEditingAccommodation(true);
    };

    const handleCloseAccommodation = () => {
        setIsEditingAccommodation(false);
        fetchUserInfo();
    };

    const handleOpenAddAccommodation = () => {
        setIsAddingAccommodation(true);
    };

    const handleCloseAddAccommodation = () => {
        setIsAddingAccommodation(false);
        fetchUserInfo();
    };


    const handleDelete = () => {
        setIsDeleting(true);
    };

    const handleCloseDelete = () => {
        setIsDeleting(false);
        fetchUserInfo();
    };

    const handleDeleteAccomodation = (accommodationId) => {
        setAccommodationIdToRemove(accommodationId);
        setIsDeletingAccomodation(true);
    };
    

    const handleCloseDeleteAccomodation = () => {
        setIsDeletingAccomodation(false);
        fetchUserInfo();
    };

    const handleDemandes = (accommodationId) => {
        setAccommodationIdDemandes(accommodationId);
        setIsDemande(true);
    };
    

    const handleCloseDemande = () => {
        setIsDemande(false);
        fetchUserInfo();
    };


    return (
            <div>
        {isEditing && (
            <div className="overlay">
                <ModifyProfilePage onClose={handleClose} updateUserInfo={fetchUserInfo}/>
            </div>
            )}

        {isEditingAccommodation && (
                <div className="overlay">
                    <ModifyAccommodationPage 
                        accommodationId={accommodationIdToEdit} 
                        onClose={handleCloseAccommodation} 
                        updateAccommodationInfo={fetchUserInfo} 
                    />                
                </div>
            )}

        {isAddingAccommodation && (
            <div className="overlay">
                <AddAccommodationPage onClose={handleCloseAddAccommodation} updateAccommodationInfo={fetchUserInfo} />
            </div>
        )}

        {isDeleting && (
            <div className="overlay">
                <DeletePage onClose={handleCloseDelete} updateUserInfo={fetchUserInfo}/>
            </div>
            )}

        {isDeletingAccomodation && (
            <div className="overlay">
                <DeleteAccommodationPage
                    accommodationId={accommodationIdToRemove}
                    onClose={handleCloseDeleteAccomodation}
                    updateUserInfo={fetchUserInfo}
                />
            </div>
        )}

        {isDemande && (
                    <div className="overlay">
                        <DemandeAccomodationPage
                            accommodationId={accommodationIdDemandes}
                            onClose={handleCloseDemande}
                            updateUserInfo={fetchUserInfo}
                        />
                    </div>
                )}

        <div className={`content ${isEditing || isEditingAccommodation || isAddingAccommodation || isDeleting || isDeletingAccomodation || isDemande? 'blur' : ''}`}>
            <div className="flex justify-center py-5 px-[35px]">
                <div className="rounded-lg bg-opacity-85 bg-white p-8 text-center shadow-lg ">
                    <figure className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-fill text-white " viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                        </svg>
                    </figure>
                    <h2 className="text-2xl font-bold text-indigo-900 ">{userInfo?.pseudo || `${userInfo?.prenom}.${userInfo?.nom.charAt(0)}`}</h2>
                    <p className="mb-8 text-gray-300 ">{userInfo?.biographie || <span style={{ color: 'gray' }}>Entrez votre biographie</span>}</p>
                    <div className="flex items-center justify-center">
                    <button className="rounded-full bg-indigo-900 px-4 py-2 text-white hover:bg-indigo-500" onClick={handleEdit}>
                            <PencilIcon className="h-6 w-6 mr-2 inline-block" />
                            Modifier
                        </button>


                        <a className="ml-8 rounded-full bg-fuchsia-700 px-4 py-2  text-white hover:bg-fuchsia-500" onClick={handleDelete}>
                            <TrashIcon className="h-6 w-6 mr-2 inline-block" />
                            Supprimer
                        </a>
                    </div>
                </div>

                
            
            <div className="px-9">
                {!isLoading && userInfo && (
                    <div className='flex flex-col align-center justify-center'>
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
                            <span className='pl-[680px]'>{userInfo.email || <span style={{ color: 'gray' }}>Entrez votre email</span>}</span>
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

                            <label className="ml-3 relative inline-flex items-center cursor-pointer">
                            <input 
                                    type="checkbox" 
                                    onChange={() => toggleChercheHebergement(userInfo.cherche_hebergement)}
                                    checked={userInfo.cherche_hebergement === 1}
                                    className="sr-only peer"
                                />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-800"></div>
                            </label>
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
    <div className="rounded-lg bg-opacity-85 bg-white p-6 shadow-lg">
        <div className='flex'>
        <h2 className="text-2xl font-bold text-indigo-900">Proposer un hébergement</h2>
        <div className='pl-[1030px]'>
        <button className="rounded-full bg-lime-600 px-5 py-2.5 text-white hover:bg-indigo-700 " onClick={handleOpenAddAccommodation}>
            <PlusIcon className="h-6 w-6 mr-2 inline-block" />
            Ajouter
        </button>
        </div>
        </div>
        <div className='flex flex-wrap justify-center'>
            {userHebergements && userHebergements.map((hebergement, index) => (   
                <div key={index} className="rounded-lg bg-opacity-85 bg-white p-8 shadow-lg ml-4">
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
                        <p> <MapPinIcon className="h-5 w-5 mr-1 inline-block" />
                            {hebergement.adresse}, {hebergement.code_postale}</p>
                        <p><UserGroupIcon className="h-5 w-5 mr-1 inline-block" />{hebergement.nb_places} places</p>
                        <p><CalendarDaysIcon className="h-5 w-5 mr-1 inline-block" /> {hebergement.updatedAt ? formatDate(hebergement.updatedAt) : <span className="text-gray-500">Indisponible</span>}</p>
                        <div className=''>
                        <button className="text-sm rounded-full bg-lime-600 px-3 py-1.5 text-white hover:bg-lime-500 mt-3 " onClick={() => handleDemandes(hebergement.id)}>
                                <EyeIcon className="h-5 w-5 mr-1 mb-0.5 inline-block" />
                                Voir demandes
                            </button>
                            <button className="ml-2 text-sm rounded-full bg-indigo-900 px-3 py-1.5 text-white hover:bg-indigo-500 mt-3 " onClick={() => handleEditAccommodation(hebergement.id)}>
                                <PencilIcon className="h-5 w-5 mr-1 inline-block" />
                                Modifier
                            </button>
                        <a className="text-sm ml-2 mr-2 rounded-full bg-fuchsia-700 px-4 py-2  text-white hover:bg-fuchsia-500" onClick={()=>handleDeleteAccomodation(hebergement.id)}>
                                <TrashIcon className="h-5 w-5 mr-1 mb-0.5 inline-block" />
                                Supprimer
                            </a>
                            
                            
                        </div>
                       
                    </div>
                    </div>
))}
</div>
</div>
</div>


    </div> 
    </div> 
        
    );
};

export default ProfilPage;
