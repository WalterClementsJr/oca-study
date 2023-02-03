import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class QuestionFormComponent implements OnInit, OnChanges {
  readonly formKey = 'answer';
  readonly questionType = QuestionType;
  objectKeys = Object.keys;

  @Input('question') question: Question | undefined;
  listOfAnswers: any[] = [];
  answerIsCorrect: boolean | undefined;
  form!: FormGroup;
  answer: string | undefined;

  constructor(
    public fb: FormBuilder,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location
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

    this.form = this.fb.group({
      answer: ['', [Validators.required]]
    });
  }

  /**
   * get selected answer(s)
   */
  get selectedOptions() {
    return this.listOfAnswers
      .filter(opt => opt.checked === true)
      .map(opt => opt.key)
  }

  back() {
    this.location.back();
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

    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      // check radio
      let value = this.form.get(this.formKey)?.value;
      this.answerIsCorrect = this.checkCorrectAnswer(value);
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
    // if (this.question?.type === QuestionType.SINGLE_CHOICE) {
    //   // check radio
    //   let value = this.form.get(this.formKey)?.value;
    //   if (this.checkCorrectAnswer(value)) {
    //     this.answerIsCorrect = true;
    //   } else {
    //     this.answerIsCorrect = false;
    //
    //     // TODO: remove this in prod
    //     console.log("answer", this.question.answer);
    //   }
    // } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
    //   // checkboxes with multiple correct answers
    //   if (this.checkCorrectAnswer(this.selectedOptions.join(','))) {
    //     this.answerIsCorrect = true;
    //   } else {
    //     this.answerIsCorrect = false;
    //     console.log("answer", this.question.answer);
    //   }
    // }
  }

  getColorClass() {
    console.log("printing css");

    if (this.form.get(this.formKey) === undefined && this.selectedOptions.length === 0) {
      console.log("answer undefined");

      let l = this.listOfAnswers.map(ans => ({...ans, isCorrect: 'normal'}));
      console.log(l);
      return l;
    }

    if (this.question?.type === QuestionType.SINGLE_CHOICE) {
      return this.listOfAnswers.map(i => ({...i, isCorrect: 'normal'}));
    } else {
      const correctAnswers = this.question?.answer?.split(',')!;
      const selected = this.selectedOptions.map(a => a.key);

      return this.listOfAnswers.map(ans => {
        console.log(ans);

        // check if ans is selected & is in the correct answer list
        if (selected?.some(r => correctAnswers.indexOf(r) >= 0)) {
          ans.isCorrect = 'right-answer';
        } else {
          ans.isCorrect = 'wrong-answer';
        }
      });
    }
  }


}
