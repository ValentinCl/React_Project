// RegisterPage.jsx
import  { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // Gérer la réponse du serveur
      const { id, token, password} = data;
      console.log('ID utilisateur:', id);
      console.log('Token JWT:', token);
      console.log('Password:', password);
      // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
      navigate('/login'); // Changez '/login' par la route appropriée
    } catch (error) {
      console.error('Error during registration:', error);
      // Gérer les erreurs d'inscription ici
    }
  };

  return (
    <div>
      <h2>inscrire</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">inscrire</button>
      </form>
      <div>
      <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
