import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScenario } from '../hooks/useScenario';
import { useAuth } from '../hooks/useAuth';
import { getInsightCopy } from '../data/insights';
import { supabase } from '../lib/supabase';
import ScenarioCard from '../components/scenario/ScenarioCard';
import OptionButton from '../components/scenario/OptionButton';
import Button from '../components/ui/Button';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scenario, status, guestCount, markAsSeen } = useScenario();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('pm_onboarding_complete') !== 'true') {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    if (!scenario || !selectedOption) return;

    try {
      setIsSubmitting(true);
      const selectedOptionData = scenario.options.find((opt) => opt.id === selectedOption);
      if (!selectedOptionData) {
        console.error('Option not found');
        return;
      }

      const insight = getInsightCopy(selectedOptionData.pattern, scenario.category);

      if (user) {
        // Save to Supabase
        const { error } = await supabase
          .from('user_responses')
          .insert({
            user_id: user.id,
            scenario_id: scenario.id,
            selected_option_id: selectedOption,
            pattern_detected: selectedOptionData.pattern,
            category: scenario.category,
            insight_copy: insight,
          });

        if (error) {
          console.error('Error saving to Supabase:', error);
          throw error;
        }
      } else {
        // Save to localStorage
        const responses = JSON.parse(localStorage.getItem('pm_guest_responses') || '[]');
        responses.push({
          scenarioId: scenario.id,
          selectedOptionId: selectedOption,
          patternDetected: selectedOptionData.pattern,
          category: scenario.category,
          insightCopy: insight,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('pm_guest_responses', JSON.stringify(responses));
        localStorage.setItem('pm_guest_count', (guestCount + 1).toString());
      }

      markAsSeen(scenario.id);

      navigate('/reveal', {
        state: {
          pattern: selectedOptionData.pattern,
          category: scenario.category,
          insight,
        },
      });
    } catch (error) {
      console.error('Error submitting response:', error);
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded-xl mb-4"></div>
          <div className="h-32 bg-secondary rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">You've thought today</h1>
        <p className="mt-3 text-sm text-muted">Come back tomorrow for your next scenario.</p>
      </div>
    );
  }

  if (status === 'limit') {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">Try PatternMind</h1>
        <p className="mt-3 text-sm text-muted">You've completed 3 scenarios as a guest. Sign up to continue.</p>
        <Button onClick={() => navigate('/auth')} className="mt-6">
          Sign up
        </Button>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="px-4 py-6 text-center">
        <h1 className="font-display text-3xl font-semibold text-primary">No scenarios available</h1>
        <p className="mt-3 text-sm text-muted">You've seen all scenarios. Check back later.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-primary">Daily scenario</h1>
        <p className="mt-3 text-sm text-muted">Pick the reaction that feels most like you.</p>
      </div>

      <ScenarioCard scenario={scenario} />

      <div className="space-y-3">
        {scenario.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            isDisabled={!!selectedOption}
            onClick={() => handleOptionSelect(option.id)}
          />
        ))}
      </div>

      {selectedOption && (
        <Button onClick={handleSubmit} isLoading={isSubmitting} className="w-full">
          See your pattern →
        </Button>
      )}
    </div>
  );
}
