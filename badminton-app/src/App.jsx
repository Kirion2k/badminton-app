// src/App.js
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TournamentHomepage from './pages/TournamentHomepage';
import TournamentCreator from './pages/TournamentCreator';
import TournamentDetails from './components/TournamentDetails';


const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tournaments" element={<TournamentHomepage />} />
      <Route path="/tournaments/new" element={<TournamentCreator />} />
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
    </Routes>
  </>
);

export default App;
