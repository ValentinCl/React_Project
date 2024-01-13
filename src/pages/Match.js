import "./Match.css";
import { FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa";
import { useState } from "react";

const actions = {
  pierre: "ciseaux",
  feuille: "pierre",
  ciseaux: "feuille",
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action2].includes(action1)) {
    return 1;    
  } else if (actions[action1].includes(action2)) {
    return -1;
  }
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    pierre: FaHandRock,
    feuille: FaHandPaper,
    ciseaux: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "pierre" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={100} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "pierre", onActionSelected }) {
  return (
    <button className="button" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={50} />
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "Victoire",
    0: "Égalité",
    1: "Défaite",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}

function Match() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="center">
      <h1>Partie contre un CPU</h1>
      <div>
        <div className="container">
          <Player name="Joueur" score={playerScore} action={playerAction} />
          <Player name="CPU" score={computerScore} action={computerAction} />
        </div>
        <div>
          <ActionButton action="pierre" onActionSelected={onActionSelected} />
          <ActionButton action="feuille" onActionSelected={onActionSelected} />
          <ActionButton action="ciseaux" onActionSelected={onActionSelected} />
        </div>
        <ShowWinner winner={winner}/>
      </div>
    </div>
  );
}

export default Match;