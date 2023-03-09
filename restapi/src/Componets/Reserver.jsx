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


    
    const handleDateSelect = (data) => {
        const selectedDate = data.startStr;
        if (alldates.includes(selectedDate)) {
          // If the selected date is already booked, show an alert message or do nothing
          alert('This date is already booked. Please select another date.');
        } else {
          // If the selected date is not booked, set it as the reservation date
          SetDreservation(selectedDate);
        }
      };

    const DE = (timer)=>{
        
        SetDreservation(timer.event.start);
        console.log(timer.event.start);
    }

    // ****************get booked dates**************
    const [booked,setbooked] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost/TlsContact/public/User/dates').then((res)=>{
            
            setbooked(res.data.data);
            // console.log(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
        
    },[])
    const alldates = booked.map(reserv => reserv.datedereservation);
    // console.log(alldates);
    // ****************get booked dates**************


    const generateevent = ()=>{
    const event = [];
    const startDate = new Date();
    const endDate = new Date('2023-03-31');
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

        
        
        );
        
    }
    
    return event;
    
}

    const eventRender = (info)=>{
        const start = info.event.start;
        // info.start.backgroundColor='red';
        const startTime = start.toLocaleTimeString(); // format the start time as a string
        if (info.el) {
            // set the background color to red
            info.el.style.backgroundColor = 'red';
          }
        

            return (
                <div >{startTime}</div>
              );
            
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
                    select={handleDateSelect}
                    events={generateevent()}
                    eventClick={DE}
                    weekends={false}
                    eventContent={eventRender}
                />
                <button type='submit' className='btn btn-outline-primary my-2' onClick={handleReserver} >Reserver</button>
        </form>
        </div>

    </div>
  )
}

export default Reserver