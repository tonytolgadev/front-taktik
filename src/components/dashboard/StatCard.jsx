import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

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

const StatCard = ({ title, value, color, data }) => {
  return (
    <StyledPaper>
      <Box sx={{ height: '100%', position: 'relative' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            color: color,
            fontWeight: 700,
            mb: 2
          }}
        >
          {value}
        </Typography>
        <Box sx={{ height: 100, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`url(#gradient-${title})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default StatCard;