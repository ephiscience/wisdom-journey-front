import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	bootstrap: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, GraphQLModule, NgbModule, FormsModule],
	providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
