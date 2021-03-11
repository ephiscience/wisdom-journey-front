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
  blackIcon: string;
  whiteIcon: string;
  speaking: boolean;
}

export function asJSON(game: Game): string {
  return JSON.stringify({
    players: game.players,
    remainingCriterions: game.remainingCriterions,
    remainingQuestions: game.remainingQuestions,
    validatedCriterions: game.validatedCriterions,
    validatedQuestions: game.validatedQuestions,
  });
}

export function fromJSON(json: string): Game {
  const values = JSON.parse(json);
  const game = new Game(
    values.players,
    values.remainingCriterions,
    values.remainingQuestions,
    values.validatedCriterions,
    values.validatedQuestions
  );

  return game;
}

export class Game {
  changes$ = new Subject<void>();

  constructor(
    public players: Player[],
    public remainingCriterions: Criterion[],
    public remainingQuestions: Question[],
    public validatedCriterions: Criterion[],
    public validatedQuestions: Question[]
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
      const removedCriterionDescription = this.remainingCriterions[this.remainingCriterions.length - 1].description;
      const removedCriterionIcon = this.remainingCriterions[this.remainingCriterions.length - 1].icon;
      console.log(removedCriterionText, removedCriterionDescription, removedCriterionIcon);
      this.remainingCriterions.splice(-1, 1);
      this.validatedCriterions.push({ text: removedCriterionText, description: removedCriterionDescription, icon: removedCriterionIcon });
      this.notifyChange();
    }
  }

  removeQuestion(): void {
    if (this.remainingCriterions == null) {
      return;
    } else {
      const question = this.remainingQuestions.shift();

      if (question) {
        this.validatedQuestions.push(question);
      }

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
