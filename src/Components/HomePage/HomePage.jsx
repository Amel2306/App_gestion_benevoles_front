import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoGrandFormat from '../Assets/logoGrandFormat.png'


const HomePage = () => {
    const navigate = useNavigate();

    const handleParticipateClick = () => {
        const userId = localStorage.getItem('userId');
        if (userId===null) {
            navigate('/');
        }else{
        navigate('/calendrier_post');}
    };

    return (
        <div className="mx-auto max-w-7xl mt-[30px] rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center mb-8">
                <img src={logoGrandFormat} alt="Logo de l'application" className="mx-auto" />
            </div>
            
            <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-4">Sortons Jouer ! </h1>
    <p className="text-lg text-gray-700 leading-relaxed">
        <p>Bienvenue sur l'application de gestion de bénévoles pour le Festival du Jeu de Montpellier !</p>

        <p>Chaque année, Montpellier célèbre le Festival du Jeu au Corum, offrant deux journées exceptionnelles dédiées aux jeux de société. Plongez dans une atmosphère ludique et conviviale où les joueurs de tous âges se retrouvent pour des moments inoubliables.</p>

        <p>Le Festival du Jeu de Montpellier est l'occasion parfaite pour les bénévoles de participer à un événement festif et animé. Notre application facilite votre engagement en vous permettant de choisir parmi une multitude de postes, tels que l'animation de jeux, la cuisine, la vente et la restauration.</p>

        <p>Mais ce n'est pas tout ! Notre plateforme vous offre également la possibilité de rechercher un hébergement pendant le festival. Vous pouvez effectuer des demandes d'hébergement aux autres bénévoles qui proposent des logements, créant ainsi une communauté solidaire et chaleureuse.</p>

        <p>Rejoignez-nous pour une expérience unique au Festival du Jeu de Montpellier, où le plaisir du jeu et le partage sont au cœur de chaque instant. Inscrivez-vous dès maintenant et faites partie de cette aventure extraordinaire !</p>
    </p>
</div>

            <div className="text-center">
                <button
                    className="font-bold rounded-full bg-lime-600 px-4 py-2 text-white hover:bg-indigo-700 transition-all"
                    onClick={handleParticipateClick}
                >
                    Je participe au festival
                </button>
            </div>
        </div>
    );
};

export default HomePage;
