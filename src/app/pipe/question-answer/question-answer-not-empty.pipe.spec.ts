import { QuestionAnswerNotEmptyPipe } from './question-answer-not-empty.pipe';

describe('QuestionAnswerNotEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new QuestionAnswerNotEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
