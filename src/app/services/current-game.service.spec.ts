import { TestBed } from '@angular/core/testing';

import { CurrentGameService } from 'src/app/services/current-game.service';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ApolloModule } from 'apollo-angular';

describe('CurrentGameService', () => {
	let service: CurrentGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApolloModule, ApolloTestingModule],
		});
		service = TestBed.inject(CurrentGameService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
