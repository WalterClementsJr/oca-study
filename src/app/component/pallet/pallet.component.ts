import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingContent} from "../../entity/TrainingContent";
import {TrainingContentComponent} from "../pages/training-content/training-content.component";
import {Question} from "../../entity/Question";

@Component({
  selector: 'app-pallet',
  templateUrl: './pallet.component.html',
  styleUrls: ['./pallet.component.css']
})
export class PalletComponent implements OnInit, OnChanges {
  @Input() trainingContent: TrainingContent | undefined;
  @Input() parent!: TrainingContentComponent;

  parentDoneLoad: boolean | undefined;
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
    this.parentDoneLoad = true;
    console.log("--- changed. length is ", this.parent._questionComponents?.length);
    this.changeDetectorRef.detectChanges();
  }

  submitTest() {
    this.parent.submit();
  }

  jumpTo(question: Question) {
    this.parent.jumpTo(question!.id);
  }

  getProgress() {
    // console.log("pallet getprogress");
    // if (this.parentDoneLoad) {
    //   return this.parent.getProgress();
    // }
    // console.log("not done loading");
    return -1;
  }
}
