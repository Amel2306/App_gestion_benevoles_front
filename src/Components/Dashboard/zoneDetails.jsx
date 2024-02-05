import React, { useEffect, useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';

const zoneDetails = ({ zoneId, selectedList, pseudoUser, handleClose}) => {
    const navigate = useNavigate();
    const [creneauxInfo, setCreneauxInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const creneauxResponse = await axiosInstance.get('creneaux');
                const creneaux = creneauxResponse.data;
                console.log(creneaux);

                const newCreneauxInfo = {};
                const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

                for (const creneau of creneaux) {
                    console.log(creneau)
                    const jour = joursSemaine[new Date(creneau.date).getDay()];
                    console.log(jour)
                    const heureDebut = creneau.horaire_debut.split(':')[0];
                    const heureFin = creneau.horaire_fin.split(':')[0];
                    console.log(creneau);

                    const creneauInfoText = `${jour} : ${heureDebut}-${heureFin}`;
                    console.log(jour);
                    newCreneauxInfo[creneau.id] = creneauInfoText;
                };
                setCreneauxInfo(newCreneauxInfo);
                
            } catch (error) {
                console.error('Erreur lors de la récupération des informations des créneaux :', error);
            }
        }

        if (Object.keys(creneauxInfo).length === 0) {
            fetchData();
        }
    }, []);

    const handleSubmitValide = async (id) => {
        try {
            await axiosInstance.put(`demanderactivtie/accepte/${id}/1`);
            console.log("La demande a été acceptée avec succès.");
        } catch (error) {
            console.error(`Erreur lors de la validation de la demande avec l'ID ${id}:`, error);
        }
    };

    const handleSubmitDevalide = async (id) => {
        try {
            await axiosInstance.delete(`demanderactivtie/${id}`)
            console.log("bien supprimé !")
            handleClose()
        }
        catch(error) {
            console.log(error)
        }
    };

    return (
        <div className={`container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20`}>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className=' felex flex-row align-right justify-right pl-[500px]'>
                        <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2 " onClick={handleClose}>
                            <XMarkIcon className="h-5 w-5 inline-block" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-indigo-900 mb-5">Demande de {pseudoUser}</h2>
                </div>
                <div className='flex flex-wrap align-left justify-left p-3 m-3'>
                    <ul>
                        {selectedList.map((item, index) => (
                            <li className={` ${item.accepte === 1 ? "bg-lime-100" : item.archive === 1 ? "bg-indigo-100" : "bg-fuchsia-100"} flex flex-row justify-between p-3 m-4 rounded-xl`} key={index}>
                                <div className='ml-2 flex flex-col'>
                                    <span>
                                        Créneau : 
                                    </span>
                                    <span>
                                        {creneauxInfo[item.creneau_id]}
                                    </span>
                                </div>
                                <div className='mx-2 ml-14 flex flex-col'>
                                    <span>
                                        Zone :
                                    </span>
                                    <span>
                                        {zoneInfo[item.zonebenevole_id]}
                                    </span>
                                </div>
                                {
                                    item.accepte === 0 && item.archive === 0 ? (
                                        <button className="ml-10 rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all" onClick={() => handleSubmitValide(item.id)}>
                                            Valider
                                        </button>
                                    ) :
                                        (
                                            <button className="ml-3 rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-fuchsia-500 transition-all" onClick={() => handleSubmitDevalide(item.id)}>
                                                Supprimer
                                            </button>
                                        )
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-between pl-[380px]">

            </div>
        </div>
    );
};

export default zoneDetails;