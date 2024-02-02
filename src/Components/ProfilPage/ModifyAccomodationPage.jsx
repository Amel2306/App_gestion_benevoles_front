import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const ModifyAccommodationPage = ({ accommodationId, onClose, updateAccommodationInfo }) => {
    const [accommodationInfo, setAccommodationInfo] = useState(null);
    const [formData, setFormData] = useState({
        ville: '',
        adresse: '',
        code_postal: '',
        nb_places: ''
    });

    useEffect(() => {
        if (accommodationId) {
            axiosInstance.get(`/hebergement/${accommodationId}`)
                .then(response => {
                    setAccommodationInfo(response.data);
                    setFormData({
                        ville: response.data.ville || '',
                        adresse: response.data.adresse || '',
                        code_postal: response.data.code_postal || '',
                        nb_places: response.data.nb_places || ''
                    });
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations de l\'hébergement :', error);
                });
        }
    }, [accommodationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`/hebergement/${accommodationInfo.id}`, formData)
            .then(response => {
                console.log('Modifications de l\'hébergement envoyées avec succès !');
                onClose();
                updateAccommodationInfo();
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi des modifications de l\'hébergement :', error);
            });
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='flex'>
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Modifier un hébergement</h2>
                <div className='align-right justify-righ pl-[185px]'>
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="code_postal">
                            Code Postal
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="code_postal" type="text" placeholder="Code Postal" name="code_postal" value={formData.code_postal} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nb_places">
                            Nombre de Places
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nb_places" type="text" placeholder="Nombre de Places" name="nb_places" value={formData.nb_places} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex items-center justify-between pl-[380px]">
                    <button className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all" type="submit">
                        Envoyer
                        <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifyAccommodationPage;
