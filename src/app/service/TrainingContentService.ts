import {Injectable} from "@angular/core";
import {TrainingContent} from "../entity/TrainingContent";
import {HttpClient} from '@angular/common/http';

const fs = require('fs');
const path = require('path');

@Injectable()
export class TrainingContentService {
  private trainingContents: TrainingContent[] = [];

  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;

    const initTrainingContent = (names: string[]) => {
      names.forEach((file : string) => {
        this.httpClient
          .get(`assets/${file}`, {responseType: 'json'})
          .subscribe((data : any) => {
            console.log(data);
            let content = new TrainingContent(file, data);
            this.trainingContents.push(content);
          });
      });
    }

    this.httpClient
      .get("assets/trainingContent.json", {responseType: 'json'})
      .subscribe((data : any) => {
        initTrainingContent(data);
      });
  }

  getAllTrainingContents() {
    return this.trainingContents;
  }

  getAllQuestionOfTrainingContent(contentName: string) {
    this.trainingContents.find((content: TrainingContent) => {
      return content.name?.toUpperCase().includes(contentName.toUpperCase());
    });

  }
}
