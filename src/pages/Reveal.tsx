import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RevealCard from '../components/scenario/RevealCard';
import Button from '../components/ui/Button';

export default function Reveal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showShare, setShowShare] = useState(false);

  const state = location.state as {
    pattern: string;
    category: string;
    insight: string;
  } | null;

  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const handleShare = () => {
    setShowShare(true);
  };

  const handleNext = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-background">
      <RevealCard pattern={state.pattern} category={state.category} insight={state.insight} />

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <Button onClick={handleShare} variant="secondary" className="w-full">
          Share this pattern
        </Button>
        <Button onClick={handleNext} className="w-full">
          {user ? 'Save to profile' : 'Next scenario'} →
        </Button>
      </div>

      {showShare && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-card rounded-3xl p-6 text-center max-w-sm">
            <p className="text-sm text-muted mb-4">Screenshot to share</p>
            <div className="bg-secondary rounded-2xl p-4">
              <p className="font-display text-lg font-semibold text-primary">My thinking pattern:</p>
              <p className="mt-2 text-sm text-muted">{state.insight}</p>
            </div>
            <Button onClick={() => setShowShare(false)} variant="ghost" className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
