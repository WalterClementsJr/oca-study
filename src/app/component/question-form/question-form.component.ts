import {Component} from '@angular/core';
import {TrainingContentService} from "../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Question, QuestionType} from "../../entity/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  readonly formKey = 'answer';

  question: Question | undefined;
  listOfAnswers: any[] = [];

  objectKeys = Object.keys;
  readonly questionType = QuestionType;

  form!: FormGroup;
  answer: string | undefined;


  isSubmitted: boolean | undefined;

  constructor(
    public fb: FormBuilder,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
    this.getRandomQuestion();

    // setup for multiple-choice questions
    if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      for (let key of Object.keys(this.question?.answers)) {
        this.listOfAnswers.push({key: key, answer: this.question?.answers[key], checked: false})
      }
    }

    this.form = this.fb.group({
      answer: ['', [Validators.required]]
    });
  }

  get selectedOptions() {
    return this.listOfAnswers.filter(opt => opt.checked === true).map(opt => opt.key)
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomMultipleChoiceQuestion();
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form?.valid) {
      return false;
    } else {
      this.checkAnswer();
    }
    return true;
  }

  checkAnswer() {
    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      let value = this.form.get(this.formKey)?.value;
      if (value.toUpperCase() == this.question.answer?.toUpperCase()) {
        alert("correct. " + this.question.explanation);
      } else {
        alert("wrong answer");
        console.log("answer", this.question.answer);
      }
    } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      console.log("selecting", this.selectedOptions);
      if (this.selectedOptions.join(',').toUpperCase() === this.question.answer?.toUpperCase()) {
        alert("correct. " + this.question.explanation);
        console.log("correct", this.question.answer);
      } else {
        alert("wrong answer");
        console.log("answer", this.question.answer);
      }
    }
  }

  next() {
    this.getRandomQuestion();
  }
}
