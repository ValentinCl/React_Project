import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

function Match() {
    const { id } = useParams();

    const [match, setMatch] = useState(null);
    
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
        <div>
            {/* Afficher les détails du match */}
            {match && (
                <div>
                    <p>Match ID: {match._id}</p>
                    <p>Players: {match.user1.username} vs {match.user2 ? match.user2.username : 'Waiting for opponent'}</p>
                    <p>Turns: {match.turns.length >0? match.turns.length: match.turns.length+1}</p>
                </div>
            )}

            {/* Ajouter des boutons pour les différents mouvements */}
            <button onClick={() => makeMove('rock')}>Rock</button>
            <button onClick={() => makeMove('paper')}>Paper</button>
            <button onClick={() => makeMove('scissors')}>Scissors</button>
            <button onClick={goBackToMatches}>Back to Matches</button>
        
        </div>
    );
}



Match.propTypes = {
    matchId: PropTypes.string.isRequired
};

export default Match;

