export enum QuestionType {
  MULTIPLE_CHOICE,
  SINGLE_CHOICE
}

export class Question {
  id: number | undefined;
  name: string | undefined;
  type: QuestionType | undefined;
  trainingContent: string | undefined;
  question: string | undefined;
  answer: string | undefined;
  answers: any | undefined;
  explanation: string | undefined;

  constructor() {
  }
}
