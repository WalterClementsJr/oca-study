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

  isViewingResult: boolean | undefined;

  progress: number | undefined;

  hasLoaded: boolean | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.isViewingResult = this.parent?.isViewingResult;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetectorRef.detectChanges()
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  change() {
    this.hasLoaded = true;
    this.changeDetectorRef.detectChanges();
  }

  submitTest() {
    this.parent.submit();
  }

  jumpTo(question: Question) {
    this.parent.jumpTo(question!.id);
  }
}
