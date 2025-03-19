import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const Board = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "À faire",
      cards: [
        { id: 1, title: "Créer le design", description: "Design de la page d'accueil" },
        { id: 2, title: "Setup API", description: "Configuration initiale de l'API" }
      ]
    },
    {
      id: 2,
      title: "En cours",
      cards: [
        { id: 3, title: "Database design", description: "Conception de la base de données" }
      ]
    },
    {
      id: 3,
      title: "Terminé",
      cards: []
    }
  ]);

  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = () => {
    if (newListTitle.trim()) {
      setLists([
        ...lists,
        {
          id: lists.length + 1,
          title: newListTitle,
          cards: []
        }
      ]);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      backgroundColor: '#1a1a1a',
      padding: 2,
      paddingTop: '80px' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        overflowX: 'auto',
        height: 'calc(100vh - 100px)',
        padding: 2
      }}>
        {lists.map((list) => (
          <Box
            key={list.id}
            sx={{
              backgroundColor: '#1E1E1E',
              borderRadius: 2,
              width: 300,
              minWidth: 300,
              padding: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {list.title}
              </Typography>
              <IconButton size="small" sx={{ color: '#fff' }}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {list.cards.map((card) => (
                <Box
                  key={card.id}
                  sx={{
                    backgroundColor: '#2A2A2A',
                    borderRadius: 1,
                    padding: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#333333'
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    {card.description}
                  </Typography>
                </Box>
              ))}
              
              <Button
                startIcon={<AddIcon />}
                sx={{
                  color: '#999',
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2A2A2A',
                    color: '#fff'
                  }
                }}
              >
                Ajouter une carte
              </Button>
            </Box>
          </Box>
        ))}

        <Box sx={{ width: 300, minWidth: 300 }}>
          {isAddingList ? (
            <Box
              sx={{
                backgroundColor: '#1E1E1E',
                borderRadius: 2,
                padding: 2
              }}
            >
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                placeholder="Titre de la liste"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleAddList}
                  sx={{ backgroundColor: '#6366f1', '&:hover': { backgroundColor: '#4F46E5' } }}
                >
                  Ajouter
                </Button>
                <Button
                  onClick={() => setIsAddingList(false)}
                  sx={{ color: '#fff' }}
                >
                  Annuler
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsAddingList(true)}
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                width: '100%',
                justifyContent: 'flex-start',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              Ajouter une liste
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Board;