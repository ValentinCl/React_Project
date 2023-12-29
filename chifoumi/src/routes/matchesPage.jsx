import { useState, useEffect } from 'react';
import { Button, Container, List, ListItem, TextField, Typography } from '@mui/material';

const MatchesPage = () => {
  const [playedGames, setPlayedGames] = useState([]);
  const token = localStorage.getItem('token');
  const [joinGameId, setJoinGameId] = useState('');
  useEffect(() => {
    fetchPlayedGames();
  }, []);

  const fetchPlayedGames = async () => {
    try {
      const response = await fetch('http://localhost:3002/matches', {
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
      const response = await fetch('http://localhost:3002/matches', {
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

  const handleJoinGame = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3002/matches/${gameId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Rejoindre la partie avec succès
        fetchPlayedGames(); // Mettez à jour la liste des parties jouées
      } else {
        const errorData = await response.json();
        console.error('Failed to join game:', errorData);
      }
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handlePlayGame = (gameId) => {
    // Vérifier si la partie a déjà deux joueurs
    const match = playedGames.find((match) => match._id === gameId);

    if (match && match.user2) {
      // La partie a deux joueurs, rediriger l'utilisateur vers la page de jeu
      window.location.href = `/matches/${gameId}`;
    } else {
      // La partie n'a pas deux joueurs, informer l'utilisateur
      console.log(`Waiting for the second player to join the game ${gameId}`);
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
              {`Match ${match._id}: ${match.user1.username} vs ${
                match.user2 ? match.user2.username : 'Waiting for opponent'
              } `}

              {match.user2 && (
                <Button variant="contained" color="primary" onClick={() => handlePlayGame(match._id)}>
                  Play
                </Button>
              )}
              <form onSubmit={() => handleJoinGame(match._id)}>
                <TextField
                  type="text"
                  placeholder="Enter Game ID"
                  value={joinGameId}
                  onChange={(e) => setJoinGameId(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Join
                </Button>
              </form>
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
