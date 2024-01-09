import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, List, ListItem, Typography } from '@mui/material';

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
        // Mettez à jour les parties jouées en appelant fetchPlayedGames à nouveau
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
      <Typography variant="h2">Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={handleNewGame}>
        New Game
      </Button>
      <Typography variant="h3">Matches:</Typography>
      {playedGames.length > 0 ? (
        <List>
          {playedGames.map((match) => (
            <ListItem key={match._id}>
              <Link to={`/matches/${match._id}`}>
                {`Match ${match._id}: ${match.user1.username} vs ${
                  match.user2 ? match.user2.username : 'Waiting for opponent'
                } `}
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No matches played yet.</Typography>
      )}
    </Container>
  );
};

export default MatchesPage;
