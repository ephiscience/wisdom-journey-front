import { TestBed } from '@angular/core/testing';

import { CurrentGameService } from 'src/app/services/current-game.service';
import { provideApollo } from 'apollo-angular';
import { inject } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';

describe('CurrentGameService', () => {
	let service: CurrentGameService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideApollo(() => {
					const httpLink = inject(HttpLink);

					return {
						link: httpLink.create({ uri: '/graphql' }),
						cache: new InMemoryCache(),
						// other options...
					};
				}),
			],
		});
		service = TestBed.inject(CurrentGameService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
