import { GameData } from './Game';
import { Criterion, Player, Question } from './model';

export type GameDifficulty = 'easy' | 'hard';

/**
 * Builds a game from scratch
 */
export interface GameBuilder {
  build(): GameData;

  addPlayer(player: Player): void;

  setDifficulty(difficulty: GameDifficulty): void;

  setQuestions(question: Array<Question>): void;

  setCriteria(criterions: Array<Criterion>): void;
}

export interface GameStateManager {
  persist(game: GameData, timer: number): void;

  restore(): { game: GameData; timer: number };
}
