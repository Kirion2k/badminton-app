import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (event) => {
    event.preventDefault();
    // Handle authentication logic here
    navigate('/dashboard');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>
      <Box component="form" onSubmit={handleAuth} sx={{ mt: 2 }}>
        {!isLogin && <TextField label="Username" fullWidth sx={{ mb: 2 }} />}
        <TextField label="Email" type="email" fullWidth required sx={{ mb: 2 }} />
        <TextField label="Password" type="password" fullWidth required sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </Box>
      <Button onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </Button>
    </Container>
  );
};

export default AuthForm;
