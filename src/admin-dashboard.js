import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Box,
  Container,
  Chip
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const adminName = localStorage.getItem('name');

  const fetchAdminDetails = async () => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) return console.error("Admin ID not found in localStorage");
    try {
      const response = await axios.get(`http://localhost:1234/adminDetails?id=${adminId}`);
      setAdminDetails(response.data);
      setOpen(true);
    } catch (error) {
      console.log("Error fetching the records", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginpage');
  };

  const actions = [
    { icon: <AddCircleOutlineIcon fontSize="large" />, label: 'Create Event', route: '/create-event' },
    { icon: <ListAltIcon fontSize="large" />, label: 'View Registrations', route: '/registrations' },
    { icon: <EventAvailableIcon fontSize="large" />, label: 'Ongoing Events', route: '/ongoing-events' },
    { icon: <AnalyticsIcon fontSize="large" />, label: 'Analytics & Reports', route: '/analytics' }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #e8f5fe, #ffffff)',
        fontFamily: '"Poppins", sans-serif',
        pb: 10
      }}
    >
      {/* AppBar */}
<AppBar
  position="static"
  sx={{
    background: 'linear-gradient(to right, #4facfe, #4facfe)', // updated gradient
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
  }}
>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h5"  fontWeight="bold" letterSpacing={1}>
       EventZone Admin
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Tooltip title="Notifications">
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profile">
        <IconButton  color="inherit" onClick={fetchAdminDetails}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Logout">
        <IconButton sx={{ color: 'red' }} onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </Toolbar>
</AppBar>


      {/* Profile Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        {adminDetails && (
          <Card sx={{ p: 3, width: 320 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>👤 {adminDetails.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {adminDetails.role}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </CardContent>
          </Card>
        )}
      </Dialog>

      {/* Main Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Container sx={{ py: 6 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Welcome back, {adminName || "Admin"} 
          </Typography>
          <Typography align="center" sx={{ mb: 5 }} color="text.secondary">
            Use the panel below to manage, monitor, and modify all events with ease.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {actions.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 3,
                      textAlign: 'center',
                      background: '#ffffff',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <IconButton
                        sx={{
                          bgcolor: '#2196f3',
                          color: 'white',
                          mb: 2,
                          '&:hover': { bgcolor: '#64b5f6' }
                        }}
                      >
                        {item.icon}
                      </IconButton>
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {item.label}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => navigate(item.route)}
                        sx={{
                          backgroundColor: '#2196f3',
                          '&:hover': { backgroundColor: '#42a5f5' },
                          px: 4
                        }}
                      >
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Box mt={8} textAlign="center">
            <Chip label="EventZone Admin Portal v1.0" color="primary" />
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              © {new Date().getFullYear()} EventZone. Need help? Contact support.
            </Typography>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default Admin;
