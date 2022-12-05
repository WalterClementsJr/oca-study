import {Injectable} from "@angular/core";
import {TrainingContent} from "../entity/TrainingContent";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TrainingContentService {
  private trainingContents: TrainingContent[] = [];

  private httpClient: HttpClient;


  constructor(http: HttpClient) {
    this.httpClient = http;

    const initTrainingContent = (names: { type: string; name: string }[]) => {
      names.forEach((fileData: { type: string; name: string }) => {
        this.httpClient
          .get(`assets/${fileData.type}/${fileData.name}`, {responseType: 'json'})
          .subscribe((data: any) => {
            let content = new TrainingContent(fileData.name, data.type);
            content.questions = data;
            this.trainingContents.push(content);
          });
      });
      console.log(this.trainingContents);
    }

    this.httpClient
      .get("assets/trainingContent.json", {responseType: 'json'})
      .subscribe((data: any) => {
        initTrainingContent(data);
      });
  }

  getAllTrainingContents() {
    return this.trainingContents.sort((a, b) => a.type.localeCompare(b.type));
  }

  getAllQuestionOfTrainingContent(contentName: string) {
    this.trainingContents.find((content: TrainingContent) => {
      return content.name?.toUpperCase().includes(contentName.toUpperCase());
    });

  }
}
