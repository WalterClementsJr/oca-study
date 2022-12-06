import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'questionAnswerNotEmpty'
})
export class QuestionAnswerNotEmptyPipe implements PipeTransform {
  transform(values: any[], ...args: any[]): any[] {
    return values.filter(value => {
      return (args[0][value] as string).trim().length !== 0;
    });
  }
}
