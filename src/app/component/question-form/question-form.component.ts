import {Component, Input, OnInit} from '@angular/core';
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
  @Input('question') question: Question | undefined;
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
    private location: Location
  ) {
    this.setup();
  }

  ngOnInit(): void {
    this.setup();
  }

  private setup() {
    this.answerIsCorrect = undefined;
    this.listOfAnswers = [];

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
      // checkboxes with multiple correct answers
      if (this.selectedOptions.join(',').toUpperCase() === this.question.answer?.toUpperCase()) {
        this.answerIsCorrect = true;
      } else {
        this.answerIsCorrect = false;
        console.log("answer", this.question.answer);
      }
    }
  }
}
