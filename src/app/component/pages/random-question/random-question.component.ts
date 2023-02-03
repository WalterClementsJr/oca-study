import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Question} from "../../../entity/Question";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {QuestionFormComponent} from "../../question-form/question-form.component";

@Component({
  selector: 'app-random-question',
  templateUrl: './random-question.component.html',
  styleUrls: ['./random-question.component.css']
})
export class RandomQuestionComponent {
  @ViewChild("questionComponent") _questionComponent: QuestionFormComponent | undefined;
  question: Question | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getRandomQuestion();
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomQuestion();
  }

  back() {
    this.location.back();
  }

  checkAnswer() {
    this._questionComponent?.checkAnswer(true);
  }

  next() {
    this.getRandomQuestion();
    this.changeDetectorRef.detectChanges();
  }
}
