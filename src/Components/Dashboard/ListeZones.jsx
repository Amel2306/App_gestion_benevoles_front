import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

import { MapPinIcon } from "@heroicons/react/24/solid";


const ListeZones = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axiosInstance.get('zonebenevole');
        const zonesData = response.data;
        setZones(zonesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    };

    fetchZones();
  }, []);

  return (
    <div>
      <h1>Liste des zones disponibles</h1>
      <div className='flex flex-wrap align-center justify-center'>
        {zones.map((zone) => (
        <div className='m-4 flex flex-col text-center align-center justify-center cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-50 bg-neutral-50 rounded-lg shadow-xl  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-indigo-500'>
            <div>
                <MapPinIcon className="h-36 w-36 mr-1 text-indigo-800  inline-block" />
                <h2 className='text-xl mx-4'>{zone.nom_zb}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeZones;
