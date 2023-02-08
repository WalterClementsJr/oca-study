import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Question, QuestionType} from "../../entity/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFormComponent implements OnInit, OnChanges {
  readonly formKey = 'answer';
  readonly questionType = QuestionType;
  objectKeys = Object.keys;

  form!: FormGroup;
  @Input('question') question: Question | undefined;
  listOfAnswers: any[] = [];
  answerIsCorrect: boolean | undefined;
  answer: string | undefined;
  isMultipleQuestion: boolean | false | undefined;

  showResult: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public fb: FormBuilder
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  ngOnInit(): void {
    this.setup();
  }

  /**
   *  reset properties
   */
  private setup() {
    this.showResult = false;
    this.answerIsCorrect = undefined;
    this.listOfAnswers = [];

    // track new properties of the new question
    for (let key of Object.keys(this.question?.answers)) {
      this.listOfAnswers.push({key: key, answer: this.question?.answers[key], checked: false})
    }
    this.isMultipleQuestion = this.question?.type === QuestionType.MULTIPLE_CHOICE;

    this.form = this.fb.group({
      answer: ['', [Validators.required]]
    });
    console.log("answer is ", this.question?.answer);
  }

  /**
   * get checked boxes/radio button
   */
  private get selectedOptions() {
    return !this.isMultipleQuestion
      ? [...this.form.get(this.formKey)?.value]
      : this.listOfAnswers
        .filter(opt => opt.checked === true)
        .map(opt => opt.key)
  }

  get isFormSelected(): boolean {
    return this.selectedOptions.length > 0;
  }

  onSubmit(showResult?: boolean) {
    if (!this.form?.valid && !showResult) {
      return false;
    } else {
      this.checkAnswer(showResult);
    }
    return true;
  }

  checkAnswer(showResult?: boolean) {
    this.answerIsCorrect = this.checkCorrectAnswer(this.selectedOptions.join(','));

    if (showResult) {
      this.showResult = true;
      this.getAnswersStyle();
    }
    return this.answerIsCorrect;
  }

  checkCorrectAnswer(answer: string) {
    return answer.toUpperCase() === this.question?.answer?.toUpperCase();
  }

  getAnswersStyle() {
    // css
    const wrongAnswer = "text-danger text-decoration-line-through";
    const notSelectedAnswer = "text-muted";
    const rightAnswer = "text-success fw-bold";
    const rightAnswerNotSelected = "text-success text-decoration-underline";

    // haven't selected shit
    if (this.selectedOptions.length === 0) {
      this.listOfAnswers.map(ans => {
        ans.style = notSelectedAnswer;

        if (this.checkCorrectAnswer(ans.key)) {
          ans.style = rightAnswerNotSelected;
        }
      });
      this.changeDetector.detectChanges();
      return;
    } else if (!this.isMultipleQuestion) {
      // single-answer question
      this.listOfAnswers.map(i => {
        if (this.checkCorrectAnswer(i.key)) {
          i.style = rightAnswer;
        } else if (this.selectedOptions.includes(i.key)) {
          i.style = wrongAnswer;
        } else {
          i.style = notSelectedAnswer;
        }
      });
    } else {
      // multiple-answer question
      const correctAnswers = this.question?.answer?.split(',')!;
      const selected = this.selectedOptions;

      this.listOfAnswers.map(ans => {
        if (correctAnswers.includes(ans.key)) {
          // ans is correct
          ans.style = rightAnswerNotSelected;

          // ans is selected => correct
          if (selected.includes(ans.key)) {
            ans.style = rightAnswer;
          }
        } else {
          // ans is wrong
          ans.style = wrongAnswer;

          // but is not selected
          if (!selected.includes(ans.key)) {
            ans.style = notSelectedAnswer;
          }
        }
      });
    }
    // rerun ngIf
    this.changeDetector.detectChanges();
  }
}
