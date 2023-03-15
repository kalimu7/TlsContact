import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import '../style/Userplatform.css';
import axios from 'axios';
function UserPlatform() {
    const [Firstname,setdata] = useState('');
    const [Lastname,setlname] = useState('');
    const [id,setid] = useState('');
    const [ref,setrefe] = useState('');
    useEffect(()=>{
        setdata(localStorage.getItem('name'));
        setlname(localStorage.getItem('lname'));
        setid(localStorage.getItem('id'));
        setrefe(localStorage.getItem('ref'));
    },[])
    const [dt,setdt] = useState({Firstname:'',Lastname:''});
    
    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log(id);
        // console.log(Lastname,Firstname);
        axios.post('http://localhost/TlsContact/public/User/modi',{Firstname,Lastname,id}).
        then(res=>console.log(res))
        .catch(err=>console.log(err))
        
    }
    useEffect(()=>{
        
        axios.get(`http://localhost/TlsContact/public/User/update/${ref}`).then(res=>{console.log(res)}).catch(err=>console.log(err))
        
    })
  return (
    <div className='contentuser'>
        <div className='  '>
            <p>
            <Link className='text-danger' to="">Edit profile</Link> <br />
            <Link className='text-success' to="">delete profile</Link>
            </p>
        </div>
        <div className="update container forcont d-flex justify-content-center align-items-center">
        
        <form   className='py-5'>
                <div class="mb-3">
                    {id}
                    <label for="exampleInputEmail1" class="form-label">First Name</label>
                    <input onChange={e=>setdata(e.target.value)} value={Firstname} type="text" name='Firstname' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Last Name</label>
                    <input type="text" onChange={e=>setlname(e.target.value)} value={Lastname} name='Lastname' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="submit" class="btn btn-primary rounded-pill px-5 py-2" onClick={handlesubmit} > Submit</button>
                </div>
        </form>
        </div>

    </div>
  )
}

export default UserPlatform