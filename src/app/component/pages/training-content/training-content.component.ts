import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {TrainingContent} from "../../../entity/TrainingContent";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT, Location} from '@angular/common';
import {QuestionFormComponent} from "../../question-form/question-form.component";
import {PalletComponent} from "../../pallet/pallet.component";

@Component({
  selector: 'app-training-content',
  templateUrl: './training-content.component.html',
  styleUrls: ['./training-content.component.css']
})
export class TrainingContentComponent implements OnInit, AfterViewInit {
  @Output() finishedLoading: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('questions') _questionComponents!: QueryList<QuestionFormComponent>;
  @ViewChildren('pallet') _palletComponent!: PalletComponent;
  @Input() isViewingResult: boolean | false | undefined;

  hasLoaded: boolean = false;

  trainingContent: TrainingContent | undefined;
  questions: any[] | undefined;
  numberOfCorrectQuestion: number = 0;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private changeDetector: ChangeDetectorRef,
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.paramMap
      .subscribe(paramMap => {
        this.trainingContent = this.trainingContentService.findByName(paramMap.get('name'));
      });
    this.numberOfCorrectQuestion = 0;
    this.questions = structuredClone(this.trainingContent?.questions);
    this.isViewingResult = false;
  }

  ngAfterViewInit() {
    this._questionComponents.changes.subscribe(() => {
      this._palletComponent.change();
      this.changeDetector.detectChanges();
    })
  }

  ngAfterContentInit() {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  /**
   * end test and show results
   */
  submit() {
    this._questionComponents.toArray().forEach((ele) => {
      if (ele.checkAnswer(true)) {
        this.numberOfCorrectQuestion! += 1;
      }
    });
    this.isViewingResult = true;
    this.changeDetector.detectChanges();
  }

  get correctAnswerCount(): number {
    return 0;
  }

  getProgress() {
    if (this.isViewingResult) {
      return `${this.correctAnswerCount}/${this.trainingContent?.questions.length}`;
    } else {
      return `${this.numberOfCorrectQuestion}/${this.trainingContent?.questions.length}`;
    }
  }

  jumpTo(questionId: any) {
    document.querySelector(`[href='#quest${questionId}']`)?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
