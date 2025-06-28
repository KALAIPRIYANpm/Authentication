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
  Container
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
  const adminName = localStorage.getItem('name');
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [open, setOpen] = useState(false);

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
    <>
      {/* Header AppBar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #8e2de2, #4a00e0)', mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 1 }}>
            🎩 Event Admin Wizard
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              <IconButton color="inherit" onClick={fetchAdminDetails}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="error" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      {/* Admin Detail Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        {adminDetails && (
          <Card style={{ padding: 20, width: 320, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6">👤 {adminDetails.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {adminDetails.role}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" onClick={() => setOpen(false)}>
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </Dialog>

      {/* Admin Controls */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 px-6">
        <Container>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            🧙‍♂️ Admin Control Panel
          </Typography>
          <Typography align="center" sx={{ mb: 5 }} color="textSecondary">
            Manage everything from one magical space ✨
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {actions.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card sx={{ borderRadius: 5, boxShadow: 10, textAlign: 'center', p: 3, background: 'linear-gradient(to bottom right, #ffffff, #e0f7fa)' }}>
                    <CardContent>
                      <IconButton sx={{ bgcolor: '#673ab7', color: 'white', mb: 2 }}>
                        {item.icon}
                      </IconButton>
                      <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {item.label}
                      </Typography>
                      <Button variant="contained" color="primary" onClick={() => navigate(item.route)}>
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </>
  );
};

export default Admin;
