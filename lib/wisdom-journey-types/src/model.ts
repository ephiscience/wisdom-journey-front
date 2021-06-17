import { createIs } from 'typescript-is';

export interface Question {
  id: string;
  lang: string;
  text: string;
}

export interface Player {
  name: string;
  // TODO: complete with other fields
}

export interface Criterion {
  id: string;
  // TODO: complete with other fields
}

export interface PlayerState {
  readonly player: Player;
  readonly role: 'speaker' | 'listener';
}

export interface CriterionState {
  readonly criterion: Criterion;
  readonly state: 'displayed' | 'completed' | 'top_validated' | 'bottom_validated' | 'hidden';
}

export interface QuestionState {
  readonly question: Question;
  readonly state: 'displayed' | 'skipped' | 'validated' | 'hidden';
}

export const isQuestion = createIs<Question>();
export const isPlayer = createIs<Player>();
export const isCriterion = createIs<Criterion>();
