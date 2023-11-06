// LoginPage.jsx
import  { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // Stockez le token dans le localStorage ou les cookies pour les sessions
      localStorage.setItem('token', data.token);
      // Redirigez l'utilisateur vers la page suivante après la connexion réussie
      navigate('/matches'); // Changez '/dashboard' par la route appropriée
    } catch (error) {
      console.error('Error during login:', error);
      // Gérez les erreurs de connexion ici
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      <div>
      <p>Pas encore inscrit ? <Link to="/register">inscrire</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
