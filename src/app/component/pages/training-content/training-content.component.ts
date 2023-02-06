import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TrainingContent} from "../../../entity/TrainingContent";
import {TrainingContentService} from "../../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {QuestionFormComponent} from "../../question-form/question-form.component";
import {PalletComponent} from "../../pallet/pallet.component";

@Component({
  selector: 'app-training-content',
  templateUrl: './training-content.component.html',
  styleUrls: ['./training-content.component.css']
})
export class TrainingContentComponent implements OnInit {
  trainingContent: TrainingContent | undefined;
  @ViewChildren('questions') _questionComponents!: QueryList<QuestionFormComponent>;

  @ViewChildren('pallet') _palletComponent!: PalletComponent;
  correctAnswerCount: number | undefined;

  constructor(
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
    this.route.paramMap
      .subscribe(paramMap => {
        this.trainingContent = this.trainingContentService.findByName(paramMap.get('name'));
      });
  }

  ngOnInit(): void {

  }

  back() {
    this.location.back();
  }
}
