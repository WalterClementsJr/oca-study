import {Question} from "./Question";

export class TrainingContent {
  name: string;
  type: string;
  questions: Question[] = [];

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
