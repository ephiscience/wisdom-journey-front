import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Criterion, Question } from './board/board.component';
import { asJSON, fromJSON, Game } from './game/game.model';

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

const baseQuestions = [
  { text: 'À quoi ressemblerait ton école idéale ? Explique.' },
  { text: 'Est-ce que tu pourrais vivre sans les autres ? Explique.' },
  { text: "Existe-t-il différentes sortes d'amour ? Explique." },
  { text: 'Est-ce que les autres peuvent avoir des droits sur ton corps ? Explique.' },
  { text: 'À quoi ressemblerait une ville en harmonie avec la nature ?' },
  { text: "À quelle condition une vie sans bonheur peut quand même valoir la peine d'être vécue ? Explique." },
  { text: 'Comment sais-tu si tu es heureux ou pas ?' },
  { text: 'Est-ce que dans 10 ans tu seras toujours la même personne ? Explique.' },
  { text: 'Est-ce que la nature est toujours belle ? Explique.' },
  { text: "La publicité peut-elle être considérée comme de l'art?" },
];

const SAVE_GAME_KEY = 'game';

function loadGameFromLocalStorage(): Game | null {
  const value = localStorage.getItem(SAVE_GAME_KEY);

  if (value) {
    return fromJSON(value);
  } else {
    return null;
  }
}

function saveGameToLocalStorage(game: Game | null) {
  if (game) {
    localStorage.setItem(SAVE_GAME_KEY, asJSON(game));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CurrentGameService {
  game$ = new BehaviorSubject<Game | null>(null);

  lastGameState?: { numQuestions: number; numPlayers: number };

  constructor() {
    this.game$.next(loadGameFromLocalStorage());

    this.game$
      .pipe(
        switchMap((game) => {
          if (game) {
            return game.changes().pipe(map(() => game));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((game) => {
        saveGameToLocalStorage(game);
      });
  }

  currentGame(): Observable<Game | null> {
    return this.game$.asObservable();
  }

  createGame(numQuestions: number, numPlayers: number) {
    this.lastGameState = { numQuestions, numPlayers };
    const newExamplePlayers = [];
    newExamplePlayers.push({ name: 'player 1', speaking: true }, { name: 'player 2', speaking: true });
    for (let i = 2; i < numPlayers; i++) {
      newExamplePlayers.push({ name: 'player' + (i + 1), speaking: false });
    }
    shuffle(baseQuestions);
    const newExampleQuestions: Question[] = [];
    for (let i = 1; i <= numQuestions; i++) {
      newExampleQuestions.push(baseQuestions[i]);
    }
    const newExampleCriterions: Criterion[] = [
      { text: 'Exemple', description: 'Par exemple ?', icon: 'exemple8@2x.png' },
      { text: 'Source', description: 'Où as-tu appris ça ?', icon: 'source@2x.png' },
      { text: 'Donner ses raisons', description: 'Pourquoi ça ?', icon: 'raisons@2x.png' },
      { text: 'Définir', description: 'Que veut dire ce mot?', icon: 'definir@2x.png' },
      { text: 'Nuance', description: 'Est-ce toujours le cas ?', icon: 'nuance@2x.png' },
      { text: 'Comparer', description: ' Quelle est la différence?', icon: 'comparer@2x.png' },
      { text: 'Reformuler', description: "En d'autres termes ?", icon: 'reformuler@2x.png' },
      { text: 'Collaborer', description: 'Que puis-je ?', icon: 'collaborer@2x.png' },
      { text: 'Contexte', description: ' Dans quel contexte est-ce valable ?', icon: 'contexte@2x.png' },
      { text: 'Présupposé', description: ' Que sous-entend la question ?', icon: 'presuppose@2x.png' },
    ];

    console.log(newExamplePlayers, newExampleCriterions, newExampleQuestions);
    this.game$.next(new Game(newExamplePlayers, newExampleCriterions, newExampleQuestions, []));
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
