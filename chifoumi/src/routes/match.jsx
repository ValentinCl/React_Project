import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button,Box,Grid,Snackbar} from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';


function Match() {
    const { id } = useParams();

    const [match, setMatch] = useState(null);
    const [message, setMessage] = useState('');
    
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-unused-vars
  

    const fetchMatch = async () => {
        try {
          const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error(`Failed to fetch match: ${response.status} ${response.statusText}`);
          }
    
          const data = await response.json();
          console.log(data);
          if (Object.keys(data).length === 0) {
            console.error(`Match with ID ${id} not found.`);
            // Afficher un message à l'utilisateur ou rediriger si la partie n'est pas trouvée
          } else {
            setMatch(data);
            
          }
        } catch (error) {
          console.error('Error fetching match:', error);
          // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
        }
      };
    
      useEffect(() => {
        // récupérer le match via l'id
        fetchMatch();
      }, [id, token]);
    
      const makeMove = async (move) => {
        try {
          var idTurn = match.turns.length;
      
          if (match.turns[idTurn - 1] && (!match.turns[idTurn - 1].user1 || !match.turns[idTurn - 1].user2)) {
            // Gérer le cas où les deux joueurs n'ont pas encore fait un mouvement dans le tour actuel
            idTurn = match.turns.length;
            const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}/turns/${idTurn}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ move }),
            });
      
            if (!response.ok) {
              throw new Error(`Failed to make move: ${response.status} ${response.statusText}`);
            }
      
            fetchMatch();
          }
          else if(idTurn === 0 ){
            idTurn = 1;
            const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}/turns/${idTurn}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ move }),
            });
            console.log('match.turns.length:', match.turns.length);
            console.log('idTurn:', idTurn);

            if (!response.ok) {
              throw new Error(`Failed to make move: ${response.status} ${response.statusText}`);
            }
      //Afficher
            fetchMatch();
          }   
          
          else {
            idTurn = match.turns.length + 1;
            const response = await fetch(`http://fauques.freeboxos.fr:3000/matches/${id}/turns/${idTurn}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ move }),
            });
      
            if (!response.ok) {
              throw new Error(`Failed to make move: ${response.status} ${response.statusText}`);
            }
      
            fetchMatch();
          }
        } catch (error) {
          console.error('Error making move:', error);
          // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
        }
      };
      const goBackToMatches = () => {
        window.location.href = '/matches'
    };

    return (
      <Box p={4}>
      {match && (
        <Container maxWidth="sm" style={{ marginTop: '16px' }}>
          <Typography variant="h4" align="center" mb={2}>
            Match {match._id}
          </Typography>

          <Typography variant="body1" align="center" mb={2}>
            {`Players: ${match.user1.username} vs ${match.user2 ? match.user2.username : 'Waiting for opponent'}`}
          </Typography>

          <Typography variant="h5" align="center" mb={2}>
            Turns: {match.turns.length > 0 ? match.turns.length : match.turns.length + 1}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FontAwesomeIcon icon={faHandRock} />}
                onClick={async () => {
                  try {
                    await makeMove('rock');
                    setMessage('Vous avez joué : Rock');
                  } catch (error) {
                    setMessage("Erreur : le mouvement n'a pas été soumis");
                  } finally {
                    setTimeout(() => setMessage(''), 3000);
                  }
                }}
              >
                Pierre
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FontAwesomeIcon icon={faHandPaper} />}
                onClick={async () => {
                  try {
                    await makeMove('paper');
                    setMessage('Vous avez joué : Paper');
                  } catch (error) {
                    setMessage("Erreur : le mouvement n'a pas été soumis");
                  } finally {
                    setTimeout(() => setMessage(''), 3000);
                  }
                }}
              >
                Papier
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FontAwesomeIcon icon={faHandScissors} />}
                onClick={async () => {
                  try {
                    await makeMove('scissors');
                    setMessage('Vous avez joué : Scissors');
                  } catch (error) {
                    setMessage("Erreur : le mouvement n'a pas été soumis");
                  } finally {
                    setTimeout(() => setMessage(''), 3000);
                  }
                }}
              >
                Ciseaux
              </Button>
            </Grid>
          </Grid>

          <Snackbar
            open={!!message}
            message={message}
            autoHideDuration={3000}
            onClose={() => setMessage('')}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
          
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="secondary" onClick={goBackToMatches}>
              Back to Matches
            </Button>
          </Box>
        </Container>
      )}
    </Box>
  );
}

Match.propTypes = {
    matchId: PropTypes.string.isRequired
};

export default Match;

