import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1A1A1A',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
  },
}));

const menuItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { title: 'Tableau', icon: <AssignmentIcon />, path: '/board' },
  { title: 'Équipe', icon: <GroupIcon />, path: '/team' },
  { title: 'Calendrier', icon: <CalendarIcon />, path: '/calendar' },
  { title: 'Rapports', icon: <AssessmentIcon />, path: '/reports' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#6366f1',
            fontWeight: 700,
            mb: 3,
          }}
        >
          Taktik
        </Typography>
      </Box>
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.16)',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  minWidth: '40px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', my: 2 }} />
      <List sx={{ px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                minWidth: '40px',
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Paramètres"
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;