import { AuthProvider } from './context/AuthProvider';

// Estilos
import './styles/navbar.css';
import './styles/forms.css';
import './styles/home.css';
import './styles/cities.css';
import { AppRouter } from './routes/AppRouter';

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
