import React, { useState } from "react";
import Papa from "papaparse";
import axiosInstance from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

function ProfesseurFichier() {

  const [selectFile, setFile] = useState(null);
  const [nbErreur, setNb] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleFileUpload = () => {
    if (selectFile) {
      Papa.parse(selectFile, {
        header: true,
        complete: async (results) => {
          const data = results.data;
          console.log(data);
          const formattedData = data.map((item) => {
          
            return {
              nom_du_jeu: item["Nom du jeu"],
              auteur: item["Auteur"],
              editeur: item["Éditeur"],
              exposant: item["Exposant"],
              nb_joueurs: item["nb joueurs"],
              checkbox_joueur_age_min: item["âge min"],
              duree: item["Durée"],
              type: item["Type"],
              Pavant_premiere: item["PAvant-première ?"],
              notice: item["Notice"] ? item["Notice"] : " ",
              zone_benevole: item["Zone bénévole"],
              zone_plan: item["Zone plan"],
              present:
                item["Présent ?"] && item["Présent ?"] === "oui" ? "1" : "0",
              a_animer:
                item["À animer"] && item["À animer"] === "oui" ? "1" : "0",
              recu: item["Reçu"] === "oui" ? 1 : 0,
              mechanismes: item["Mécanismes"],
              themes: item["Thèmes"],
              tags: item["Tags"],
              description: item["Description"],
              image: item["Image"],
              logo: item["Logo"],
              video: item["Vidéo"],
            };
          });
          

          console.log(formattedData);

          try {
            await Promise.all(formattedData.map(async (rowData) => {

                if (rowData.zone_plan) {
                  const nom_zp = rowData.zone_plan;
                  const reponseZonePlan = await axiosInstance.post("/zoneplan", { nom_zp });
                  const zone_plan_id = reponseZonePlan.data.id;
                  console.log(reponseZonePlan);
    
                  if (rowData.zone_benevole) {
                    const nom_zb = rowData.zone_benevole;
                    const festivale_id = 1;
                    const post_id = 3;
    
                    const data_zb = {
                      nom_zb,
                      zone_plan_id,
                      festivale_id,
                      post_id
                    };

                    console.log(data_zb);
                    const reponseZoneBen = await axiosInstance.post("/zonebenevole", data_zb);
                    const zone_benevole_id = reponseZoneBen.data.id;
                    console.log(reponseZoneBen);
    
                    if (rowData.nom_du_jeu ) {
                        const jeuData = {
                            nom_du_jeu: rowData.nom_du_jeu,
                            auteur: rowData.auteur,
                            editeur: rowData.editeur,
                            exposant: rowData.exposant,
                            lcheckbox_joueur_age_min1: rowData.checkbox_joueur_age_min,
                            duree: rowData.duree,
                            type: rowData.type,
                            Pavant_premiere: rowData.Pavant_premiere,
                            notice: rowData.notice,
                            zone_benevole_id,
                            present: rowData.present,
                            a_animer: rowData.a_animer,
                            recu: rowData.recu,
                            mechanismes: rowData.mechanismes,
                            themes: rowData.themes,
                            tags: rowData.tags,
                            description: rowData.description,
                            image: rowData.image,
                            logo: rowData.logo,
                            video: rowData.video,
                        };

                        console.log(jeuData)
                        axiosInstance.post("jeu", jeuData)
                        setNb(nbErreur +1 )

                    }
                }
              }
            }));
  
          } catch (error) {
               console.log("erruer d'ajout " )
          }
        },
      });
    }
  };
  return (
    <div className="flex flex-col align-center justify-center text-center ">
        <div className="">
            <h1 className="bg-white bg-opacity-85 text-[#4A4BA8] border-2 mx-[500px] p-4 rounded-2xl font-medium text-3xl mb-12 mt-20 text-white">
                Ajouter des jeux à l'aide d'un fichier CSV
            </h1>
        </div>
        <div class="flex items-center justify-center w-full my-6 opacity-90">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-[600px] h-64 border-8 border-[#4A4BA8] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Veuillez joindre votre fichier Ou glisser</span></p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">CSV</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange= {handleFileChange}/>
            </label>
        </div> 
        <button onClick={handleFileUpload} className="mt-8 text-white bg-lime-500 hover:bg-lime-400 mx-[750px] p-2 rounded-xl ">
            Ajouter les jeux
        </button>
    </div>
  );
}

export default ProfesseurFichier;