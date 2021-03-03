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

export class Game {
  players: Player[];
  remainingCriterions: Criterion[];
  remainingQuestions: Question[];
  validatedCriterions: Criterion[];

  constructor(players: Player[], remainingCriterions: Criterion[], remainingQuestions: Question[]) {
    this.players = players;
    this.remainingCriterions = remainingCriterions;
    this.remainingQuestions = remainingQuestions;
    this.validatedCriterions = [];
    this.changePlayerRoles();
  }

  removeCriterion(c: Criterion, i: number): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      this.validatedCriterions.push(c);
      this.remainingCriterions.splice(i, 1);
    }
  }

  removeAdditionalCriterion(): void {
    if (this.remainingCriterions == null) {
      return; /*useful ??*/
    } else {
      const removedCriterionText = this.remainingCriterions[this.remainingCriterions.length - 1].text;
      this.remainingCriterions.splice(-1, 1);
      this.validatedCriterions.push({ text: removedCriterionText });
    }
  }

  removeQuestion(): void {
    if (this.remainingCriterions == null) {
      return;
    } else {
      this.remainingQuestions.shift();
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
  }
}
