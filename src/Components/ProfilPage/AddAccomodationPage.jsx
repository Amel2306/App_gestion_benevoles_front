import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";

const AddAccommodationPage = ({ onClose, updateAccommodationInfo }) => {
    const [formData, setFormData] = useState({
        ville: '',
        adresse: '',
        code_postale: null,
        nb_places: null
    });

    const userId = localStorage.getItem('userId');

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === 'nb_places' || name === 'code_postale' ? parseInt(value) : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

         const dataWithUserId = {
            ...formData,
            user_id: userId,
            
        };

        axiosInstance.post(`/hebergement`, dataWithUserId)
            .then(response => {
                console.log('Hébergement ajouté avec succès !');
                onClose();
                updateAccommodationInfo();
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'hébergement :', error);
            });
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='flex'>
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Ajouter un hébergement</h2>
                <div className='align-right justify-righ pl-[200px]'>
                    <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2" onClick={onClose}>
                        <XMarkIcon className="h-5 w-5 inline-block" />
                    </button>
                </div>
            </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ville">
                            Ville
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ville" type="text" placeholder="Ville" name="ville" value={formData.ville} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="adresse">
                            Adresse
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="adresse" type="text" placeholder="Adresse" name="adresse" value={formData.adresse} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="code_postale">
                            Code Postal
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="code_postale" type="number" placeholder="Code Postal" name="code_postale" value={formData.code_postale} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nb_places">
                            Nombre de Places
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            id="nb_places" 
                            type="number"
                            placeholder="Nombre de Places" 
                            name="nb_places" 
                            value={formData.nb_places} 
                            onChange={handleChange} 
                        />                    
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all" type="submit">
                        Envoyer
                        <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAccommodationPage;
