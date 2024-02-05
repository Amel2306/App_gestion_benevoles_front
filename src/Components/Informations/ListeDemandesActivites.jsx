import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import '../ProfilPage/ModifyProfilPage.css'
import VoirDemandes from './VoirDemandes';


const ListeDemandesActivites = () => {
    const [usersWithDemands, setUsersWithDemands] = useState({});
    const [users, setUsers] = useState({});
    const [voirDemandes,setVoirdemandes] = useState(false);
    const [selectedList, setSelectedList] = useState([])
    const [pseudoUser, setPseudoUser] = useState("")


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  () => {
        try {
            const usersResponse =  axiosInstance.get('users');
            const allUsers = usersResponse.data;

            const usersWithDemandsData = {};
            const usersProv = {};
            for (const user of allUsers) {
                const demandsResponse =  axiosInstance.get(`demanderactivtie/user/${user.id}`);
                const demands = demandsResponse.data;
                
                if (demands.length > 0) {
                    usersWithDemandsData[user.id] = demands;
                    usersProv[user.id] = user;
                }
            }

            setUsersWithDemands(usersWithDemandsData);
            setUsers(usersProv)
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const handleClickDemandes = (liste, pseudoUser) => {
        setSelectedList (liste)
        setPseudoUser(pseudoUser)
        setVoirdemandes(true)
    }

    const handleClose = () => {
        setSelectedList ([])
        setVoirdemandes(false)
        fetchData()
    }

    return (
        <div>
            { voirDemandes && (   
                <div className="overlay ">
                    <VoirDemandes 
                        selectedList={selectedList}
                        pseudoUser={pseudoUser}
                        handleClose={handleClose}
                        updateData={fetchData} 
                    />
                </div>
            )}
            <div className={` ${voirDemandes && 'blur'} flex flex-wrap align-center justify-center`} >
                <h1>Liste des demandes d'activités</h1>
                <div className='flex flex-wrap align-center justify-center'>
                    {Object.entries(usersWithDemands).map(([userId, demands]) => (
                        <div className='m-4 flex flex-wrap align-center justify-center cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-50 bg-neutral-50 rounded-lg shadow-xl  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-indigo-500' key={userId}>
                            <figure className="mx-auto my-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-800 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-fill text-white " viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                </svg>
                            </figure>
                            <h1 className='text-xl mx-4'>Demande de: {users[userId].pseudo}</h1>
                            <div className='flex flex-wrap align-center justify-center'>
                                <button className="text-sm rounded-full bg-lime-600 px-3 py-2.5 text-white hover:bg-lime-500 mt-3 mr-2 my-3" onClick={() => handleClickDemandes(demands,users[userId].pseudo)}>
                                        Voir demandes
                                </button>
                                <button className="text-sm rounded-full bg-fuchsia-600 px-3 py-2.5 text-white hover:bg-fuchsia-500 mt-3 my-3" >
                                        Profil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListeDemandesActivites;
