import {Injectable} from "@angular/core";
import {TrainingContent} from "../entity/TrainingContent";
import {HttpClient} from '@angular/common/http';
import {Question, QuestionType} from "../entity/Question";

@Injectable()
export class TrainingContentService {
  private trainingContents: TrainingContent[] = [];
  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;

    const initTrainingContent = (names: { type: string; name: string }[]) => {
      // loop through file names to get training contents
      names.forEach((fileData: { type: string; name: string }) => {
        this.httpClient
          .get(`assets/${fileData.type}/${fileData.name}.json`, {responseType: 'json'})
          .subscribe((data: any) => {
            // training content metadata
            let content = new TrainingContent(fileData.name, fileData.type);

            // training content questions
            data.forEach((item: any) => {
              let quest = new Question();
              quest.id = item.id;
              quest.type = item.type.toLowerCase().includes("multiple") ? QuestionType.MULTIPLE_CHOICE : QuestionType.SINGLE_CHOICE;
              quest.trainingContent = item.trainingContent;
              quest.question = item.question;
              quest.answer = item.answer;
              quest.answers = {};

              for (let key of Object.keys(item.answers)) {
                quest.answers[key] = item.answers[key];
              }
              content.questions.push(quest);
            });
            this.trainingContents.push(content);
          });
      });
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

  findByName(name: string | null) {
    if (name === null) {
      throw new Error("Param is null");
    }
    return this.trainingContents.find((content: TrainingContent) => {
      return content.name?.toUpperCase().includes(name.toUpperCase());
    });
  }

  getAllQuestionOfTrainingContent(contentName: string) {
    return this.trainingContents.find((content: TrainingContent) => {
      return content.name?.toUpperCase().includes(contentName.toUpperCase());
    });
  }

  checkAnswer(trainingContentName: string, questionId: number, answer: string) {
    const content = this.findByName(trainingContentName);
    content?.questions.filter((question: Question) => {

    });
  }

  getRandomQuestion() {
    let lessons = this.trainingContents.filter((content: TrainingContent) => content.type == "lessons");
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
    return randomLesson.questions[Math.floor(Math.random() * randomLesson.questions.length)];
  }
}
