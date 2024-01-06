/* eslint-disable react/no-unescaped-entities */
// RegisterPage.jsx
import  { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://fauques.freeboxos.fr:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // Gérer la réponse du serveur
      const { id, token, serverPassword} = data;
      console.log('ID utilisateur:', id);
      console.log('Token JWT:', token);
      console.log('Password:', serverPassword);
      // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
      navigate('/login'); // Changez '/login' par la route appropriée
    } catch (error) {
      console.error('Error during registration:', error);
      // Gérer les erreurs d'inscription ici
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <h2>S'inscrire</h2>
        <form onSubmit={handleRegister}>
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
            Inscription
          </Button>
        </form>
        <div>
          <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
        </div>
      </div>
    </Container>
  );
};


export default RegisterPage;
