import {Component, View, Input} from 'angular2/core';
import {NgFor, NgSwitch, NgSwitchWhen} from 'angular2/common';


@Component({
  selector: 'gv-pull-activity'
})
@View({
  directives: [NgFor, NgSwitch, NgSwitchWhen],
  template: `
    <ul class="pull-activity">
      <li *ngFor="#act of activityLog">
        <div [ngSwitch]="act.type">
          <template [ngSwitchWhen]="'comment'">
             <pre> {{act.content}} </pre>
          </template>
          <template [ngSwitchWhen]="'commit'">
             <pre> {{act.raw.sha}} </pre>  
          </template>
        </div>
      </li>
    </ul>
  `
})
export class PullActivityComponent {
  @Input() activityLog = [];
  constructor() {
    console.log('Created AC with activityLog = ', this.activityLog);
  }
  onChanges() {
    this.activityLog = this.activityLog.sort((a, b) => (a.date - b.date));
  }
};
