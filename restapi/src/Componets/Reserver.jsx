import axios from 'axios';
import React, { useState } from 'react'
import '../style/Reserver.css';





function Reserver() {
    
    
    const [ddr,SetDays] = useState('');
    const [ddt,SetHours] = useState('');
    const [msg,setmsg] = useState('');
    const handlesubmitt = (e)=>{
        e.preventDefault();
        axios.post('http://localhost/TlsContact/public/User/reserver',{ddr,ddt})
        .then((res)=>{
            console.log(res.data);
            setmsg(res.data);
        }).catch((err)=>{
            console.log(err);
        })
        

    }
    
  return (
    <div>
        <h5 className='text-danger'></h5>
        <div className="bigtittle d-flex justify-content-center align-items-center text-center  ">
                    <h2 className='text-white display-1'> réserver votre rendez-vous<br /> TLScontact</h2>
        </div>
        <div className="container forcontt d-flex justify-content-center align-items-center">
        <form   className='py-5'>
                
                <div class="mb-3">
                    {/* <p className='text-dabger'>{ref}</p> */}
                    <input onChange={(e)=>SetDays(e.target.value)} type="date" name='day' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Select time</label>
                    <select  onChange={(e)=>SetHours(e.target.value)} name='hours' class="form-select form-select-sm" aria-label=".form-select-sm example" >
                        <option selected value="" >Select</option>
                        <option  value="9:15" >9:15</option>
                        <option value="10:15">10:15</option>
                        <option value="11:15">11:15</option>
                        <option value="14:15">14:15</option>
                        <option value="15:15">15:15</option>
                    </select>
                </div>
                <div className='d-flex justify-content-center'>
                    <button  class="btn btn-primary rounded-pill px-5 py-2" type='submit' onClick={handlesubmitt} >Book</button>
                </div> 
                
        </form>
        </div>

    </div>
  )
}

export default Reserver