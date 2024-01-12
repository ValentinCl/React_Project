import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlay } from '@fortawesome/free-solid-svg-icons';

const MatchDetailsPage = () => {
  const { id } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const token = localStorage.getItem('token');

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

  const handlePlayGame = () => {
    if (matchDetails && matchDetails.user2) {
      // La partie a deux joueurs, rediriger l'utilisateur vers la page de jeu
      window.location.href = `/matches/${id}/play`;
    } else {
      // La partie n'a pas deux joueurs, informer l'utilisateur
      console.log(`Waiting for the second player to join the game ${id}`);
    }
  };

  const goBackToMatches = () => {
    window.location.href = '/matches'
};

  return (
    <Container maxWidth="sm" style={{ marginTop: '16px' }}>
      <Typography variant="h2">Match Details</Typography>
      {matchDetails ? (
        <Box>
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
          <Box mt={4}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faPlay} />}
                  onClick={handlePlayGame}
                >
                  Jouer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={goBackToMatches}
                >
                  Back to Matches
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Typography>Loading match details...</Typography>
      )}
    </Container>
  );
};

export default MatchDetailsPage;