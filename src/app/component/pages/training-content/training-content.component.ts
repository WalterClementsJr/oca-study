import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TrainingContent} from "../../../entity/TrainingContent";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {QuestionFormComponent} from "../../question-form/question-form.component";

@Component({
  selector: 'app-training-content',
  templateUrl: './training-content.component.html',
  styleUrls: ['./training-content.component.css']
})
export class TrainingContentComponent implements OnInit, AfterViewInit {
  trainingContent: TrainingContent | undefined;
  objectKeys = Object.keys;

  @ViewChildren('questions') _questionComponents!: QueryList<QuestionFormComponent>;


  constructor(
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(paramMap => {
        this.trainingContent = this.trainingContentService.findByName(paramMap.get('name'));
      });
  }

  back() {
    this.location.back();
  }
}
