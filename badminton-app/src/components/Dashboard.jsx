import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, List, ListItem, Container } from '@mui/material';
import styled from 'styled-components';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <List>
        <ListItem>
          <Button variant="contained" color="primary">
            <StyledLink to="/tournament-creator">
              Create Tournament
            </StyledLink>
          </Button>
        </ListItem>
        {/* Add more features here */}
      </List>
    </Container>
  );
};

export default Dashboard;
