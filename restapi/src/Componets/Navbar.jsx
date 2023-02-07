import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import img from '../assets/logonav.svg';
import Axios from 'axios';
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import axios from 'axios';
function Navbar() {
    
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost/TlsContact/public/User/read').then((res)=>{
            setData(res.data.data)
            console.log(res.data.data);
        }
            
            ).catch(err=>console.log(err));
        
    },[])
    
    const arr = data.map((data,index) => {
        return(
            <div key={index}>
                <h3>{data.id}</h3>
                <h3>{data.Firstname}</h3>
            </div>
        )
    })
  return (
    <div>
        
        {/* {arr} */}
        {/* bootstrap navbar */}
        <nav class="navbar navbar-expand-lg navbar-light bg-white px-5">
            <Link class="navbar-brand" to="/"><img className='navlogo' src={img} alt="logo" /></Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end " id="navbarNav" >
                <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link   mx-2 rounded-pill" style={{color:'#003d77',border:'2px solid #003d77',borderRaduis:'50px !important' }} href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link  mx-2 rounded-pill" style={{color:'#003d77',border:'2px solid #003d77',borderRaduis:'50px !important' }} href="#">se connecter</a>
                </li>
                <li class="nav-item">
                    <Link class="nav-link mx-2 rounded-pill" style={{color:'#003d77',border:'2px solid #003d77',borderRaduis:'50px !important' }} to="enregistrer">S'ENREGISTRER</Link>
                </li>
                </ul>
            </div>
            </nav>
        {/* bootstrap navbar */}
        

    </div>
  )
}

export default Navbar