import { useParams } from 'react-router-dom';
import { useTournaments } from '../context/TournamentContext';
import RoundRobinTable from './RoundRobinTable';
import EliminationBracket from './EliminationBracket';

const TournamentDetails = () => {
  const { id } = useParams();
  const { tournaments } = useTournaments();
  const tournament = tournaments.find(t => t.id === id);

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div>
      <h1>{tournament.name}</h1>
      <h2>{tournament.type} Tournament</h2>
      {tournament.type === 'roundRobin' ? (
        <RoundRobinTable participants={tournament.participants} />
      ) : (
        <EliminationBracket matches={tournament.matches} />
      )}
    </div>
  );
};

export default TournamentDetails;
