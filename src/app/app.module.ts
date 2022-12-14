import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {TrainingContentComponent} from './component/training-content/training-content.component';
import {TrainingContentService} from "./service/TrainingContentService";
import {GenericFilterPipe} from './pipe/generic-filter.pipe';
import {QuestionFormComponent} from './component/question-form/question-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionAnswerNotEmptyPipe} from './pipe/question-answer/question-answer-not-empty.pipe';
import {QuestionDisplayComponent} from './component/question-display/question-display.component';
import {AnswerNotBlankPipe} from './pipe/answer/answer-not-blank.pipe';
import { MessageModalComponent } from './component/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TrainingContentComponent,
    GenericFilterPipe,
    QuestionFormComponent,
    QuestionAnswerNotEmptyPipe,
    QuestionDisplayComponent,
    AnswerNotBlankPipe,
    MessageModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [TrainingContentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
