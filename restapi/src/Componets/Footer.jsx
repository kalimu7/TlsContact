import React from 'react'
import '../style/Footer.css';
import img from '../assets/logo-white.svg';
import imglinkdin from '../assets/linkedin-circled.png';

function Footer() {
  return (
    <div>
        <div className="footer text-white  w-100 p-5 mt-3">
            <div className="row">
                <div className=" col px-4">
                    <p className='title'>Informations sur le Centre</p>
                    <p>Services Additionnels</p>
                    <p>Adresse et Horaires d'ouverture</p>
                    <p>Nous contacter</p>
                </div>
                <div className=" col px-4">
                    <p className='title'>Démarches à Suivre</p>
                    <p>Procédure de demande</p>
                    <p>Frais de Demande</p>
                    <p>Suivre Ma Demande</p>
                </div>
                <div className=" col px-4">
                    <p className='title'>Mentions Légales</p>
                    <p>Politique de Confidentialité</p>
                    <p>Politique des Cookies</p>
                    <p>Conditions Générales de Services</p>
                </div>
                <div className=" col px-4">
                    <p className='title'>Informations Générales</p>
                    <p>FAQ</p>
                    <p>Actualités</p>
                    <p>Notes de Sécurité</p>
                </div>
                <hr />
            </div>
            <div className="text-center row align-items-center justify-content-center">
                <div className="col">
                <img className='navlogo' src={img} alt="logo" />
                </div>
                <div className="col">
                    <p>© 2019 - 2023 TLScontact. Tous droits réservés.</p>
                </div>
                <div className="col">
                    <img className='likndin' src={imglinkdin} alt="logo" />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Footer