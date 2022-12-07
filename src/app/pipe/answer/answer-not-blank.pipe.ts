import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'answerNotBlank'
})
export class AnswerNotBlankPipe implements PipeTransform {
  transform(values: any[], ...args: any[]): any[] {
    return values.filter(value => (value.answer as string).trim().length !== 0);
  }
}
