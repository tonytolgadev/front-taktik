import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', 
  backgroundColor: '#f0f2f5',
  position: 'relative',
  paddingTop: '80px', 
}));

const ListsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto', 
  overflowY: 'hidden',
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  height: 'calc(100% - 80px)', 
}));

const ListPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1E1E1E',
  borderRadius: '12px',
  width: 280,
  minWidth: 280,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  height: 'auto',
  minHeight: 'auto',
  maxHeight: 'fit-content',
  marginBottom: theme.spacing(1),
}));

const ListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#1E1E1E',
  color: '#fff',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
}));

const ListTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.95rem',
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: '#fff',
});

const ListContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const CardItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2A2A2A',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(0.75),
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#333333',
  },
}));

const CardTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.9rem',
  color: '#fff',
});

const CardDescription = styled(Typography)({
  fontSize: '0.8rem',
  color: '#aaa',
  marginTop: '4px',
});

const AddButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: theme.spacing(1),
  color: '#aaa',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
  },
}));

const AddListButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#333333',
  color: '#fff',
  textTransform: 'none',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5),
  width: 280,
  minWidth: 280,
  borderRadius: '12px',
  alignSelf: 'flex-start',
  height: 'fit-content',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
}));

const Board = () => {
  const [lists, setLists] = useState([
    {
      id: 'list-1',
      title: "À faire",
      cards: [
        { id: 'card-1', title: "Créer le design", description: "Design de la page d'accueil" },
        { id: 'card-2', title: "Setup API", description: "Configuration initiale de l'API" }
      ]
    },
    {
      id: 'list-2',
      title: "En cours",
      cards: [
        { id: 'card-3', title: "Database design", description: "Conception de la base de données" }
      ]
    },
    {
      id: 'list-3',
      title: "Terminé",
      cards: []
    }
  ]);

  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);
  const [addingCardToListId, setAddingCardToListId] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);

  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  // Gestionnaire pour le glisser-déposer
  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // Si pas de destination ou destination identique à la source, ne rien faire
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Si on déplace une liste
    if (type === 'list') {
      const newListOrder = Array.from(lists);
      const [removed] = newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, removed);
      setLists(newListOrder);
      return;
    }

    // Si on déplace une carte
    const sourceList = lists.find(list => list.id === source.droppableId);
    const destinationList = lists.find(list => list.id === destination.droppableId);

    // Vérifier que les listes ont été trouvées
    if (!sourceList || !destinationList) {
      return;
    }
    
    // Si on déplace dans la même liste
    if (sourceList.id === destinationList.id) {
      const newCards = Array.from(sourceList.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);
      
      setLists(lists.map(list => 
        list.id === sourceList.id ? { ...list, cards: newCards } : list
      ));
    } 
    // Déplacement entre différentes listes
    else {
      const sourceCards = Array.from(sourceList.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      const destinationCards = Array.from(destinationList.cards);
      destinationCards.splice(destination.index, 0, removed);
      
      setLists(lists.map(list => {
        if (list.id === sourceList.id) {
          return { ...list, cards: sourceCards };
        }
        if (list.id === destinationList.id) {
          return { ...list, cards: destinationCards };
        }
        return list;
      }));
    }
  };

  // Ajouter une nouvelle liste
  const handleAddList = () => {
    if (newListTitle.trim()) {
      setLists([
        ...lists,
        {
          id: `list-${Date.now()}`,
          title: newListTitle,
          cards: []
        }
      ]);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  // Ajouter une nouvelle carte
  const handleAddCard = (listId) => {
    if (newCardTitle.trim()) {
      setLists(lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [
              ...list.cards,
              {
                id: `card-${Date.now()}`,
                title: newCardTitle,
                description: newCardDescription
              }
            ]
          };
        }
        return list;
      }));
      setNewCardTitle('');
      setNewCardDescription('');
      setAddingCardToListId(null);
    }
  };

  const handleDeleteList = () => {
    if (currentListId) {
      setLists(lists.filter(list => list.id !== currentListId));
      setMenuAnchorEl(null);
      setCurrentListId(null);
    }
  };

  const handleOpenListMenu = (event, listId) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setCurrentListId(listId);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setCurrentListId(null);
  };

  if (!enabled) {
    return null;
  }

  return (
    <BoardContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ListsContainer>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  alignItems: 'flex-start',
                  flexWrap: 'nowrap'
                }}
              >
                {lists.map((list, index) => (
                  <Draggable
                    key={list.id}
                    draggableId={list.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <ListPaper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        elevation={snapshot.isDragging ? 3 : 0}
                      >
                        <ListHeader {...provided.dragHandleProps}>
                          <ListTitle>{list.title}</ListTitle>
                          <IconButton
                            size="small"
                            onClick={(e) => handleOpenListMenu(e, list.id)}
                            sx={{ color: '#aaa', padding: 0.5 }}
                          >
                            <MoreHorizIcon fontSize="small" />
                          </IconButton>
                        </ListHeader>

                        <Droppable droppableId={list.id} type="card">
                          {(provided) => (
                            <ListContent
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {list.cards.map((card, index) => (
                                <Draggable
                                  key={card.id}
                                  draggableId={card.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <CardItem
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      elevation={snapshot.isDragging ? 3 : 0}
                                    >
                                      <CardTitle>{card.title}</CardTitle>
                                      {card.description && (
                                        <CardDescription>
                                          {card.description}
                                        </CardDescription>
                                      )}
                                    </CardItem>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}

                              {addingCardToListId === list.id ? (
                                <Box sx={{ p: 1 }}>
                                  <TextField
                                    autoFocus
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Titre de la carte"
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    sx={{
                                      mb: 1,
                                      '& .MuiOutlinedInput-root': {
                                        fontSize: '0.9rem',
                                        backgroundColor: '#333',
                                        color: '#fff',
                                        '& fieldset': {
                                          borderColor: 'rgba(255, 255, 255, 0.23)',
                                        },
                                        '&:hover fieldset': {
                                          borderColor: 'rgba(255, 255, 255, 0.23)',
                                        },
                                      }
                                    }}
                                    size="small"
                                  />
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Description (optionnelle)"
                                    multiline
                                    rows={2}
                                    value={newCardDescription}
                                    onChange={(e) => setNewCardDescription(e.target.value)}
                                    sx={{
                                      mb: 1,
                                      '& .MuiOutlinedInput-root': {
                                        fontSize: '0.9rem',
                                        backgroundColor: '#333',
                                        color: '#fff',
                                        '& fieldset': {
                                          borderColor: 'rgba(255, 255, 255, 0.23)',
                                        },
                                        '&:hover fieldset': {
                                          borderColor: 'rgba(255, 255, 255, 0.23)',
                                        },
                                      }
                                    }}
                                    size="small"
                                  />
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                      variant="contained"
                                      onClick={() => handleAddCard(list.id)}
                                      sx={{ 
                                        backgroundColor: '#6366f1', 
                                        fontSize: '0.8rem',
                                        '&:hover': { backgroundColor: '#4F46E5' } 
                                      }}
                                      size="small"
                                    >
                                      Ajouter
                                    </Button>
                                    <Button
                                      onClick={() => setAddingCardToListId(null)}
                                      sx={{ color: '#fff', fontSize: '0.8rem' }}
                                      size="small"
                                    >
                                      Annuler
                                    </Button>
                                  </Box>
                                </Box>
                              ) : (
                                <AddButton
                                  fullWidth
                                  startIcon={<AddIcon fontSize="small" />}
                                  onClick={() => setAddingCardToListId(list.id)}
                                >
                                  Ajouter une carte
                                </AddButton>
                              )}
                            </ListContent>
                          )}
                        </Droppable>
                      </ListPaper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {isAddingList ? (
                  <Paper
                    sx={{
                      backgroundColor: '#1E1E1E',
                      borderRadius: '12px',
                      width: 280,
                      minWidth: 280,
                      padding: 2,
                      alignSelf: 'flex-start'
                    }}
                    elevation={0}
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
                          backgroundColor: '#333',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        }
                      }}
                      size="small"
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleAddList}
                        sx={{ 
                          backgroundColor: '#6366f1', 
                          '&:hover': { backgroundColor: '#4F46E5' } 
                        }}
                        size="small"
                      >
                        Ajouter
                      </Button>
                      <Button
                        onClick={() => setIsAddingList(false)}
                        sx={{ color: '#fff' }}
                        size="small"
                      >
                        Annuler
                      </Button>
                    </Box>
                  </Paper>
                ) : (
                  <AddListButton
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddingList(true)}
                  >
                    Ajouter une liste
                  </AddListButton>
                )}
              </Box>
            )}
          </Droppable>
        </ListsContainer>
      </DragDropContext>

      {/* Menu pour les actions sur les listes */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            backgroundColor: '#2A2A2A',
            color: '#fff',
          }
        }}
      >
        <MenuItem onClick={handleDeleteList} sx={{ color: '#ef4444' }}>
          Supprimer la liste
        </MenuItem>
      </Menu>
    </BoardContainer>
  );
};

export default Board;