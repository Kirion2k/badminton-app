import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'navy' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ShuttleMaster
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit">
              <StyledLink to="/">Home</StyledLink>
            </Button>
            <Button color="inherit">
              <StyledLink to="/auth">Sign Up / Login</StyledLink>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
