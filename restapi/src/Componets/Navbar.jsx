import React from 'react'
import '../style/Navbar.css';
import img from '../assets/logonav.svg';
import Axios from 'axios';
import { useEffect,useState } from 'react';
import axios from 'axios';
function Navbar() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost/TlsContact/public/User/read').then(
            res=>{setData(res.data)
            console.log(res.data);
            }
            ).catch(err=>console.log(err));
        
    },[])
    const arr = data.map((data,index) => {
        return(
            <>
                <h3>{data.id}</h3>
                <h3>{data.Firstname}</h3>
            </>
        )
    })
  return (
    <div className='nav'>
        <img className='navlogo' src={img} alt="logo" />
        {arr}
        

    </div>
  )
}

export default Navbar