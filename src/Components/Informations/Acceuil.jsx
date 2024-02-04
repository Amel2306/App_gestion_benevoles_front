import React from 'react';
import { useNavigate } from 'react-router-dom';



const Acceuil = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate("/liste_demandes_activites")
    }

    return (
        <div>
            <h1>INFORMATIONS ACCEUIL</h1>
            <button className="bg-white" onClick={() => handleClick()}>accepter demandes</button>
        </div>

    );
};

export default Acceuil;