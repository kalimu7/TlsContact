import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react'
import '../style/Reserver.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import { Calendar } from '@fullcalendar/core';
import _ from 'lodash';



function Reserver() {
    const [Display,SetDisplay] = useState('');
    const [Day,setDay] = useState('');
    const [Minit,setMinit] = useState('');
    const [idU,setsessionid] = useState('');
    const [sessionname,setsessionname] = useState('');
    const [alreadybooked,setalreadybooked] = useState({});
    useEffect(()=>{
        const idU = localStorage.getItem('id');
        const fr = localStorage.getItem('name');
        setsessionid(idU);
        setsessionname(fr);
        axios.post('http://localhost/TlsContact/public/User/checkRese',{idU}).then(
    
            res=>{
            console.log(idU);
            // console.log(res.data);
            setalreadybooked(res.data);
            }
            ).catch(err=>console.log(err))
    },[])
   
    const handleChange = (event)=>{
        setMinit(event.target.value);
        // console.log(event.target.value);
    }
    useEffect(()=>{
        if(!_.isEmpty(alreadybooked)){
            if(alreadybooked.alreadyreserved===false){
                console.log(alreadybooked);
                console.log('keep bieng here to book');
            }else{
                console.log('You already booked');
                console.log(alreadybooked.datedereservation);
                console.log(alreadybooked.time);
                
            }
        }
    },[])
    const [ddr,SetDreservation] = useState('');
    const  handleReserver = (e)=>{
        e.preventDefault();
        console.log('data ready to push');
        console.log(Day);
        console.log(Minit);
        
        axios.post('http://localhost/TlsContact/public/User/reserver',{Day,Minit,idU}).then(
            
            (res)=>{
                console.log(res);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    


    // const handleDateSelect = (data)=>{
    //     SetDreservation(data.startStr);
    // }


    
    
    

    // ****************get booked dates**************
    const [booked,setbooked] = useState([]);
    const allappoinment = ['9:15','10:15','11:15','14:15','15:15'];
    const uniqueArray = allappoinment.filter((item) => !booked.includes(item))
    // console.log(alldates);
    // ****************set the intervall**************
    const today = new Date();

    // Calculate 3 months from today's date
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 3);
    const handleselect = async (info)=>{
        const day = info.startStr;
        setDay(day);
        console.log(day);
        await axios.post('http://localhost/TlsContact/public/User/dates',{day}).then(
            res=>{
                if(res.data.warn == 'there is no user with this reference email'){
                    setbooked([]);
                    console.log('gggg');
                }else{
                    const array =  res.data.data;
                    const Narray = array.map(obj => obj.time)
                    setbooked(Narray);
                }
            }
        ).catch(
            err=>{
                console.log(err);
            }
        )
    }
    if(alreadybooked.alreadyreserved){
        console.log(alreadybooked);
    }
   
    // if(!_.isEmpty(booked)){
    //     console.log(booked); 
    //     console.log(allappoinment); 
    // }
  return (
    <div>
        <div className='text-end mx-5 my-1'>
            <a href="/user" className='btn btn-primary'>Profile</a>
        </div>
        <div className="bigtittle d-flex justify-content-center align-items-center text-center  ">
                    
                    <h2 className='text-white display-1'> réserver votre rendez-vous<br /> TLScontact</h2> 
                    
                    
                
        </div>
        <div className="container forcontt d-flex justify-content-center align-items-center">
        
                <form   className='py-5' style={{width:'400px'}}  >
                   
                    
                     <div className='text-center'>
                        <span className='mx-2'>welcome </span><h3 className='text-danger d-inline'>{sessionname}</h3><span className='mx-2'>make your reservation</span>
                    </div>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    select={handleselect}
                    selectable={true}
                   
                />
                <select  id="select" className='my-2' value={Minit} onChange={handleChange}  >
                    <option value="">Select your allappoinment PLease</option>
                    {uniqueArray.map((option)=>(
                        <option value={option} key={option}>{option}</option>
                    ))
                    }
                </select>
                
                <button type='submit' className='btn btn-outline-primary my-2' onClick={handleReserver} >Reserver</button>
                {alreadybooked.alreadyreserved ? (
                    <Link to={`http://localhost/TlsContact/public/User/Cancel/${idU}`} className='btn btn-outline-danger my-2 d-block ml-5'  >Cancel</Link>
                ): ("")}
                
                <div className="">
                    <p className='bg-primary text-white p-2'>
                        Your booked the {alreadybooked.datedereservation} at {alreadybooked.time}
                    </p>
                </div>
                </form>
                
        </div>

    </div>
  )
}

export default Reserver