import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

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
  );
};

export default Topbar;