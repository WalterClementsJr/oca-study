import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { QuizComponentComponent } from './component/quiz/quiz-component.component';
import { QuizComponent } from './component/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuizComponentComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
