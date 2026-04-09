import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getRandomItem, isSameDate } from '../lib/utils';
import { scenarios } from '../data/scenarios';
import { useAuth } from './useAuth';
import type { Scenario } from '../types';

interface ScenarioState {
  scenario: Scenario | null;
  status: 'loading' | 'ready' | 'completed' | 'limit';
  guestCount: number;
  seenIds: string[];
}

type ScenarioResult = ScenarioState & {
  markAsSeen: (scenarioId: string) => void;
};

export function useScenario(): ScenarioResult {
  const { user, isLoading } = useAuth();
  const [state, setState] = useState<ScenarioState>({
    scenario: null,
    status: 'loading',
    guestCount: 0,
    seenIds: [],
  });

  useEffect(() => {
    async function loadScenario() {
      if (isLoading) return;

      if (user) {
        const { data, error } = await supabase
          .from('user_responses')
          .select('scenario_id, created_at')
          .eq('user_id', user.id);

        if (error) {
          setState((current) => ({ ...current, status: 'ready', scenario: scenarios[0], seenIds: [] }));
          return;
        }

        const seenIds = data?.map((item) => item.scenario_id) ?? [];
        const todayResponse = data?.find((item) => isSameDate(item.created_at, new Date().toISOString()));
        if (todayResponse) {
          setState({ scenario: null, status: 'completed', guestCount: seenIds.length, seenIds });
          return;
        }

        const available = scenarios.filter((scenario) => !seenIds.includes(scenario.id));
        if (available.length === 0) {
          setState({ scenario: null, status: 'completed', guestCount: seenIds.length, seenIds });
          return;
        }

        setState({ scenario: getRandomItem(available), status: 'ready', guestCount: seenIds.length, seenIds });
        return;
      }

      const storedResponses = localStorage.getItem('pm_guest_responses');
      const guestResponses = storedResponses ? JSON.parse(storedResponses) : [];
      const seenIds = Array.isArray(guestResponses) ? guestResponses.map((item: { scenarioId: string }) => item.scenarioId) : [];
      const guestCount = parseInt(localStorage.getItem('pm_guest_count') ?? '0', 10) || 0;

      if (guestCount >= 3) {
        setState({ scenario: null, status: 'limit', guestCount, seenIds });
        return;
      }

      const available = scenarios.filter((scenario) => !seenIds.includes(scenario.id));
      if (available.length === 0) {
        setState({ scenario: null, status: 'completed', guestCount, seenIds });
        return;
      }

      setState({ scenario: getRandomItem(available), status: 'ready', guestCount, seenIds });
    }

    loadScenario();
  }, [user, isLoading]);

  const markAsSeen = (scenarioId: string) => {
    setState((current) => ({
      ...current,
      seenIds: current.seenIds.includes(scenarioId) ? current.seenIds : [...current.seenIds, scenarioId],
      guestCount: current.guestCount + 1,
    }));
  };

  return {
    ...state,
    markAsSeen,
  };
}
