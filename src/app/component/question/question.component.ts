import {Component, OnInit} from '@angular/core';
import {TrainingContentService} from "../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Question, QuestionType} from "../../entity/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: Question | undefined;
  objectKeys = Object.keys;
  isSubmitted: boolean | undefined;

  readonly formKey = 'answer';

  answer: string | undefined;

  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {

    this.getRandomQuestion();

    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      this.form = this.fb.group({
        answer: ['', [Validators.required]]
      });
    } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      this.form = this.fb.group({
        answer: ['', [Validators.required]]
      });
    }
  }

  ngOnInit(): void {
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomQuestion();
    console.log(this.question);
  }

  back() {
    this.location.back();
  }

  filterEmptyAnswer(key: string) {
    // console.log(key);
    // console.log(this.question);
    return true;
    // return !this.question?.answers[key] || this.question?.answers[key].trim().length === 0;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form?.valid) {
      return false;
    } else {
      let value = this.form.get(this.formKey)?.value;
      console.log("selecting", JSON.stringify(value));

      if (this.checkAnswer(JSON.stringify(value))) {
        // glow green
        if (this.question?.type === QuestionType.SINGLE_CHOICE) {

        } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {

        }
      } else {
        // glow red
      }
    }
    return true;
  }

  checkAnswer(ans: [] | string) {
    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      return ans === this.question.answer;
    } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      return (ans as string[])?.join('') === this.question.answer;
    } else {
      throw new Error("answer type error");
    }
  }

  next() {
    this.getRandomQuestion();
  }
}
