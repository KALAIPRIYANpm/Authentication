import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = () => {
  const adminName = localStorage.getItem("name");
  const navigate = useNavigate();

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
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              navigate("/loginpage");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div>
        <h2>Admin Activities</h2>
      </div>

      <div id='adminbuttons'>
        <Button
          variant='contained'
          onClick={() => navigate("/create-event")}
        >
          New Event
        </Button>

        <Button
          variant='contained'
          onClick={() => navigate("/registrations")}
        >
          Registrations
        </Button>

        <Button
          variant='contained'
          onClick={() => navigate("/ongoing-events")}
        >
          OnGoing
        </Button>
      </div>
    </>
  );
};

export default Admin;
