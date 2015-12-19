import {Component, View, Pipe, PipeTransform} from 'angular2/core';

let dateFormat = require('dateformat');

dateFormat.masks.gvTime = 'h:MM:ss TT';
dateFormat.masks.gvGeneral = 'dddd, mmmm dS, h:MM:ss TT';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDate implements PipeTransform {
  withoutHours(date: Date): Date {
    let d = new Date(date.valueOf());
    d.setHours(0, 0, 0, 0);
    return d;
  }
  transform(value: Date): String {
    let today = this.withoutHours(new Date());
    let valueDay = this.withoutHours(value);
    if (value.getTime() >= today.getTime()) {
      return 'today, ' + dateFormat(value, 'gvTime');
    }
    if (value.getTime() >= today.getTime() - 1 * 24 * 60 * 60 * 1000) {
      return 'yesterday, ' + dateFormat(value, 'gvTime');
    }
    return dateFormat(value, 'gvGeneral');
  }
}
