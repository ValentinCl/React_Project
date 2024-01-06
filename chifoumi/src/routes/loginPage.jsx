/* eslint-disable react/no-unescaped-entities */
// LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error(`Login failed with status: ${response.status}`);
        const errorText = await response.text();
        console.error('Server error message:', errorText);
        return;
      }

      const responseData = await response.text();
      

      try {
        const data = JSON.parse(responseData);
        // Stockez le token dans le localStorage ou les cookies pour les sessions
        localStorage.setItem('token', data.token);
        // Redirigez l'utilisateur vers la page suivante après la connexion réussie
        navigate('/matches'); // Changez '/dashboard' par la route appropriée
      } catch (parseError) {
        console.error('Error parsing server response:', parseError);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Gérez les erreurs de connexion ici
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <h2>Se connecter</h2>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Se connecter
          </Button>
        </form>
        <div>
          <p>Pas encore inscrit ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
