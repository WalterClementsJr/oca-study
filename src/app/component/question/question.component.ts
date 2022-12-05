import {Component, OnInit} from '@angular/core';
import {TrainingContentService} from "../../service/TrainingContentService";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Question} from "../../entity/Question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: Question | undefined;
  objectKeys = Object.keys;

  constructor(
    private trainingContentService: TrainingContentService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    console.log("oninit");
    this.getRandomQuestion();
  }

  getRandomQuestion() {
    this.question = this.trainingContentService.getRandomQuestion();
    console.log(this.question);
  }

  back() {
    this.location.back();
  }

  filterEmptyAnswer(key: string) {
    console.log(key);
    // console.log(this.question);
    return true;
    // return !this.question?.answers[key] || this.question?.answers[key].trim().length === 0;
  }

  submit() {

  }

  next() {
    this.getRandomQuestion();
  }
}
