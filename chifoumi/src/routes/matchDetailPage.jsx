// MatchDetailsPage.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import{
    Container,
    Typography,
    List,
    ListItem,
    Button,
   }  from '@mui/material';
  
const MatchDetailsPage = () => {
  
  const { id } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const token = localStorage.getItem('token');

  // Effectuer une requête au serveur pour obtenir les détails de la partie correspondante
  useEffect(() => {
    // Effectuer une requête au serveur pour obtenir les détails de la partie correspondante
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch match details: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setMatchDetails(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    fetchMatchDetails();
  }, [id, token]);

  const handlePlayGame = (gameId) => {
   gameId=matchDetails._id;
    if (matchDetails && matchDetails.user2) {
      // La partie a deux joueurs, rediriger l'utilisateur vers la page de jeu
      window.location.href = `/matches/${gameId}/play`;
    } else {
      // La partie n'a pas deux joueurs, informer l'utilisateur
      console.log(`Waiting for the second player to join the game ${gameId}`);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '16px' }}>
    <Typography variant="h2">Match Details</Typography>
    {matchDetails ? (
      <div>
        <Typography variant="h4">{`Match ${matchDetails._id}`}</Typography>
        <Typography variant="body1">
          {`Player 1: ${matchDetails.user1.username} | Player 2: ${matchDetails.user2 ? matchDetails.user2.username : 'Waiting for opponent'}`}
        </Typography>
        <Typography variant="h5">Game Details:</Typography>
        <List>
        {matchDetails.turns.map((turn, index) => (
    <ListItem key={index}>
      {`Turn ${index + 1}: Winner - ${turn.winner || 'Not decided yet'}`}
    </ListItem>
  ))}
        </List>
        <Button variant="contained" color="primary" onClick={handlePlayGame}>
          Jouer
        </Button>
      </div>
    ) : (
      <Typography>Loading match details...</Typography>
    )}
  </Container>
);
  
};

export default MatchDetailsPage;
