import { Observable } from 'rxjs';
import { Criterion, CriterionState, Player, PlayerState, Question, QuestionState } from './model';

export interface Game {
  /** A stream of states updated each time the game stage changes */
  readonly stateChanges: Observable<GameState>;

  /** All players of the game */
  players(): ReadonlyArray<Player>;

  /** The criteria of the game */
  criteria(): ReadonlyArray<Criterion>;

  /** The questions of the game */
  questions(): ReadonlyArray<Question>;

  /** The current state of the game */
  currentState(): GameState;

  /** Pauses the game */
  pause(): void;

  /** Start/Restart the game */
  start(): void;

  /** Validate the question and go to the next one */
  validateCurrentQuestion(): void;

  /** Skip the current question and go to the next one */
  skipCurrentQuestion(): void;

  /** Validate the given part of the given criterion */
  validateCriterion(criterion: Criterion, part: 'top' | 'bottom'): void;

  /**
   * Start the next turn of the game:
   * - Change player states
   * - Change Question
   * - Resets timer
   */
  nextTurn(): void;
}

export interface GameData {
  readonly players: ReadonlyArray<PlayerState>;
  readonly criteria: ReadonlyArray<CriterionState>;
  readonly questions: ReadonlyArray<QuestionState>;
}

export interface GameState {
  readonly state: 'running' | 'paused' | 'won' | 'lost';
  readonly currentCriteria: ReadonlyArray<Criterion>;
  readonly currentQuestion: Question | null;
  readonly playerStates: ReadonlyArray<PlayerState>;
}
