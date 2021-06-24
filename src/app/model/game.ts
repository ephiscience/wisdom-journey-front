import { Observable, Subject } from 'rxjs';
import { Player } from 'src/app/model/player';
//import { Criterion } from 'src/app/modules/game/board/board.component';

export interface Question {
  id: number;
  text: string;
  lang: string;
}

export interface Criterion {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  lang: string;
}

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
    public players: Player[] = [],
    public remainingCriterions: Criterion[] = [],
    public remainingQuestions: Question[] = [],
    public validatedCriterions: Criterion[] = [],
    public validatedQuestions: Question[] = []
  ) {
    // this.changePlayerRoles();
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
      const removedCriterionText = this.remainingCriterions[this.remainingCriterions.length - 1].title;
      const removedCriterionDescription = this.remainingCriterions[this.remainingCriterions.length - 1].subtitle;
      const removedCriterionIcon = this.remainingCriterions[this.remainingCriterions.length - 1].icon;
      const removedCriterionId = this.remainingCriterions[this.remainingCriterions.length - 1].id;
      const removedCriterionLang = this.remainingCriterions[this.remainingCriterions.length - 1].lang;
      console.log(removedCriterionText, removedCriterionDescription, removedCriterionIcon);
      this.remainingCriterions.splice(-1, 1);
      this.validatedCriterions.push({
        title: removedCriterionText,
        subtitle: removedCriterionDescription,
        icon: removedCriterionIcon,
        id: removedCriterionId,
        lang: removedCriterionLang,
      });
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
    const previousPlayerRoles: boolean[] = [];
    let nextPlayerRoles: boolean[] = [];
    const playerTurnsTalking: number[] = [];
    let otherPlayerTurnsTalking: number[] = [];

    for (const player of this.players) {
      previousPlayerRoles.push(player.speaking);
      nextPlayerRoles.push(player.speaking);
      playerTurnsTalking.push(player.turnsTalking);
      otherPlayerTurnsTalking.push(player.turnsTalking);
    }
    //manual shuflle
    if (Math.max(...playerTurnsTalking) - Math.min(...playerTurnsTalking) >= 2) {
      otherPlayerTurnsTalking = otherPlayerTurnsTalking.sort();
      //console.log(otherPlayerTurnsTalking);
      const firstIndex = playerTurnsTalking.indexOf(otherPlayerTurnsTalking[0]);
      let secondIndex = playerTurnsTalking.indexOf(otherPlayerTurnsTalking[1]);
      if (firstIndex === secondIndex) {
        // ça veut dire que y a deux jouerus avec le même turns talking
        for (let i = 0; i < this.players.length; i++) {
          if (this.players[i].turnsTalking === otherPlayerTurnsTalking[1] && i !== firstIndex) {
            secondIndex = i;
          }
        }
      }
      for (let i = 0; i < this.players.length; i++) {
        if (i === firstIndex || i === secondIndex) {
          this.players[i].speaking = true;
          this.players[i].turnsTalking += 1;
        } else {
          this.players[i].speaking = false;
        }
      }
      return;
    }
    //automatic shuffle
    nextPlayerRoles = shuffle(nextPlayerRoles);
    while (this.checkEqualArrays(nextPlayerRoles, previousPlayerRoles)) {
      nextPlayerRoles = shuffle(nextPlayerRoles);
    }
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].speaking = nextPlayerRoles[i];
      if (nextPlayerRoles[i] === true) {
        this.players[i].turnsTalking += 1;
      }
    }

    this.notifyChange();
  }

  private notifyChange() {
    this.changes$.next();
  }
  private checkEqualArrays(firstArr: boolean[], secondArr: boolean[]): boolean {
    let result = true;

    for (let i = 0; i < firstArr.length; i++) {
      if (firstArr[i] !== secondArr[i]) {
        result = false;
      }
    }
    return result;
  }
}
