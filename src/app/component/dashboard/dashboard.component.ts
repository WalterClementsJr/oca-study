import {Component, OnInit} from '@angular/core';
import {TrainingContentService} from "../../service/TrainingContentService";
import {TrainingContent} from "../../entity/TrainingContent";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trainingContents: TrainingContent[] = [];

  constructor(private trainingContentService: TrainingContentService) {
  }

  ngOnInit(): void {
    this.trainingContents = this.trainingContentService.getAllTrainingContents();
  }

  filterTrainingContentExam(content: TrainingContent) {
    console.log(content);
    return content.type === "exams";
  }

  filterTrainingContentLesson(content: TrainingContent) {
    console.log(content);
    return content.type === "lessons";
  }
}
