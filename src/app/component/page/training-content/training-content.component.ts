import {Component, OnInit} from '@angular/core';
import {TrainingContent} from "../../../entity/TrainingContent";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-training-content',
  templateUrl: './training-content.component.html',
  styleUrls: ['./training-content.component.css']
})
export class TrainingContentComponent implements OnInit {
  trainingContent: TrainingContent | undefined;
  objectKeys = Object.keys;

  constructor(
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
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
