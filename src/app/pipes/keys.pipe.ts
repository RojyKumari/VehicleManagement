import { Pipe, PipeTransform } from '@angular/core';

import { Request } from '../model/request';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: {[key: string]: Request}): string[] {
    return Object.keys(value);
  }

}
