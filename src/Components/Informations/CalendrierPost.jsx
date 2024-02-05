import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import "./CalendrierStyle.css"

const CalendrierPost = () => {

    const navigate = useNavigate();   

    const [posts, setPosts] = useState([]);
    const [horaires, setHoraires] = useState([]);
    const [tabPostHoraire, setTabPostHoraire] = useState({})
    const [tabPostNbMax, setTabPostNbMax] = useState({})
    const [selectedSlot, setSelectedSlot] = useState([]);   
    const [chooseJeuZone, setChooseJeuZone] = useState(false)
    const [i,setI] = useState(0);

                                    
    useEffect( () => { 
            axiosInstance.get(`post`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de posts :', error);
            });

            axiosInstance.get(`creneaux`) 
            .then(response => {
                setHoraires(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations de créneaux :', error);
            });

            const fetchData = async () => {
                const updatedTabPH = {};
                await Promise.all(posts.map(async post => {
                    const tabH = [];
                    await Promise.all(horaires.map(async horaire => { 
                        try {
                            const response = await axiosInstance.get(`demanderactivtie/postCreneau/${post.id}/${horaire.id}`);
                            const dataColle = await Array.isArray(response.data) ? response.data.flat() : response.data;
                            tabH.push(dataColle);
                        } catch (error) { 
                            console.error('Erreur lors de la récupération des informations de demande par horaire et post :', error);
                        }
                    })); 
                    updatedTabPH[post.id] = tabH; 
                }));
                setTabPostHoraire(updatedTabPH);
            };

            const fetchData2 = async () => {
                const updatedTabPH = {};
                await Promise.all(posts.map(async post => {
                    const tabNbMax = {};
                    await Promise.all(horaires.map(async horaire => {
                        try {
                            const response = await axiosInstance.get(`creneauespace/post/${post.id}/${horaire.id}`);
                            let nbMax = 0;
                            if (response) {
                                const responseTraite = response.data.flat()
                                for (const creneau of  responseTraite) {
                                    nbMax = nbMax+ creneau.nb_benevoles_max 
                                }
                                tabNbMax[horaire.id] = nbMax 
                            }
                        } catch (error) {
                            console.error('Erreur lors de la récupération des informations de demande par horaire et post :', error);
                        }
                    }));
                    updatedTabPH[post.id] = tabNbMax;
                }));   
                setTabPostNbMax(updatedTabPH);
            };

            fetchData(); 
            fetchData2();
            if (i < 5) {
                setI(i+1)
                console.log(i)
            }
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

    const handleSlotClick = (postId, slotIndex) => {
        const pairExists = selectedSlot.some(pair => pair[0] === postId && pair[1] === slotIndex);
        const pairJeu = selectedSlot.some(pair => pair[0] === 3 );
        if (pairJeu) {
            setChooseJeuZone(true)
        }
        else {
            setChooseJeuZone(false)
        }
        if (pairExists) {
            const updatedSelectedSlot = selectedSlot.filter(pair => pair[0] !== postId || pair[1] !== slotIndex);
            setSelectedSlot(updatedSelectedSlot);
        } else {
            setSelectedSlot([...selectedSlot, [postId, slotIndex]]);
        }
    }; 

    const handleSendDemande = async () => {
        let aJeu = false
        for (const pair of selectedSlot) {
            if (pair[0] !== 3 ) { 
                const zbOfPost = await axiosInstance.get(`zonebenevole/post/${pair[0]}`)
                const listeZone = zbOfPost.data
                const zonebenevole_id = listeZone[0].id
                const user_id = localStorage.getItem('userId')
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
                //await axiosInstance.post(`demanderactivtie`, data)
            }   
            else {
                aJeu = true
            }
            console.log(selectedSlot)
        }
        if (aJeu) {
            console.log(selectedSlot)   
            navigate('/calendrier_espace_animation', { state: {selectedSlot, horaires} });
        } 
    }
 
    return (
        <div class='p-6 bg-white bg-opacity-85 m-9 rounded-3xl flex items-center justify-center min-h-xl' >
            <div class="relative overflow-x-auto  sm:rounded-lg max-w-7xl min-h-full">
                <div class="flex flex-row cursor-pointer">
                    <h1 class=" px-[300px] ml-[400px] py-4 text-gray-50 bg-[#4A4BA8] font-bold text-3xl rounded-xl">
                        Week-end
                    </h1>
                </div>
                <div class="flex flex-row  items-center justify-center">
                    <h1 class=" px-[230px] mr-8 py-4 my-6 ml-[200px] text-gray-50 bg-indigo-300 font-bold text-2xl rounded-xl">
                        Samedi
                    </h1>
                    <h1 class=" px-[150px]  py-4 my-6 ml-6 text-gray-50 bg-indigo-300 font-bold text-2xl rounded-xl">
                        Dimanche
                    </h1>
                </div>

                <table class="drop-shadow-lg bg-white bg-opacity-90 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 bg-indigo-200 dark:bg-gray-800">
                            </th>
                            {horaires && horaires.map((horaire, index) => (
                                <th key={index} scope="col" class="px-7 py-3 bg-indigo-200 font-bold text-xl border-l border-300 dark:border-gray-700">
                                    {horaire.horaire_debut.split(':')[0]}-{horaire.horaire_fin.split(':')[0]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody> 
                        {posts && posts.map((post, index) => (
                            <tr class="border-t border-indigo-300 dark:border-gray-700">
                                <th scope="row" class="text-xl px-6 py-7 font-medium text-gray-900 whitespace-nowrap bg-indigo-200 dark:text-white dark:bg-gray-800">
                                    {post.nom_post}
                                </th> 
                                {post.id && tabPostHoraire[post.id] && tabPostHoraire[post.id].map((horraire, index) => (
                                    <td className='px-4 bg-black-500 tooltip border-l border-indigo-300' key={index}>  
                                        <div className={`w-full bg-gray-400 rounded-full h-5 dark:bg-gray-700 text-center relative` }> 
                                        
                                        {post.id && tabPostNbMax[post.id] && tabPostNbMax[post.id][index+2] && (
                                            <div className={`w-full bg-gray-400 rounded-full h-5 dark:bg-gray-700 text-center relative ` }> 
                                                <div 
                                                    className="bg-blue-600 h-5 rounded-full top-[-10px]"
                                                    style={{
                                                        width: `${(horraire.length / (tabPostNbMax[post.id][index+2] || 0)) * 100}%`,
                                                        backgroundColor: getColorForPercentage(horraire.length / (tabPostNbMax[post.id][index+2] || 0)), 
                                                    }} 
                                                /> 
                                                {tabPostNbMax[post.id][index+2] && (
                                                    <input 
                                                        className='p-3 m-1 checked:bg-[#7BC42F]'   
                                                        type="checkbox" 
                                                        onChange={() => handleSlotClick(post.id, index+2)} 
                                                        
                                                    />
                                                )}
                                                <div className='tooltiptext'>
                                                    {horraire.length} / {tabPostNbMax[post.id][index+2]}
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
                        class="my-6 ml-[1000px] relative overflow-hidden rounded-lg h-12 w-[200px] group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-lime-500"
                        >
                        <span class="relative text-white font-bold px-8 py-8"> {chooseJeuZone ? "Suivant" : "Valider"} </span>
                    </button> 
                </div> 

            </div> 
        </div>      
    );
};

export default CalendrierPost;