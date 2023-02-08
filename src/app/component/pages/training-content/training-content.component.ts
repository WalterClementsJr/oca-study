import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {TrainingContent} from "../../../entity/TrainingContent";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT, Location} from '@angular/common';
import {QuestionFormComponent} from "../../question-form/question-form.component";
import {PalletComponent} from "../../pallet/pallet.component";
import {startWith} from "rxjs";

@Component({
  selector: 'app-training-content',
  templateUrl: './training-content.component.html',
  styleUrls: ['./training-content.component.css']
})
export class TrainingContentComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Output() finishedLoading: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('questions') _questionComponents: QueryList<QuestionFormComponent> | undefined;
  @ViewChild('pallet') _palletComponent: PalletComponent | undefined;
  @Input() isViewingResult: boolean | false | undefined;

  hasLoaded: boolean = false;

  trainingContent: TrainingContent | undefined;
  questions: any[] | undefined;

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
    this.questions = structuredClone(this.trainingContent?.questions);
    this.isViewingResult = false;
  }

  ngAfterViewInit() {
    this._questionComponents?.changes.pipe(startWith([undefined])).subscribe(() => {
      console.log("think everyone is done");
      this._palletComponent?.change();
    })
    this.changeDetector.detectChanges();

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
    this.isViewingResult = true;
    this.changeDetector.detectChanges();
  }

  get correctAnswerCount(): number {
    let count = 0;
    this._questionComponents?.toArray().forEach((ele) => {
      if (ele.checkAnswer(true)) {
        count++;
      }
    });
    return count;
  }

  getProgress() {
    console.log("getting progress");
    if (this.isViewingResult) {
      return `${this.correctAnswerCount}/${this.trainingContent?.questions.length}`;
    } else {
      return `${this.correctAnswerCount}/${this.trainingContent?.questions.length}`;
    }
  }

  jumpTo(questionId: any) {
    document.querySelector(`[href='#quest${questionId}']`)?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}
