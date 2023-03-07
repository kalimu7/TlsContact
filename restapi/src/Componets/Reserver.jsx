import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style/Reserver.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // a plugin!
import { Calendar } from '@fullcalendar/core';




function Reserver() {
    const [sessionid,setsessionid] = useState('');
    const [sessionname,setsessionname] = useState('');
    useEffect(()=>{
        const id = localStorage.getItem('id');
        const fr = localStorage.getItem('name');
        setsessionid(id);
        setsessionname(fr);
        if(!sessionid){
            window.location.href = 'http://localhost:3000/';
        }
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


    const DE = (timer)=>{
        SetDreservation(timer.event.start);
    }



    const generateevent = ()=>{
    const event = [];
    const startDate = new Date();
    const endDate = new Date('2024-03-31');
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];

    event.push(
        {
          
          start: `${dateString}T09:00:00`,
          end: `${dateString}T10:00:00`,
        },
        {
          
          start: `${dateString}T10:30:00`,
          end: `${dateString}T11:30:00`,
        },
        {
            
            start: `${dateString}T14:30:00`,
            end: `${dateString}T15:30:00`,
        },
        {
            
            start: `${dateString}T15:30:00`,
            end: `${dateString}T16:30:00`,
        }
        // add more events...
      );
    }
    return event;
    
    }
  return (
    <div>
        
        <div className="bigtittle d-flex justify-content-center align-items-center text-center  ">

                    <h2 className='text-white display-1'> réserver votre rendez-vous<br /> TLScontact</h2> 
                    
                
        </div>
        <div className="container forcontt d-flex justify-content-center align-items-center">
        <form   className='py-5' style={{width:'800px'}} >
            <div className='text-center'>

        <span className='mx-2'>welcome </span><h3 className='text-danger d-inline'>{sessionname}</h3><span className='mx-2'>make your reservation</span>
            </div>
                <FullCalendar 
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={"dayGridMonth"}
                    selectable={true}
                    // select={handleDateSelect}
                    events={generateevent()}
                    eventClick={DE}
                    
                />
                <button type='submit' className='btn btn-outline-primary my-2' onClick={handleReserver} >Reserver</button>
        </form>
        </div>

    </div>
  )
}

export default Reserver