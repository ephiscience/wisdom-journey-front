import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, concat, EMPTY, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Criterion } from './board/board.component';
import { asJSON, fromJSON, Game, Player } from './game/game.model';

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

interface Question {
  text: string;
}

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

  constructor(private apollo: Apollo) {
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
      .watchQuery<{ questions: Question[] }>({
        query: gql`
          {
            questions {
              text
            }
          }
        `,
      })
      .valueChanges.pipe(map((r) => r.data.questions));
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
        { text: 'Ejemplo', description: '¿Por ejemplo?', icon: 'exemple8@2x.png' },
        { text: 'Fuente', description: '¿Dónde se aprendió eso?', icon: 'source@2x.png' },
        { text: 'Indique los motivos', description: '¿Por qué?', icon: 'raisons@2x.png' },
        { text: 'Defina', description: '¿Qué significa esta palabra?', icon: 'definir@2x.png' },
        { text: 'Matizar', description: '¿Sigue siendo así?', icon: 'nuance@2x.png' },
        { text: 'Comparar', description: '¿Cuál es la diferencia?', icon: 'comparer@2x.png' },
        { text: 'Reformular', description: '¿En otras palabras?', icon: 'reformuler@2x.png' },
        { text: 'Colaborar', description: '¿Qué puedo hacer?', icon: 'collaborer@2x.png' },
        { text: 'Contexto', description: '¿En qué contexto es válido?', icon: 'contexte@2x.png' },
        { text: 'Supuesto', description: '¿Qué implica la pregunta?', icon: 'presuppose@2x.png' },

        { text: 'Ejemplo', description: '¿Por ejemplo?', icon: 'exemple8@2x.png' },
        { text: 'Fuente', description: '¿Dónde se aprendió eso?', icon: 'source@2x.png' },
        { text: 'Indique los motivos', description: '¿Por qué?', icon: 'raisons@2x.png' },
        { text: 'Defina', description: '¿Qué significa esta palabra?', icon: 'definir@2x.png' },
        { text: 'Matizar', description: '¿Sigue siendo así?', icon: 'nuance@2x.png' },
        { text: 'Comparar', description: '¿Cuál es la diferencia?', icon: 'comparer@2x.png' },
        { text: 'Reformular', description: '¿En otras palabras?', icon: 'reformuler@2x.png' },
        { text: 'Colaborar', description: '¿Qué puedo hacer?', icon: 'collaborer@2x.png' },
        { text: 'Contexto', description: '¿En qué contexto es válido?', icon: 'contexte@2x.png' },
        { text: 'Supuesto', description: '¿Qué implica la pregunta?', icon: 'presuppose@2x.png' },
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
