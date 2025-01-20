import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';

const projects = [
  {
    id: 1,
    name: 'Refonte du site web',
    progress: 75,
    members: 4,
    status: 'En cours',
    color: '#6366f1',
  },
  {
    id: 2,
    name: 'Application mobile',
    progress: 35,
    members: 3,
    status: 'En retard',
    color: '#EF4444',
  },
  {
    id: 3,
    name: 'Dashboard Analytics',
    progress: 90,
    members: 5,
    status: 'En cours',
    color: '#6366f1',
  },
  {
    id: 4,
    name: 'Base de données',
    progress: 100,
    members: 2,
    status: 'Terminé',
    color: '#10B981',
  },
];

const RecentProjects = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {projects.map((project) => (
        <Box
          key={project.id}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 500 }}>
              {project.name}
            </Typography>
            <Chip
              label={project.status}
              size="small"
              sx={{
                backgroundColor: project.color,
                color: '#fff',
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Progression
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {project.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: project.color,
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AvatarGroup max={3}>
              {Array(project.members).fill(0).map((_, idx) => (
                <Avatar
                  key={idx}
                  sx={{ width: 30, height: 30, backgroundColor: project.color }}
                >
                  M{idx + 1}
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {project.members} membres
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecentProjects;