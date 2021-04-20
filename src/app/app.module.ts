import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { TimesPipe } from 'src/app/modules/shared/times.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MymodalComponent } from 'src/app/modules/shared/mymodal/mymodal.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule, NgbModule, FormsModule],
  providers: [NgbModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
