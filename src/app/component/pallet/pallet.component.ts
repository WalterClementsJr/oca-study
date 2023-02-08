import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingContent} from "../../entity/TrainingContent";
import {TrainingContentComponent} from "../pages/training-content/training-content.component";
import {Question} from "../../entity/Question";
import {QuestionFormComponent} from "../question-form/question-form.component";

@Component({
  selector: 'app-pallet',
  templateUrl: './pallet.component.html',
  styleUrls: ['./pallet.component.css']
})
export class PalletComponent implements OnInit, OnChanges {
  @Input() trainingContent: TrainingContent | undefined;
  @Input() parent!: TrainingContentComponent;

  readonly STYLE_NOT_SELECTED = "bg-light";
  readonly STYLE_SELECTED = "bg-success";
  readonly STYLE_WRONG = "bg-danger";

  isViewingResult: boolean | undefined;
  progress: number | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.isViewingResult = this.parent?.isViewingResult;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isViewingResult = this.parent.isViewingResult;
    this.changeDetectorRef.detectChanges()
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  change() {
    this.changeDetectorRef.detectChanges();
  }

  viewResult() {
    this.isViewingResult = true;
  }

  submitTest() {
    this.parent.submit();
  }

  jumpTo(question: Question) {
    this.parent.jumpTo(question!.id);
  }

  getProgress() {
    return this.parent.getProgress();
  }

  /**
   * determine pallet buttons' colors when interacting with questions
   * @param comp
   */
  checkComponent(comp: QuestionFormComponent) {
    if (!this.isViewingResult) {
      // if is taking test
      return comp?.isFormSelected! ? this.STYLE_SELECTED : this.STYLE_NOT_SELECTED;
    }
    return comp?.isFormSelected
      ? comp.answerIsCorrect
        ? this.STYLE_SELECTED : this.STYLE_WRONG
      : this.STYLE_NOT_SELECTED;
  }
}
