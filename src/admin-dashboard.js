import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './admin.css';

const Admin = () => {
  const adminName = localStorage.getItem('name');
  const navigate = useNavigate();

  return (
    <>
      <AppBar position='static' className='bg-gradient-to-r from-indigo-500 to-purple-500 mb-6'>
        <Toolbar className='flex justify-between'>
          <Typography variant='h5' className='font-bold'>
            Admin Dashboard
          </Typography>
          <div className='margin'>
          <Typography  variant='h6'>
            Welcome, {adminName}
          </Typography>
          </div>
          
          <div className='logout'>

          <Button 
            variant='contained'
            color='error'
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              navigate('/loginpage');
            }}
          >
            Logout
          </Button>
          </div>
         
        </Toolbar>
      </AppBar>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='p-8'
      >
        <Typography variant='h4' className='mb-8 text-center font-semibold'>
          Admin Activities
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {[{ label: 'New Event', route: '/create-event' },
            { label: 'Registrations', route: '/registrations' },
            { label: 'OnGoing Events', route: '/ongoing-events' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className='rounded-2xl shadow-lg h-44 flex items-center justify-center bg-white'>
                  <CardContent className='text-center'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => navigate(item.route)}
                    >
                      {item.label}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </>
  );
};

export default Admin;