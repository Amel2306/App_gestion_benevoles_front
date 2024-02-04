import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig'; 
import { useNavigate } from 'react-router-dom';

const ListeJeux = () => {
  const [jeux, setJeux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const response = await axiosInstance.get('/jeu');
        setJeux(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    };

    fetchJeux();
  }, []); 

  return (
    <div className="liste-jeux-container">
        <h1 className="bg-white bg-opacity-85 text-[#4A4BA8] border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl mb-12 mt-20 text-white">
            Liste des Jeux
        </h1>
      <div className="flex flex-wrap align-center justify-center">
        {jeux.map((jeu) => (
          <div key={jeu.id} className='bg-opacity-90 m-4 flex flex-wrap align-center justify-center cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-50 bg-neutral-50 rounded-lg shadow-xl  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-indigo-500'>

            <img
              src={jeu.logo}
              alt={jeu.nom_du_jeu}
              onClick={() => navigate(`/jeuDetails/${jeu.id}`)} 
              className="w-72 h-72 p-6"
            />
            <h2 className='font-medium text-lg' >{jeu.nom_du_jeu}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeJeux;
