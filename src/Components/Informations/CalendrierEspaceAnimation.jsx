import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import ValidationDemande from './ValidationDemande';
import {useLocation} from 'react-router-dom';
import "./CalendrierStyle.css"
import '../ProfilPage/ModifyProfilPage.css'
 
const CalendrierEspaceAnimation = () => {

    const location = useLocation();
    
    const listePostHoraire = location.state && location.state.selectedSlot;

    const allHoraires = location.state && location.state.horaires


    const [zones, setZones] = useState([]); 
    const [horaires, setHoraires] = useState(new Set());
    const [horairesArray, setHorairesArray] = useState([]);   
    const [tabPostHoraire, setTabPostHoraire] = useState({}) 
    const [tabPostNbMax, setTabPostNbMax] = useState({})
    const [selectedSlot, setSelectedSlot] = useState([]); 
    const [tabHoraire, setTabHoraire]= useState([]);
    const [hasSendDemande,setHasSendDemande] = useState(false);
    const [i,setI] = useState(0);

    useEffect( () => { 

        console.log(listePostHoraire)
        const listHoraire= []
        if (listePostHoraire ) {
            for (const pair of listePostHoraire) {
                listHoraire.push(pair[1]) 
            }

            listHoraire.sort((a, b) => a - b);

            setTabHoraire(listHoraire)

            console.log(tabHoraire)

            axiosInstance.get(`zonebenevole/post/3`)
            .then(response => {
                setZones(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations des zones :', error);
            });
        }

        console.log(horaires)
        if (allHoraires) {
            const newHorairesSet = new Set(horaires);
          
            for (const cren of tabHoraire) {
              newHorairesSet.add(allHoraires[cren - 2]); 
            }
        
            setHoraires(newHorairesSet);
        }

        console.log(allHoraires)
        console.log(horaires)

        setHorairesArray(Array.from(horaires))

        console.log(horairesArray) 

            const fetchData = async () => {
                const updatedTabPH = {};
                await Promise.all(zones.map(async zone => {
                    const tabH = [];
                    await Promise.all(horairesArray.map(async horaire => { 
                        try {
                            const response = await axiosInstance.get(`demanderactivtie/acceptes/zoneCreneau/${zone.id}/${horaire.id}`);
                            console.log(response.data)
                            tabH.push(response.data.flat());
                        } catch (error) { 
                            console.error('Erreur lors de la récupération des informations de demande par horaire et zone bénévoles :', error);
                        }
                    })); 
                    updatedTabPH[zone.id] = tabH; 
                }));
                setTabPostHoraire(updatedTabPH);
            };

            const fetchData2 = async () => {
                const updatedTabPH = {};
                await Promise.all(zones.map(async zone => {
                    const tabNbMax = {};
                    await Promise.all(horairesArray.map(async horaire => { 
                        try {
                            const response = await axiosInstance.get(`creneauespace/${horaire.id}/${zone.id}`);
                            console.log(response)
                            if (response) {
                                const responseTraite = response.data
                                tabNbMax[horaire.id] = responseTraite.nb_benevoles_max 
                            }
                        } catch (error) {
                            console.error('Erreur lors de la récupération des informations de demande par horaire et zone :', error);
                        }
                    }));
                    updatedTabPH[zone.id] = tabNbMax;
                }));
                setTabPostNbMax(updatedTabPH); 
            };
            if (i < 6) {
                setI(i+1)
            }

            fetchData();
            fetchData2();
        }
    ,[i]);  

    const getColorForPercentage = (percentage) => {
        if ( percentage < 0.25) {
            return '#C37EC9';
        } else if (percentage >= 0.25 && percentage < 0.50) {
            return '#4A4BA8';
        } else if (percentage >= 0.50 && percentage < 0.75) {
            return '#8EA668';
        } else if (percentage >= 0.75) {
            return '#7BC42F';
        } else {
            return 'rgb(243 244 246)';
        }
    };

    const handleSlotClick = (zoneId, slotIndex) => {
        console.log(slotIndex)
        const pairExists = selectedSlot.some(pair => pair[0] === zoneId && pair[1] === slotIndex);
        if (pairExists) {
            const updatedSelectedSlot = selectedSlot.filter(pair => pair[0] !== zoneId || pair[1] !== slotIndex);
            setSelectedSlot(updatedSelectedSlot);
        } else {
            setSelectedSlot([...selectedSlot, [zoneId, slotIndex]]);
            console.log(selectedSlot)
        }
    }; 

    const handleSendDemande = async () => {   
        for (const pair of selectedSlot) {
            if (pair[0] ) {
                console.log(pair)
                const zonebenevole_id = pair[0]
                const user_id = parseInt(localStorage.getItem('userId'))
                const creneau_id = pair[1]
                const accepte = 0
                const archive = 0
                const data = {
                    zonebenevole_id,
                    user_id,
                    creneau_id,
                    accepte,    
                    archive
                }
                console.log(data)
                await axiosInstance.post(`demanderactivtie`, data)
                setHasSendDemande(true)
            }
        }
    }

    const  obtenirJourSemaine = (date) => {
        const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" ];
        const jour = joursSemaine[date.getDay()];   
        return jour;
    }
 
    return (
        <div>
            { hasSendDemande && (   
                <div className="overlay ">
                    <ValidationDemande />
                </div>
            )}
            <div  class={ `${hasSendDemande && 'blur'} p-6 bg-white m-9 rounded-3xl flex items-center justify-center min-h-xl`} >
                <div class="relative overflow-x-auto  sm:rounded-lg max-w-7xl min-h-full">

                    <table class="mt-12 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400"> 
                            <tr>
                                <th scope="col" class="px-6 py-3 bg-indigo-100 dark:bg-gray-800">
                                </th> 
                                {horairesArray && horairesArray.map((horaire, index) => (
                                    <th key={index} scope="col" class="px-7 py-3 bg-indigo-100 font-bold text-xl border-l border-indigo-200 dark:border-gray-700">
                                        {obtenirJourSemaine(new Date(horaire.date))} {horaire.horaire_debut.split(':')[0]}-{horaire.horaire_fin.split(':')[0]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody> 
                            {zones && zones.map((zone, index) => (
                                <tr class="border-t border-indigo-200 dark:border-gray-700">
                                    <th scope="row" class="text-xl px-6 py-7 font-medium text-gray-900 whitespace-nowrap bg-indigo-100 dark:text-white dark:bg-gray-800">
                                        {zone.nom_zb}
                                    </th> 
                                    {zone.id && tabPostHoraire[zone.id] && tabPostHoraire[zone.id].map((horraire, index) => (
                                        <td className='px-4 bg-black-500 tooltip border-l border-indigo-200' key={index}>  
                                            <div className={`w-full bg-gray-300 rounded-full h-5 dark:bg-gray-700 text-center relative` }> 
                                            
                                            {zone.id && tabPostNbMax[zone.id] && tabHoraire && (  
                                                
                                                <div className={`w-full bg-gray-400 rounded-full h-5 dark:bg-gray-700 text-center relative ` }>    
                                                    <div 
                                                        className="bg-blue-600 h-5 rounded-full top-[-10px]"
                                                        style={{
                                                            width: `${(horraire.length / (tabPostNbMax[zone.id][tabHoraire[index]]|| 0)) * 100}%`,
                                                            backgroundColor: getColorForPercentage(horraire.length / (tabPostNbMax[zone.id][tabHoraire[index]] || 0)), 
                                                        }} 
                                                    />   
                                                    { (   
                                                        <input 
                                                            className='p-3 m-1 checked:bg-[#7BC42F]'   
                                                            type="checkbox"    
                                                            onChange={() => handleSlotClick(zone.id, tabHoraire[index])} 
                                                            
                                                        />   
                                                    )}
                                                    <div className='tooltiptext'>
                                                        {horraire.length} / {tabPostNbMax[zone.id][tabHoraire[index]]}    
                                                    </div>
                                                </div>   
                                            )}
                                            </div> 
                                        </td>
                                    )) }
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                    <div className='align-center justify-center'>
                        <button onClick={() => handleSendDemande()}
                            class="my-6 ml-[1000px] relative overflow-hidden rounded-lg h-12 w-[200px] group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-lime-500"
                            >
                            <span class="relative text-white font-bold px-8 py-8"> Valider </span>
                        </button> 
                    </div>

                </div>
            </div>

        </div>
    );
};

export default CalendrierEspaceAnimation;