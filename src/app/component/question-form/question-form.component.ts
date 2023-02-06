import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Question, QuestionType} from "../../entity/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnChanges {
  readonly formKey = 'answer';
  readonly questionType = QuestionType;
  objectKeys = Object.keys;

  @Input('question') question: Question | undefined;
  listOfAnswers: any[] = [];
  answerIsCorrect: boolean | undefined;
  form!: FormGroup;
  answer: string | undefined;
  isMultipleQuestion: boolean | false | undefined;

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

  private setup() {
    this.answerIsCorrect = undefined;
    this.listOfAnswers = [];

    for (let key of Object.keys(this.question?.answers)) {
      this.listOfAnswers.push({key: key, answer: this.question?.answers[key], checked: false})
    }

    this.isMultipleQuestion = this.question?.type === QuestionType.MULTIPLE_CHOICE;

    this.form = this.fb.group({
      answer: ['', [Validators.required]]
    });
    // this.form.valueChanges.subscribe(data => this.form.patchValue(data, {
    // onlySelf: true,
    // emitEvent: false,
    // }))
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

  onSubmit() {
    if (!this.form?.valid) {
      return false;
    } else {
      this.checkAnswer(false);
    }
    return true;
  }

  checkAnswer(showResult?: boolean) {
    console.log("answer", this.question?.answer);

    if (!this.isMultipleQuestion) {
      // check radio
      let selected = this.form.get(this.formKey)?.value;
      this.answerIsCorrect = this.checkCorrectAnswer(selected);
    } else {
      // checkboxes with multiple correct answers
      this.answerIsCorrect = this.checkCorrectAnswer(this.selectedOptions.join(','));
    }

    if (showResult) {
      this.getColorClass();
    }
  }

  checkCorrectAnswer(answer: string) {
    return answer.toUpperCase() === this.question?.answer?.toUpperCase();
  }

  showResult() {
    // this.getColorClass();
  }

  getColorClass() {
    console.log("printing css");

    if (this.selectedOptions.length === 0) {
      console.log("answer undefined");

      let l = this.listOfAnswers.map(ans => ans.isCorrect = 'wrong-answer');
      console.log(l);
      this.changeDetector.detectChanges();

      return;
    }

    if (!this.isMultipleQuestion) {
      this.listOfAnswers.map(i => {
        if (this.checkCorrectAnswer(i)) {
          i.isCorrect = 'right-answer';
        } else {
          i.isCorrect = 'wrong-answer';
        }
      });
    } else {
      const correctAnswers = this.question?.answer?.split(',')!;
      const selected = this.selectedOptions.map((a: any) => a.key);

      this.listOfAnswers.map(ans => {
        // check if ans is selected & is in the correct answer list
        if (selected?.some((r: any) => correctAnswers.indexOf(r) >= 0)) {
          ans.isCorrect = 'right-answer';
        } else {
          ans.isCorrect = 'wrong-answer';
        }
      });
    }
    console.log(this.listOfAnswers);
    this.changeDetector.detectChanges();
  }
}
