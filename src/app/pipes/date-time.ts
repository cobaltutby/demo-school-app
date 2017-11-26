import { Pipe, PipeTransform } from '@angular/core';
import * as Classes from '../classes/classes';

@Pipe({ name: 'date_time' })

export class DateTime implements PipeTransform {

  transform(time: Date) {
    if (time) {

      return time.toLocaleString();
    }
    return null
  }

}
