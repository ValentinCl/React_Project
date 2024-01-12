import { Button, Container, Typography } from '@mui/material';
import './App.css';

function App() {
  const redirect = () => {
    alert('Let the game begin!');
    window.location.href = '/matches';
  };

  return (
    <Container maxWidth="sm" className="app-container">
      <div className="intro-text">
        <Typography variant="h3" gutterBottom>
          Bienvenue à Chifoumi
        </Typography>
        <Typography variant="body1" paragraph>
          Prêt à jouer à Chifoumi contre vos amis? Choisissez votre coup et voyons qui gagne!
        </Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        className="start-button"
        onClick={redirect}
      >
        Commencer le jeu
      </Button>
    </Container>
  );
}

export default App;