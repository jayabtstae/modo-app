export type PatternType =
  | 'catastrophising'
  | 'mind_reading'
  | 'overgeneralisation'
  | 'black_white_thinking'
  | 'personalisation'
  | 'filtering'
  | 'should_statements'
  | 'emotional_reasoning'
  | 'minimisation'
  | 'jumping_to_conclusions'
  | 'balanced';

export type SituationCategory =
  | 'academic'
  | 'work'
  | 'social'
  | 'family'
  | 'self';

export interface ResponseOption {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
  pattern: PatternType;
}

export interface Scenario {
  id: string;
  situation: string;
  category: SituationCategory;
  options: [ResponseOption, ResponseOption, ResponseOption, ResponseOption];
}

export interface PatternDefinition {
  id: PatternType;
  name: string;
  shortName: string;
  description: string;
  colorClass: string;
  bgClass: string;
}

export interface UserResponse {
  id: string;
  userId: string;
  scenarioId: string;
  selectedOptionId: string;
  patternDetected: PatternType;
  category: SituationCategory;
  insightCopy: string;
  createdAt: string;
}

export interface GuestResponse {
  scenarioId: string;
  selectedOptionId: string;
  patternDetected: PatternType;
  category: SituationCategory;
  insightCopy: string;
  createdAt: string;
}

export interface PatternProfile {
  userId: string;
  patterns: Partial<Record<PatternType, number>>;
  dominantPattern: PatternType | null;
  totalResponses: number;
  categoryBreakdown: Partial<Record<SituationCategory, number>>;
  lastUpdated: string;
}

export interface WeeklySummary {
  weekStart: string;
  weekEnd: string;
  topPatterns: PatternType[];
  totalScenarios: number;
  narrativeInsight: string;
  comparedToPrevious: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
}
