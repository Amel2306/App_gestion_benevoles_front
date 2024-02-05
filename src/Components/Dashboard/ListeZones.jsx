import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import '../ProfilPage/ModifyProfilPage.css'
import { MapPinIcon } from "@heroicons/react/24/solid";
import ZoneDetails from './ZoneDetails';


const ListeZones = () => {
  const [zones, setZones] = useState([]);
  const [voirZone,setVoirZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null)

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axiosInstance.get('zonebenevole');
        const zonesData = response.data;
        setZones(zonesData);
        console.log(zones)
      } catch (error) {
        console.error('Erreur lors de la récupération des zones :', error);
      }
    };

    fetchZones();
  }, []);

  const handleClick = (zone) => {
    setSelectedZone(zone)
    setVoirZone(true)
  }

  const handleClose = () => {
    setVoirZone(false)
  }

  return (
    <div>
            { voirZone && (   
                <div className="overlay ">
                    <ZoneDetails 
                        zone={selectedZone}
                        handleClose={handleClose}
                    />
                </div>
            )}
            <div  className={` ${voirZone && 'blur'} flex flex-wrap align-center justify-center`} >
                <h1 className='font-bold bg-white bg-opacity-85 text-[#4A4BA8] border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl  mt-5'>Liste des zones disponibles</h1>
                <div className='flex flex-wrap align-center justify-center'>
                    {zones.map((zone) => (
                    <div onClick={() => handleClick(zone)} className='m-4 flex flex-col text-center align-center justify-center cursor-pointer overflow-hidden relative transition-all duration-500 hover:translate-y-2 w-72 h-50 bg-neutral-50 rounded-lg shadow-xl  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-indigo-500'>
                        <div>
                            <MapPinIcon className="h-36 w-36 mr-1 text-indigo-800  inline-block" />
                            <h2 className='text-xl mx-4'>{zone.nom_zb}</h2>
                        </div>
                    </div>
                    ))}
                </div>
            </div>


    </div>
  );
};

export default ListeZones;
