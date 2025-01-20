import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';

const activities = [
  {
    id: 1,
    user: 'Alice',
    action: 'a terminé',
    target: 'Migration de la base de données',
    time: 'Il y a 2h',
    type: 'completion',
  },
  {
    id: 2,
    user: 'Bob',
    action: 'a créé',
    target: 'Nouvelle tâche : Design mobile',
    time: 'Il y a 4h',
    type: 'creation',
  },
  {
    id: 3,
    user: 'Charlie',
    action: 'a commenté sur',
    target: 'Optimisation des performances',
    time: 'Il y a 5h',
    type: 'comment',
  },
];

const getActivityIcon = (type) => {
  switch (type) {
    case 'completion':
      return <CheckCircleIcon sx={{ color: '#10B981' }} />;
    case 'creation':
      return <AssignmentIcon sx={{ color: '#6366f1' }} />;
    case 'comment':
      return <CommentIcon sx={{ color: '#F59E0B' }} />;
    default:
      return null;
  }
};

const RecentActivities = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {activities.map((activity) => (
        <Box
          key={activity.id}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <Box sx={{ mt: 0.5 }}>{getActivityIcon(activity.type)}</Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: '#fff', fontWeight: 500 }}
              >
                {activity.user}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {activity.action}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 0.5 }}
            >
              {activity.target}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {activity.time}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecentActivities;