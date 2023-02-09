import React from 'react'
import '../style/Formlogin.css';

function Formlogin() {
  return (
    <>
        <div className=" bigtitle d-flex justify-content-center align-items-center text-center  ">
            <h2 className='text-white display-1'>Se connecter à votre compte<br /> TLScontact</h2>
        </div>
        <div className="container forcont d-flex justify-content-center align-items-center">
        <form   className='py-5'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">First Name</label>
                    <input  type="text" name='Firstname' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Last Name</label>
                    <input type="text"  name='Lastname' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                
        </form>
        </div>
    </>
  )
}

export default Formlogin