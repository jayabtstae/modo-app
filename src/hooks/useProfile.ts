import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { PatternProfile } from '../types';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PatternProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('pattern_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    }

    loadProfile();
  }, [user]);

  return { profile, isLoading };
}
