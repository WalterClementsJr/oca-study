import {Component, OnInit} from '@angular/core';
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
export class QuestionFormComponent implements OnInit {
  readonly formKey = 'answer';

  question: Question | undefined;
  objectKeys = Object.keys;
  answer: string | undefined;

  form!: FormGroup;
  isSubmitted: boolean | undefined;

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
    // TODO document why this method 'ngOnInit' is empty

  }

  getRandomQuestion() {
    // this.question = this.trainingContentService.getRandomQuestion();
    this.question = this.trainingContentService.getRandomMultipleChoiceQuestion();
    console.log(this.question);
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form?.valid) {
      return false;
    } else {
      let value = this.form.get(this.formKey)?.value;
      console.log("selecting", value, JSON.stringify(value));

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

  checkAnswer(ans: string[] | string) {
    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      return ans === this.question.answer;
    } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
      return (ans as string[])?.join(',') === this.question.answer;
    } else {
      throw new Error("answer type error");
    }
  }

  next() {
    this.getRandomQuestion();
  }
}
