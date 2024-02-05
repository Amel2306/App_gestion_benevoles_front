import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const GestionUtilisateur = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosInstance.get('/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            });
    }, []);

    const handleEditUser = (userId) => {

        console.log('Modifier l\'utilisateur avec l\'ID :', userId);
    };

    const handleDeleteUser = (userId) => {

        console.log('Supprimer l\'utilisateur avec l\'ID :', userId);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-indigo-900">Gestion des Utilisateurs</h1>
            <div>
                {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between mt-5">
                        <div>
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEditUser(user.id)} className="text-indigo-600 hover:text-indigo-900">
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestionUtilisateur;
