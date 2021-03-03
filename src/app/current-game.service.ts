import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Criterion, Question } from './board/board.component';
import { Game } from './game/game.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentGameService {
  game$ = new BehaviorSubject<Game | null>(null);

  lastGameState?: { numQuestions: number; numPlayers: number };

  currentGame(): Observable<Game | null> {
    return this.game$.asObservable();
  }

  createGame(numQuestions: number, numPlayers: number) {
    this.lastGameState = { numQuestions, numPlayers };
    const newExamplePlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      newExamplePlayers.push({ name: 'player' + (i + 1), speaking: false });
    }
    const newExampleQuestions: Question[] = [];
    for (let i = 1; i <= numQuestions; i++) {
      newExampleQuestions.push({ text: 'question question question question question' + i });
    }
    const newExampleCriterions: Criterion[] = [
      { text: 'criterion 1' },
      { text: 'criterion 2' },
      { text: 'criterion 1' },
      { text: 'criterion 3' },
      { text: 'criterion 3' },
      { text: 'criterion 2' },
    ];

    this.game$.next(new Game(newExamplePlayers, newExampleCriterions, newExampleQuestions));
  }

  reloadGame(): boolean {
    if (this.lastGameState) {
      this.createGame(this.lastGameState?.numQuestions, this.lastGameState?.numPlayers);

      return true;
    } else {
      return false;
    }
  }
}
