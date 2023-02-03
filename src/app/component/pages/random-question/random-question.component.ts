import {Component, ViewChild} from '@angular/core';
import {Question} from "../../../entity/Question";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {QuestionFormComponent} from "../../question-form/question-form.component";

@Component({
  // standalone: true,
  // imports: [QuestionFormComponent],
  selector: 'app-random-question',
  templateUrl: './random-question.component.html',
  styleUrls: ['./random-question.component.css']
})
export class RandomQuestionComponent {

  @ViewChild("questionComponent") _questionComponent: QuestionFormComponent | undefined;
  question: Question | undefined;

  // readonly formKey = 'answer';
  // listOfAnswers: any[] = [];
  // answerIsCorrect: boolean | undefined;
  // objectKeys = Object.keys;
  // readonly questionType = QuestionType;
  // form!: FormGroup;
  // answer: string | undefined;

  constructor(
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    console.log('constructor');

    this.getRandomQuestion();
    this.setup();
  }

  // ngOnInit(): void {
  //   this.getRandomQuestion();
  // }

  private setup() {
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomQuestion();
    console.log(this.question);
    // this._questionComponent?.question = this.question;
    // this._question?.question = question;
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    // if (!this.form?.valid) {
    //   return false;
    // } else {
    //   this._questionComponent!.checkAnswer();
    // }
    return true;
  }

  checkAnswer() {
    // if (this.question?.type === QuestionType.SINGLE_CHOICE) {
    //   // check radio
    //   let value = this.form.get(this.formKey)?.value;
    //   if (value.toUpperCase() == this.question.answer?.toUpperCase()) {
    //     this.answerIsCorrect = true;
    //   } else {
    //     this.answerIsCorrect = false;
    //     console.log("answer", this.question.answer);
    //   }
    // } else if (this.question?.type === QuestionType.MULTIPLE_CHOICE) {
    //   // checkboxes
    //   if (this.selectedOptions.join(',').toUpperCase() === this.question.answer?.toUpperCase()) {
    //     this.answerIsCorrect = true;
    //   } else {
    //     this.answerIsCorrect = false;
    //     console.log("answer", this.question.answer);
    //   }
    // }
  }

  next() {
    this.getRandomQuestion();
    this.setup();
  }
}
