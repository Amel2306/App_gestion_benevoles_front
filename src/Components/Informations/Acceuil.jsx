import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { TrashIcon, PencilIcon, MapPinIcon, UserGroupIcon, CalendarDaysIcon, PlusIcon, EyeIcon,PaperAirplaneIcon,XMarkIcon } from "@heroicons/react/24/solid";
const Acceuil = () => {
    



    const [animationJeuPosts, setAnimationJeuPosts] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        axiosInstance.get('post/')
            .then(response => {
                const filteredPosts = response.data.filter(post => post.nom_post === "Accueil");
                setAnimationJeuPosts(filteredPosts);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données des postes :', error);
            });
    }, []);

    const handleEditClick = (postId, description) => {
        setSelectedPostId(postId);
        setNewDescription(description);
        setShowEditPopup(true);
    };

    const handleSaveDescription = () => {
        // Envoyer la nouvelle description au serveur
        axiosInstance.put(`post/${selectedPostId}`, { description: newDescription })
            .then(response => {
                console.log('Description modifiée avec succès !');
                // Mettre à jour les données localement
                const updatedPosts = animationJeuPosts.map(post => {
                    if (post.id === selectedPostId) {
                        return { ...post, description: newDescription };
                    }
                    return post;
                });
                setAnimationJeuPosts(updatedPosts);
                setShowEditPopup(false);
            })
            .catch(error => {
                console.error('Erreur lors de la modification de la description :', error);
            });
    };

    return (
        <div className='m-[100px] rounded-lg bg-opacity-85 bg-white p-6 shadow-lg'>
            <h1 className='text-2xl font-bold text-indigo-900'>Informations Accueil</h1>
            <div>
                {animationJeuPosts.map(post => (
                    <div key={post.id} className='mt-5'>
                        <p>{post.description}</p>
                        <div className="flex items-center justify-center mt-5">
                        <button onClick={() => handleEditClick(post.id, post.description)} className="rounded-full bg-indigo-900 px-4 py-2 text-white hover:bg-indigo-500">
                        <PencilIcon className="h-5 w-5 mr-2 inline-block"/>
                        Modifier</button>
                        </div>
                    </div>
                ))}
            </div>

            {showEditPopup && (
    <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-indigo-900">Modifier la description</h3>
                        <button onClick={() => setShowEditPopup(false)} type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-8">
                        <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} className="resize-none border rounded-md w-full" rows="4"></textarea>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={handleSaveDescription} type="button" className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all">
                        Enregistrer
                        <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />

                    </button>
                    
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
};


export default Acceuil;