import {Question} from "../entity/Question";
import {Injectable} from "@angular/core";


@Injectable()
export class QuestionService {
  private questions: Question[] = [];

  constructor() {
  }

  getAllQuestionsOfContent(content: string) {

  }
}
