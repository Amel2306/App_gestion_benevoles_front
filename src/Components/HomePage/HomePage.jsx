import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleParticipateClick = () => {
        // Rediriger l'utilisateur vers la page calendrier_post
        navigate('/calendrier_post');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Logo de l'application */}
            <div className="text-center mb-8">
                <img src="/path/to/your/logo.png" alt="Logo de l'application" className="w-32 h-32 mx-auto" />
            </div>
            
            {/* Texte d'explication */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre application</h1>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et magna quam. Integer consequat eros sit amet dui ullamcorper, nec varius dolor facilisis.</p>
            </div>
            
            {/* Bouton "Je participe au festival" */}
            <div className="text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleParticipateClick}
                >
                    Je participe au festival
                </button>
            </div>
        </div>
    );
};

export default HomePage;
