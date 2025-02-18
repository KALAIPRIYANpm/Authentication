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
  color='success'
  onClick={()=>navigate("/loginpage")}
  >
    Logout</Button>
    </div>
    </div>
    <div>
      
    </div>
  </>
   

  )
}


export default Admin