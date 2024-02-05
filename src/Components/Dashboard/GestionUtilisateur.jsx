import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';

const GestionDemandes = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); 
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);

        const fetchData = async () => {
            try {
                const usersResponse = await axiosInstance.get('users');
                const allUsers = usersResponse.data;
                setUsers(allUsers)
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, []);

    const handleClickProfil = (userId) => {
        navigate(`/profil/${userId}`)
    }

    return (
        <div>
        {userRole === 'admin' ? (
        <div>
            <div className={`flex flex-wrap align-center justify-center`} >
                <h1 className="bg-white bg-opacity-85 text-[#4A4BA8] border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl mb-12 mt-20 text-white">
                    Liste des demandes d'activités
                </h1>
                <div className='flex flex-wrap align-center justify-center'>
                    {users.map((user) => (
                        <div className='m-4 flex flex-col align-center justify-center cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-50 bg-neutral-50 rounded-lg shadow-xl  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-indigo-500' key={user.id}>
                            <figure className="mx-auto my-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-800 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-fill text-white " viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                                </svg>
                            </figure>
                            <h1 className='text-xl mx-4'>{user.nom} {user.prenom}</h1>
                            <div className='flex flex-wrap align-center justify-center'>
                                <button className="text-sm rounded-full bg-fuchsia-600 px-3 py-2.5 text-white hover:bg-fuchsia-500 mt-3 my-3" onClick={() =>handleClickProfil(user.id)}>
                                        Profil
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>

        ):(
             <div>
            <p className="bg-white bg-opacity-85 text-indigo-900 border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl mb-12 mt-20">Vous n'avez pas les droits pour accéder à cette page.</p>
            </div>
            )}
        </div>
    );
};

export default GestionDemandes;
