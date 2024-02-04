import React from 'react';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {useNavigate} from 'react-router-dom';


const ValidationDemande = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/home')
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='flex flex-col'>
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Demande Validé</h2>
                <div className='align-center justify-center p-3 m-3'>
                    <p>
                        Merci de votre demande de participation à notre festival, un administrateur va traiter vos demandes très bientôt, surveillez votre profil pour voir vos affectation.
                        <br/>
                        À bientôt !
                    </p>
                </div>
            </div>
                <div className="flex items-center justify-between pl-[380px]">
                    <button className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all" onClick={(e) => handleSubmit(e)}>
                        Accueil
                        <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />
                    </button>
                </div>
        </div>
    );
};

export default ValidationDemande;
