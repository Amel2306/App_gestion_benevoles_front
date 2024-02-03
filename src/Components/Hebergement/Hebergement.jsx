import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { MapPinIcon, UserGroupIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

const Hebergement = () => {
    const [hebergements, setHebergements] = useState([]);
    const [demandesAccepteesParHebergement, setDemandesAccepteesParHebergement] = useState({});
    const [userPseudos, setUserPseudos] = useState({});
    const [demandesEnvoyees, setDemandesEnvoyees] = useState([]);
    const [demandeExistante, setDemandeExistante] = useState(false); 




    useEffect(() => {
        const fetchHebergements = async () => {
            try {
                const response = await axiosInstance.get('/hebergement');
                const hebergementsVisibles = response.data.filter(hebergement => hebergement.visible === 1);
                setHebergements(hebergementsVisibles);
    
                const promises = hebergementsVisibles.map(hebergement => {
                    return getNombreDemandesAcceptees(hebergement.id);
                });
    
                Promise.all(promises)
                    .then(nombreDemandes => {
                        const updatedDemandesAcceptees = {};
                        hebergementsVisibles.forEach((hebergement, index) => {
                            updatedDemandesAcceptees[hebergement.id] = nombreDemandes[index];
                        });
                        setDemandesAccepteesParHebergement(updatedDemandesAcceptees);
                        fetchUserPseudos(hebergementsVisibles);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération du nombre de demandes acceptées pour tous les hébergements :', error);
                    });
            } catch (error) {
                console.error('Erreur lors de la récupération des hébergements :', error);
            }
        };
    
        fetchHebergements();  
    }, []);
    

    const fetchUserPseudos = async () => {
        const promises = hebergements.map(hebergement => {
            console.log(hebergement.user_id)
            return axiosInstance.get(`users/${hebergement.user_id}`)
                .then(response => {
                    return { user_id: hebergement.user_id, pseudo: response.data.pseudo };
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du pseudo de l\'utilisateur :', error);
                    return { user_id: hebergement.user_id, pseudo: 'Utilisateur inconnu' };
                });
        });

        const pseudos = await Promise.all(promises);
        const userPseudosObject = pseudos.reduce((acc, curr) => {
            acc[curr.user_id] = curr.pseudo;
            return acc;
        }, {});

        setUserPseudos(userPseudosObject);
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getNombreDemandesAcceptees = (hebergementId) => {
        return axiosInstance.get(`/demanderlogement/hebergement/${hebergementId}`)
            .then(response => {
                const demandesLogement = response.data;
                const nombreDemandesAcceptees = demandesLogement.filter(demande => demande.statut === 'accepte').length;
                return nombreDemandesAcceptees;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des demandes de logement :', error);
                return 0;
            });
    };

    const handleDemande = async (userId, hebergementId) => {
        try {
            const demandes = await fetchDemandesByHebergementId(hebergementId);    
            const userIdFromLocalStorage = localStorage.getItem('userId');
            console.log('userIdFromLocalStorage:', userIdFromLocalStorage); // Vérifier la valeur de userId récupérée depuis localStorage
    
            const demandeExistante = demandes.some(demande => demande.userId === parseInt(userIdFromLocalStorage));
            console.log('demandeExistante:', demandeExistante);
            setDemandeExistante(demandeExistante);
    
            if (!demandeExistante) {
                const requestData = {
                    userId: userId,
                    hebergementId: hebergementId
                };
                await axiosInstance.post('/demanderlogement/', requestData);
                console.log('Demande de logement envoyée avec succès');
            } else {
                console.log('Une demande existe déjà pour cet utilisateur et cet hébergement.');
            }
    
            setDemandeExistante(demandeExistante);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la demande de logement :', error);
        }
    };
    

    const fetchDemandesByHebergementId = async (hebergementId) => {
        try {
            const response = await axiosInstance.get(`/demanderlogement/hebergement/${hebergementId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes de logement pour l\'hébergement', hebergementId, ':', error);
            return [];
        }
    };


    return ( 
        <div className='m-[100px] rounded-lg bg-opacity-85 bg-white p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-indigo-900'>Les bénévoles proposant un logement</h2>
            <div className='grid grid-cols-3 gap-4'>
                {hebergements.map(hebergement => (
                    <div key={hebergement.id} className="mt-6 rounded-lg bg-opacity-85 bg-white p-5 shadow-lg ml-4">
                        <div className='pl-2'>
                            <div className='inline-flex items-center'>
                                <h3 className="text-xl font-semibold text-indigo-900">{userPseudos[hebergement.user_id]}</h3>
                            </div>
                            <p><MapPinIcon className="h-5 w-5 mr-1 inline-block" />Logement à {hebergement.ville} : {hebergement.code_postale}</p>
                            <p><UserGroupIcon className="h-5 w-5 mr-1 inline-block" />
                            {demandesAccepteesParHebergement[hebergement.id]}/{hebergement.nb_places}
                            </p>
                            <p><CalendarDaysIcon className="h-5 w-5 mr-1 inline-block" /> {hebergement.updatedAt ? formatDate(hebergement.updatedAt) : <span className="text-gray-500">Indisponible</span>}</p>
                            <div className="pl-[250px]">
                            <button 
                                    onClick={() => handleDemande(localStorage.getItem('userId'), hebergement.id)} 
                                    className={`bg-lime-600 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded-full mt-2`}
                                    disabled={demandeExistante}
                                >
                                    Envoyer une demande
                                </button>                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hebergement;
