import {Component} from '@angular/core';
import {TrainingContentService} from "../../service/TrainingContentService";
import {TrainingContent} from "../../entity/TrainingContent";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  trainingContents : TrainingContent[] = [];

  constructor(private trainingContentService: TrainingContentService) {
  }

  ngOnInit(): void {
    this.trainingContents = this.trainingContentService.getAllTrainingContents();
    console.log(this.trainingContents);
  }
}
