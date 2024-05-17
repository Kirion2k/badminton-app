import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to ShuttleMaster
      </Typography>
      <Typography variant="body1" paragraph>
        This app helps you schedule and manage badminton tournaments.
      </Typography>
      <Typography variant="body1" paragraph>
        Features include match scheduling, real-time updates, and more.
      </Typography>
      <Button variant="contained" color="primary" sx={{ m: 1 }}>
        <StyledLink to="/auth">Sign Up / Login</StyledLink>
      </Button>
      <Button variant="outlined" color="primary" sx={{ m: 1 }}>
        <StyledLink to="/dashboard">Continue as Guest</StyledLink>
      </Button>
    </Container>
  );
};

export default HomePage;
