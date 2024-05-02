import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
  standalone: true,
})
export class SubstringPipe implements PipeTransform {
  transform(value: string, length: number): string {
    return value.substring(0, length - 3).concat('...');
  }
}
