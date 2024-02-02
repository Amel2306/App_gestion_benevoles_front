import React from 'react';
import axiosInstance from '../../config/axiosConfig';
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";

const DeleteAccommodationPage = ({ accommodationId, onClose }) => {
    console.log(accommodationId);
    const handleDelete = () => {
        axiosInstance.delete(`/hebergement/${accommodationId}`)
            .then(response => {
                console.log("Hébergement supprimé avec succès.");
                onClose();

            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'hébergement :', error);
            });
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Confirmation de suppression</h2>
                <div className='align-right justify-righ pl-[150px]'>
                    <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2" onClick={onClose}>
                        <XMarkIcon className="h-5 w-5 inline-block" />
                    </button>
                </div>
            </div>
            <p className="text-gray-700 mb-5">Êtes-vous sûr de vouloir supprimer cet hébergement ? Cette action est irréversible.</p>
            <div className="flex items-center justify-center">
                <button className="rounded-full bg-indigo-900 px-4 py-2 text-white hover:bg-fuchsia-700 transition-all mr-2" onClick={handleDelete}>
                    <TrashIcon className="h-5 w-5 mr-2 mb-1 inline-block" />
                    Supprimer l'hébergement
                </button>
                <button className="rounded-full bg-gray-400 px-4 py-2 text-white hover:bg-lime-600 transition-all" onClick={onClose}>
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default DeleteAccommodationPage;
