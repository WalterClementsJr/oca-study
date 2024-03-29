import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {DashboardComponent} from './component/pages/dashboard/dashboard.component';
import {TrainingContentComponent} from './component/pages/training-content/training-content.component';
import {TrainingContentService} from "./service/TrainingContentService";
import {GenericFilterPipe} from './pipe/generic-filter.pipe';
import {QuestionFormComponent} from './component/question-form/question-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionAnswerNotEmptyPipe} from './pipe/question-answer/question-answer-not-empty.pipe';
import {AnswerNotBlankPipe} from './pipe/answer/answer-not-blank.pipe';
import {MessageModalComponent} from './component/message-modal/message-modal.component';
import {RandomQuestionComponent} from './component/pages/random-question/random-question.component';
import {QuizComponent} from "./component/quiz/quiz.component";
import {PalletComponent} from './component/pallet/pallet.component';
import {RouterModule} from "@angular/router";
import { CodeBlockComponent } from './component/code-block/code-block.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TrainingContentComponent,
    RandomQuestionComponent,

    QuizComponent,
    QuestionFormComponent,
    MessageModalComponent,

    GenericFilterPipe,
    QuestionAnswerNotEmptyPipe,
    AnswerNotBlankPipe,
    PalletComponent,
    CodeBlockComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [TrainingContentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
