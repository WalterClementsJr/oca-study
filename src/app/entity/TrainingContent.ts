import {Question} from "./Question";

export class TrainingContent {
  name: string | undefined;
  type: string | undefined;
  question: Question[] = [];

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
