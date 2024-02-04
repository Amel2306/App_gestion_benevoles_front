import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "../ProfilPage/ModifyProfilPage.css"

const ModifierJeu = ({ onClose, updateGameInfo, gameId }) => {
    const [gameInfo, setGameInfo] = useState(null);
    const [formData, setFormData] = useState({
        nom_du_jeu: '',
        auteur: '',
        editeur: '',
        nb_joueurs: '',
        checkbox_joueur_age_min: '',
        duree: '',
        type: '',
        present: false,
        a_animer: false,
        recu: false,
        description: '',
        tags: '',
        image: ''
    });

    useEffect(() => {
        console.log("hello")
        axiosInstance.get(`/jeu/${gameId}`)
            .then(response => {
                setGameInfo(response.data);
                setFormData({
                    nom_du_jeu: response.data.nom_du_jeu || '',
                    auteur: response.data.auteur || '',
                    editeur: response.data.editeur || '',
                    nb_joueurs: response.data.nb_joueurs || '',
                    checkbox_joueur_age_min: response.data.checkbox_joueur_age_min || '',
                    duree: response.data.duree || '',
                    type: response.data.type || '',
                    present: response.data.present || false,
                    a_animer: response.data.a_animer || false,
                    recu: response.data.recu || false,
                    description: response.data.description || "",
                    tags: response.data.tags || "",
                    image: response.data.image || ""
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations du jeu :', error);
            });
    }, [gameId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`/jeu/${gameId}`, formData)
            .then(response => {
                console.log('Modifications du jeu envoyées avec succès !');
                onClose(); 
                updateGameInfo();
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi des modifications du jeu :', error);
            });
    };

    return (
        <div className="container flex flex-wrap rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='flex'>
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Modifier le jeu</h2>
                <div className='align-right justify-right pl-[265px]'>
                    <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2" onClick={onClose}>
                        <XMarkIcon className="h-5 w-5 inline-block" />
                    </button>
                </div>
            </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nom_du_jeu">
                        Nom du jeu
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="nom_du_jeu"
                        type="text"
                        placeholder="Nom du jeu"
                        name="nom_du_jeu"
                        value={formData.nom_du_jeu}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-row align-center justify-beetween '>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  " htmlFor="auteur">
                            Auteur
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mr-3 leading-tight focus:outline-none focus:bg-white"
                            id="auteur"
                            type="text"
                            placeholder="Auteur"
                            name="auteur"
                            value={formData.auteur}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3" htmlFor="editeur">
                            Editeur
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 ml-3 leading-tight focus:outline-none focus:bg-white"
                            id="editeur"
                            type="text"
                            placeholder="Editeur"
                            name="editeur"
                            value={formData.editeur}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row align-center justify-beetween'>
                </div>
                <div className='flex flex-row align-center justify-beetween'>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nb_joueurs">
                            Nombre de joueurs
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mr-3 leading-tight focus:outline-none focus:bg-white"
                            id="nb_joueurs"
                            type="number"
                            placeholder="Nombre de joueurs"
                            name="nb_joueurs"
                            value={formData.nb_joueurs}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3" htmlFor="duree">
                            Durée
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 ml-3 leading-tight focus:outline-none focus:bg-white"
                            id="duree"
                            type="text"
                            placeholder="Durée en minute"
                            name="duree"
                            value={formData.duree}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex flex-row align-center justify-between'>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-3" htmlFor="type">
                            Type
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 mr-3 leading-tight focus:outline-none focus:bg-white"
                            id="type"
                            type="text"
                            placeholder="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3" htmlFor="tags">
                            Tags
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 ml-3 leading-tight focus:outline-none focus:bg-white"
                            id="tags"
                            type="text"
                            placeholder="Tags séparé par des virgules"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='flex flex-row align-center justify-between'>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="present">
                            Présent
                        </label>
                        <input
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            id="present"
                            type="checkbox"
                            name="present"
                            checked={formData.present}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="a_animer">
                            À animer
                        </label>
                        <input
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            id="a_animer"
                            type="checkbox"
                            name="a_animer"
                            checked={formData.a_animer}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="recu">
                            Reçu
                        </label>
                        <input
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            id="recu"
                            type="checkbox"
                            name="recu"
                            checked={formData.recu}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                        Image
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="image"
                        type="text"
                        placeholder="Image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
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

export default ModifierJeu;
