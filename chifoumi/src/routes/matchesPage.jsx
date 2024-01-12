import { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem,Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChess, faPlus } from '@fortawesome/free-solid-svg-icons';

const MatchesPage = () => {
  const [playedGames, setPlayedGames] = useState([]);
  const token = localStorage.getItem('token');
 
  useEffect(() => {
    fetchPlayedGames();
  }, []);

  const fetchPlayedGames = async () => {
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token JWT dans l'en-tête
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPlayedGames(data);
    } catch (error) {
      console.error('Error fetching played games:', error);
    }
  };

  const handleNewGame = async () => {
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/matches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token JWT dans l'en-tête
        },
      });

      if (response.ok) {
        // Nouvelle partie créée avec succès
        
        fetchPlayedGames();
      } else {
        const errorData = await response.json();
        console.error('Failed to create new game:', errorData);
      }
    } catch (error) {
      console.error('Error creating new game:', error);
    }
  };


  return (
<Container maxWidth="sm">
      <Typography variant="h2" mb={4}>
        Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleNewGame}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        New Game
      </Button>

      <Typography variant="h3" mt={4} mb={2}>
        Matches:
      </Typography>

      {playedGames.length > 0 ? (
        <List>
          {playedGames.map((match) => (
            <ListItem key={match._id}>
              <Link to={`/matches/${match._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                <Box
                  border={1}
                  borderRadius={8}
                  borderColor="primary.main"
                  p={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  transition="background 0.3s"
                  _hover={{ background: 'primary.light' }}
                >
                  <Typography>
                    {`Match ${match._id}: ${match.user1.username} vs ${
                      match.user2 ? match.user2.username : 'Waiting for opponent'
                    } `}
                  </Typography>
                  <FontAwesomeIcon icon={faChess} />
                </Box>
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography mt={2}>No matches played yet.</Typography>
      )}
    </Container>
  );
};

export default MatchesPage;
