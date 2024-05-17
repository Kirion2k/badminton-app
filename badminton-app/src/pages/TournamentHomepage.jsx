import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, List, ListItem } from '@mui/material';
import { useTournaments } from '../context/TournamentContext';

const TournamentHomepage = () => {
  const navigate = useNavigate();
  const { tournaments } = useTournaments();

  const handleCreateTournament = () => {
    navigate('/tournaments/new');
  };

  const handleViewTournament = (tournament) => {
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Tournaments</Typography>
      <Box>
        {tournaments.length === 0 ? (
          <Typography>No Tournaments Created</Typography>
        ) : (
          <List>
            {tournaments.map((tournament) => (
              <ListItem key={tournament.id} button onClick={() => handleViewTournament(tournament)}>
                {tournament.name}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleCreateTournament}>Create New Tournament</Button>
    </Container>
  );
};

export default TournamentHomepage;
