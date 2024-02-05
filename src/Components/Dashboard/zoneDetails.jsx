import React, { useEffect, useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';

const ZoneDetails = ({ zone, handleClose }) => {
    const navigate = useNavigate();
    const [creneauxInfo, setCreneauxInfo] = useState({});
    const [zones, setZoneInfo] = useState([]);
    const [posts, setPostInfo] = useState([]);
    const [formData, setFormData] = useState({
        nom_zb: zone.nom_zb,
        zone_plan_id: '',
        post_id: '',
        selectedCreneaux: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                // Récupération des créneaux
                const creneauxResponse = await axiosInstance.get('creneaux');
                const creneaux = creneauxResponse.data;

                // Récupération des informations de la zone
                const zoneResponse = await axiosInstance.get(`zoneplan`);
                const zone = zoneResponse.data;

                // Récupération des informations des posts
                const postsResponse = await axiosInstance.get('post');
                const posts = postsResponse.data;

                const newCreneauxInfo = {};
                const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

                for (const creneau of creneaux) {
                    const jour = joursSemaine[new Date(creneau.date).getDay()];
                    const heureDebut = creneau.horaire_debut.split(':')[0];
                    const heureFin = creneau.horaire_fin.split(':')[0];
                    const creneauInfoText = `${jour} : ${heureDebut}-${heureFin}`;
                    newCreneauxInfo[creneau.id] = creneauInfoText;
                }

                setCreneauxInfo(newCreneauxInfo);
                setZoneInfo(zone);
                setPostInfo(posts);

                setFormData({
                    nom_zb: zone.nom_zb,
                    creneauId: zone.creneau_id.toString(),
                    postId: zone.post_id.toString(),
                    selectedCreneaux: [] // Initialiser le tableau de créneaux sélectionnés
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des informations :', error);
            }
        }

        fetchData();
    }, [zone.creneau_id, zone.post_id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (creneauId, checked) => {
        setFormData((prevData) => {
            if (checked) {
                // Ajouter le créneau à la liste des créneaux sélectionnés
                return {
                    ...prevData,
                    selectedCreneaux: [...prevData.selectedCreneaux, { creneauId, nb_benevoles_max: '' }]
                };
            } else {
                // Retirer le créneau de la liste des créneaux sélectionnés
                return {
                    ...prevData,
                    selectedCreneaux: prevData.selectedCreneaux.filter((item) => item.creneauId !== creneauId)
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoyer les modifications au backend pour la zone
            await axiosInstance.put(`zonebenevole/${zone.id}`, {
                nom_zb: formData.nom_zb,
                post_id: parseInt(formData.post_id),
                zone_plan_id: parseInt(formData.zone_plan_id)
            });

            for (const selectedCreneau of formData.selectedCreneaux) {
                await axiosInstance.post('/creneauespace', {
                    creneauId: selectedCreneau,
                    zonebenevoleId: zone.id,
                    nb_benevoles_max: parseInt(selectedCreneau[0])
                });
            }

            console.log("Les modifications ont été enregistrées avec succès.");
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations de la zone :', error);
        }
    };

    return (
        <div className="container rounded-lg bg-opacity-85 p-8 shadow-lg m-4 mr-20 ml-20">
            <div className='grid grid-cols-2 gap-4'>
                <h2 className="text-2xl font-bold text-indigo-900 mb-5">Modifier un hébergement</h2>
                <div className='flex items-end justify-end col-span-1'>
                    <button type="button" className="text-white bg-fuchsia-700 focus:outline-none hover:bg-fuchsia-500 focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-2 py-2 me-2 mb-2" onClick={handleClose}>
                        <XMarkIcon className="h-5 w-5 inline-block" />
                    </button>
                </div>
            </div>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="col-span-1">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ville">
                        Nom de la zone :
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            type="text"
                            name="nom_zb"
                            value={formData.nom_zb}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <div className="col-span-1">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ville">
                        Post :
                        <select
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            name="post_id"
                            value={formData.post_id}
                            onChange={handleInputChange}
                        >
                            {posts.map((post) => (
                                <option key={post.id} value={post.id}>
                                    {post.nom_post}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-span-1">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ville">
                        Zone plan :
                        <select
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            name="zone_plan_id"
                            value={formData.zone_plan_id}
                            onChange={handleInputChange}
                        >
                            {zones.map((zone) => (
                                <option key={zone.id} value={zone.id}>
                                    {zone.nom_zp}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="col-span-1">
                    {/* Liste des créneaux avec cases à cocher et champs de saisie pour le nombre maximum de bénévoles */}
                    {Object.entries(creneauxInfo).map(([creneauId, creneauInfoText]) => (
                        <div key={creneauId}>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ville">
                                <input
                                    type="checkbox"
                                    value={creneauId}
                                    checked={formData.selectedCreneaux.some((item) => item.creneauId === creneauId)}
                                    onChange={(e) => handleCheckboxChange(creneauId, e.target.checked)}
                                />
                                {creneauInfoText}
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                type="number"
                                placeholder="Nombre max de bénévoles"
                                value={formData.selectedCreneaux[creneauId] }
                                onChange={(e) => handleInputChange({ target: { name: 'nb_benevoles_max', value: e.target.value, creneauId } })}
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-1">
                    <button className="rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all" type="submit">
                        Envoyer
                        <PaperAirplaneIcon className="h-5 w-5 ml-2 inline-block" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ZoneDetails;
