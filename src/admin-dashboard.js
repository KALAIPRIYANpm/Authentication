import React from 'react'
import { useState } from 'react';

const Admin = () => {

  const[adminName,setAdminName] = useState();
  const adminname = localStorage.getItem("name");

  return (

   <h1>Welcome {adminname} </h1>

  )
}


export default Admin