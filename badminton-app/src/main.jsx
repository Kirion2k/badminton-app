import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TournamentProvider } from './context/TournamentContext';

// Define global for browser environment
window.global = window;

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TournamentProvider>
      <App />
    </TournamentProvider>
  </BrowserRouter>
);
