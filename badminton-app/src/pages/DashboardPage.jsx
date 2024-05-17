import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleTournamentApp = () => {
    navigate('/tournaments');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box>
        <Button variant="contained" color="primary" onClick={handleTournamentApp}>Tournament Maker App</Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
