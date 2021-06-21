import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, concat, EMPTY, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Player } from 'src/app/model/player';
import { Criterion } from 'src/app/modules/game/board/board.component';
import { asJSON, fromJSON, Game, Question } from 'src/app/model/game';
import { LOCALE_ID, Inject } from '@angular/core';

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

const WHITE_PLAYER_ICONS = ['dogWhite.png', 'squirrelWhite.png', 'dolphinWhite.png', 'lionWhite.png', 'monkeyWhite.png', 'sheepWhite.png'];
const BLACK_PLAYER_ICONS = ['dogBlack.png', 'squirrelBlack.png', 'dolphinBlack.png', 'lionBlack.png', 'monkeyBlack.png', 'sheepBlack.png'];

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

  lastGameState?: { numQuestions: number; playerNames: string[] };

  constructor(private apollo: Apollo, @Inject(LOCALE_ID) private locale: string) {
    this.load();

    this.game$
      .pipe(
        switchMap((game) => {
          if (game) {
            return concat(of(game), game.changes().pipe(map(() => game)));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((game) => {
        saveGameToLocalStorage(game);
      });
  }

  load() {
    try {
      const loadedGame = loadGameFromLocalStorage();
      if (loadedGame) {
        this.lastGameState = {
          numQuestions: loadedGame.remainingQuestions.length + loadedGame.validatedQuestions.length,
          playerNames: loadedGame.players.map((p) => p.name),
        };
      }
      this.game$.next(loadedGame);
    } catch (e) {
      saveGameToLocalStorage(null);
    }
  }

  currentGame(): Observable<Game | null> {
    return this.game$.asObservable();
  }

  fetchQuestions(): Observable<Question[]> {
    return this.apollo
      .query<{ questions: { id: number; text: string }[] }>({
        query: gql`
          query loadQuestions($lang: String!) {
            questions {
              id
              text(lang: $lang)
            }
          }
        `,
        variables: {
          lang: this.locale,
        },
      })
      .pipe(map((r) => r.data.questions.map((e) => ({ ...e, lang: this.locale }))));
  }

  createGame(numQuestions: number, playerNames: string[]) {
    this.lastGameState = { numQuestions, playerNames };
    const newExamplePlayers: Player[] = [];
    newExamplePlayers.push(
      { name: playerNames[0], blackIcon: BLACK_PLAYER_ICONS[0], whiteIcon: WHITE_PLAYER_ICONS[0], speaking: true, turnsTalking: 0 },
      { name: playerNames[1], blackIcon: BLACK_PLAYER_ICONS[1], whiteIcon: WHITE_PLAYER_ICONS[1], speaking: true, turnsTalking: 0 }
    );
    for (let i = 2; i < playerNames.length; i++) {
      newExamplePlayers.push({
        name: playerNames[i],
        blackIcon: BLACK_PLAYER_ICONS[i],
        whiteIcon: WHITE_PLAYER_ICONS[i],
        speaking: false,
        turnsTalking: 0,
      });
    }

    this.fetchQuestions().subscribe((q) => {
      const newExampleQuestions: Question[] = [];
      const questions = [...q];

      shuffle(questions);

      for (let i = 1; i <= numQuestions; i++) {
        newExampleQuestions.push(questions[i]);
      }

      let newExampleCriterions: Criterion[] = [
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
      newExampleCriterions = shuffle(newExampleCriterions);

      console.log(newExamplePlayers, newExampleCriterions, newExampleQuestions);

      this.game$.next(new Game(newExamplePlayers, newExampleCriterions, newExampleQuestions, [], []));
    });
  }

  reloadGame(): boolean {
    if (this.lastGameState) {
      this.createGame(this.lastGameState?.numQuestions, this.lastGameState?.playerNames);

      return true;
    } else {
      return false;
    }
  }
}
