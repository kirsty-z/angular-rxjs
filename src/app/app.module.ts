import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component'
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http"
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api"
import { InMemoryDataService } from "./in-memory-data.service";
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HighlightDirective } from './highlight.directive';
import { RxComponentComponent } from './rx-component/rx-component.component';
import { CommComponent } from './comm/comm.component';
import { SubCommComponent } from './sub-comm/sub-comm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HighlightDirective,
    RxComponentComponent,
    CommComponent,
    SubCommComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
