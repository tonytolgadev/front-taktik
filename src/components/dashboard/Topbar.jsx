import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import authService from '../../services/authService';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    authService.logout();
    navigate('/');
  };

  const getAvatarLetter = () => {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
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
            onClick={handleMenuOpen}
            sx={{ 
              width: 35, 
              height: 35,
              ml: 1,
              cursor: 'pointer',
              backgroundColor: '#6366f1',
            }}
          >
            {getAvatarLetter()}
          </Avatar>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#1e1e1e',
                color: 'white',
                minWidth: '200px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {user?.name || 'Utilisateur'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {user?.email || ''}
              </Typography>
            </Box>
            
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
              <PersonIcon fontSize="small" />
              <Typography>Profil</Typography>
            </MenuItem>
            
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
              <SettingsIcon fontSize="small" />
              <Typography>Paramètres</Typography>
            </MenuItem>
            
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            
            <MenuItem onClick={handleLogout} sx={{ gap: 2, color: '#ef4444' }}>
              <LogoutIcon fontSize="small" />
              <Typography>Se déconnecter</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Topbar;