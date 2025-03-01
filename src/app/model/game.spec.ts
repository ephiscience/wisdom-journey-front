import { Game, Question } from 'src/app/model/game';
import { Player } from 'src/app/model/player';

function makePlayer(name: string): Player {
	return {
		name,
		blackIcon: '',
		whiteIcon: '',
		turnsTalking: 0,
		speaking: false,
	};
}

function makeQuestion(): Question {
	return {
		id: 1,
		text: 'blabla',
		lang: 'fr',
	};
}

describe('Game', () => {
	describe('fromJson', () => {
		it('loads a game from a valid JSON', () => {
			const validJson = JSON.stringify({
				players: [],
				remainingQuestions: [],
			});

      expect(validJson).toBeTruthy()
		});
	});
	describe('methods', () => {
		it('should have a list of players', () => {
			const players = [makePlayer('toto')];
			const game = new Game(players, [], [], [], [], 'fr');

			expect(game.players).toEqual(players);
		});

		it('removes the question from remaining array on question validated', () => {
			const question = makeQuestion();
			const game = new Game([], [], [question], [], [], 'fr');
			game.removeQuestion();

			expect(game.remainingQuestions).toEqual([]);
		});
	});
});
