import { Component } from '@angular/core';
import {Question, QuestionType} from "../../../entity/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-random-question',
  templateUrl: './random-question.component.html',
  styleUrls: ['./random-question.component.css']
})
export class RandomQuestionComponent {
  readonly formKey = 'answer';

  question: Question | undefined;
  listOfAnswers: any[] = [];

  answerIsCorrect: boolean | undefined;

  objectKeys = Object.keys;
  readonly questionType = QuestionType;

  form!: FormGroup;
  answer: string | undefined;

  constructor(
    public fb: FormBuilder,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
    this.getRandomQuestion();
    this.setup();
  }

  private setup() {
    this.answerIsCorrect = undefined;
    for (let key of Object.keys(this.question?.answers)) {
      this.listOfAnswers.push({key: key, answer: this.question?.answers[key], checked: false})
    }

    this.form = this.fb.group({
      answer: ['', [Validators.required]]
    });
  }

  get selectedOptions() {
    return this.listOfAnswers.filter(opt => opt.checked === true).map(opt => opt.key)
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomQuestion();
    console.log(this.question);
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    if (!this.form?.valid) {
      return false;
    } else {
      this.checkAnswer();
    }
    return true;
  }

  checkAnswer() {
    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      // check radio
      let value = this.form.get(this.formKey)?.value;
      if (value.toUpperCase() == this.question.answer?.toUpperCase()) {
        this.answerIsCorrect = true;
      } else {
        this.answerIsCorrect = false;
        console.log("answer", this.question.answer);
      }
    } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      // checkboxes
      if (this.selectedOptions.join(',').toUpperCase() === this.question.answer?.toUpperCase()) {
        this.answerIsCorrect = true;
      } else {
        this.answerIsCorrect = false;
        console.log("answer", this.question.answer);
      }
    }
  }

  next() {
    this.getRandomQuestion();
    this.setup();
  }

}
