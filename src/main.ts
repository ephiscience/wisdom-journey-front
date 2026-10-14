import { enableProdMode, inject, provideZoneChangeDetection } from '@angular/core';

import { environment } from './environments/environment';
import { provideHttpClient, withFetch, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideZoneChangeDetection(),
		provideRouter(routes),
		provideHttpClient(withFetch(), withInterceptorsFromDi()),
		provideApollo(() => {
			const httpLink = inject(HttpLink);

			return {
				link: httpLink.create({ uri: '/api' }),
				cache: new InMemoryCache(),
				// other options...
			};
		}),
		provideHttpClient(withXhr(), withInterceptorsFromDi()),
	],
}).catch((err) => console.error(err));
