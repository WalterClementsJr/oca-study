import {Question} from "../entity/Question";
import {Injectable} from "@angular/core";
import {TrainingContent} from "../entity/TrainingContent";

const fs = require('fs');
const path = require('path')

@Injectable()
export class QuestionService {
  private trainingContents: TrainingContent[] = [];

  constructor() {
    let files = [];
    // files.push(...fs.readdirSync('./exams'));
    // files.push(...fs.readdirSync('./lessons'));
    fs.readdirSync('./exams').forEach((files: any) => {
      console.log(files);
    });
    fs.readdirSync('./lessons').forEach((files: any) => {
      console.log(files);
    });

    // files.forEach((file: any) => {
    //   const fileData = fs.readFileSync(path.join('./', file));
    //   const json = JSON.parse(fileData.toString());
    //   console.log(file);
    // });
  }

  getAllTrainingContents() {

  }

  getAllQuestionOfTrainingContent(contentName: string) {
    this.trainingContents.find((content: TrainingContent) => {
      return content.name === contentName;
    });

  }
}
