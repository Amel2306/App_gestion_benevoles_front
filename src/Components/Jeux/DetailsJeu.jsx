import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { TrashIcon, PencilIcon} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import ModifierJeu from './ModifierJeu';


const DetailsJeu = () => {

  const { jeuId } = useParams();
  const [jeu, setJeu] = useState(null);
  const [modifier, setModifier] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetchJeuInfo()
  }, [jeuId]);

  const fetchJeuInfo = () => {
    axiosInstance.get(`/jeu/${jeuId}`)
    .then(response => setJeu(response.data))
    .catch(error => {
      console.error('Erreur lors de la récupération des détails du jeu:', error);
    });
  }

  
  const tagsList = jeu && jeu.tags && jeu.tags.split(',').map(tag => tag.trim());

  const handleDelete = async () => {
    await axiosInstance.delete(`jeu/${jeuId}`)
        .then(response => 
                navigate("/jeux")
        )
        .catch (error => {
            console.error('Erreur lors de la supression du jeu:', error);
        })
  }

  const handleEdit = () => {
    setModifier(!modifier)
  }

  return (
    jeu && 
    <div>
        {modifier && (
            <div className='overlay '> 
                <ModifierJeu onClose={handleEdit} updateGameInfo={fetchJeuInfo} gameId={jeuId} />
            </div>
        )}
        <div className={`flex flex-col align-center justify-center content ${modifier && "blur" }`}>
            <h1 className="bg-white bg-opacity-85 text-[#4A4BA8] border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl mb-12 mt-20 text-white">
                {jeu.nom_du_jeu}
            </h1>
        <div className="m-5 flex flex-wrap items-start align-center justify-center">
            <img className="rounded-lg max-h-[400px] p-4 m-10" src={jeu.image} alt={jeu.nom_du_jeu} />
            <div className=" rounded-lg p-4 bg-white bg-opacity-85 m-10 items-start">
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Auteur:</strong> {jeu.auteur}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Éditeur:</strong> {jeu.editeur}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Nombre de Joueurs:</strong> {jeu.nb_joueurs}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Âge Minimum:</strong> {jeu.checkbox_joueur_age_min}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Durée:</strong> {jeu.duree}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Type:</strong> {jeu.type}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Présent:</strong> {jeu.present === '1' ? 'Oui' : 'Non'}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>À Animer:</strong> {jeu.a_animer === '1' ? 'Oui' : 'Non'}</p>
            <p className='my-6 '><strong className='border-white border-2 p-2 my-4 rounded-2xl bg-[#4A4BA8] text-white '>Reçu: :</strong> {jeu.recu === '1' ? 'Oui' : 'Non'}</p>

            </div>
            <div className='flex flex-col align-center justify-center'>
                <div className="rounded-lg bg-white bg-opacity-85 m-10 mb-2 p-4 max-w-96 ">
                    <h1 className='my-4 '><strong className='border-white border-2 p-2 my-6 rounded-2xl bg-[#4A4BA8] text-white '>Description : </strong></h1>
                <p>{jeu.description}</p>

                </div>
                <div className="rounded-lg bg-white bg-opacity-85 m-10 mb-2 p-4 max-w-96">
                    <p className='my-4 '><strong className='border-white border-2 p-2 my-6 rounded-2xl bg-[#4A4BA8] text-white '> Tags</strong></p>
                    <div class="flex flex-wrap gap-2">
                        { tagsList && tagsList.map((tag) => 
                            <p
                                class="px-3 py-1 text-[12px] max-h-[400px] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#4A4BA8]">
                                #{tag}
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex flex-row align-center justify-center'>
                    <button className="ml-2 text-sm rounded-full bg-lime-500 px-3 py-2 text-white hover:bg-lime-400 m-3 " onClick={() => handleEdit()}>
                        <PencilIcon className="h-5 w-5 mr-1 inline-block" />
                            Modifier
                    </button>
                    <button className="text-sm m-3 rounded-full bg-fuchsia-700 px-3 py-2  text-white hover:bg-fuchsia-500" onClick={()=>handleDelete()}>
                        <TrashIcon className="h-5 w-5 mr-1 mb-0.5 inline-block" />
                            Supprimer
                    </button>
                </div>
                                
            </div>


        </div>
        </div>
    </div>

  );
};

export default DetailsJeu;
