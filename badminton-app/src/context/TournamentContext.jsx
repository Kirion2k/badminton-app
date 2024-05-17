import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TournamentContext = createContext();

export const useTournaments = () => useContext(TournamentContext);

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);

  const addTournament = (tournament) => {
    const newTournament = {
      ...tournament,
      id: Date.now().toString() // Ensure each tournament has a unique ID
    };
    setTournaments([...tournaments, newTournament]);
  };

  return (
    <TournamentContext.Provider value={{ tournaments, addTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};

TournamentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
