import { useState, useEffect } from 'react';

const MatchesPage = () => {
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    fetchPlayedGames();
  }, []);

  const fetchPlayedGames = async () => {
    try {
      const response = await fetch('http://localhost:3002/matches');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPlayedGames(data);
    } catch (error) {
      console.error('Error fetching played games:', error);
    }
  };

  const handleNewGame = async () => {
    try {
      const response = await fetch('http://localhost:3000/matches', {
        method: 'POST',
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
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleNewGame}>New Game</button>
      <h3>Matches:</h3>
      {playedGames.length > 0 ? (
        <ul>
          {playedGames.map((match) => (
            <li key={match._id}>{`Match ${match._id}: ${match.user1.username} vs ${match.user2 ? match.user2.username : 'Waiting for opponent'}`}</li>
          ))}
        </ul>
      ) : (
        <p>No matches played yet.</p>
      )}
    </div>
  );
};

export default MatchesPage;
