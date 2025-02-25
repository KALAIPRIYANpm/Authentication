import React from 'react'
// import { useState } from 'react';
import { Button } from '@mui/material';
import './admin.css'
import { useNavigate } from 'react-router-dom';


const Admin = () => {

  // const[adminName,setAdminName] = useState();
  const adminName = localStorage.getItem("name");
  const navigate = useNavigate()

  return (

  <>
  <div className='head'>
  <div className='navigation'>
    <div>
  <h2>Welcome {adminName}</h2>

    </div>
  
  <Button
  variant='contained'
  color='error'
  onClick={()=>navigate("/loginpage")}
  >
    Logout</Button>
    </div>
    </div>
    {/* <div>

<h2>Create an Event </h2>

    </div> */}
<div>
<h2>Admin Activities</h2>
</div>
    <div id='adminbuttons'>
      
<Button
variant='contained'
>New Event
</Button>

<Button
variant='contained'>
  Registrations
  </Button>

<Button
variant='contained'>
  OnGoing
  </Button>
    </div>
  </>
   

  )
}


export default Admin