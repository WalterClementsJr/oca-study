import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {QuizComponent} from './component/quiz/quiz.component';
import {TrainingContentService} from "./service/TrainingContentService";
import {QuestionService} from "./service/QuestionService";
import {GenericFilterPipe} from './pipe/generic-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuizComponent,
    GenericFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [TrainingContentService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
