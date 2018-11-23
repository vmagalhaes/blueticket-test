import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertCoin' })
export class ConvertCoinPipe implements PipeTransform {

  transform(value: string): any {
    return value ? value.toString().replace('.', ',') : '';
  }

}
