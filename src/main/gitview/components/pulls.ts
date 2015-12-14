import {Component, View} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {PullService, PullShort} from '../services/pulls';

@Component({
  selector: 'gv-pulls'
})
@View({
  directives: [NgFor],
  template: `<div>
              <div *ngFor="#pull in pulls">
                #{{pull.raw.number}} {{pull.raw.title}}
              </div>
            </div>`
})
export class PullsComponent {

  pulls: Array<PullShort>;

  constructor(pullService: PullService) {
    pullService.getPulls().forEach(pull => {
      this.pulls.push(pull);
    }, this);
  }
}
