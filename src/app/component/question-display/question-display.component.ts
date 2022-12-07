import {Component, Input} from '@angular/core';
import {Question} from 'src/app/entity/Question';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent {
  @Input('question') question: Question | undefined;
  objectKeys = Object.keys;
}
