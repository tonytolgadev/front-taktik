import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Grid,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import RecentProjects from '../../components/dashboard/RecentProjects';
import RecentActivities from '../../components/dashboard/RecentActivities';
import Sidebar from '../../components/dashboard/Sidebar';
import StatCard from '../../components/dashboard/StatCard';

// AppBar stylisé
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
}));

// Paper stylisé pour les cartes
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1E1E1E',
  borderRadius: '16px',
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  },
  color: '#fff',
}));

// Icône stylisée
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const generateData = (count, min, max) => {
    return Array.from({ length: count }, (_, i) => ({
      name: i.toString(),
      value: Math.floor(Math.random() * (max - min + 1)) + min
    }));
  };

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#121212', minHeight: '100vh' }}>
    <CssBaseline />
    <Sidebar />
      
      {/* Barre de navigation supérieure */}
      <AppBarStyled position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2, color: '#6366f1' }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#6366f1', fontWeight: 600 }}
          >
            Taktik
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StyledIconButton>
              <SearchIcon />
            </StyledIconButton>
            <StyledIconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </StyledIconButton>
            <Avatar
              sx={{ 
                width: 35, 
                height: 35,
                ml: 1,
                cursor: 'pointer',
                backgroundColor: '#6366f1',
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBarStyled>

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          px: 4,
          pb: 4,
          
        }}
      >
        {/* En-tête du dashboard */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600 }}>
            Tableau de bord
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
            Bienvenue ! Voici un aperçu de vos projets et tâches.
          </Typography>
        </Box>

        {/* Statistiques */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
            <StatCard
            title="Tâches en cours"
            value="12"
            color="#6366f1"
            data={generateData(20, 5, 15)}
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <StatCard
            title="Tâches terminées"
            value="48"
            color="#10B981"
            data={generateData(20, 30, 60)}
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <StatCard
            title="Tâches en retard"
            value="3"
            color="#EF4444"
            data={generateData(20, 0, 5)}
            />
        </Grid>
        </Grid>

        {/* Projets récents et Activités */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <StyledPaper>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  mb: 3 
                }}
              >
                Projets récents
              </Typography>
              <RecentProjects />
            </StyledPaper>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <StyledPaper>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  mb: 3 
                }}
              >
                Activités récentes
              </Typography>
              <RecentActivities />
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;