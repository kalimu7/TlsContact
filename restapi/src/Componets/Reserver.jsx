import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import '../style/Reserver.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import { Calendar } from '@fullcalendar/core';
import _ from 'lodash';



function Reserver() {
    const [sessionid,setsessionid] = useState('');
    const [sessionname,setsessionname] = useState('');
    useEffect(()=>{
        const id = localStorage.getItem('id');
        const fr = localStorage.getItem('name');
        setsessionid(id);
        setsessionname(fr);
        
    })
    
    const [ddr,SetDreservation] = useState('');
    const  handleReserver = (e)=>{

        e.preventDefault();
        
        axios.post('http://localhost/TlsContact/public/User/reserver',{ddr}).then(
            
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
   
    if(!_.isEmpty(booked)){
        console.log(booked); 
        console.log(allappoinment);
    }
  return (
    <div>
        
        <div className="bigtittle d-flex justify-content-center align-items-center text-center  ">

                    <h2 className='text-white display-1'> réserver votre rendez-vous<br /> TLScontact</h2> 
                    
                
        </div>
        <div className="container forcontt d-flex justify-content-center align-items-center">
        <form   className='py-5' style={{width:'400px'}} >
            <div className='text-center'>

        <span className='mx-2'>welcome </span><h3 className='text-danger d-inline'>{sessionname}</h3><span className='mx-2'>make your reservation</span>
            </div>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    select={handleselect}
                    selectable={true}
                />
                <select value={selectedValue} onChange={handleSelectChange} id="select" className='my-2'>
                    <option>Select your allappoinment PLease</option>
                    {uniqueArray.map((option)=>(
                        <option key={option}>{option}</option>
                    ))
                    }
                </select>
                {/* <select name="sl" id="select">
                    <option value="9:15">9:15</option>
                    <option value="9:15">10:15</option>
                    <option value="9:15">11:15</option>
                    <option value="9:15">14:15</option>
                    <option value="9:15">15:15</option>
                </select> */}
                <button type='submit' className='btn btn-outline-primary my-2' onClick={handleReserver} >Reserver</button>
        </form>
        </div>

    </div>
  )
}

export default Reserver