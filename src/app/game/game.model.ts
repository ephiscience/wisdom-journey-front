import { Observable, Subject } from 'rxjs';
import { Criterion, Question } from '../board/board.component';

function shuffle(array: any[]): Array<any> {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export interface Player {
  name: string;
  speaking: boolean;
}

export function asJSON(game: Game): string {
  return JSON.stringify({
    players: game.players,
    remainingCriterions: game.remainingCriterions,
    remainingQuestions: game.remainingQuestions,
    validatedCriterions: game.validatedCriterions,
  });
}

export function fromJSON(json: string): Game {
  const values = JSON.parse(json);
  const game = new Game(values.players, values.remainingCriterions, values.remainingQuestions, values.validatedCriterions);

  return game;
}

export class Game {
  changes$ = new Subject<void>();

  constructor(
    public players: Player[],
    public remainingCriterions: Criterion[],
    public remainingQuestions: Question[],
    public validatedCriterions: Criterion[]
  ) {
    this.changePlayerRoles();
  }

  changes(): Observable<void> {
    return this.changes$.asObservable();
  }

  removeCriterion(c: Criterion, i: number): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      this.validatedCriterions.push(c);
      this.remainingCriterions.splice(i, 1);
      this.notifyChange();
    }
  }

  removeAdditionalCriterion(): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      const removedCriterionText = this.remainingCriterions[this.remainingCriterions.length - 1].text;
      this.remainingCriterions.splice(-1, 1);
      this.validatedCriterions.push({ text: removedCriterionText });
      this.notifyChange();
    }
  }

  removeQuestion(): void {
    if (this.remainingCriterions == null) {
      return;
    } else {
      this.remainingQuestions.shift();
      this.notifyChange();
    }
  }

  changePlayerRoles(): void {
    let playerRoles: boolean[] = [];
    for (const player of this.players) {
      playerRoles.push(player.speaking);
    }
    playerRoles = shuffle(playerRoles);
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].speaking = playerRoles[i];
    }

    this.notifyChange();
  }

  private notifyChange() {
    this.changes$.next();
  }
}
