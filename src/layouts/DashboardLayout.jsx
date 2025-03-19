import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', minHeight: '100vh' }}>
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          px: 4,
          pb: 4,
          marginLeft: '0px',
          width: 'calc(100% - 260px)'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;