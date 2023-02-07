import React from 'react';
import '../style/Body.css';
import img from '../assets/logonav.svg';

import im1 from '../assets/complete-documentation.png';
import im2 from '../assets/submit-your-application.png';
import im3 from '../assets/return-to-the-centre.png';
import { Link } from 'react-router-dom';
function Body() {
  return (
    <div>
        <div className='conimg  text-center d-flex justify-content-center align-items-center'>
            <div>
                <h5 class="text-white  ">Votre partenaire au Maroc pour toutes vos demandes de visa pour la <br />France </h5>
                <h1 class="text-white display-1 ">Bienvenue au centre  <br /> de Casablanca</h1>
                <button class="btn btn-primary rounded-pill text-white px-5 px-4 " style={{background:'#003d77',border:'none',outline:'none'}}>adresse et horaires d'ouverture</button>
            </div> 
        </div>
        <div className="enre container ">
            <div className='enrr p-5 text-center d-flex align-items-center flex-column justify-content-center' style={{backgroud:'white'}}>
              <h2 className='ttl'>Processus de demande de visa</h2>
              <p className='para'>
                <strong> TLScontact </strong> est le prestataire officiel pour la collecte des demandes de visas pour <strong>la France.</strong> 
                Voici les étapes obligatoires pour demander un <strong> visa Schengen </strong>
              </p>
              
              <Link class="nav-link mx-2 rounded-pill text-center d-block mt-5 enrbtn" style={{border:'2px solid #003d77',borderRaduis:'50px !important',padding:'10px 5px' }} to="/enregistrer">S'ENREGISTRER</Link>
            </div>
        </div>
        <div className='about container '>
              <div className="row bg-light py-5">
                <div className="col-sm text-center">
                  <img src={im1} style={{width:'50px'}} alt="" />
                  <p class="mt-4 prr" >
                        Préparez les documents justificatifs nécessaires, remplissez votre formulaire France-Visas, inscrivez-vous sur ce site et prenez un rendez-vous.
                  </p>
                </div>
                <div className="col-sm text-center">
                  <img src={im2} style={{width:'50px'}} alt="" />
                  <p class="mt-4 prr">
                        Présentez votre demande et fournissez vos données biométriques au centre de demande de visa.
                  </p>
                </div>
                <div className="col-sm text-center">
                  <img src={im3} style={{width:'50px'}} alt="" />
                  <p class="mt-4 prr ">
                         Retournez au centrepour récupérer votre passeport
                  </p>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Body