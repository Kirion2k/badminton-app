
import { Container } from '@mui/material';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <AuthForm />
    </Container>
  );
};

export default AuthPage;
