import type { PatternDefinition } from '../types';

export const patterns: PatternDefinition[] = [
  {
    id: 'catastrophising',
    name: 'Catastrophising',
    shortName: 'The Catastrophiser',
    description: 'You build entire disaster scenarios from single moments. One bad thing becomes the end of everything.',
    colorClass: 'text-accent',
    bgClass: 'bg-accent/10',
  },
  {
    id: 'mind_reading',
    name: 'Mind Reading',
    shortName: 'The Mind Reader',
    description: "You assume you know what others are thinking — usually something negative about you.",
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
  },
  {
    id: 'overgeneralisation',
    name: 'Overgeneralisation',
    shortName: 'The Generaliser',
    description: "One event becomes a permanent rule. 'This always happens to me.' 'I never get this right.'",
    colorClass: 'text-indigo',
    bgClass: 'bg-indigo/10',
  },
  {
    id: 'black_white_thinking',
    name: 'Black & White Thinking',
    shortName: 'The Absolutist',
    description: "Everything is all or nothing. You're either crushing it or completely failing. There's no in-between.",
    colorClass: 'text-primary',
    bgClass: 'bg-elevated',
  },
  {
    id: 'personalisation',
    name: 'Personalisation',
    shortName: 'The Personaliser',
    description: 'You take responsibility for things outside your control. If something goes wrong, it must be because of you.',
    colorClass: 'text-accent',
    bgClass: 'bg-accent/10',
  },
  {
    id: 'filtering',
    name: 'Mental Filtering',
    shortName: 'The Filter',
    description: 'You focus entirely on the negatives and filter out the positives. Nine compliments, one criticism — you fixate on the criticism.',
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
  },
  {
    id: 'should_statements',
    name: 'Should Statements',
    shortName: 'The Rule Keeper',
    description: "You hold yourself and others to rigid rules. 'I should always be productive.' 'They should have known better.'",
    colorClass: 'text-indigo',
    bgClass: 'bg-indigo/10',
  },
  {
    id: 'emotional_reasoning',
    name: 'Emotional Reasoning',
    shortName: 'The Feeler',
    description: 'You treat feelings as facts. If you feel stupid, you must be stupid. If you feel like a burden, you must be one.',
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
  },
  {
    id: 'minimisation',
    name: 'Minimisation',
    shortName: 'The Minimiser',
    description: "You downplay your wins and achievements. 'Anyone could have done it.' 'It wasn't that big a deal.'",
    colorClass: 'text-dim',
    bgClass: 'bg-elevated',
  },
  {
    id: 'jumping_to_conclusions',
    name: 'Jumping to Conclusions',
    shortName: 'The Leaper',
    description: "You make firm decisions without supporting evidence. You see one sign and write the whole story.",
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
  },
  {
    id: 'balanced',
    name: 'Balanced Thinking',
    shortName: 'The Balanced Thinker',
    description: 'You gave that situation room to breathe. That is harder than it sounds.',
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
  },
];

export const getPattern = (id: PatternDefinition['id']): PatternDefinition => {
  const found = patterns.find((pattern) => pattern.id === id);
  if (!found) throw new Error(`Pattern not found: ${id}`);
  return found;
};
