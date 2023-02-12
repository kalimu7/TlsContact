import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import '../style/Formlogin.css';

function Formlogin() {
  const [ref,setreference] =  useState('');
  const handlesubmit = async (event)=>{
    event.preventDefault();
    await axios.post('http://localhost/TlsContact/public/User/update',{ref})
     .then(res=>{
      
      console.log(res.data);
      localStorage.setItem('id',res.data.id);
      localStorage.setItem('name',res.data.Firstname);
      localStorage.setItem('lname',res.data.Lastname);
      window.location.href = 'http://localhost:3000/Res';
    })
    .catch(err=>{
      console.log(err);
    });
  }

  return (
    <>
        <div className=" bigtitle d-flex justify-content-center align-items-center text-center  ">
            <h2 className='text-white display-1'>Se connecter à votre compte<br /> TLScontact</h2>
        </div>
        <div className="container forcont d-flex justify-content-center align-items-center">
        <form   className='py-5'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Reference Number:</label>
                    <input  onChange={(e)=>setreference(e.target.value)} type="text" name='refe' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3 text-center">
                <button type="submit" class="btn btn-primary rounded-pill px-5 py-2 " onClick={handlesubmit} > Submit</button>
                </div>
                
        </form>
        </div>
    </>
  )
}

export default Formlogin