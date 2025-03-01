import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, concat, EMPTY, Observable, of, from } from 'rxjs';
import { map, switchMap, mergeMap, toArray } from 'rxjs/operators';
import { Player } from 'src/app/model/player';
import { asJSON, fromJSON, Game, Question, Criterion } from 'src/app/model/game';
import { LOCALE_ID, Inject } from '@angular/core';
import { combineLatest } from 'rxjs';

function shuffle<T>(array: T[]): T[] {
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

type QueryCriterion = Pick<Criterion, 'id' | 'title' | 'subtitle' | 'icon'>;
type Nullable<T> = T | null;

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
		} catch {
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

	fetchCriterions(): Observable<Criterion[]> {
		return this.apollo
			.query<{ criterions: QueryCriterion[] }>({
				query: gql`
					query loadCriterions($lang: String!) {
						criterions {
							id
							icon
							title(lang: $lang)
							subtitle(lang: $lang)
						}
					}
				`,
				variables: {
					lang: this.locale,
				},
			})
			.pipe(map((r) => r.data.criterions.map((e) => ({ ...e, lang: this.locale }))));
	}

	createGame(numQuestions: number, playerNames: string[]): void {
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
		const allObservables = combineLatest([this.fetchQuestions(), this.fetchCriterions()]);
		allObservables.subscribe(([q, c]) => {
			const newExampleQuestions: Question[] = [];
			const questions = [...q];
			shuffle(questions);
			for (let i = 1; i <= numQuestions; i++) {
				newExampleQuestions.push(questions[i]);
			}

			const newExampleCriterions = [...c];
			shuffle(newExampleCriterions);

			this.game$.next(new Game(newExamplePlayers, newExampleCriterions, newExampleQuestions, [], [], this.locale));
		});
	}

	fetchQuestionsByLanguage(questionID: number, language: string): Observable<Question | null> {
		return this.apollo
			.query<{ question: Nullable<{ id: number; text: string }> }>({
				query: gql`
					query loadQuestion($lang: String!, $id: Int!) {
						question(id: $id) {
							id
							text(lang: $lang)
						}
					}
				`,
				variables: {
					lang: language,
					id: questionID,
				},
			})
			.pipe(
				map((r) => {
					if (r.data.question) {
						return { ...r.data.question, lang: language };
					} else {
						return null;
					}
				})
			);
	}

	fetchCriterionsByLanguage(criterionID: number, language: string): Observable<Criterion | null> {
		return this.apollo
			.query<{ criterion: Nullable<QueryCriterion> }>({
				query: gql`
					query loadCriterion($lang: String!, $id: Int!) {
						criterion(id: $id) {
							id
							icon
							title(lang: $lang)
							subtitle(lang: $lang)
						}
					}
				`,
				variables: {
					lang: language,
					id: criterionID,
				},
			})
			.pipe(
				map((r) => {
					if (r.data.criterion) {
						return { ...r.data.criterion, lang: language };
					} else {
						return null;
					}
				})
			);
	}

	changeGameLanguage(lang: string): void {
		const game = this.game$.value;

		if (game === null) return;

		const questionIDs = game.remainingQuestions.map((question) => question.id);
		const criterionIDs = game.remainingCriterions.map((criterion) => criterion.id);

		const questions$ = from(questionIDs).pipe(
			mergeMap((id) => this.fetchQuestionsByLanguage(id, lang)),
			toArray()
		);
		const criterions$ = from(criterionIDs).pipe(
			mergeMap((id) => this.fetchCriterionsByLanguage(id, lang)),
			toArray()
		);

		combineLatest([questions$, criterions$]).subscribe(([qs, cs]) => {
			const questions = qs.flatMap((q) => (q === null ? [] : [q]));
			const criterions = cs.flatMap((q) => (q === null ? [] : [q]));

			this.game$.next(new Game(game.players, criterions, questions, game.validatedCriterions, game.validatedQuestions, lang));
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
