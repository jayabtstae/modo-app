import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Reveal from './pages/Reveal';
import Profile from './pages/Profile';
import History from './pages/History';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

console.log('App component loaded');

function App() {
  console.log('App rendering');
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <Home />
              </AppShell>
            }
          />
          <Route
            path="/reveal"
            element={
              <AppShell>
                <Reveal />
              </AppShell>
            }
          />
          <Route
            path="/profile"
            element={
              <AppShell>
                <Profile />
              </AppShell>
            }
          />
          <Route
            path="/history"
            element={
              <AppShell>
                <History />
              </AppShell>
            }
          />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="*"
            element={
              <AppShell>
                <NotFound />
              </AppShell>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


