import {Component, View} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {PullService, PullShort} from '../services/pulls';

@Component({
  selector: 'gv-pulls'
})
@View({
  directives: [NgFor],
  template: `<div>
              <div *ngFor="#pull of pulls">
                <header>
                  {{pull.repo.name}}#{{pull.raw.number}}: {{pull.raw.title}}
                  <ul>
                    <li *ngFor="#com of pull.comments">
                      {{com.user.login}}: {{com.body}}
                    </li>
                  </ul>
                </header>
              </div>
            </div>`
})
export class PullsComponent {

  pulls: Array<PullShort>;

  constructor(pullService: PullService) {
    this.pulls = [];
    pullService.getPulls().forEach(pull => {
      console.log('Got pull: ', pull);
      this.pulls.push(pull);
    }, this);
  }
}
