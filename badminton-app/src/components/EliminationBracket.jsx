import PropTypes from 'prop-types';
import './EliminationBracket.css';

const EliminationBracket = ({ matches }) => {
  const renderMatch = (match) => (
    <div className="match" key={match.id}>
      <div className="participant">{match.participants[0]?.name || 'Bye'}</div>
      <div className="vs">vs</div>
      <div className="participant">{match.participants[1]?.name || 'Bye'}</div>
    </div>
  );

  const renderRound = (roundMatches, roundNumber) => (
    <div className="round" key={`round-${roundNumber}`}>
      <h3>Round {roundNumber}</h3>
      {roundMatches.map(renderMatch)}
    </div>
  );

  const rounds = [];
  let roundNumber = 1;
  let currentRound = matches.filter(match => match.round === roundNumber);

  while (currentRound.length > 0) {
    rounds.push(renderRound(currentRound, roundNumber));
    roundNumber++;
    currentRound = matches.filter(match => match.round === roundNumber);
  }

  return <div className="bracket">{rounds}</div>;
};

EliminationBracket.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      participants: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      round: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EliminationBracket;
