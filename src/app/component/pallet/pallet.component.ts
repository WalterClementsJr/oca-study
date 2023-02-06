import {Component, Input} from '@angular/core';
import {TrainingContent} from "../../entity/TrainingContent";

@Component({
  selector: 'app-pallet',
  templateUrl: './pallet.component.html',
  styleUrls: ['./pallet.component.css']
})
export class PalletComponent {

  @Input() trainingContent: TrainingContent | undefined;

}
