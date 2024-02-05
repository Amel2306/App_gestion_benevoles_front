import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";


const ModifyProfilePage = ({ onClose, updateUserInfo,user_id }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        numero_tel: '',
        pseudo: '',
        taille: '',
        cherche_hebergement: false,
        role: ''
    });

    const roles = ["bénévole", "admin", "référent"];

    const tailles = ["xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];


    useEffect(() => {
        console.log(user_id)
        if (user_id) {
            axiosInstance.get(`/users/${user_id}`)
                .then(response => {
                    setUserInfo(response.data);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        nom: response.data.nom || prevFormData.nom,
                        prenom: response.data.prenom || prevFormData.prenom,
                        email: response.data.email || prevFormData.email,
                        numero_tel: response.data.numero_tel || prevFormData.numero_tel || null,
                        pseudo: response.data.pseudo || prevFormData.pseudo||null,
                        taille: response.data.taille || prevFormData.taille || null,
                        cherche_hebergement: response.data.cherche_hebergement || prevFormData.cherche_hebergement,
                        role: response.data.role || prevFormData.role||null
                    }));
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
                });
        }
    }, [user_id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`/users/${user_id}`, formData)
            .then(response => {
                console.log('Modifications utilisateur envoyées avec succès !');
                onClose(); 
                updateUserInfo();
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi des modifications utilisateur :', error);
            });
    };
    

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='flex'>
        <h2 className="text-2xl font-bold text-indigo-900 mb-5">Modifier son profil</h2>
        <div className='align-right justify-righ pl-[265px]'>
        <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2 "onClick={onClose}>

        <XMarkIcon className="h-5 w-5 inline-block" />                    
                    </button>
                    </div>
                    </div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nom">
                            Nom
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nom" type="text" placeholder="Nom" name="nom" value={formData.nom} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prenom">
                            Prénom
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="prenom" type="text" placeholder="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} />
                    </div>
                    
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numero_tel">
                            Téléphone
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="numero_tel" type="tel" placeholder="Téléphone" name="numero_tel" value={formData.numero_tel} onChange={handleChange} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pseudo">
                            Pseudo
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pseudo" type="text" placeholder="Pseudo" name="pseudo" value={formData.pseudo} onChange={handleChange} />
                    </div>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="taille"
                        name="taille"
                        value={formData.taille}
                        onChange={handleChange}
                    >
                        <option value="">Sélectionner une taille</option>
                        {tailles.map((taille, index) => (
                            <option key={index} value={taille}>{taille}</option>
                        ))}
                    </select>


                    <div className="w-full md:w-1/2 px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="role">
                        Rôle
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Sélectionner un rôle</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                    
                    
                </div>
                <div className="flex items-center justify-between pl-[380px]">
                    <button className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all"type="submit" >
                            Envoyer
                            <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />
                        </button>
                </div>
            </form>
        </div>
    );
    
    
};

export default ModifyProfilePage;
